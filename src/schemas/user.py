
from pydantic import BaseModel, field_validator
import bcrypt


class UserBase(BaseModel):
    username: str
    password: str
    role: str

    @field_validator("password")
    def hash_password(cls, value):
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(value.encode('utf-8'), salt)
        return hashed_password.decode('utf-8')



class UserCreateRequest(UserBase):
    class Config:
        from_attributes = True


class UserCreateResponse(UserBase):
    id: int

    class Config:
        from_attributes = True