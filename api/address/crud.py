from .model import Address
from .schema import AddressSchema
from dependency import get_db
from fastapi import Depends

class AddressCRUD:
    def __init__(self):
        pass

    async def get_all_addresses(self, db=Depends(get_db)):
        return await Address.get_all_addresses(db)
    
    async def get_address_by_id(self, id: int, db=Depends(get_db)):
        return await Address.get_address_by_id(id, db)
    
    async def create_address(self, address: AddressSchema, db=Depends(get_db)):
        await Address.create_address(address, db)
        return address
    
    async def update_address(self, id: int, address: AddressSchema, db=Depends(get_db)):
        await Address.update_address(id, address, db)
        return address
    
    async def delete_address(self, id: int, db=Depends(get_db)):
        return await Address.delete_address(id, db)
