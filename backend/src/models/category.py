from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from src.base.db import Base


class Category(Base):
    __tablename__ = 'categories'

    id = Column(Integer, primary_key=True)
    name_uz=Column(String, nullable=False)
    name_ru=Column(String, nullable=False)
    name_en=Column(String, nullable=False)
    order = Column(Integer, nullable=False, default=0, server_default='0')

    page = relationship("Page", back_populates="category")
    # section=relationship("Section", back_populates="category")
