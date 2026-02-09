from sqlalchemy import Column, Integer, String, ForeignKey
from .database import Base
from sqlalchemy.orm import relationship

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, unique=True, index=True)
    description = Column(String)
    price = Column(Integer)
    imageUrl = Column(String)
    category = Column(String)  # New column for category grouping
    seller_id = Column(Integer, ForeignKey("users.id"))
    seller = relationship("User", back_populates="products") 

    def __repr__(self):
        return f"<Product(id={self.id}, title='{self.title}', price={self.price}, category='{self.category}')>"
    
    def to_dict(self):
        return {
            "id": self.id, 
            "title": self.title,
            "description": self.description,
            "price": self.price,
            "imageUrl": self.imageUrl,
            "category": self.category,
            "seller_id": self.seller_id
        }
    
    @staticmethod
    def get_product_by_id(id: int, db):
        return db.query(Product).filter_by(id=id).first()
    
    @staticmethod
    def get_all_products(db):
        return db.query(Product).all()
    
    @staticmethod
    def create_product(product, db):
            db.add(product)
            db.commit()
            db.refresh(product)
            return product
    
    @staticmethod
    def update_product(product, db):
        merged_product = db.merge(product) # Use merge to handle objects from different sessions
        db.commit()
        db.refresh(merged_product)
        return merged_product
    
    @staticmethod
    def delete_product(product, db):
        product = db.merge(product)
        db.delete(product)
        db.commit()
        return product

    @staticmethod
    def get_unique_categories(db):
        # Query unique categories, filtering out None/Empty
        results = db.query(Product.category).distinct().all()
        return [r[0] for r in results if r[0]]