from fastapi import APIRouter, Depends, Response
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.base.db import get_db
from src.models import Carousel
from src.pagination import Pagination, paginate

router = APIRouter()


@router.get('/get_carousels')
async def get_carousels(pagination: Pagination = Depends(),
                        response: Response = None,
                        db: AsyncSession = Depends(get_db)):
    query = select(Carousel).order_by(Carousel.order, Carousel.id)
    stmt = await db.execute(await paginate(db, query, pagination, response))
    results = stmt.scalars().all()

    # batafsil matn (text_*) ro'yxatda yuborilmaydi, u carousel_detail orqali olinadi
    return [
        dict(
            carousel_id=item.id,
            title_uz=item.title_uz,
            title_ru=item.title_ru,
            title_en=item.title_en,
            subtitle_uz=item.subtitle_uz,
            subtitle_ru=item.subtitle_ru,
            subtitle_en=item.subtitle_en,
            description_uz=item.description_uz,
            description_ru=item.description_ru,
            description_en=item.description_en,
            photo=item.photo,
            link=item.link,
            order=item.order,
            has_text=bool(item.text_uz or item.text_ru or item.text_en),
        )
        for item in results
    ]
