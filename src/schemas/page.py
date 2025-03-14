from datetime import datetime

from pydantic import BaseModel


class PageBase(BaseModel):
    name_uz: str
    name_ru: str
    name_en: str
    title_uz: str
    title_ru: str
    title_en: str
    text_uz: str
    text_ru: str
    text_en: str
    time: datetime



class PageCreateRequest(PageBase):
    class Config:
        from_attributes = True


class PageCreateResponse(PageBase):
    id: int

    class Config:
        from_attributes = True