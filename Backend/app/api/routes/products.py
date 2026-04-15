from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession                                                               
from sqlmodel import select                                                                                 
                                                                                                            
from app.core.database import get_session
from app.models.product import Product                                                                        
from app.schemas.product import Product as ProductSchema, Category        

router = APIRouter()

# stmt 為 SQLAlchemy 物件
# .scalars().all() 將原始數據轉化為 json 格式
@router.get('' , response_model = list[ProductSchema])
async def get_products(category:Category | None = Query(default = None),session:AsyncSession = Depends(get_session)):
    stmt = select(Product).order_by(Product.id) # 等同於 SELECT * FROM product ORDER BY id;
    if category is not None:
        stmt = stmt.where(Product.category_id == category)
    result = await session.execute(stmt)
    return result.scalars().all()
