from datetime import datetime, timezone

from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship

from src.base.db import Base


class News(Base):
    __tablename__ = 'news'
    id = Column(Integer, primary_key=True)
    name_uz=Column(String, nullable=False)
    name_ru=Column(String, nullable=False)
    name_en=Column(String, nullable=False)
    title_uz=Column(String, nullable=False)
    title_ru=Column(String, nullable=False)
    title_en=Column(String, nullable=False)
    text_uz=Column(String, nullable=False)
    text_ru=Column(String, nullable=False)
    text_en=Column(String, nullable=False)
    time = Column(DateTime(timezone=True), default=datetime.now(timezone.utc))
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=True)

    category = relationship("Category", back_populates="page")
