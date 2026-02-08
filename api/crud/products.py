from models.products import Product
from schema.products import ProductSchema

class ProductCRUD:
    
    def __init__(self):
        pass

    def get_product_by_id(self, id: int):
        return Product.get_product_by_id(id)
    
    def get_all_products(self):
        return Product.get_all_products()
    
    def create_product(self, product: ProductSchema):
        return Product.create_product(product)
    
    def update_product(self, product_id: int, product_schema: ProductSchema):
        return Product.update_product(product_id, product_schema)
    
    def delete_product(self, product_id: int):
        return Product.delete_product(product_id)
    
