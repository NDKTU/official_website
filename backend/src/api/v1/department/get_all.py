from fastapi import APIRouter, Depends, Response
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.base.db import get_db
from src.models import  Department, Faculty
from src.pagination import Pagination, paginate


router = APIRouter()


@router.get('/get_departments')
async def get_department(pagination: Pagination = Depends(),
                         response: Response = None,
                         db: AsyncSession = Depends(get_db)):
    query = (
        select(Department.id.label('department_id'),
               Department.name_uz.label('name_uz'),
               Department.name_ru.label('name_ru'),
               Department.name_en.label('name_en'),
               Faculty.name_uz.label('faculty_name_uz'),
               ).join(Faculty)
        .order_by(Department.id)
    )
    stmt = await db.execute(await paginate(db, query, pagination, response))

    results = stmt.fetchall()

    return [
        dict(
            department_id=item.department_id,
            department_name_uz=item.name_uz,
            department_name_ru=item.name_ru,
            department_name_en=item.name_en,
            faculty_name_uz=item.faculty_name_uz
        )
        for item in results
    ]
