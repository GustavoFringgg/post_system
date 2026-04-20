from sqlmodel import SQLModel, Field
from typing import Optional

class ProjectInventory(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    project_id: int = Field(foreign_key="project.id")
    product_id: int = Field(foreign_key="product.id")
    stock: int = Field(default=0)
    custom_price: Optional[int] = None