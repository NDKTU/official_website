from fastapi import APIRouter

from src.api.v1.department_page.add import router as add_router
from src.api.v1.department_page.get_all import router as get_all_router
from src.api.v1.department_page.get_detail import router as get_detail_router
from src.api.v1.department_page.delete import router as delete_router
from src.api.v1.department_page.update import router as update_router

department_page_router = APIRouter(prefix='/department_page', tags=['Department Page'])

department_page_router.include_router(add_router)
department_page_router.include_router(get_all_router)
department_page_router.include_router(get_detail_router)
department_page_router.include_router(delete_router)
department_page_router.include_router(update_router)

