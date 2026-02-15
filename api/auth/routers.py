from fastapi import APIRouter, status   
from .crud import AuthCRUD
from .schema import LoginRequest, Token, RefreshTokenRequest
from fastapi import Depends
from dependency import get_db
from redis_app.redis import block_token
from oauth2 import get_current_user, oauth2_scheme

auth_router = APIRouter(prefix="/auth", tags=["auth"])

@auth_router.post("/login", response_model=Token, 
status_code=status.HTTP_200_OK)
async def login(login_data: LoginRequest, db = Depends(get_db)):
    return await AuthCRUD().authenticate_user(login_data, db)

@auth_router.post("/refresh", response_model=Token, 
status_code=status.HTTP_200_OK)
async def refresh_token(token_data: RefreshTokenRequest, db = Depends(get_db)):
    print("refresh_token : ", token_data.token)
    return await AuthCRUD().refresh_token(token_data.token, db)

@auth_router.post("/logout", response_model=Token, 
status_code=status.HTTP_200_OK)
async def logout(token: str = Depends(oauth2_scheme), user = Depends(get_current_user)):
    print("logout : ", token)
    await block_token(token)
    return Token(success=True, message="Logged out successfully")
    