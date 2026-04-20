from sqlmodel import SQLModel, Field
from enum import Enum
from typing import Optional         
from datetime import datetime
class UserRole(str,Enum):
    super_admin = "super_admin"
    admin = "admin"
    staff = "staff"
                                
class User(SQLModel, table=True):                                                                           
    id: Optional[int] = Field(default = None, primary_key=True)
    brand_id : int = Field(foreign_key = 'brand.id')
    username:Optional[str] = Field(default= None)
    phone:Optional[str]  = Field(default = None , unique = True )
    email:Optional[str]  = Field(default = None , unique = True )
    hashed_password: Optional[str] = None
    role: UserRole = Field(default = UserRole.staff)
    is_developer: bool = Field(default=False)
    is_active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)

