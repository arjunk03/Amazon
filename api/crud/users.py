
from models.users import User
from schema.users import UserRegister, UserSchema

class UserCRUD:
    def __init__(self):
        pass
    
    def get_user_by_username(self, username: str):
        return User.get_user_by_username(username)
    
    def get_user_by_email(self, email: str):
        return User.get_user_by_email(email)
    
    def get_user_by_id(self, id: int):
        return User.get_user_by_id(id)
    
    def get_all_users(self):
        return User.get_all_users()
    
    def create_user(self, user: UserRegister):
        db_user = User(**user.dict())
        return User.create_user(db_user)

    def update_user(self, user_id: int, user_schema: UserSchema):
        return User.update_user(user_id, user_schema)

    def delete_user(self, user_id: int):
        return User.delete_user(user_id)
