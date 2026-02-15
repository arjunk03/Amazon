from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from config import settings

db_user = settings.DB_USER
db_passwd = settings.DB_PASSWD
db_name = settings.DB_NAME

engine = create_engine(f"postgresql://{db_user}:{db_passwd}@localhost:5432/{db_name}")
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


Base = declarative_base()

async def init_db():
    await Base.metadata.create_all(bind=engine)
    print("Tables created")