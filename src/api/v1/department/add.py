from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.base.db import get_db
from src.models import  User, Department
from src.schemas.department import DepartmentCreateRequest
from src.security import get_current_user, has_access

router = APIRouter()


@router.post('/add_department')
@has_access(roles=['admin'])
async def add_category(create_department: DepartmentCreateRequest,
                       current_user: User = Depends(get_current_user),
                       db: AsyncSession = Depends(get_db)):
    new_department = Department(
        name_uz=create_department.name_uz,
        name_ru=create_department.name_ru,
        name_en=create_department.name_en,
        faculty_id=create_department.faculty_id
    )
    db.add(new_department)
    await db.commit()
    await db.refresh(new_department)
    return {"message": "Department muvaffaqiyatli yaratildi"}
