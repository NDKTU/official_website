
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.base.db import get_db
from src.models import  User, DepartmentPage
from src.security import has_access, get_current_user

router = APIRouter()

@router.delete('/delete_page/{department_page_id}')
@has_access(roles=['admin'])
async def delete_page(
    department_page_id: int,
        current_user : User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(DepartmentPage).where(department_page_id == DepartmentPage.id))
    page = result.scalars().one_or_none()
    if page is None:
        raise HTTPException(status_code=404, detail="Bunaqa page mavjud emas")
    await db.delete(page)
    await db.commit()

    return dict(
        message=f"{page.name_uz}  o'chirildi",
    )
