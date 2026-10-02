
from pydantic import BaseModel


class DepartmentBase(BaseModel):
    name_uz: str
    name_ru: str
    name_en: str
    faculty_id: int



class DepartmentCreateRequest(DepartmentBase):
    class Config:
        from_attributes = True


class DepartmentCreateResponse(DepartmentBase):
    id: int

    class Config:
        from_attributes = True