
from .model import User
from .schema import UserRegister, UserSchema
from utils.security import hash_password


class UserCRUD:
    def __init__(self):
        pass
    
    def get_user_by_username(self, username: str, db):
        return User.get_user_by_username(username, db)
    
    def get_user_by_email(self, email: str, db):
        return User.get_user_by_email(email, db)
    
    def get_user_by_id(self, id: int, db):
        return User.get_user_by_id(id, db)
    
    def get_all_users(self, db):
        return User.get_all_users(db)
    
    def create_user(self, user: UserRegister, db):
        # Hash the password before saving
        user_data = user.dict()
        user_data['password'] = hash_password(user_data['password'])
        db_user = User(**user_data)
        return User.create_user(db_user, db)

    def update_user(self, user_id: int, user_schema: UserSchema, db):
        return User.update_user(user_id, user_schema, db)

    def delete_user(self, user_id: int, db):
        return User.delete_user(user_id, db)
