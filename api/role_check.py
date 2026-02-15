from fastapi import Depends, HTTPException, status
from users.model import User
from oauth2 import get_current_user

allowed_roles = ["admin", "seller", "buyer"]

async def role_check(user: User = Depends(get_current_user)):
    if user.role not in allowed_roles:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You are not authorized to perform this action")
    return user
