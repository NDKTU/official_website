from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.base.db import get_db
from src.models import Category, User
from src.security import get_current_user, has_access

router = APIRouter()


@router.get('/get_categories')
async def get_category(db: AsyncSession = Depends(get_db)):
    stmt = await db.execute(
        select(Category.id.label('category_id'),
               Category.name_uz.label('name_uz'),
               Category.name_ru.label('name_ru'),
               Category.name_en.label('name_en')
               )
    )

    results = stmt.fetchall()

    return [
        dict(
            category_id=item.category_id,
            category_name_uz=item.name_uz,
            category_name_ru=item.name_ru,
            category_name_en=item.name_en,
        )
        for item in results
    ]
