from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from src.base.db import get_db
from src.exceptions import AlreadyRegisteredException
from src.models import User
from src.schemas.user import UserCreateRequest, UserCreateResponse

router = APIRouter()


@router.post('/register')
async def register(create_user: UserCreateRequest,
                       db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(create_user.username == User.username))
    user = result.scalars().one_or_none()
    if user:
        raise AlreadyRegisteredException
    new_user = User(
        username=create_user.username,
        password=create_user.password,
        role=create_user.role,
    )
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return {"message": "User muvaffaqiyatli yaratildi"}
