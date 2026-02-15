from fastapi import APIRouter
from .schema import AddressSchema, AddressCreate
from .crud import AddressCRUD
from dependency import get_db
from fastapi import Depends

address_router = APIRouter(prefix="/addresses", tags=["addresses"])

@address_router.get("/", response_model=list[AddressSchema])
def get_addresses(db=Depends(get_db)):
    return AddressCRUD().get_all_addresses(db)

@address_router.get("/{id}", response_model=AddressSchema)
def get_address(id: int, db=Depends(get_db)):
    return AddressCRUD().get_address_by_id(id, db)

@address_router.post("/", response_model=AddressSchema)
def create_address(address: AddressCreate, db=Depends(get_db)):
    return AddressCRUD().create_address(address, db)

@address_router.put("/{id}", response_model=AddressSchema)
def update_address(id: int, address: AddressCreate, db=Depends(get_db)):
    return AddressCRUD().update_address(id, address, db)

@address_router.delete("/{id}", response_model=AddressSchema)
def delete_address(id: int, db=Depends(get_db)):
    return AddressCRUD().delete_address(id, db)
