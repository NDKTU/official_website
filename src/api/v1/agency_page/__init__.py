from fastapi import APIRouter


agency_page_router = APIRouter(prefix="/agency_page", tags=["Agency Page"])


from src.api.v1.agency_page.add import router as agency_page_add_router
from src.api.v1.agency_page.get_list import router as agency_page_get_list
from src.api.v1.agency_page.get_detail import router as agency_page_get_detail
from src.api.v1.agency_page.update import router as agency_page_update
from src.api.v1.agency_page.delete import router as agency_page_delete

agency_page_router.include_router(agency_page_add_router)
agency_page_router.include_router(agency_page_get_list)
agency_page_router.include_router(agency_page_get_detail)
agency_page_router.include_router(agency_page_update)
agency_page_router.include_router(agency_page_delete)
