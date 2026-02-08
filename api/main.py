from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.users import user_router
from routers.products import product_router

from models.database import init_db

app = FastAPI()

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
    init_db()


@app.get("/")
def read_root():
    return {"Welcome": "to the Amazon API"}

app.include_router(user_router, prefix="/users", tags=["users"])
app.include_router(product_router, prefix="/products", tags=["products"])

