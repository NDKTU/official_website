from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.base.db import get_db
from src.schemas.agency import AgencyCreateRequest
from src.models.user import User
from src.models.agency import Agency


from src.security import get_current_user, has_access

router = APIRouter()


@router.post("/add_agency")
@has_access(roles=['admin'])
async def add_agency(
    create_agency: AgencyCreateRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db) 
):
    new_agency = Agency(
        faculty_id=create_agency.faculty_id,
        name_en=create_agency.name_en,
        name_ru=create_agency.name_ru,
        name_uz=create_agency.name_uz
    )
    

    db.add(new_agency)
    

    await db.commit()
    await db.refresh(new_agency)
    
    return {"message": "Agency muvaffaqiyatli yaratildi", "id": new_agency.id}