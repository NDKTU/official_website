# models/faculty.py
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from src.base.db import Base


class Faculty(Base):
    __tablename__ = 'faculties'

    id = Column(Integer, primary_key=True)
    name_uz = Column(String, nullable=False)
    name_ru = Column(String, nullable=False)
    name_en = Column(String, nullable=False)
    faculty_icon = Column(String, nullable=True)

    department = relationship("Department", back_populates="faculty")


    faculty_page = relationship("FacultyPage", back_populates="faculty")
