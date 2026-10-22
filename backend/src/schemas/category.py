
from typing import Optional

from pydantic import BaseModel


class CategoryBase(BaseModel):
    name_uz: str
    name_ru: str
    name_en: str



class CategoryCreateRequest(CategoryBase):
    order: Optional[int] = None

    class Config:
        from_attributes = True


class CategoryCreateResponse(CategoryBase):
    id: int
    order: int

    class Config:
        from_attributes = True