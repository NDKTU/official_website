from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from unicodedata import category

from src.base.db import get_db
from src.models import Department, Faculty, Page, Category

router = APIRouter()


@router.get('/get_pages')
async def get_page(db: AsyncSession = Depends(get_db)):
    stmt = await db.execute(
        select(Page.id.label('page_id'),
               Page.name_uz.label('name_uz'),
               Page.name_ru.label('name_ru'),
               Page.name_en.label('name_en'),
               Page.title_uz.label('title_uz'),
               Page.title_ru.label('title_ru'),
               Page.title_en.label('title_en'),
               Page.text_uz.label('text_uz'),
               Page.text_ru.label('text_ru'),
               Page.text_en.label('text_en'),
               Page.time.label('time'),
               Category.name_uz.label('category_name_uz'),
               ).outerjoin(Category)
    )

    results = stmt.fetchall()

    return [
        dict(
            page_id=item.page_id,
            page_name_uz=item.name_uz,
            page_name_ru=item.name_ru,
            page_name_en=item.name_en,
            page_title_uz=item.title_uz,
            page_title_ru=item.title_ru,
            page_title_en=item.title_en,
            page_text_uz=item.text_uz,
            page_text_ru=item.text_ru,
            page_text_en=item.text_en,
            page_time=item.time,
            category_name_uz=item.category_name_uz
            # category_name_uz=item.category_name_uz
        )
        for item in results
    ]
