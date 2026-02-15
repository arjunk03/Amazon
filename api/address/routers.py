from fastapi import APIRouter
from .schema import AddressSchema, AddressCreate
from .crud import AddressCRUD
from dependency import get_db
from fastapi import Depends

address_router = APIRouter(prefix="/addresses", tags=["addresses"])
address_crud = AddressCRUD()    

@address_router.get("/", response_model=list[AddressSchema])
async def get_addresses(db=Depends(get_db)):
    return await address_crud.get_all_addresses(db)

@address_router.get("/{id}", response_model=AddressSchema)
async def get_address(id: int, db=Depends(get_db)):
    return await address_crud.get_address_by_id(id, db)

@address_router.post("/", response_model=AddressSchema)
async def create_address(address: AddressCreate, db=Depends(get_db)):
    address = await address_crud.create_address(address, db)
    db.commit()
    return address


@address_router.put("/{id}", response_model=AddressSchema)
async def update_address(id: int, address: AddressCreate, db=Depends(get_db)):
    address = await address_crud.update_address(id, address, db)
    db.commit()
    return address

@address_router.delete("/{id}", response_model=AddressSchema)
async def delete_address(id: int, db=Depends(get_db)):
    address = await address_crud.delete_address(id, db)
    db.commit()
    return address
