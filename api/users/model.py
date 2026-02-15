from sqlmodel import SQLModel, Field, select

class User(SQLModel, table=True):
    __tablename__ = "users"
    id: int | None = Field(default=None, primary_key=True)
    username: str = Field(index=True)
    email: str = Field(index=True)
    password: str
    phone: str = Field(nullable=True)
    user_type: str = Field(nullable=True)
    # addresses = relationship("Address", back_populates="user")
    # products = relationship("Product", back_populates="seller")


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
        return db.exec(select(User).where(User.username == username)).first()
    
    @staticmethod
    def get_user_by_email(email: str, db):
        return db.exec(select(User).where(User.email == email)).first()
    
    @staticmethod
    def get_user_by_id(id: int, db):
        return db.exec(select(User).where(User.id == id)).first()
    
    @staticmethod
    def get_all_users(db):
        return db.exec(select(User)).all()
    
    @staticmethod
    def create_user(user, db):
        db.add(user)
        db.refresh(user)
        return user
    
    @staticmethod
    def update_user(user_id: int, user_schema, db):
        user = db.exec(select(User).where(User.id == user_id)).first()
        if user:
            for key, value in user_schema.dict(exclude_unset=True).items():
                setattr(user, key, value)
            db.add(user) # In SQLModel, add is enough for updates on tracked objects
            db.commit()
            db.refresh(user)
            return user

    @staticmethod
    def delete_user(user_id: int, db):
        user = db.exec(select(User).where(User.id == user_id)).first()
        if user:
            db.delete(user)
            db.commit()
            return user
    