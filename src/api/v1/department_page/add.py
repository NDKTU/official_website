from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.base.db import get_db
from src.models import User,  DepartmentPage
from src.schemas.department_page import DepartmentPageCreateRequest
from src.security import get_current_user, has_access

router = APIRouter()


@router.post('/add_page')
@has_access(roles=['admin'])
async def add_page(
    create_department_page: DepartmentPageCreateRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
    ):
    result = await db.execute(select(DepartmentPage).where(create_department_page.name_uz == DepartmentPage.name_uz))
    page = result.scalars().one_or_none()

    # if page:
    #     raise HTTPException(status_code=404, detail="Bunaqa page mavjud")

    new_page = DepartmentPage(**create_department_page.model_dump())
    
    db.add(new_page)
    await db.commit()
    await db.refresh(new_page)
    return {"message": "Page muvaffaqiyatli yaratildi"}
