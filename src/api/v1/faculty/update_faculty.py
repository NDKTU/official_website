from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.api.v1.services.uploud_img import save_file
from src.base.db import get_db
from src.models import  User, Faculty
from src.security import has_access, get_current_user

router = APIRouter()
@router.put("/update_faculty/{faculty_id}")
@has_access(roles=['admin'])
async def update_faculty(faculty_id: int,
                      name_uz: str = None,
                      name_ru: str = None,
                      name_en: str = None,
                      file: UploadFile = File(None),
                      current_user: User = Depends(get_current_user),
                      db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Faculty).where(faculty_id == Faculty.id))
    faculty: Faculty = result.scalars().one_or_none()

    if faculty is None:
        raise HTTPException(status_code=404, detail="Fakultet topilmadi")

    try:
        faculty.name_uz = name_uz
        faculty.name_ru = name_ru
        faculty.name_en = name_en
        if file:
            faculty.faculty_icon = await save_file(file)

        await db.commit()
        await db.refresh(faculty)

        return {"message": "Fakultet muvaffaqiyatli yangilandi"}
    except Exception as e:
        return {"Yuklashda xatolik"}
