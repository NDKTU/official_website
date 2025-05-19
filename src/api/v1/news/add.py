from datetime import datetime, timezone

from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Form, UploadFile, File
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.api.v1.services.uploud_img import save_file
from src.base.db import get_db
from src.models import User, Department, Page, News
from src.schemas.department import DepartmentCreateRequest
from src.schemas.news import NewsCreateRequest
from src.schemas.page import PageCreateRequest
from src.security import get_current_user, has_access

router = APIRouter()


@router.post('/add_new')
@has_access(roles=['admin'])
async def add_page(
        title_uz: str = Form(...),
        title_ru: str = Form(...),
        title_en: str = Form(...),
        text_uz: str = Form(...),
        text_ru: str = Form(...),
        text_en: str = Form(...),
        photo: UploadFile = File(None),
        current_user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)):
    photo_path = await save_file(photo) if photo else None
    time_parsed = datetime.now(timezone.utc)
    new_news = News(
        title_uz=title_uz,
        title_ru=title_ru,
        title_en=title_en,
        photo=photo_path,
        text_uz=text_uz,
        text_ru=text_ru,
        text_en=text_en,
        time=time_parsed,
    )
    db.add(new_news)
    await db.commit()
    await db.refresh(new_news)
    return {"message": "Yangilik muvaffaqiyatli yaratildi"}
