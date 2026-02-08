from pydantic import BaseModel

class ProductSchema(BaseModel):
    id: int
    name: str
    description: str
    price: int
    image: str
    seller_id: int

