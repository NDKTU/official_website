from fastapi import APIRouter

news_router = APIRouter(prefix='/news', tags=['News'])

from src.api.v1.news.add import router as add_router

news_router.include_router(add_router)
