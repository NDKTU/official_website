from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Form, UploadFile, File
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.api.v1.services.uploud_img import save_file
from src.base.db import get_db
from src.models import User, Carousel
from src.security import get_current_user, has_access

router = APIRouter()


@router.put('/update_carousel/{carousel_id}')
@has_access(roles=['admin'])
async def update_carousel(
        carousel_id: int,
        title_uz: str = Form(...),
        title_ru: str = Form(...),
        title_en: str = Form(...),
        subtitle_uz: str = Form(...),
        subtitle_ru: str = Form(...),
        subtitle_en: str = Form(...),
        description_uz: str = Form(...),
        description_ru: str = Form(...),
        description_en: str = Form(...),
        text_uz: str = Form(''),
        text_ru: str = Form(''),
        text_en: str = Form(''),
        link: Optional[str] = Form(None),
        order: Optional[int] = Form(None),
        photo: UploadFile = File(None),
        current_user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Carousel).where(carousel_id == Carousel.id))
    carousel = result.scalars().one_or_none()
    if carousel is None:
        raise HTTPException(status_code=404, detail="Bunaqa karusel mavjud emas")

    if photo:
        carousel.photo = await save_file(photo)

    carousel.title_uz = title_uz
    carousel.title_ru = title_ru
    carousel.title_en = title_en
    carousel.subtitle_uz = subtitle_uz
    carousel.subtitle_ru = subtitle_ru
    carousel.subtitle_en = subtitle_en
    carousel.description_uz = description_uz
    carousel.description_ru = description_ru
    carousel.description_en = description_en
    carousel.text_uz = text_uz
    carousel.text_ru = text_ru
    carousel.text_en = text_en
    carousel.link = link or None
    if order is not None:
        carousel.order = order

    await db.commit()
    await db.refresh(carousel)
    return {"message": "Karusel muvaffaqiyatli yangilandi"}
