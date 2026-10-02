from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class FacultyPageBase(BaseModel):
    name_uz: str
    name_ru: str
    name_en: str
    title_uz: str
    title_ru: str
    title_en: str
    text_uz: str
    text_ru: str
    text_en: str
    time: Optional[datetime] = None
    faculty_id: int


class FacultyPageCreateRequest(FacultyPageBase):
    
    model_config = ConfigDict(from_attributes=True)


class FacultyPageResponse(FacultyPageBase):

    id: int
    model_config = ConfigDict(from_attributes=True)
