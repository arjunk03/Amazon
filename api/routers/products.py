from fastapi import APIRouter
from crud.products import ProductCRUD
from schema.products import ProductSchema, ProductCreate

product_router = APIRouter()
product_crud = ProductCRUD()

@product_router.get("/", response_model=list[ProductSchema])
def get_products():
    return product_crud.get_all_products()

@product_router.get("/categories", response_model=list[str])
def get_categories():
    return product_crud.get_unique_categories()

@product_router.get("/{id}", response_model=ProductSchema)
def get_product(id: int):
    return product_crud.get_product_by_id(id)

@product_router.post("/", response_model=ProductSchema)
def create_product(product: ProductCreate):
    return product_crud.create_product(product)

@product_router.put("/{id}", response_model=ProductSchema)
def update_product(id: int, product: ProductCreate):
    return product_crud.update_product(id, product)

@product_router.delete("/{id}", response_model=ProductSchema)
def delete_product(id: int):
    return product_crud.delete_product(id)
    
