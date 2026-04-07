from fastapi import APIRouter, HTTPException
from app.schemas.order import OrderCreate, OrderRead

router = APIRouter()

_next_order_id = 1


@router.post("/", response_model=OrderRead, status_code=201)
def create_order(order: OrderCreate):
    global _next_order_id

    if order.payment_amount > 0 and order.payment_amount < order.subtotal:
        raise HTTPException(status_code=422, detail="Payment amount is less than subtotal")

    expected_change = order.payment_amount - order.subtotal if order.payment_amount > 0 else 0
    if order.change != expected_change:
        raise HTTPException(status_code=422, detail="Change amount is incorrect")

    from datetime import datetime, timezone
    order_id = _next_order_id
    _next_order_id += 1

    return OrderRead(
        order_id=order_id,
        created_at=datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        status="completed",
    )
