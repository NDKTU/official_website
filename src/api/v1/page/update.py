
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.base.db import get_db
from src.models import User, Page
from src.schemas.page import PageCreateRequest
from src.security import has_access, get_current_user

router = APIRouter()


@router.put("/update_page/{page_id}")
@has_access(roles=['admin'])
async def update_page(page_id: int,
                      page_data: PageCreateRequest,
                      current_user: User = Depends(get_current_user),
                      db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Page).where(page_id == Page.id))
    page: Page = result.scalars().one_or_none()

    if page is None:
        raise HTTPException(status_code=404, detail="Page topilmadi")

    page.name_uz = page_data.name_uz
    page.name_ru = page_data.name_ru
    page.name_en = page_data.name_en
    page.title_uz = page_data.title_uz
    page.title_ru = page_data.title_ru
    page.title_en = page_data.title_en
    page.text_uz = page_data.text_uz
    page.text_ru = page_data.text_ru
    page.text_en = page_data.text_en
    page.time = page_data.time
    page.category_id = page_data.category_id
    await db.commit()
    await db.refresh(page)
    return {"message": "Page muvaffaqiyatli yangilandi"}