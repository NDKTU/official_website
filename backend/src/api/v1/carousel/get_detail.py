from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.base.db import get_db
from src.models import Carousel

router = APIRouter()


@router.get('/carousel_detail/{carousel_id}')
async def get_carousel_detail(carousel_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Carousel).where(carousel_id == Carousel.id))
    carousel = result.scalars().one_or_none()
    if carousel is None:
        raise HTTPException(status_code=404, detail="Bunaqa karusel mavjud emas")
    return carousel
