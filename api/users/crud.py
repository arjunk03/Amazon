from .model import User
from .schema import UserRegister, UserSchema
from utils.security import hash_password

class UserCRUD:
    def __init__(self):
        pass
    
    async def get_user_by_username(self, username: str, db):
        return await User.get_user_by_username(username, db)
    
    async def get_user_by_email(self, email: str, db):
        return await User.get_user_by_email(email, db)
    
    async def get_user_by_id(self, id: int, db):
        return await User.get_user_by_id(id, db)
    
    async def get_all_users(self, db):
        return await User.get_all_users(db)
    
    async def create_user(self, user: UserRegister, db):
        # Hash the password before saving
        user_data = user.dict()
        user_data['password'] = await hash_password(user_data['password'])
        db_user = User(**user_data)
        return await User.create_user(db_user, db)

    async def update_user(self, user_id: int, user_schema: UserSchema, db):
        return await User.update_user(user_id, user_schema, db)

    async def delete_user(self, user_id: int, db):
        return await User.delete_user(user_id, db)
