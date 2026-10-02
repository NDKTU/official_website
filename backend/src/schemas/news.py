from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class NewsBase(BaseModel):
    title_uz: str
    title_ru: str
    title_en: str
    photo: str
    text_uz: str
    text_ru: str
    text_en: str
    time: Optional[datetime] = None




class NewsCreateRequest(NewsBase):
    class Config:
        from_attributes = True


class PageCreateResponse(NewsBase):
    id: int

    class Config:
        from_attributes = True