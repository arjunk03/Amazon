from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base, SessionLocal

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


    def __repr__(self):
        return f"<Address(id={self.id}, user_id={self.user_id}, address='{self.address}')>"
    
    def to_dict(self):
        return {
            "id": self.id, 
            "user_id": self.user_id,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "zip_code": self.zip_code,
            "country": self.country
        }
    
    def get_address_by_id(id: int):
        db = SessionLocal()
        return db.query(Address).filter_by(id=id).first()
    
    def get_all_addresses():
        db = SessionLocal()
        return db.query(Address).all()
    
    def create_address(address):
        db = SessionLocal()
        db.add(address)
        db.commit()
        db.refresh(address)
        return address
    
    def update_address(address):
        db = SessionLocal()
        db.commit()
        db.refresh(address)
        return address
    
    def delete_address(address):
        db = SessionLocal()
        db.delete(address)
        db.commit()
        return address