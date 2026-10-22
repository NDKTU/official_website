from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession


async def next_order(db: AsyncSession, model) -> int:
    # tartib raqami berilmasa, yozuv ro'yxat oxiriga qo'shiladi
    result = await db.execute(select(func.coalesce(func.max(model.order), 0)))
    return result.scalar_one() + 1
