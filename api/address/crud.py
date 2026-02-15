from .model import Address
from .schema import AddressSchema
from dependency import get_db
from fastapi import Depends

class AddressCRUD:
    def __init__(self):
        pass

    def get_all_addresses(self, db=Depends(get_db)):
        return Address.get_all_addresses(db)
    
    def get_address_by_id(self, id: int, db=Depends(get_db)):
        return Address.get_address_by_id(id, db)
    
    def create_address(self, address: AddressSchema, db=Depends(get_db)):
        Address.create_address(address, db)
        return address
    
    def update_address(self, id: int, address: AddressSchema, db=Depends(get_db)):
        Address.update_address(id, address, db)
        return address
    
    def delete_address(self, id: int, db=Depends(get_db)):
        return Address.delete_address(id, db)
        
