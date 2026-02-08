from sqlalchemy import Column, Integer, String, ForeignKey
from .database import Base, SessionLocal
from sqlalchemy.orm import relationship

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    description = Column(String)
    price = Column(Integer)
    image = Column(String)
    seller_id = Column(Integer, ForeignKey("users.id"))
    seller = relationship("User", back_populates="products") 

    def __repr__(self):
        return f"<Product(id={self.id}, name='{self.name}', price={self.price})>"
    
    def to_dict(self):
        return {
            "id": self.id, 
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "image": self.image
        }
    
    def get_product_by_id(id: int):
        db = SessionLocal()
        return db.query(Product).filter_by(id=id).first()
    
    def get_all_products():
        db = SessionLocal()
        return db.query(Product).all()
    
    def create_product(product):
        db = SessionLocal()
        db.add(product)
        db.commit()
        db.refresh(product)
        return product
    
    def update_product(product):
        db = SessionLocal()
        db.commit()
        db.refresh(product)
        return product
    
    def delete_product(product):
        db = SessionLocal()
        db.delete(product)
        db.commit()
        return product