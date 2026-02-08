from pydantic import BaseModel
from schema.users import UserSchema

class LoginRequest(BaseModel):
    username: str
    password: str


class LoginResponse(BaseModel):
    success: bool
    message: str
    user: UserSchema | None = None
    token: str | None = None
