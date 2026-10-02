
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.base.db import get_db
from src.models import  User, Department
from src.security import has_access, get_current_user

router = APIRouter()

@router.delete('/delete_department/{department_id}')
@has_access(roles=['admin'])
async def delete_department(
    department_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
    ):
    
    # if current_user is None:
    #     raise UnRegisteredException

    result = await db.execute(select(Department).where(department_id == Department.id))
    department = result.scalars().one_or_none()
    if department is None:
        raise HTTPException(status_code=404, detail="Bunaqa Kafedra mavjud emas")
    await db.delete(department)
    await db.commit()

    return dict(
        message=f"{department.name_uz}  o'chirildi",
    )
