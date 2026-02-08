import os

from dotenv import load_dotenv

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

load_dotenv()

db_user = os.getenv("DB_USER")
db_passwd = os.getenv("DB_PASSWD")
db_name = os.getenv("DB_NAME")

engine = create_engine(f"postgresql://{db_user}:{db_passwd}@localhost:5432/{db_name}")
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


Base = declarative_base()

def init_db():
    Base.metadata.create_all(bind=engine)
    print("Tables created")