from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from users.routers import user_router
from products.routers import product_router
from address.routers import address_router

from auth.routers import auth_router

from database.setup import init_db

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Starting up")
    yield
    print("Shutting down")



app = FastAPI(
              title="Amazon API",
              description="Amazon API",
              version="1.0.0",
              lifespan=lifespan)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.on_event("startup")
def on_startup():
    print("startup event")
    init_db()

@app.on_event("shutdown")
def on_shutdown():
    print("shutdown event")


@app.get("/")
def read_root():
    return {"Welcome": "to the Amazon API"}

version = 'v1'

app.include_router(user_router, prefix=f"/{version}", tags=["users"])
app.include_router(product_router, prefix=f"/{version}", tags=["products"])
app.include_router(auth_router, prefix=f"/{version}", tags=["auth"])
app.include_router(address_router, prefix=f"/{version}", tags=["address"])

