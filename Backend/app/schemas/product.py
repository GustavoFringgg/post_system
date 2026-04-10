from typing import Literal
from pydantic import BaseModel
from datetime import datetime

Category = Literal["clothes", "pants", "shoes"]


class Product(BaseModel):
    id: int
    sku_code: str
    name: str
    price: int
    stock: int
    category_id: Category
    image_url: str | None
    created_at: datetime

    model_config = {"from_attributes": True}
