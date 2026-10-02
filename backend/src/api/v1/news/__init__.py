from fastapi import APIRouter

from src.api.v1.news.add import router as add_router
from src.api.v1.news.get_all import router as get_all_router
from src.api.v1.news.get_detail import router as get_detail_router
from src.api.v1.news.delete import router as delete_router
from src.api.v1.news.update import router as update_router

news_router = APIRouter(prefix='/news', tags=['News'])



news_router.include_router(add_router)
news_router.include_router(get_all_router)
news_router.include_router(get_detail_router)
news_router.include_router(delete_router)
news_router.include_router(update_router)
