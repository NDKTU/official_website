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
async def upload_file_func(
        file: UploadFile = File(...),
        db: AsyncSession = Depends(get_db)):

    try:
        file_path = await save_file_upload(file)
        new_file = Uploads(upload_file=file_path)
        db.add(new_file)
        await db.commit()
        await db.refresh(new_file)

        file_url = f"{os.getenv('URL')}/{file_path}"
        return JSONResponse(content={"file_url": file_url}, status_code=200)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Yuklashda xatolik: {e}")
