from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.base.db import get_db
from src.models import News

router = APIRouter()


@router.get('/news_detail/{news_id}')
async def get_news_detail(news_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(News).where(news_id == News.id))
    news = result.scalars().one_or_none()
    return news
