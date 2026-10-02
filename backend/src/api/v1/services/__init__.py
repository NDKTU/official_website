from fastapi import APIRouter


upload_router = APIRouter(tags=['Upload'])


from src.api.v1.services.upload_flie import router as upload_file_router


upload_router.include_router(upload_file_router)