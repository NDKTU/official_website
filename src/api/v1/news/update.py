from fastapi import APIRouter, Depends, HTTPException, Form, UploadFile, File
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.api.v1.services.uploud_img import save_file
from src.base.db import get_db
from src.models import User, News

from src.security import get_current_user

router = APIRouter()


@router.put('/update_new/{new_id}')
async def update_news(
    new_id: int,
    title_uz: str = Form(...),
    title_ru: str = Form(...),
    title_en: str = Form(...),
    text_uz: str = Form(...),
    text_ru: str = Form(...),
    text_en: str = Form(...),
    photo: UploadFile = File(None),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
                      ):
    result = await db.execute(select(News).where(new_id == News.id))
    new = result.scalars().one_or_none()
    if new is None:
        raise HTTPException(status_code=404, detail="Bunaqa yangilik mavjud emas")


    try:
        if photo:
            photo_path = await save_file(photo)
            new.photo = photo_path

        new.title_uz = title_uz
        new.title_ru = title_ru
        new.title_en = title_en
        new.text_uz = text_uz
        new.text_ru = text_ru
        new.text_en = text_en
        await db.commit()
        await db.refresh(new)
        return {"message": "Yangilik muvaffaqiyatli yangilandi"}
    except Exception:
        return {"Yuklashda xatolik"}
