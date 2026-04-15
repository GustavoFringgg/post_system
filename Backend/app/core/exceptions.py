class AppError(Exception):
    def __init__(self,status_code:int,detail:str):
        self.status_code = status_code
        self.detail = detail

class NotFoundError(AppError):
    def __init__(self,resource:str,id:int):
        super().__init__(404,f"{resource} {id} not found")

class StockNotEnough(AppError):
    def __init__(self, resource:str,product_id:int):
        super().__init__(400,f"{resource} {product_id} stock not enough")