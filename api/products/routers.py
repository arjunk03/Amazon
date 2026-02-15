from fastapi import APIRouter, Header
from .crud import ProductCRUD
from .schema import ProductSchema, ProductCreate, ProductListPagination
from dependency import get_db
from fastapi import Depends
from oauth2 import get_current_user
from fastapi import UploadFile  
from role_check import role_check

product_router = APIRouter(prefix="/products", tags=["products"])
product_crud = ProductCRUD()



@product_router.get("/", response_model=list[ProductSchema])
async def get_products(db=Depends(get_db), pagination: ProductListPagination = Depends(), content_type: str = Header(), payload=Depends(get_current_user)):
    print("payload :", payload)
    print("content_type :", content_type)
    return await product_crud.get_all_products(db, pagination.limit, pagination.offset)

@product_router.get("/categories", response_model=list[str])
async def get_categories(db=Depends(get_db), valid_roles=Depends(role_check)):
    return await product_crud.get_unique_categories(db)

@product_router.get("/{product_id}", response_model=ProductSchema)
async def get_product(product_id: int, db=Depends(get_db)):
    return await product_crud.get_product_by_id(product_id, db)

@product_router.get("/seller/my-products", response_model=list[ProductSchema])
async def get_my_products(payload=Depends(get_current_user), pagination: ProductListPagination = Depends(), db=Depends(get_db)):
    return await product_crud.get_product_by_seller(payload.id, pagination.limit, pagination.offset, db)

@product_router.post("/", response_model=ProductSchema)
async def create_product(
    product: ProductCreate,
    db=Depends(get_db),
    payload=Depends(get_current_user)
):
    print("payload :", payload)
    product = await product_crud.create_product(product, db)
    db.commit()
    return product


@product_router.put("/{product_id}", response_model=ProductSchema)
async def update_product(
    product_id: int,
    product: ProductCreate,
    payload=Depends(get_current_user),
    db=Depends(get_db)
):
    # Payload is used to ensure user is authenticated
    product = await product_crud.update_product(product_id, product, db)
    db.commit()
    return product

@product_router.delete("/{product_id}", response_model=ProductSchema)
async def delete_product(
    product_id: int,
    payload=Depends(get_current_user),
    db=Depends(get_db)
):
    product = await product_crud.delete_product(product_id, db)
    db.commit()
    return product

@product_router.post("/import")
async def import_products(
    uploaded_file: UploadFile,
    input_user=Depends(get_current_user),
    db=Depends(get_db)
):
    await product_crud.import_products(uploaded_file, input_user.id, db)
    db.commit()
    return {"message": "Products imported successfully"}

