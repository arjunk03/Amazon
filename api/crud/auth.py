from models.users import User
from schema.auth import LoginRequest, LoginResponse
from utils.security import verify_password


class AuthCRUD:
    def __init__(self):
        pass

    def authenticate_user(self, login_data: LoginRequest) -> LoginResponse:
        """
        Authenticate a user by verifying their username and password.

        Args:
            login_data: LoginRequest containing username and password

        Returns:
            LoginResponse with authentication result
        """
        # Get user by username
        user = User.get_user_by_username(login_data.username)

        if not user:
            return LoginResponse(
                success=False,
                message="Invalid username or password",
                user=None,
                token=None
            )

        # Verify password
        if not verify_password(login_data.password, user.password):
            return LoginResponse(
                success=False,
                message="Invalid username or password",
                user=None,
                token=None
            )

        # Return user data and placeholder token
        from schema.users import UserSchema

        user_schema = UserSchema(
            id=user.id,
            username=user.username,
            email=user.email,
            user_type=user.user_type,
            phone=user.phone
        )

        return LoginResponse(
            success=True,
            message="Login successful",
            user=user_schema,
            token="placeholder-token"
        )
