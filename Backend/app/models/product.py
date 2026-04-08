from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

# 需要加限制或說明時，才換成 Field() 例如 max_length=500
class Product(SQLModel, table=True):
    id:Optional[int] = Field(default = None,primary_key = True)
    sku_code: str = Field(unique = True)
    name:str
    price:int
    stock:int
    category_id:str
    image_url:Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

