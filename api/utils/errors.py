from fastapi import HTTPException, status, Request
from fastapi.responses import JSONResponse

class UserErrors(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)

class UserNotFound(UserErrors):
    def __init__(self):
        super().__init__("User not found")

class UserAlreadyExists(UserErrors):
    def __init__(self):
        super().__init__("User already exists")

class InvalidCredentials(UserErrors):
    def __init__(self):
        super().__init__("Invalid credentials")

class Unauthorized(UserErrors):
    def __init__(self):
        super().__init__("Unauthorized")

class Forbidden(UserErrors):
    def __init__(self):
        super().__init__("Forbidden")
    

async def handle_user_errors(request: Request, error: UserErrors):
    if isinstance(error, UserNotFound):
        return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content={"detail": error.message})
    if isinstance(error, UserAlreadyExists):
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={"detail": error.message})
    if isinstance(error, InvalidCredentials):
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={"detail": error.message})
    if isinstance(error, Unauthorized):
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={"detail": error.message})
    if isinstance(error, Forbidden):
        return JSONResponse(status_code=status.HTTP_403_FORBIDDEN, content={"detail": error.message})
    return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={"detail": "Internal server error"})


