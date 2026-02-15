from users.model import User
from .schema import LoginRequest, Token, LoginResponse
from utils.security import verify_password
from oauth2 import create_access_token, verify_token
from users.schema import UserSchema

class AuthCRUD:
    def __init__(self):
        pass

    async def authenticate_user(self, login_data: LoginRequest, db) -> LoginResponse:
        """
        Authenticate a user by verifying their username and password.

        Args:
            login_data: LoginRequest containing username and password
            db: Database session

        Returns:
            LoginResponse with authentication result
        """
        # Get user by email
        user = await User.get_user_by_email(login_data.email, db)
        if not user:
            return Token(
                success=False,
                message="Invalid username or password",
                user=None,
                token=None
            )

        # Verify password
        if not await verify_password(login_data.password, user.password):
            return Token(
                success=False,
                message="Invalid username or password",
                user=None,
                token=None
            )

        # Return user data and tokens
        user_schema = UserSchema(
            id=user.id,
            username=user.username,
            email=user.email,
            user_type=user.user_type,
            phone=user.phone
        )

        access_token = await create_access_token(data={"sub": user.email})
        refresh_token = await create_access_token(data={"sub": user.email}, refresh=True)

        return Token(
            success=True,
            message="Login successful",
            user=user_schema,
            token=access_token,
            token_type="bearer",
            refresh_token=refresh_token
        )
    
    async def refresh_token(self, token: str, db) -> Token:
        """
        Refresh an access token using a refresh token.

        Args:
            token: Refresh token
            db: Database session

        Returns:
            Token with new access token
        """
        # Verify refresh token
        email = await verify_token(token)
        if email is None:
            return Token(
                success=False,
                message="Invalid refresh token",
                user=None,
                token=None
            )

        # Get user by email
        user = await User.get_user_by_email(email, db)
        if not user:
            return Token(
                success=False,
                message="Invalid refresh token",
                user=None,
                token=None
            )

        # Return user data and new tokens
        user_schema = UserSchema(
            id=user.id,
            username=user.username,
            email=user.email,
            user_type=user.user_type,
            phone=user.phone
        )

        access_token = await create_access_token(data={"sub": user.email})
        refresh_token = await create_access_token(data={"sub": user.email}, refresh=True)

        return Token(
            success=True,
            message="Refresh successful",
            user=user_schema,
            token=access_token,
            token_type="bearer",
            refresh_token=refresh_token
        )