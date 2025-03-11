from fastapi import APIRouter


user_router = APIRouter(prefix='/user', tags=['User'])


from src.api.v1.user.register import router as add_user_router

user_router.include_router(add_user_router)
