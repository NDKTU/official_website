from sqlalchemy import Column, Integer, String, Boolean

from src.base.db import Base


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username=Column(String, nullable=False)
    password=Column(String, nullable=False)
    role=Column(String, nullable=False)
    is_logged_out = Column(Boolean, default=True)


