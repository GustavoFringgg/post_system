from pydantic import BaseModel


class OrderItem(BaseModel):
    product_id: int
    quantity: int


class OrderCreate(BaseModel):
    user_id: int
    items: list[OrderItem]


# class OrderRead(BaseModel):
#     order_id: int
#     created_at: str
#     status: str
