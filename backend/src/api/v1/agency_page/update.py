from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from src.base.db import get_db
from src.models.user import User
from src.models.agency_page import AgencyPage
from src.security import get_current_user, has_access
from src.schemas.agency_page import AgencyUpdateRequest

router = APIRouter()

@router.put("/{agency_page_id}")
@has_access(roles=['admin'])
async def update_agency_page(
    agency_page_id: int,
    update_data: AgencyUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    query = select(AgencyPage).where(AgencyPage.id == agency_page_id)
    result = await db.execute(query)
    agency_page = result.scalar_one_or_none()

    if not agency_page:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail="Agency Page not found"
        )

    for key, value in update_data.model_dump(exclude_unset=True).items():
        setattr(agency_page, key, value)

    await db.commit()
    await db.refresh(agency_page)
    
    return agency_page
