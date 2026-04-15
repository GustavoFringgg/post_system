from pydantic import BaseModel,field_validator
class OrderItem(BaseModel):
    product_id: int
    quantity: int

    @field_validator('quantity','product_id')
    #cls -> class本身固定寫法
    #info 是 Pydantic 傳進來的一個物件，裡面包含這次驗證的相關資訊
    #驗證沒過就回拋 422
    def must_be_positive(cls, value, info ):
        if value <= 0:
            raise ValueError(f'{info.field_name} 不能小於 0')
        return value


class OrderCreate(BaseModel):
    user_id: int
    items: list[OrderItem]
    @field_validator('user_id')
    def must_be_positive(cls,value):
        if value <= 0:
            raise ValueError('user_id 不能小於 0')
        return value
    @field_validator('items')
    def must_not_be_empty(cls,value):
        if len(value) == 0:
            raise ValueError('訂單不能為空')
        return value 
    

