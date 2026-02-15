from sqlalchemy import Column, Integer, String, ForeignKey, Float
from database.setup import Base
from sqlalchemy.orm import relationship

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, unique=True, index=True)
    description = Column(String)
    price = Column(Float)
    stock = Column(Integer, default=0)
    imageUrl = Column(String)
    category = Column(String)  # New column for category grouping
    seller_id = Column(Integer, ForeignKey("users.id"))
    seller = relationship("User", back_populates="products") 

    def __repr__(self):
        return f"<Product(id={self.id}, title='{self.title}', price={self.price}, stock={self.stock}, category='{self.category}')>"
    
    def to_dict(self):
        return {
            "id": self.id, 
            "title": self.title,
            "description": self.description,
            "price": self.price,
            "stock": self.stock,
            "imageUrl": self.imageUrl,
            "category": self.category,
            "seller_id": self.seller_id
        }
    
    @staticmethod
    async def get_product_by_id(id: int, db):
        return db.query(Product).filter_by(id=id).first()

    @staticmethod
    async def get_product_by_seller(seller_id: int, db, limit: int = 10, offset: int = 0):
        return db.query(Product).filter_by(seller_id=seller_id).limit(limit).offset(offset).all()
    
    @staticmethod
    async def get_all_products(db, limit: int = 10, offset: int = 0):
        return db.query(Product).limit(limit).offset(offset).all()
    
    @staticmethod
    async def create_product(product, db):
        db.add(product)
        db.refresh(product)
        return product
    
    @staticmethod
    async def update_product(product, db):
        merged_product = db.merge(product) # Use merge to handle objects from different sessions
        db.refresh(merged_product)
        return merged_product
    
    @staticmethod
    async def delete_product(product, db):
        product = db.merge(product)
        db.delete(product)
        return product

    @staticmethod
    async def get_unique_categories(db):
        # Query unique categories, filtering out None/Empty
        results = db.query(Product.category).distinct().all()
        return [r[0] for r in results if r[0]]

    @staticmethod
    async def import_products(product_list, db):
        for product in product_list:
            db.add(product)
        return product_list