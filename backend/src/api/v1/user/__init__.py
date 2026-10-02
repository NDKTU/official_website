from fastapi import APIRouter


user_router = APIRouter(prefix='/user', tags=['User'])


from src.api.v1.user.register import router as add_user_router
from src.api.v1.user.login import router as login_user_router
from src.api.v1.user.logout import router as logout_user_router
from src.api.v1.user.refresh import router as refresh_user_router
user_router.include_router(add_user_router)
user_router.include_router(login_user_router)
user_router.include_router(logout_user_router)
user_router.include_router(refresh_user_router)
