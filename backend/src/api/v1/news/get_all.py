from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.base.db import get_db
from src.models import News

router = APIRouter()

@router.get('/get_news')
async def get_news(db: AsyncSession = Depends(get_db)):
    stmt = await db.execute(
        select(
            News.id.label('news_id'),
            News.title_uz.label('title_uz'),
            News.title_ru.label('title_ru'),
            News.title_en.label('title_en'),
            News.text_uz.label('text_uz'),
            News.text_ru.label('text_ru'),
            News.text_en.label('text_en'),
            News.time.label('news_time'),
            News.photo.label('photo')
        )
        .order_by(News.id.desc())
    )
    results = stmt.fetchall()

    return [
        dict(
            news_id=item.news_id,
            title_uz=item.title_uz,
            title_ru=item.title_ru,
            title_en=item.title_en,
            text_uz=item.text_uz,
            text_ru=item.text_ru,
            text_en=item.text_en,
            news_time=item.news_time,
            photo=item.photo
        )
        for item in results
    ]
