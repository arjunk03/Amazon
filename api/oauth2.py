from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi import HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from dependency import get_db
from fastapi import Depends 
from users.model import User
from config import settings
from redis_app.redis import is_token_blocked
from utils.errors import Unauthorized, UserNotFound


OPENSSL_KEY = settings.OPENSSL_KEY
ALGORITHM = settings.ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES
# ACCESS_TOKEN_EXPIRE_MINUTES = 1  

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

async def create_access_token(data: dict, refresh: bool = False):
    to_encode = data.copy()

    if refresh:
        expire = datetime.utcnow() + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp" : expire, "refresh": refresh})

    encoded_jwt = jwt.encode(to_encode, OPENSSL_KEY, algorithm=ALGORITHM)
    
    return encoded_jwt


async def verify_token(token: str):
    try:
        payload = jwt.decode(token, OPENSSL_KEY, algorithms=[ALGORITHM])
 
        email: str = payload.get("sub")
        if email is None:
            return None            

        return email
    except JWTError:
        raise Unauthorized()

async def get_current_user(token: str = Depends(oauth2_scheme), db=Depends(get_db)):

    email = await verify_token(token)
    if email is None:
        raise Unauthorized()

    if await is_token_blocked(token):
        raise Unauthorized() 

    user = await User.get_user_by_email(email, db)
    if not user:
        raise UserNotFound()
    
    return user
