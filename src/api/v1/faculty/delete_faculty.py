
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.base.db import get_db
from src.models import  User, Faculty
from src.security import has_access, get_current_user

router = APIRouter()

@router.delete('/delete_faculty/{faculty_id}')
@has_access(roles=['admin'])
async def delete_faculty(faculty_id: int,
                      current_user: User = Depends(get_current_user),
                      db: AsyncSession = Depends(get_db)):
    # if current_user is None:
    #     raise UnRegisteredException

    result = await db.execute(select(Faculty).where(faculty_id == Faculty.id))
    faculty = result.scalars().one_or_none()
    if faculty is None:
        raise HTTPException(status_code=404, detail="Bunaqa Kategoriya mavjud emas")
    await db.delete(faculty)
    await db.commit()

    return dict(
        message=f"{faculty.name_uz}  o'chirildi",
    )
