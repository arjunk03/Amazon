from sqlalchemy import create_engine
from config import settings
from sqlmodel import SQLModel, Session

db_user = settings.DB_USER
db_passwd = settings.DB_PASSWD
db_name = settings.DB_NAME

engine = create_engine(f"postgresql://{db_user}:{db_passwd}@localhost:5432/{db_name}")


def init_db():
    SQLModel.metadata.create_all(bind=engine)
    print("Tables created")