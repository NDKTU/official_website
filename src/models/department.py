from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from src.base.db import Base


class Department(Base):
    __tablename__ = 'departments'
    id = Column(Integer, primary_key=True)
    name_uz=Column(String, nullable=False)
    name_ru=Column(String, nullable=False)
    name_en=Column(String, nullable=False)
    faculty_id = Column(Integer, ForeignKey("faculties.id"), nullable=False)

    faculty = relationship("Faculty", back_populates="department")
