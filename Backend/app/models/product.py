from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

# 需要加限制或說明時，才換成 Field() 例如 max_length=500
class Product(SQLModel, table=True):
    id:Optional[int] = Field(default = None,primary_key = True)
    brand_id:int = Field(foreign_key = "brand.id")
    sku_code: Optional[str] = Field(default=None, unique=True) 
    name:str
    price:int
    category: str = Field(default="other")   
    description: Optional[str] = None
    image_url:Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

