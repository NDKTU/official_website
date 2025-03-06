import os
import shutil
from uuid import uuid4
from fastapi import UploadFile, File
from pathlib import Path

UPLOAD_DIR = "uploads/"
os.makedirs(UPLOAD_DIR, exist_ok=True)


async def save_file(file: UploadFile) -> str:
    if file:
        filename = f"{uuid4()}_{file.filename}"
        filepath = os.path.join(UPLOAD_DIR, filename)

        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        return filepath
    return None






# Fayl saqlanadigan katalog


# UPLOAD_DIR = "../../../../src/upload"  # Upload papkasining yo'li

# async def save_uploaded_img(file: UploadFile = File(...)):
#     if not os.path.exists(UPLOAD_DIR):
#         os.makedirs(UPLOAD_DIR)

#     # Faylning yangi nomini yaratish (unique qilish uchun)
#     file_extension = file.filename.split(".")[-1]  # Fayl kengaytmasi (.jpg, .png, .jpeg)
#     unique_filename = f"{uuid.uuid4()}.{file_extension}"
#     file_path = os.path.join(UPLOAD_DIR, unique_filename)

#     # Faylni asinxron tarzda saqlash
#     async with aiofiles.open(file_path, "wb") as out_file:
#         content = await file.read()  # Fayl mazmunini o'qish
#         await out_file.write(content)  # Faylga yozish

#     return file_path