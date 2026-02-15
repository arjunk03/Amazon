from .model import Address
from .schema import AddressSchema
from dependency import get_db
from fastapi import Depends

class AddressCRUD:
    def __init__(self):
        pass

    def get_all_addresses(self, db=Depends(get_db)):
        return db.query(Address).all()
    
    def get_address_by_id(self, id: int, db=Depends(get_db)):
        return db.query(Address).filter_by(id=id).first()
    
    def create_address(self, address: AddressSchema, db=Depends(get_db)):
        db.add(address)
        db.refresh(address)
        return address
    
    def update_address(self, id: int, address: AddressSchema, db=Depends(get_db)):
        address = db.query(Address).filter_by(id=id).first()
        address.address = address.address
        address.city = address.city
        address.state = address.state
        address.pincode = address.pincode
        address.country = address.country
        address.is_default = address.is_default
        db.refresh(address)
        return address
    
    def delete_address(self, id: int, db=Depends(get_db)):
        address = db.query(Address).filter_by(id=id).first()
        db.delete(address)
        return address            
