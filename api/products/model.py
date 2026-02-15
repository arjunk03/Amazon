from sqlalchemy import Column, Integer, String, ForeignKey, Float
from sqlalchemy.orm import relationship
from sqlmodel import SQLModel, Field, select

class Product(SQLModel, table=True):
    __tablename__ = "products"
    id: int | None = Field(default=None, primary_key=True)
    title: str = Field(index=True)
    description: str
    price: float
    stock: int = Field(default=0)
    imageUrl: str
    category: str = Field(index=True)  # New column for category grouping
    seller_id: int = Field(ForeignKey("users.id"))
    # seller = relationship("User", back_populates="products") 

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
    def get_product_by_id(id: int, db):
        return db.exec(select(Product).where(Product.id == id)).first()

    @staticmethod
    def get_product_by_seller(seller_id: int, db):
        return db.exec(select(Product).where(Product.seller_id == seller_id)).all()
    
    @staticmethod
    def get_all_products(db):
        return db.exec(select(Product)).all()
    
    @staticmethod
    def create_product(product, db):
        db.add(product)
        db.refresh(product)
        return product
    
    @staticmethod
    def update_product(product, db):
        merged_product = db.merge(product) # Use merge to handle objects from different sessions
        db.refresh(merged_product)
        return merged_product
    
    @staticmethod
    def delete_product(product, db):
        product = db.merge(product)
        db.delete(product)
        return product

    @staticmethod
    def get_unique_categories(db):
        # Query unique categories, filtering out None/Empty
        results = db.exec(select(Product.category).distinct()).all()
        return [r for r in results if r]

    @staticmethod
    def import_products(product_list, db):
        for product in product_list:
            db.add(product)
        return product_list