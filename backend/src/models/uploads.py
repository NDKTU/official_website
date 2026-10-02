from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from src.base.db import Base


class Uploads(Base):
    __tablename__ = 'uploads'
    id = Column(Integer, primary_key=True)
    upload_file=Column(String, nullable=True)


