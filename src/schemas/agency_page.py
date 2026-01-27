from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class AgencyCreateRequest(BaseModel):
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
    agency_id: int


class AgencyUpdateRequest(BaseModel):
    name_uz: Optional[str] = None
    name_ru: Optional[str] = None
    name_en: Optional[str] = None
    title_uz: Optional[str] = None
    title_ru: Optional[str] = None
    title_en: Optional[str] = None
    text_uz: Optional[str] = None
    text_ru: Optional[str] = None
    text_en: Optional[str] = None
    time: Optional[datetime] = None
    agency_id: Optional[int] = None
