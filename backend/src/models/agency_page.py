from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from sqlalchemy.sql import func # Используем серверное время для надежности
from src.base.db import Base

class AgencyPage(Base):
    __tablename__ = "agency_page"
    
    id = Column(Integer, primary_key=True)
    name_uz = Column(String, nullable=False)
    name_ru = Column(String, nullable=False)
    name_en = Column(String, nullable=False)
    title_uz = Column(String, nullable=False)
    title_ru = Column(String, nullable=False)
    title_en = Column(String, nullable=False)
    text_uz = Column(String, nullable=False)
    text_ru = Column(String, nullable=False)
    text_en = Column(String, nullable=False)
    
    
    time = Column(DateTime(timezone=True), default=datetime.now(timezone.utc))
    
    agency_id = Column(Integer, ForeignKey("agencies.id"), nullable=True, unique=True)
    
    agency = relationship("Agency", back_populates="agency_page")
    
    
    