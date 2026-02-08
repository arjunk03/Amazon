from fastapi import APIRouter

item_router = APIRouter()


@item_router.get("/item/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id}

