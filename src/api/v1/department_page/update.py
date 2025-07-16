
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.base.db import get_db
from src.models import User , DepartmentPage
from src.schemas.department_page import DepartmentPageCreateRequest
from src.security import get_current_user

router = APIRouter()


@router.put("/update_page/{department_page_id}")
# @has_access(roles=['admin'])
async def update_page(
    department_page_id: int,
    department_page_data: DepartmentPageCreateRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
    ):
    
    result = await db.execute(select(DepartmentPage).where(department_page_id == DepartmentPage.id))
    page: DepartmentPage = result.scalars().one_or_none()

    if page is None:
        raise HTTPException(status_code=404, detail="Page topilmadi")

    page.name_uz = department_page_data.name_uz
    page.name_ru = department_page_data.name_ru
    page.name_en = department_page_data.name_en
    page.title_uz = department_page_data.title_uz
    page.title_ru = department_page_data.title_ru
    page.title_en = department_page_data.title_en
    page.text_uz = department_page_data.text_uz
    page.text_ru = department_page_data.text_ru
    page.text_en = department_page_data.text_en
    page.time = department_page_data.time
    page.department_id = department_page_data.department_id
    await db.commit()
    await db.refresh(page)
    return {"message": "Page muvaffaqiyatli yangilandi"}
