from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from .database import Base, SessionLocal        

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    phone = Column(String, nullable=True)
    user_type = Column(String, nullable=True)
    addresses = relationship("Address", back_populates="user")
    products = relationship("Product", back_populates="seller")


    def __repr__(self):
        return f"<User(id={self.id}, username='{self.username}', email='{self.email}')>"
    
    def to_dict(self):
        return {
            "id": self.id, 
            "username": self.username,
            "email": self.email,
            "user_type": self.user_type,
            "phone": self.phone
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
    
    @staticmethod
    def update_user(user_id: int, user_schema):
        db = SessionLocal()
        user = db.query(User).filter_by(id=user_id).first()
        if user:
            for key, value in user_schema.dict(exclude_unset=True).items():
                setattr(user, key, value)
            db.commit()
            db.refresh(user)
        return user

    @staticmethod
    def delete_user(user_id: int):
        db = SessionLocal()
        user = db.query(User).filter_by(id=user_id).first()
        if user:
            db.delete(user)
            db.commit()
        return user
    