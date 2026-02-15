from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlmodel import SQLModel, Field, select


class Address(SQLModel, table=True):
    __tablename__ = "addresses"
    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(ForeignKey("users.id"))
    address_line1: str
    address_line2: str  
    city: str
    state: str
    zip_code: str
    country: str
    active: bool = Field(default=True)

    # user = relationship("User", back_populates="addresses")


    def __repr__(self):
        return f"<Address(id={self.id}, user_id={self.user_id}, address_line1='{self.address_line1}', address_line2='{self.address_line2}', city='{self.city}', state='{self.state}', zip_code='{self.zip_code}', country='{self.country}')>"
    
    def to_dict(self):
        return {
            "id": self.id, 
            "user_id": self.user_id,
            "address_line1": self.address_line1,
            "address_line2": self.address_line2,
            "city": self.city,
            "state": self.state,
            "zip_code": self.zip_code,
            "country": self.country
        }
    
    @staticmethod
    def get_address_by_id(id: int, db):
        return db.exec(select(Address).where(Address.id == id)).first()
    
    @staticmethod
    def get_all_addresses(db):
        return db.exec(select(Address)).all()
    
    @staticmethod
    def create_address(address, db):
        db.add(address)
        db.refresh(address)
        return address
    
    @staticmethod
    def update_address(address, db):
        db.refresh(address)
        return address
    
    @staticmethod
    def delete_address(address, db):
        db.delete(address)
        return address