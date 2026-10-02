from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.base.db import get_db
from src.models import Faculty, User
from src.security import get_current_user, has_access

router = APIRouter()


@router.get('/get_faculties')
async def get_category(db: AsyncSession = Depends(get_db)):
    stmt = await db.execute(
        select(Faculty.id.label('faculty_id'),
               Faculty.name_uz.label('name_uz'),
               Faculty.name_ru.label('name_ru'),
               Faculty.name_en.label('name_en'),
               Faculty.faculty_icon.label('faculty_icon')
               )
    )

    results = stmt.fetchall()

    return [
        dict(
            faculty_id=item.faculty_id,
            faculty_name_uz=item.name_uz,
            faculty_name_ru=item.name_ru,
            faculty_name_en=item.name_en,
            faculty_icon=item.faculty_icon,
        )
        for item in results
    ]
