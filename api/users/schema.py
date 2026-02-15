from pydantic import BaseModel, EmailStr

class UserRegister(BaseModel):
    username: str
    email: EmailStr
    password: str
    phone: str | None = None
    user_type: str | None = None

class UserSchema(BaseModel):
    id: int
    username: str
    email: EmailStr
    user_type: str | None = None
    phone: str | None = None

