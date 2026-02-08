from fastapi import APIRouter
from models.products import Product
from schema.products import ProductSchema

product_router = APIRouter()

@product_router.get("/", response_model=list[ProductSchema])
def get_products():
    return Product.get_all_products()

@product_router.get("/{id}", response_model=ProductSchema)
def get_product(id: int):
    return Product.get_product_by_id(id)

@product_router.post("/", response_model=ProductSchema)
def create_product(product: ProductSchema):
    return Product.create_product(product)

@product_router.put("/{id}", response_model=ProductSchema)
def update_product(id: int, product: ProductSchema):
    return Product.update_product(id, product)

@product_router.delete("/{id}", response_model=ProductSchema)
def delete_product(id: int):
    return Product.delete_product(id)
