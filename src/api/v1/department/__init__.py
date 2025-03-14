from fastapi import APIRouter


department_router = APIRouter(prefix='/department', tags=['Department'])


from src.api.v1.department.add import router as add_department_router
from src.api.v1.department.get_all import router as get_all_department
from src.api.v1.department.get_detail import router as get_detail_router
from src.api.v1.department.delete import router as delete_router
from src.api.v1.department.update import router as update_router


department_router.include_router(add_department_router)
department_router.include_router(get_all_department)
department_router.include_router(get_detail_router)
department_router.include_router(delete_router)
department_router.include_router(update_router)