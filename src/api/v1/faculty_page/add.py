from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.base.db import get_db
from src.models import User,  FacultyPage
from src.schemas.faculty_page import FacultyPageCreateRequest
from src.security import get_current_user, has_access

router = APIRouter()


@router.post('/add_faculty_page')
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

    new_faculty_page = FacultyPage(
        name_uz=create_faculty_page.name_uz,
        name_ru=create_faculty_page.name_ru,
        name_en=create_faculty_page.name_en,
        title_uz=create_faculty_page.title_uz,
        title_ru=create_faculty_page.title_ru,
        title_en=create_faculty_page.title_en,
        text_uz=create_faculty_page.text_uz,
        text_ru=create_faculty_page.text_ru,
        text_en=create_faculty_page.text_en,
        time=create_faculty_page.time,
        faculty_id=create_faculty_page.faculty_id
    )
    
    db.add(new_faculty_page)
    await db.commit()
    await db.refresh(new_faculty_page)
    return {"message": "Fakultet Page muvaffaqiyatli yaratildi"}
