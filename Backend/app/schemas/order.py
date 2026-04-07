from pydantic import BaseModel


class OrderItem(BaseModel):
    product_id: int
    quantity: int


class OrderCreate(BaseModel):
    items: list[OrderItem]
    subtotal: int
    payment_amount: int
    change: int


class OrderRead(BaseModel):
    order_id: int
    created_at: str
    status: str
