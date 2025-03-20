
from pydantic import BaseModel


class UploadBase(BaseModel):

    faculty_icon: str



class UploadCreateRequest(UploadBase):
    class Config:
        from_attributes = True


class UploadCreateResponse(UploadBase):
    id: int

    class Config:
        from_attributes = True