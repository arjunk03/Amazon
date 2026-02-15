from fastapi import APIRouter
from .crud import UserCRUD
from .schema import UserSchema, UserRegister
from dependency import SessionDep
from fastapi import Depends

user_router = APIRouter(prefix="/users", tags=["users"])


@user_router.get("/", response_model=list[UserSchema])
def get_users(db: SessionDep):
    return UserCRUD().get_all_users(db)


@user_router.get("/{id}", response_model=UserSchema)
def get_user(id: int, db: SessionDep):
    return UserCRUD().get_user_by_id(id, db)


@user_router.post("/", response_model=UserSchema)
def create_user(user: UserRegister, db: SessionDep):
    user = UserCRUD().create_user(user, db)
    db.commit()
    return user


@user_router.put("/{id}", response_model=UserSchema)
def update_user(id: int, user: UserRegister, db: SessionDep):
    user = UserCRUD().update_user(id, user, db)
    db.commit()
    return user


@user_router.delete("/{id}", response_model=UserSchema)
def delete_user(id: int, db: SessionDep):
    user = UserCRUD().delete_user(id, db)
    db.commit()
    return user
