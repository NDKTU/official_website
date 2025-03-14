from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.base.db import get_db
from src.models import Category, User
from src.security import has_access, get_current_user

router = APIRouter()


@router.get('/category_detail/{category_id}')
async def category_detail(category_id: int,
                          db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Category).where(category_id == Category.id))
    category = result.scalars().one_or_none()
    return category
