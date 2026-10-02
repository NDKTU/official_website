
from fastapi import APIRouter


apply_router = APIRouter(prefix='/apply', tags=['Apply'])


from src.api.v1.apply.add_apply import router as add_apply_router


apply_router.include_router(add_apply_router)
