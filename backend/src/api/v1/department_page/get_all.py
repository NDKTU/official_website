from fastapi import APIRouter, Depends, Response
from sqlalchemy import select, Result
from sqlalchemy.orm import joinedload
from sqlalchemy.ext.asyncio import AsyncSession

from src.base.db import get_db
from src.models import DepartmentPage
from src.pagination import Pagination, paginate

router = APIRouter()


@router.get('/get_all_pages')
async def get_all_pages(
    pagination: Pagination = Depends(),
    response: Response = None,
    db: AsyncSession = Depends(get_db)
    ):
    stmt = select(DepartmentPage).order_by(DepartmentPage.id)
    stmt = (await paginate(db, stmt, pagination, response)).options(
        joinedload(DepartmentPage.department)
    )
    result: Result = await db.execute(stmt)
    page_data = result.scalars().all()
    return page_data
