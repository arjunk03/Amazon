from users.model import User
from .schema import LoginRequest, Token, LoginResponse
from utils.security import verify_password
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from oauth2 import create_access_token

class AuthCRUD:
    def __init__(self):
        pass

    def authenticate_user(self, login_data: OAuth2PasswordRequestForm, db) -> LoginResponse:
        """
        Authenticate a user by verifying their username and password.

        Args:
            login_data: LoginRequest containing username and password

        Returns:
            LoginResponse with authentication result
        """
        # Get user by username
        user = User.get_user_by_email(login_data.email, db)
        if not user:
            return Token(
                success=False,
                message="Invalid username or password",
                user=None,
                token=None
            )

        # Verify password
        if not verify_password(login_data.password, user.password):
            return Token(
                success=False,
                message="Invalid username or password",
                user=None,
                token=None
            )

        # Return user data and placeholder token
        from users.schema import UserSchema

        user_schema = UserSchema(
            id=user.id,
            username=user.username,
            email=user.email,
            user_type=user.user_type,
            phone=user.phone
        )

        access_token = create_access_token(data={"sub": user.email})

        return Token(
            success=True,
            message="Login successful",
            user=user_schema,
            token=access_token,
            token_type="bearer"
        )
