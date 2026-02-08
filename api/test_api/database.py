from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

engine = create_engine("postgresql://admin:admin123@localhost:5432/test_fast_api")
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

conn = engine.connect()
print("Connected to database")
conn.close()
print("Disconnected from database")

Base = declarative_base()

