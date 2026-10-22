from fastapi import APIRouter

from src.api.v1.carousel.add import router as add_router
from src.api.v1.carousel.get_all import router as get_all_router
from src.api.v1.carousel.get_detail import router as get_detail_router
from src.api.v1.carousel.delete import router as delete_router
from src.api.v1.carousel.update import router as update_router

carousel_router = APIRouter(prefix='/carousel', tags=['Carousel'])


carousel_router.include_router(add_router)
carousel_router.include_router(get_all_router)
carousel_router.include_router(get_detail_router)
carousel_router.include_router(delete_router)
carousel_router.include_router(update_router)
