from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select

from sqlalchemy.ext.asyncio import AsyncSession

from src.base.db import get_db
from src.models import User, News
from src.security import get_current_user

router = APIRouter()


@router.delete('/delete_new/{new_id}')
async def delete_new(new_id: int, db: AsyncSession = Depends(get_db),
                     current_user: User = Depends(get_current_user)):
    result = await db.execute(select(News).where(new_id == News.id))
    new = result.scalars().one_or_none()
    if new is None:
        raise HTTPException(status_code=404, detail="Bunaqa yangilik mavjud emas")
    await db.delete(new)
    await db.commit()

    return dict(
        message=f"{new.title_uz}  o'chirildi",
    )
