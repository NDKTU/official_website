from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from src.base.db import get_db
from src.models.user import User
from src.models.agency_page import AgencyPage
from src.security import get_current_user, has_access

router = APIRouter()

@router.delete("/{agency_page_id}")
@has_access(roles=['admin'])
async def delete_agency_page(
    agency_page_id: int,
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

    await db.delete(agency_page)
    await db.commit()

    return {"message": "Agency Page deleted successfully"}
