import os
import shutil
from uuid import uuid4
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from src.base.db import get_db
from src.models import Faculty, User
from src.schemas.faculty import FacultyCreateRequest
from src.api.v1.services.uploud_img import save_file
from src.security import get_current_user, has_access

router = APIRouter()

@router.post('/add_faculty')
@has_access(roles=['admin'])
async def add_faculty(

        name_uz: str = None,
        name_ru: str = None,
        name_en: str = None,
        file: UploadFile = File(None),
        current_user: User = Depends(get_current_user),
        db: AsyncSession = Depends(get_db)):
    try:

        new_faculty = Faculty(
            name_uz=name_uz,
            name_ru=name_ru,
            name_en=name_en,
            faculty_icon=await save_file(file)

        )

        db.add(new_faculty)
        await db.commit()
        await db.refresh(new_faculty)
        return {"message": "Facultet muvaffaqiyatli yaratildi"}
    except Exception as e:
        return {"Yuklashda xatolik"}
