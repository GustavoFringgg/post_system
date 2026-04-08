from sqlmodel import SQLModel, Field
from typing import Optional         
                            

# Field — 設定欄位的資料庫屬性     
# table=True 將 class name 全部變為小寫後,成為table的名稱
#  __tablename__ = "order_items"  # 自訂名稱    
# quantity: int 一般欄位(必填)       
class OrderItem(SQLModel,table = True):
    id: Optional[int] = Field(default = None, primary_key = True)
    order_id: int = Field(foreign_key = 'order.id')
    product_id:int = Field(foreign_key = 'product.id')
    quantity:int
    unit_price:int


