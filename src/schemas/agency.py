from pydantic import BaseModel


class AgencyCreateRequest(BaseModel):
    name_uz: str
    name_ru: str
    name_en: str
    faculty_id: int
    
    
class AgencyUpdateRequest(BaseModel):
    name_uz: str | None = None
    name_ru: str | None = None
    name_en: str | None = None
    faculty_id: int | None = None