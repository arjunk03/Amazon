from fastapi import APIRouter, status   
from crud.auth import AuthCRUD
from schema.auth import LoginRequest, LoginResponse

auth_router = APIRouter()

@auth_router.post("/login", response_model=LoginResponse, status_code=status.HTTP_200_OK)
def login(login_data: LoginRequest):
    return AuthCRUD().authenticate_user(login_data)