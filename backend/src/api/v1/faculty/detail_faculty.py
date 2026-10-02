from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.base.db import get_db
from src.models import Faculty


router = APIRouter()


@router.get('/faculty_detail/{faculty_id}')
async def category_detail(
    faculty_id: int,
    db: AsyncSession = Depends(get_db)
    ):
    result = await db.execute(select(Faculty).where(faculty_id == Faculty.id))
    faculty = result.scalars().one_or_none()
    return faculty
