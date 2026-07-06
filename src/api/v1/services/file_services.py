import os
from uuid import uuid4
from fastapi import UploadFile, HTTPException
from pathlib import Path

UPLOAD_DIR = "upload_files/"
os.makedirs(UPLOAD_DIR, exist_ok=True)

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".pdf"}
ALLOWED_CONTENT_TYPES = {
    "image/jpeg", "image/png", "image/gif", "image/webp", "application/pdf",
}
MAX_UPLOAD_SIZE = 10 * 1024 * 1024  # 10MB
CHUNK_SIZE = 1024 * 1024  # 1MB


async def save_file_upload(file: UploadFile) -> str:
    if not file or not file.filename:
        raise HTTPException(status_code=400, detail="Fayl yuborilmadi")

    extension = Path(file.filename).suffix.lower()
    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Ruxsat etilmagan fayl turi")

    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(status_code=400, detail="Ruxsat etilmagan fayl turi")

    safe_name = os.path.basename(file.filename)
    filename = f"{uuid4()}_{safe_name}"
    filepath = os.path.join(UPLOAD_DIR, filename)

    total_size = 0
    with open(filepath, "wb") as buffer:
        while chunk := await file.read(CHUNK_SIZE):
            total_size += len(chunk)
            if total_size > MAX_UPLOAD_SIZE:
                buffer.close()
                os.remove(filepath)
                raise HTTPException(status_code=413, detail="Fayl hajmi juda katta")
            buffer.write(chunk)

    return filepath
