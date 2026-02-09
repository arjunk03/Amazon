from fastapi import APIRouter
from crud.users import UserCRUD
from crud.auth import AuthCRUD
from schema.users import UserSchema, UserRegister
from schema.auth import LoginRequest, LoginResponse
from dependency import get_db
from fastapi import Depends

user_router = APIRouter()
# user_router = APIRouter(prefix="/users", tags=["users"])


# @user_router.post("/login", response_model=LoginResponse)
# def login(login_data: LoginRequest):
#     """Authenticate a user with username and password"""
#     return AuthCRUD().authenticate_user(login_data)


@user_router.get("/", response_model=list[UserSchema])
def get_users(db=Depends(get_db)):
    return UserCRUD().get_all_users(db)


@user_router.get("/{id}", response_model=UserSchema)
def get_user(id: int, db=Depends(get_db)):
    return UserCRUD().get_user_by_id(id, db)


@user_router.post("/", response_model=UserSchema)
def create_user(user: UserRegister, db=Depends(get_db)):
    return UserCRUD().create_user(user, db)


@user_router.put("/{id}", response_model=UserSchema)
def update_user(id: int, user: UserRegister, db=Depends(get_db)):
    return UserCRUD().update_user(id, user, db)


@user_router.delete("/{id}", response_model=UserSchema)
def delete_user(id: int, db=Depends(get_db)):
    return UserCRUD().delete_user(id, db)
