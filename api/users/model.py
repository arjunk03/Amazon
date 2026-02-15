from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database.setup import Base        

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
    
    @staticmethod
    def get_user_by_username(username: str, db):
        return db.query(User).filter_by(username=username).first()
    
    @staticmethod
    def get_user_by_email(email: str, db):
        return db.query(User).filter_by(email=email).first()
    
    @staticmethod
    def get_user_by_id(id: int, db):
        return db.query(User).filter_by(id=id).first()
    
    @staticmethod
    def get_all_users(db):
        return db.query(User).all()
    
    @staticmethod
    def create_user(user, db):
        db.add(user)
        db.refresh(user)
        return user
    
    @staticmethod
    def update_user(user_id: int, user_schema, db):
        user = db.query(User).filter_by(id=user_id).first()
        if user:
            for key, value in user_schema.dict(exclude_unset=True).items():
                setattr(user, key, value)
            db.refresh(user)
            return user

    @staticmethod
    def delete_user(user_id: int, db):
        user = db.query(User).filter_by(id=user_id).first()
        if user:
            db.delete(user)
            return user
    