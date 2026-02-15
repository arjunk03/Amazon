from .model import Product
from .schema import ProductSchema, ProductCreate
from fastapi import UploadFile

class ProductCRUD:
    
    def __init__(self):
        pass

    def get_product_by_id(self, id: int,db ):
        return Product.get_product_by_id(id, db )

    def get_product_by_seller(self, seller_id: int,db ):
        return Product.get_product_by_seller(seller_id, db )
    
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

    def import_products(self, uploaded_file: UploadFile, seller_id: int, db):
        import csv
        from io import StringIO
        
        # Read and decode the file content
        content = uploaded_file.file.read().decode('utf-8')
        file_obj = StringIO(content)
        
        # Use DictReader to handle headers and mapping automatically
        reader = csv.DictReader(file_obj)
        
        product_list = []
        for row in reader:
            try:
                # Map CSV columns to ProductCreate fields
                # CSV: title,description,price,category,inventory,imageUrl
                product = Product(
                    title=row.get('title'),
                    description=row.get('description'),
                    price=float(row.get('price', 0)),
                    stock=int(row.get('stock') or row.get('inventory', 0)),
                    category=row.get('category'),
                    imageUrl=row.get('imageUrl'),
                    seller_id=seller_id
                )
                product_list.append(product)
            except Exception as e:
                print(f"Error parsing row: {row}, error: {e}")

        return Product.import_products(product_list, db)
