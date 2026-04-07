import asyncio
from sqlmodel import SQLModel                                                                             
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession                                        
from sqlalchemy.orm import sessionmaker
from app.core.config import settings                                                                        
from app.models.product import Product
                                            
engine = create_async_engine(settings.DATABASE_URL)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)                       
                  
products = [                                                                                                
    Product(sku_code="TSHIRT-001", name="衣服A", price=890,  stock=3, category_id="clothes"),
    Product(sku_code="TSHIRT-002", name="衣服B", price=1200, stock=2, category_id="clothes"),               
    Product(sku_code="TSHIRT-003", name="衣服C", price=950,  stock=4, category_id="clothes"),               
    Product(sku_code="TSHIRT-004", name="衣服D", price=1100, stock=3, category_id="clothes"),               
    Product(sku_code="TSHIRT-005", name="衣服E", price=1300, stock=2, category_id="clothes"),               
    Product(sku_code="PANTS-001",  name="褲子A", price=1200, stock=5, category_id="pants"),                 
    Product(sku_code="PANTS-002",  name="褲子B", price=1500, stock=3, category_id="pants"),                 
    Product(sku_code="PANTS-003",  name="褲子C", price=980,  stock=2, category_id="pants"),                 
    Product(sku_code="PANTS-004",  name="褲子D", price=1200, stock=1, category_id="pants"),                 
    Product(sku_code="PANTS-005",  name="褲子E", price=1500, stock=4, category_id="pants"),                 
    Product(sku_code="SHOES-001",  name="鞋子A", price=1800, stock=3, category_id="shoes"),                 
    Product(sku_code="SHOES-002",  name="鞋子B", price=2200, stock=5, category_id="shoes"),                 
    Product(sku_code="SHOES-003",  name="鞋子C", price=1600, stock=2, category_id="shoes"),                 
    Product(sku_code="SHOES-004",  name="鞋子D", price=1950, stock=2, category_id="shoes"),                 
    Product(sku_code="SHOES-005",  name="鞋子E", price=2500, stock=1, category_id="shoes"),                 
] 


async def seed():
    async with AsyncSessionLocal() as session:
        session.add_all(products)
        await session.commit() 
    print('Seed success')

asyncio.run(seed())