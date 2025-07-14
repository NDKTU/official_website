
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.base.db import get_db
from src.models import User , FacultyPage
from src.schemas.faculty_page import FacultyPageCreateRequest 
from src.security import get_current_user

router = APIRouter()


@router.put("/update_page/{faculty_page_id}")
# @has_access(roles=['admin'])
async def update_page(
    faculty_page_id: int,
    faculty_page_data: FacultyPageCreateRequest,
    _: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
    ):
    
    result = await db.execute(select(FacultyPage).where(faculty_page_id == FacultyPage.id))
    page: FacultyPage = result.scalars().one_or_none()

    if page is None:
        raise HTTPException(status_code=404, detail="Page topilmadi")

    page.name_uz = faculty_page_data.name_uz
    page.name_ru = faculty_page_data.name_ru
    page.name_en = faculty_page_data.name_en
    page.title_uz = faculty_page_data.title_uz
    page.title_ru = faculty_page_data.title_ru
    page.title_en = faculty_page_data.title_en
    page.text_uz = faculty_page_data.text_uz
    page.text_ru = faculty_page_data.text_ru
    page.text_en = faculty_page_data.text_en
    page.time = faculty_page_data.time
    page.faculty_id = faculty_page_data.faculty_id
    await db.commit()
    await db.refresh(page)
    return {"message": "Page muvaffaqiyatli yangilandi"}
