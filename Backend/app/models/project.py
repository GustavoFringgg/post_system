from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime, date

class Project(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    brand_id: int = Field(foreign_key="brand.id")
    name: str
    type: str
    location: str
    start_date: date
    end_date: date
    hashed_staff_password: str
    is_active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)