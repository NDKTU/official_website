from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime, timezone

from src.base.db import Base


class Apply(Base):
    __tablename__ = 'applies'

    id = Column(Integer, primary_key=True)
    fio=Column(String, nullable=False)
    phone=Column(String, nullable=False)
    comment=Column(String, nullable=False)
    time = Column(DateTime(timezone=True), default=datetime.now(timezone.utc))

