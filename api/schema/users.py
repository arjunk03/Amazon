from pydantic import BaseModel

class UserRegister(BaseModel):
    username: str
    email: str
    password: str
    phone: str = None   

class UserSchema(BaseModel):
    id: int
    username: str
    email: str

