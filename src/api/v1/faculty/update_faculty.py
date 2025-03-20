from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.api.v1.services.uploud_img import save_file
from src.base.db import get_db
from src.models import User, Faculty
from src.security import has_access, get_current_user

router = APIRouter()


@router.put("/update_faculty/{faculty_id}")
@has_access(roles=['admin'])
async def update_faculty(faculty_id: int,
                         name_uz: str = Form(...),
                         name_ru: str = Form(...),
                         name_en: str = Form(...),
                         faculty_icon: UploadFile = File(None),
                         # faculty_file: UploadFile = File(None),
                         current_user: User = Depends(get_current_user),
                         db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Faculty).where(faculty_id == Faculty.id))
    faculty: Faculty = result.scalars().one_or_none()

    if faculty is None:
        raise HTTPException(status_code=404, detail="Fakultet topilmadi")

    try:
        # icon_path = await save_file(faculty_icon) if faculty_icon else None
        if faculty_icon:
            icon_path = await save_file(faculty_icon)
            faculty.faculty_icon = icon_path
        faculty.name_uz = name_uz
        faculty.name_ru = name_ru
        faculty.name_en = name_en


        await db.commit()
        await db.refresh(faculty)

        return {"message": "Fakultet muvaffaqiyatli yangilandi"}
    except Exception as e:
        return {"Yuklashda xatolik"}
