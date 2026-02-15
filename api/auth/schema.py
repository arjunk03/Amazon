from pydantic import BaseModel
from users.schema import UserSchema

class LoginRequest(BaseModel):
    email: str
    password: str


class LoginResponse(BaseModel):
    success: bool
    message: str
    user: UserSchema | None = None
    token: str | None = None

class Token(LoginResponse):
    token_type: str | None = None

class TokenData(BaseModel):
    email: str | None = None
