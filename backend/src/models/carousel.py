from sqlalchemy import Column, Integer, String

from src.base.db import Base


class Carousel(Base):
    __tablename__ = 'carousels'

    id = Column(Integer, primary_key=True)
    title_uz = Column(String, nullable=False)
    title_ru = Column(String, nullable=False)
    title_en = Column(String, nullable=False)
    subtitle_uz = Column(String, nullable=False)
    subtitle_ru = Column(String, nullable=False)
    subtitle_en = Column(String, nullable=False)
    description_uz = Column(String, nullable=False)
    description_ru = Column(String, nullable=False)
    description_en = Column(String, nullable=False)
    # "Batafsil" bosilganda ochiladigan sahifa matni
    text_uz = Column(String, nullable=False, default='', server_default='')
    text_ru = Column(String, nullable=False, default='', server_default='')
    text_en = Column(String, nullable=False, default='', server_default='')
    photo = Column(String, nullable=True)
    # to'ldirilsa, "Batafsil" ichki sahifa o'rniga shu havolaga olib boradi
    link = Column(String, nullable=True)
    order = Column(Integer, nullable=False, default=0, server_default='0')
