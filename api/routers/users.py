from fastapi import APIRouter
from crud.users import UserCRUD
from crud.auth import AuthCRUD
from schema.users import UserSchema, UserRegister
from schema.auth import LoginRequest, LoginResponse

user_router = APIRouter()


@user_router.post("/login", response_model=LoginResponse)
def login(login_data: LoginRequest):
    """Authenticate a user with username and password"""
    return AuthCRUD().authenticate_user(login_data)


@user_router.get("/", response_model=list[UserSchema])
def get_users():
    return UserCRUD().get_all_users()


@user_router.get("/{id}", response_model=UserSchema)
def get_user(id: int):
    return UserCRUD().get_user_by_id(id)


@user_router.post("/", response_model=UserSchema)
def create_user(user: UserRegister):
    return UserCRUD().create_user(user)


@user_router.put("/{id}", response_model=UserSchema)
def update_user(id: int, user: UserRegister):
    return UserCRUD().update_user(user)


@user_router.delete("/{id}", response_model=UserSchema)
def delete_user(id: int):
    return UserCRUD().delete_user(id)
