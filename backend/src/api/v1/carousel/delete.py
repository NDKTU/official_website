from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.base.db import get_db
from src.models import User, Carousel
from src.security import get_current_user, has_access

router = APIRouter()


@router.delete('/delete_carousel/{carousel_id}')
@has_access(roles=['admin'])
async def delete_carousel(carousel_id: int,
                          current_user: User = Depends(get_current_user),
                          db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Carousel).where(carousel_id == Carousel.id))
    carousel = result.scalars().one_or_none()
    if carousel is None:
        raise HTTPException(status_code=404, detail="Bunaqa karusel mavjud emas")
    await db.delete(carousel)
    await db.commit()

    return dict(
        message=f"{carousel.title_uz}  o'chirildi",
    )
