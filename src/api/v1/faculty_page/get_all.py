from fastapi import APIRouter, Depends
from sqlalchemy import select, Result
from sqlalchemy.orm import joinedload
from sqlalchemy.ext.asyncio import AsyncSession

from src.base.db import get_db
from src.models import FacultyPage

router = APIRouter()


@router.get('/get_all_pages')
async def get_all_pages(
    db: AsyncSession = Depends(get_db)
    ):
    stmt = select(FacultyPage).options(
        joinedload(FacultyPage.faculty)
    )
    result: Result = await db.execute(stmt)
    page_data = result.scalars().all()
    return page_data
