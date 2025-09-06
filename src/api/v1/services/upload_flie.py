from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, Form
from sqlalchemy.ext.asyncio import AsyncSession

from src.api.v1.services.file_services import save_file_upload, UPLOAD_DIR
from src.base.db import get_db
from src.models import User, Uploads
# from src.api.v1.services.uploud_img import save_file
from src.security import get_current_user, has_access
from fastapi.responses import JSONResponse
from fastapi import Request
import os
from dotenv import load_dotenv
router = APIRouter()



@router.post('/upload')
# @has_access(roles=['admin'])
async def upload_file_func(
        #upload_file: UploadFile = File(None),
        # current_user: User = Depends(get_current_user),
        request: Request = None,
        db: AsyncSession = Depends(get_db)):

    form_data = await request.form()
    upload_file = form_data.get("upload_file")
    if not upload_file:
        raise HTTPException(status_code=400, detail="Fayl yuborilmadi")

    try:
        file_path = await save_file_upload(upload_file) if upload_file else None
        new_file = Uploads(
            upload_file=file_path
        )
        db.add(new_file)
        await db.commit()
        await db.refresh(new_file)
        # file_url = f"http://127.0.0.2:8000/{file_path}"
        # file_url = f"http://zaynidinov.uz:51432/{file_path}"
        file_url = f"{os.getenv('URL')}/{file_path}"
        # return {"message": "File muvaffaqiyatli yaratildi"}
        return JSONResponse(content={"file_url": file_url}, status_code=200)
    except Exception as e:
        return {"Yuklashda xatolik"}
