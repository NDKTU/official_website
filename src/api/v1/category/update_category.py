
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.base.db import get_db
from src.models import Category, User
from src.schemas.category import CategoryCreateRequest
from src.security import has_access, get_current_user

router = APIRouter()


@router.put("/update_category/{category_id}")
@has_access(roles=['admin'])
async def update_category(category_id: int,
                      category_data: CategoryCreateRequest,
                      current_user: User = Depends(get_current_user),
                      db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Category).where(category_id == Category.id))
    category: Category = result.scalars().one_or_none()

    if category is None:
        raise HTTPException(status_code=404, detail="Kitob topilmadi")

    category.name_uz = category_data.name_uz
    category.name_ru = category_data.name_ru
    category.name_en = category_data.name_en


    await db.commit()
    await db.refresh(category)

    return {"message": "Kategory muvaffaqiyatli yangilandi"}