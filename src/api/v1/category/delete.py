
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.base.db import get_db
from src.models import Category
from src.schemas.category import CategoryCreateRequest

router = APIRouter()

@router.delete('/delete_category/{category_id}')
# @has_access(roles=['admin'])
async def delete_category(category_id: int,
                      # current_user: User = Depends(get_current_user),
                      db: AsyncSession = Depends(get_db)):
    # if current_user is None:
    #     raise UnRegisteredException

    result = await db.execute(select(Category).where(category_id == Category.id))
    category = result.scalars().one_or_none()
    if category is None:
        raise HTTPException(status_code=404, detail="Bunaqa Kategoriya mavjud emas")
    await db.delete(category)
    await db.commit()

    return dict(
        message=f"{category.name_uz}  o'chirildi",
    )
