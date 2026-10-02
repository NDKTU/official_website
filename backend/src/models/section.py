from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from src.base.db import Base


class Section(Base):
    __tablename__ = 'sections'
    id = Column(Integer, primary_key=True)
    name_uz=Column(String, nullable=False)
    name_ru=Column(String, nullable=False)
    name_en=Column(String, nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    category = relationship("Category", back_populates="section")
