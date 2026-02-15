from fastapi import APIRouter, status   
from .crud import AuthCRUD
from .schema import LoginRequest, Token
from fastapi import Depends
from dependency import get_db

auth_router = APIRouter(prefix="/auth", tags=["auth"])

@auth_router.post("/login", response_model=Token, 
status_code=status.HTTP_200_OK)
def login(login_data: LoginRequest, db = Depends(get_db)):
    return AuthCRUD().authenticate_user(login_data, db)