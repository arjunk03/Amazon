from sqlalchemy import Column, Integer, String
from .database import Base, SessionLocal

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    phone = Column(String, nullable=True)

    def __repr__(self):
        return f"<User(id={self.id}, username='{self.username}', email='{self.email}')>"
    
    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "password": self.password
        }
    
    def get_user_by_username(username: str):
        db = SessionLocal()
        return db.query(User).filter_by(username=username).first()
    
    def get_user_by_email(email: str):
        db = SessionLocal()
        return db.query(User).filter_by(email=email).first()
    
    def get_user_by_id(id: int):
        db = SessionLocal()
        return db.query(User).filter_by(id=id).first()
    
    def get_all_users():
        db = SessionLocal()
        return db.query(User).all()
    
    def create_user(user):
        db = SessionLocal()
        db.add(user)
        db.commit()
        db.refresh(user)
        return user
    
    def update_user(user):
        db = SessionLocal()
        db.commit()
        db.refresh(user)
        return user
    
    def delete_user(user):
        db = SessionLocal()
        db.delete(user)
        db.commit()
        return user
    