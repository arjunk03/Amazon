from fastapi import APIRouter
from .crud import UserCRUD
from .schema import UserSchema, UserRegister
from dependency import get_db
from fastapi import Depends

user_router = APIRouter(prefix="/users", tags=["users"])


@user_router.get("/", response_model=list[UserSchema])
async def get_users(db=Depends(get_db)):
    return await UserCRUD().get_all_users(db)


@user_router.get("/{id}", response_model=UserSchema)
async def get_user(id: int, db=Depends(get_db)):
    return await UserCRUD().get_user_by_id(id, db)


@user_router.post("/", response_model=UserSchema)
async def create_user(user: UserRegister, db=Depends(get_db)):
    user = await UserCRUD().create_user(user, db)
    db.commit()
    return user


@user_router.put("/{id}", response_model=UserSchema)
async def update_user(id: int, user: UserRegister, db=Depends(get_db)):
    user = await UserCRUD().update_user(id, user, db)
    db.commit()
    return user


@user_router.delete("/{id}", response_model=UserSchema)
async def delete_user(id: int, db=Depends(get_db)):
    user = await UserCRUD().delete_user(id, db)
    db.commit()
    return user
