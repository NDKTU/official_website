from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime, timezone
from src.base.db import get_db
from src.models import  Apply
from src.schemas.apply import ApplyCreateRequest
from src.schemas.category import CategoryCreateRequest
from src.security import get_current_user, has_access

router = APIRouter()


@router.post('/add_category')
# @has_access(roles=['admin'])
async def add_category(create_apply: ApplyCreateRequest,
                       # current_user: User = Depends(get_current_user),
                       db: AsyncSession = Depends(get_db)):
    time_parsed = datetime.now(timezone.utc)
    new_apply = Apply(
        fio=create_apply.fio,
        phone=create_apply.phone,
        comment=create_apply.comment,
        time=time_parsed,
    )
    db.add(new_apply)
    await db.commit()
    await db.refresh(new_apply)
    return {"message": "Ariza muvaffaqiyatli yaratildi"}
