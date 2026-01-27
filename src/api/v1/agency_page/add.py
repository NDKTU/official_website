from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

# Make sure to import these if they aren't already available in this file scope
from src.base.db import get_db
from src.security import get_current_user, has_access 
from src.models.user import User
from src.models.agency_page import AgencyPage
from src.schemas.agency_page import AgencyCreateRequest

router = APIRouter()

@router.post("/add_agency_page")
@has_access(roles=['admin']) # Added for consistency with your first example
async def add_agency_page(
    data: AgencyCreateRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db) 
):
    # Create the new AgencyPage instance
    # We use **data.model_dump() (or .dict() in Pydantic v1) to unpack the schema fields automatically.
    # Alternatively, you can map them manually like: field=data.field
    new_agency_page = AgencyPage(
        **data.model_dump() 
    )
    
    # Add to database session
    db.add(new_agency_page)
    
    # Commit and refresh to get the generated ID
    await db.commit()
    await db.refresh(new_agency_page)
    
    return {
        "message": "Agency Page muvaffaqiyatli yaratildi", 
        "id": new_agency_page.id
    }