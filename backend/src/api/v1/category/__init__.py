from fastapi import APIRouter


category_router = APIRouter(prefix='/category', tags=['Kategory'])


from src.api.v1.category.add_category import router as add_category_router
from  src.api.v1.category.get_all_category import router as get_all_category_router
from  src.api.v1.category.delete import router as delete_router
from  src.api.v1.category.detail_category import router as detail_category
from  src.api.v1.category.update_category import router as update_category

category_router.include_router(add_category_router)
category_router.include_router(get_all_category_router)
category_router.include_router(delete_router)
category_router.include_router(detail_category)
category_router.include_router(update_category)