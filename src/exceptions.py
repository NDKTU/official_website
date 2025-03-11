from fastapi import HTTPException, status

class AlreadyRegisteredException(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Siz avval ro'yxatdan o'tgansiz",
            headers={"WWW-Authenticate": "Bearer"}
        )
