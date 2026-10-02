
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.base.db import get_db
from src.models import Category, User, Department
from src.schemas.category import CategoryCreateRequest
from src.schemas.department import DepartmentCreateRequest
from src.security import has_access, get_current_user

router = APIRouter()


@router.put("/update_department/{department_id}")
@has_access(roles=['admin'])
async def update_department(department_id: int,
                      department_data: DepartmentCreateRequest,
                      current_user: User = Depends(get_current_user),
                      db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Department).where(department_id == Department.id))
    department: Department = result.scalars().one_or_none()

    if department is None:
        raise HTTPException(status_code=404, detail="Kitob topilmadi")

    department.name_uz = department_data.name_uz
    department.name_ru = department_data.name_ru
    department.name_en = department_data.name_en
    department.faculty_id = department_data.faculty_id
    await db.commit()
    await db.refresh(department)
    return {"message": "Kafedra muvaffaqiyatli yangilandi"}