from fastapi import APIRouter


agency_router = APIRouter(prefix="/agency", tags=["Bo'lim"])


from src.api.v1.agency.add import router as agency_add_roter
from src.api.v1.agency.get_list import router as agency_get_list
from src.api.v1.agency.get_detail import router as agency_get_detail
from src.api.v1.agency.update import router as agency_update
from src.api.v1.agency.delete import router as agency_delete

agency_router.include_router(agency_add_roter)
agency_router.include_router(agency_get_list)
agency_router.include_router(agency_get_detail)
agency_router.include_router(agency_update)
agency_router.include_router(agency_delete)

