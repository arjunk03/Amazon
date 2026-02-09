from fastapi import APIRouter
from crud.products import ProductCRUD
from schema.products import ProductSchema, ProductCreate
from dependency import get_db
from fastapi import Depends
from oauth2 import get_current_user

product_router = APIRouter()
product_crud = ProductCRUD()

@product_router.get("/", response_model=list[ProductSchema])
def get_products(db=Depends(get_db), payload=Depends(get_current_user)):
    print("payload :", payload)
    return product_crud.get_all_products(db)

@product_router.get("/categories", response_model=list[str])
def get_categories(db=Depends(get_db)):
    return product_crud.get_unique_categories(db)

@product_router.get("/{id}", response_model=ProductSchema)
def get_product(id: int, db=Depends(get_db)):
    return product_crud.get_product_by_id(id, db)

@product_router.post("/", response_model=ProductSchema)
def create_product(product: ProductCreate, db=Depends(get_db), payload=Depends(get_current_user)):
    print("payload :", payload)
    return product_crud.create_product(product, db)

@product_router.put("/{id}", response_model=ProductSchema)
def update_product(id: int, product: ProductCreate, db=Depends(get_db)):
    return product_crud.update_product(id, product, db)

@product_router.delete("/{id}", response_model=ProductSchema)
def delete_product(id: int, db=Depends(get_db)):
    return product_crud.delete_product(id, db)
    
