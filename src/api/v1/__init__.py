from fastapi import APIRouter
from .category import category_router
from .faculty import faculty_router
from .user import user_router
from .department import department_router
from .page import page_router
from .services import upload_router
from .news import news_router
from .department_page import department_page_router
from .faculty_page import faculty_page_router
from .apply import apply_router

api_v1_router = APIRouter(prefix='/v1')


api_v1_router.include_router(category_router)
api_v1_router.include_router(faculty_router)
api_v1_router.include_router(user_router)
api_v1_router.include_router(department_router)
api_v1_router.include_router(page_router)
api_v1_router.include_router(upload_router)
api_v1_router.include_router(news_router)
api_v1_router.include_router(department_page_router)
api_v1_router.include_router(faculty_page_router)
api_v1_router.include_router(apply_router)