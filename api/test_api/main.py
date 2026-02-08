from fastapi import FastAPI
from routers import song_router, item_router
from database import engine
from models import song as song_model

song_model.Base.metadata.create_all(bind=engine)

app = FastAPI()


app.include_router(song_router)
app.include_router(item_router)


@app.get("/")
def read_root():
    return {"Hello": "World!!!!"}

