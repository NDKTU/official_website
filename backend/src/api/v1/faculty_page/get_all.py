from fastapi import APIRouter, Depends
from sqlalchemy import select, Result
from sqlalchemy.orm import joinedload
from sqlalchemy.ext.asyncio import AsyncSession

from src.base.db import get_db
from src.models import FacultyPage, Faculty

router = APIRouter()


@router.get('/{faculty_id}/pages')
async def get_faculty_pages(faculty_id: int, db: AsyncSession = Depends(get_db)):
    stmt = (
        select(FacultyPage.id.label('id'),
               FacultyPage.name_uz.label('name_uz'),
               FacultyPage.name_ru.label('name_ru'),
               FacultyPage.name_en.label('name_en'),
               FacultyPage.title_uz.label('title_uz'),
               FacultyPage.title_ru.label('title_ru'),
               FacultyPage.title_en.label('title_en'),
               FacultyPage.text_uz.label('text_uz'),
               FacultyPage.text_ru.label('text_ru'),
               FacultyPage.text_en.label('text_en'),
               FacultyPage.time.label('time'),
               Faculty.name_uz.label('faculty_name_uz'),
               Faculty.id.label('faculty_id'),
               ).outerjoin(Faculty)
        .where(faculty_id==FacultyPage.faculty_id)
    )
    result = await db.execute(stmt)
    rows = result.mappings().all()   # 🔑 bu yerda RowMapping qaytadi
    return [dict(row) for row in rows]



@router.get('/get_all_pages')
async def get_all_pages(
        # faculty_id: int,
        db: AsyncSession = Depends(get_db)
):
    stmt = await db.execute(
        select(FacultyPage.id.label('id'),
               FacultyPage.name_uz.label('name_uz'),
               FacultyPage.name_ru.label('name_ru'),
               FacultyPage.name_en.label('name_en'),
               FacultyPage.title_uz.label('title_uz'),
               FacultyPage.title_ru.label('title_ru'),
               FacultyPage.title_en.label('title_en'),
               FacultyPage.text_uz.label('text_uz'),
               FacultyPage.text_ru.label('text_ru'),
               FacultyPage.text_en.label('text_en'),
               FacultyPage.time.label('time'),
               Faculty.name_uz.label('faculty_name_uz'),
               Faculty.id.label('faculty_id'),
               ).outerjoin(Faculty)
    )

    results = stmt.fetchall()

    return [
        dict(
            id=item.id,
            page_name_uz=item.name_uz,
            page_name_ru=item.name_ru,
            page_name_en=item.name_en,
            page_title_uz=item.title_uz,
            page_title_ru=item.title_ru,
            page_title_en=item.title_en,
            page_text_uz=item.text_uz,
            page_text_ru=item.text_ru,
            page_text_en=item.text_en,
            page_time=item.time,
            faculty_name_uz=item.faculty_name_uz,
            faculty_id=item.faculty_id
            # category_name_uz=item.category_name_uz
        )
        for item in results
    ]





    # stmt = select(FacultyPage).options(
    #     joinedload(FacultyPage.faculty)
    # )
    # result: Result = await db.execute(stmt)
    # page_data = result.scalars().all()
    # return page_data
