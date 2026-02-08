from pydantic import BaseModel

class ProductCreate(BaseModel):
    title: str
    description: str
    price: int
    imageUrl: str
    category: str
    seller_id: int

class ProductSchema(ProductCreate):
    id: int

