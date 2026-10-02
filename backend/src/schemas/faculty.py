
from pydantic import BaseModel


class FacultyBase(BaseModel):
    name_uz: str
    name_ru: str
    name_en: str
    # faculty_icon: str



class FacultyCreateRequest(FacultyBase):
    class Config:
        from_attributes = True


class FacultyCreateResponse(FacultyBase):
    id: int

    class Config:
        from_attributes = True