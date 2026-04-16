from sqlmodel import SQLModel
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# create_async_engine 建立非同步資料庫連線引擎的函數
# AsyncSession 建立短暫的操作連線
# sessionmaker 是一個 Session 工廠（factory）用來批量製造設定好的 Session

# 先建引擎
# 再建工廠
# echo 將送出sql語法印到terminal上線時記得改false
# class_= AsyncSession 依此類別來產生非同步的版本(可以使用await)
# expire_on_commit=False commit 後不會再查db 直接使用記憶體的資料 非同步專案設成 False 是標準做法，避免自動觸發同步查詢
engine = create_async_engine(settings.async_database_url, echo=False)
AsyncSessionLocal = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

# with 進入時做某件事，離開時自動做清理，不需要手動 close
# run_sync 把同步函數包起來 可以在非同步環境執行
# 等待 → 用非同步連線執行 → 把同步的 create_all → 在 DB 裡建立所有 table

#async def init_db():
    #async with engine.begin() as conn: # .begin() 開啟 transaction
        #engine.begin() 會回傳一個 connection 物件，as conn 就是把它存到 conn 這個變數
        #await conn.run_sync(SQLModel.metadata.create_all) #掃描 model 的資料 然後建立資料結構

# 建立 session 
# 提供 session 給 API 路由使用
# 自動關閉 session
# yield — 給出去，但函數還沒結束
# FastAPI 收到請求
#     ↓
# 呼叫 get_session()，開啟 session
#     ↓
# yield → 把 session 傳給路由函數
#     ↓
# 路由執行完畢
#     ↓
#回到 get_session()，async with 結束，自動關閉 sessio
async def get_session():
    async with AsyncSessionLocal() as session:
        yield session