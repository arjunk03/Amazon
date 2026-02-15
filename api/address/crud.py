from .model import Address
from .schema import AddressSchema

class AddressCRUD:
    def __init__(self):
        pass

    def get_all_addresses(self, db):
        return Address.get_all_addresses(db)
    
    def get_address_by_id(self, id: int, db):
        return Address.get_address_by_id(id, db)
    
    def create_address(self, address: AddressSchema, db):
        return Address.create_address(address, db)
    
    def update_address(self, id: int, address_schema: AddressSchema, db):
        return Address.update_address(id, address_schema, db)
    
    def delete_address(self, id: int, db):
        return Address.delete_address(id, db)
    
