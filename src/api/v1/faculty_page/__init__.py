from fastapi import APIRouter

from src.api.v1.faculty_page.add import router as add_router
from src.api.v1.faculty_page.get_all import router as get_all_router
from src.api.v1.faculty_page.get_detail import router as get_detail_router
from src.api.v1.faculty_page.delete import router as delete_router
from src.api.v1.faculty_page.update import router as update_router


faculty_page_router = APIRouter(prefix='/faculty_page', tags=['Faculty Page'])



faculty_page_router.include_router(add_router)
faculty_page_router.include_router(get_all_router)
faculty_page_router.include_router(get_detail_router)
faculty_page_router.include_router(delete_router)
faculty_page_router.include_router(update_router)

