import csv
import random

categories = [
    "Electronics", "Clothing", "Home & Kitchen", "Books", 
    "Health & Personal Care", "Sports & Outdoors", "Toys & Games", 
    "Tools & Home Improvement", "Automotive", "Pet Supplies"
]

category_nouns = {
    "Electronics": ["Smartphone", "Laptop", "Headphones", "Speaker", "Camera", "Monitor", "Tablet", "Charger", "Drone", "Projector"],
    "Clothing": ["T-Shirt", "Jeans", "Jacket", "Sweater", "Dress", "Shorts", "Hat", "Socks", "Scarf", "Gloves"],
    "Home & Kitchen": ["Blender", "Toaster", "Coffee Maker", "Pan", "Knife Set", "Towel", "Pillow", "Lamp", "Rug", "Vase"],
    "Books": ["Novel", "Biography", "Cookbook", "Textbook", "Guide", "Journal", "Comic", "Anthology", "Manual", "Atlas"],
    "Health & Personal Care": ["Vitamin", "Shampoo", "Soap", "Lotion", "Toothbrush", "First Aid Kit", "Mask", "Serum", "Razor", "Perfume"],
    "Sports & Outdoors": ["Tent", "Backpack", "Yoga Mat", "Dumbbell", "Bicycle", "Helmet", "Sleeping Bag", "Water Bottle", "Compass", "Flashlight"],
    "Toys & Games": ["Action Figure", "Board Game", "Puzzle", "Doll", "Drone", "Robot", "Card Game", "Building Blocks", "Plush Toy", "Model Kit"],
    "Tools & Home Improvement": ["Drill", "Hammer", "Wrench", "Screwdriver", "Tape Measure", "Saw", "Ladder", "Level", "Pliers", "Toolbox"],
    "Automotive": ["Car Wax", "Tire Inflator", "Seat Cover", "Floor Mat", "Oil", "Battery", "Charger", "Vacuum", "Dash Cam", "Jack"],
    "Pet Supplies": ["Dog Food", "Cat Toy", "Leash", "Collar", "Bed", "Bowl", "Cage", "Treats", "Shampoo", "Carrier"]
}

adjectives = ["Premium", "Durable", "Compact", "Stylish", "Advanced", "Eco-friendly", "High-performance", "Versatile", "Essential", "Modern"]

description_templates = [
    "Experience the best with our {title}. Designed for {usage}, it offers {feature1} and {feature2}.",
    "Upgrade your lifestyle with this {adj} {noun}. It features {feature1}, making it perfect for {usage}.",
    "The {title} is the ultimate choice for {category} enthusiasts. With {feature1} and {feature2}, you won't be disappointed.",
    "Discover the power of the {title}. Including {feature1} and {feature2}, it is designed to last.",
    "Our {title} combines style and functionality. Key features include {feature1} and {feature2}. Ideal for everyday use."
]

features_db = [
    "long-lasting battery life", "ergonomic design", "high-quality materials", "water resistance", 
    "easy functionality", "compact storage", "rapid performance", "energy efficiency", 
    "modern aesthetics", "user-friendly interface", "seamless integration", "robust construction"
]

usages = [
    "daily activities", "professional use", "enhancing your home", "outdoor adventures", 
    "improving efficiency", "maximum comfort", "reliable performance", "gift giving"
]

def generate_products(num_products=200):
    products = []
    headers = ["title", "description", "price", "category", "stock", "imageUrl"]
    
    for i in range(num_products):
        category = random.choice(categories)
        noun = random.choice(category_nouns.get(category, ["Product"]))
        adj = random.choice(adjectives)
        
        # Ensure unique titles by adding a model suffix
        title = f"{adj} {noun} {i + 1:03d}"
        
        feature1 = random.choice(features_db)
        feature2 = random.choice([f for f in features_db if f != feature1])
        usage = random.choice(usages)
        
        template = random.choice(description_templates)
        description = template.format(
            title=title, 
            adj=adj, 
            noun=noun, 
            category=category, 
            feature1=feature1, 
            feature2=feature2, 
            usage=usage
        )
        
        price = round(random.uniform(9.99, 999.99), 2)
        stock = random.randint(10, 500)
        image_url = f"https://picsum.photos/seed/{i+2000}/300/300"
        
        products.append([title, description, price, category, stock, image_url])
        
    filename = "amazon_import_sample.csv"
    with open(filename, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(headers)
        writer.writerows(products)
            
    print(f"Successfully generated {num_products} unique products in {filename}")

if __name__ == "__main__":
    generate_products()
