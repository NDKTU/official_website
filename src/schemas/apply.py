
from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class ApplyBase(BaseModel):
    fio: str
    phone: str
    comment: str
    time: Optional[datetime] = None



class ApplyCreateRequest(ApplyBase):
    class Config:
        from_attributes = True


class ApplyCreateResponse(ApplyBase):
    id: int
    class Config:
        from_attributes = True