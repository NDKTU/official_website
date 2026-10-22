from typing import Optional

from fastapi import APIRouter, Depends, Form, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession

from src.api.v1.services.uploud_img import save_file
from src.base.db import get_db
from src.models import User, Carousel
from src.ordering import next_order
from src.security import get_current_user, has_access

router = APIRouter()


@router.post('/add_carousel')
@has_access(roles=['admin'])
async def add_carousel(
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
    photo_path = await save_file(photo) if photo else None
    if order is None:
        order = await next_order(db, Carousel)

    new_carousel = Carousel(
        title_uz=title_uz,
        title_ru=title_ru,
        title_en=title_en,
        subtitle_uz=subtitle_uz,
        subtitle_ru=subtitle_ru,
        subtitle_en=subtitle_en,
        description_uz=description_uz,
        description_ru=description_ru,
        description_en=description_en,
        text_uz=text_uz,
        text_ru=text_ru,
        text_en=text_en,
        link=link or None,
        photo=photo_path,
        order=order,
    )
    db.add(new_carousel)
    await db.commit()
    await db.refresh(new_carousel)
    return {"message": "Karusel muvaffaqiyatli yaratildi"}
