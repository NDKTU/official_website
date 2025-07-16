from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.base.db import get_db
from src.models import User,  FacultyPage
from src.schemas.faculty_page import FacultyPageCreateRequest
from src.security import get_current_user, has_access

router = APIRouter()


@router.post('/add_page')
@has_access(roles=['admin'])
async def add_page(
    create_faculty_page: FacultyPageCreateRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
    ):
    result = await db.execute(select(FacultyPage).where(create_faculty_page.name_uz == FacultyPage.name_uz))
    page = result.scalars().one_or_none()

    if page:
        raise HTTPException(status_code=404, detail="Bunaqa page mavjud")

    new_page = FacultyPage(**create_faculty_page.model_dump())
    
    db.add(new_page)
    await db.commit()
    await db.refresh(new_page)
    return {"message": "Page muvaffaqiyatli yaratildi"}
