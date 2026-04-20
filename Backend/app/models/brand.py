from enum import Enum
from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime


class BrandPlan(str,Enum):
    free = 'free'
    basic= 'basic'
    pro = 'pro' 

class Brand(SQLModel,table = True):
    id:Optional[int] = Field(default = None, primary_key = True)
    brand_code: str =  Field(unique= True,index =True)
    name:str
    plan:BrandPlan = Field(default = BrandPlan.free)
    plan_expires_at : Optional[datetime] = Field(default = None)
    is_active:bool = Field(default = True)
    created_at: datetime = Field(default_factory=datetime.utcnow)   