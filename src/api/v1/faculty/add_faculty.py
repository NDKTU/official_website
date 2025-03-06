import os
import shutil
from uuid import uuid4
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from src.base.db import get_db
from src.models import Faculty
from src.schemas.faculty import FacultyCreateRequest
from src.api.v1.services.uploud_img import save_file
router = APIRouter()




@router.post('/add_faculty')
async def add_faculty(
        # create_faculty: FacultyCreateRequest=None,
        name_uz: str = None,
        name_ru: str = None,
        name_en: str = None,
        file: UploadFile = File(None),
        db: AsyncSession = Depends(get_db)):
    try:
        # image_path = await save_uploaded_img(file)
        new_faculty = Faculty(
            name_uz=name_uz,
            name_ru=name_ru,
            name_en=name_en,
            faculty_icon=await save_file(file)
            # faculty_icon="ewdewdew"
        )
        # new_faculty.faculty_icon=str(image_path)
        db.add(new_faculty)
        await db.commit()
        await db.refresh(new_faculty)
        return {"message": "Facultet muvaffaqiyatli yaratildi"}
    except Exception as e:
        return {"Yuklashda xatolik"}
