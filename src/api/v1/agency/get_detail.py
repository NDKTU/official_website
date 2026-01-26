from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select


from src.base.db import get_db
from src.models.user import User
from src.models.agency import Agency
from src.security import get_current_user

router = APIRouter()


@router.get("/agency/{agency_id}")
async def get_agency( 
    agency_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db) 
):
    query = select(Agency).where(Agency.id == agency_id)
    result = await db.execute(query)
    agency = result.scalar_one_or_none()
    
    if not agency:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Agency not found"
        )
        
    return agency