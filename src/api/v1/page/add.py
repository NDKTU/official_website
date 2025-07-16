from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.base.db import get_db
from src.models import User,  Page
from src.schemas.page import PageCreateRequest
from src.security import get_current_user, has_access

router = APIRouter()


@router.post('/add_page')
@has_access(roles=['admin'])
async def add_page(
    create_page: PageCreateRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
    ):
    result = await db.execute(select(Page).where(create_page.name_uz == Page.name_uz))
    page = result.scalars().one_or_none()

    if page:
        raise HTTPException(status_code=404, detail="Bunaqa page mavjud")

    new_page = Page(
        name_uz=create_page.name_uz,
        name_ru=create_page.name_ru,
        name_en=create_page.name_en,
        title_uz=create_page.title_uz,
        title_ru=create_page.title_ru,
        title_en=create_page.title_en,
        text_uz=create_page.text_uz,
        text_ru=create_page.text_ru,
        text_en=create_page.text_en,
        time=create_page.time,
        category_id=create_page.category_id
    )
    db.add(new_page)
    await db.commit()
    await db.refresh(new_page)
    return {"message": "Page muvaffaqiyatli yaratildi"}
