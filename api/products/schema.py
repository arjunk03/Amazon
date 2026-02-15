from pydantic import BaseModel

class ProductCreate(BaseModel):
    title: str
    description: str
    price: float
    stock: int = 0
    imageUrl: str
    category: str
    seller_id: int

class ProductSchema(ProductCreate):
    id: int


class ProductListPagination(BaseModel):
    limit: int = 10
    offset: int = 0
