from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from database.setup import Base


class Address(Base):
    __tablename__ = "addresses"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    address_line1 = Column(String)
    address_line2 = Column(String)  
    city = Column(String)
    state = Column(String)
    zip_code = Column(String)
    country = Column(String)
    active = Column(Boolean, default=True)

    user = relationship("User", back_populates="addresses")


    async def __repr__(self):
        return f"<Address(id={self.id}, user_id={self.user_id}, address='{self.address}')>"
    
    async def to_dict(self):
        return {
            "id": self.id, 
            "user_id": self.user_id,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "zip_code": self.zip_code,
            "country": self.country
        }
    
    @staticmethod
    async def get_address_by_id(id: int, db):
        return db.query(Address).filter_by(id=id).first()
    
    @staticmethod
    async def get_all_addresses(db):
        return db.query(Address).all()
    
    @staticmethod
    async def create_address(address, db):
        db.add(address)
        db.refresh(address)
        return address
    
    @staticmethod
    async def update_address(id, db):
        address = db.query(Address).filter_by(id=id).first()
        if address:
            for key, value in address.dict(exclude_unset=True).items():
                setattr(address, key, value)
            db.refresh(address)
            return address
        return None
    
    @staticmethod
    async def delete_address(id, db):
        address = db.query(Address).filter_by(id=id).first()
        if address:
            db.delete(address)
            return address
        return None