from models.products import Product
from schema.products import ProductSchema, ProductCreate

class ProductCRUD:
    
    def __init__(self):
        pass

    def get_product_by_id(self, id: int,db ):
        return Product.get_product_by_id(id, db )
    
    def get_all_products(self, db):
        return Product.get_all_products(db)
    
    def create_product(self, product: ProductCreate, db):
        db_product = Product(
            title=product.title,
            description=product.description,
            price=product.price,
            imageUrl=product.imageUrl,
            category=product.category,
            seller_id=product.seller_id
        )
        return Product.create_product(db_product, db)
    
    def update_product(self, product_id: int, product_schema: ProductCreate, db):
        db_product = Product.get_product_by_id(product_id, db)
        if db_product:
            db_product.title = product_schema.title
            db_product.description = product_schema.description
            db_product.price = product_schema.price
            db_product.imageUrl = product_schema.imageUrl
            db_product.category = product_schema.category
            return Product.update_product(db_product, db)
        return None
    
    def delete_product(self, product_id: int, db):
        db_product = Product.get_product_by_id(product_id, db)
        if db_product:
            return Product.delete_product(db_product, db)
        return None
    
    def get_unique_categories(self, db):
        return Product.get_unique_categories(db)
