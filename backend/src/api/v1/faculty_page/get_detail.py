from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.base.db import get_db
from src.models import FacultyPage

router = APIRouter()


@router.get('/page_detail/{faculty_page_id}')
async def department_detail(
    faculty_page_id: int,
    db: AsyncSession = Depends(get_db)
    ):
    result = await db.execute(select(FacultyPage).where(faculty_page_id == FacultyPage.id))
    page = result.scalars().one_or_none()
    return page
