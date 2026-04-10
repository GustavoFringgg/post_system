from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from app.core.database import get_session

from app.schemas.order import OrderCreate  # , OrderRead

from app.models.product import Product
from app.models.order import Order
from app.models.order_item import OrderItem

router = APIRouter()

@router.post('/',status_code=201)
async def create_order(order:OrderCreate,session:AsyncSession= Depends(get_session)):
    # product_ids = [item.product_id for item in order.items]
    # 透過 order 取得商品 list 再確認是否 order 都存在商品 list
    product_ids = [item.product_id for item in order.items]
    result = await session.execute(select(Product).where(Product.id.in_(product_ids)))
    products = {p.id: p for p in result.scalars().all()} # result.scalars().all() 轉化 Product 物件的 list 

    for item in order.items:
        if item.product_id not in products:
            raise HTTPException(status_code=404, detail=f"Product {item.product_id} not found")
        
    # 寫入 Order 整筆訂單
    subtotal = sum(products[item.product_id].price * item.quantity for item in order.items)
    new_order = Order(user_id = order.user_id, subtotal = subtotal) # 透過 model 加入物件參數 new_order
    session.add(new_order) # 加入 session (Transaction)
    await session.flush() # flush 是屬於非同步 記得補上 await 

    # 寫入 OrderItem 訂單明細
    for item in order.items:
        order_item = OrderItem(
            order_id = new_order.id,
            product_id = item.product_id,
            quantity = item.quantity,
            unit_price = products[item.product_id].price,
        )
        session.add(order_item)
        products[item.product_id].stock -= item.quantity
        session.add(products[item.product_id])
    await session.commit()
    return
    
    



# products = {
#     1: Product(id=1, name="衣服A", price=890, ...),
#     5: Product(id=5, name="褲子A", price=1200, ...),
# }

# session.add()     →  放進記憶體
#       ↓
# session.flush()   →  暫時送資料庫（拿到 id，但還可以取消）
#       ↓
# session.commit()  →  真正確認寫入（無法取消）