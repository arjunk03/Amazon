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
    
    @staticmethod
    def get_address_by_id(id: int, db):
        return db.query(Address).filter_by(id=id).first()
    
    @staticmethod
    def get_all_addresses(db):
            return db.query(Address).all()
    
    @staticmethod
    def create_address(address, db):
        db.add(address)
        db.commit()
        db.refresh(address)
        return address
    
    @staticmethod
    def update_address(address, db):
        db.commit()
        db.refresh(address)
        return address
    
    @staticmethod
    def delete_address(address, db):
        db.delete(address)
        db.commit()
        return address