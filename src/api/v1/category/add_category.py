from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.base.db import get_db
from src.models import Category, User
from src.schemas.category import CategoryCreateRequest
from src.security import get_current_user, has_access

router = APIRouter()


@router.post('/add_category')
@has_access(roles=['admin'])
async def add_category(create_category: CategoryCreateRequest,
                       current_user: User = Depends(get_current_user),
                       db: AsyncSession = Depends(get_db)):
    new_category = Category(
        name_uz=create_category.name_uz,
        name_ru=create_category.name_ru,
        name_en=create_category.name_en,
    )
    db.add(new_category)
    await db.commit()
    await db.refresh(new_category)
    return {"message": "Kategoriya muvaffaqiyatli yaratildi"}
