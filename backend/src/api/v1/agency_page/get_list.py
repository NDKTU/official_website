from fastapi import APIRouter, Depends, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from src.base.db import get_db
from src.models.agency_page import AgencyPage

router = APIRouter()

@router.get("/")
async def get_list(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: AsyncSession = Depends(get_db)
):
    offset_value = (page - 1) * limit

    stmt = (
        select(AgencyPage)
        .order_by(AgencyPage.id.desc())
        .limit(limit)
        .offset(offset_value)
    )

    result = await db.execute(stmt)
    return result.scalars().all()
