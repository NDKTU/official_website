from typing import Optional

from fastapi import Query, Response
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession


class Pagination:
    def __init__(
        self,
        page: int = Query(1, ge=1),
        limit: Optional[int] = Query(None, ge=1, le=100),
    ):
        self.page = page
        self.limit = limit


async def paginate(db: AsyncSession, stmt, pagination: Pagination, response: Response):
    # limit berilmasa hammasi qaytadi: sayt va select'lar eski holicha ishlaydi
    if pagination.limit is None:
        return stmt

    total = await db.scalar(
        select(func.count()).select_from(stmt.order_by(None).subquery())
    )
    response.headers['X-Total-Count'] = str(total)

    return stmt.limit(pagination.limit).offset((pagination.page - 1) * pagination.limit)
