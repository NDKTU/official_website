from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.base.db import get_db
from src.models import Department, Page

router = APIRouter()


@router.get('/page_detail/{page_id}')
async def department_detail(page_id: int,
                          db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Page).where(page_id == Page.id))
    page = result.scalars().one_or_none()
    return page
