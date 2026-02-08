from fastapi import FastAPI
from routers.users import user_router


from models.database import init_db

app = FastAPI()

@app.on_event("startup")
def on_startup():
    init_db()


@app.get("/")
def read_root():
    return {"Welcome": "to the Amazon API"}

app.include_router(user_router, prefix="/users", tags=["users"])

