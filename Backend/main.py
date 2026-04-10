import logging
import os
import uvicorn
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.routes import products, orders, health

from app.core.database import init_db                                                                       

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s - %(message)s",
)
logger = logging.getLogger(__name__)


@asynccontextmanager # 非同步的生命週期管理
async def lifespan(app: FastAPI):
    # 啟動時執行（yield 之前）
    await init_db()
    logger.info("Service started")
    yield
    # 關閉時執行（yield 之後）
    logger.info("Service stopped")


# 也能不帶參數,參數主要 for /docs
app = FastAPI(
    title=settings.PROJECT_NAME,
    version="0.1.0", # 自定義 api 版本
    description="POS System API",
    lifespan=lifespan,
)

# TODO: 上線記得加入前端主機
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router, prefix="/api/products", tags=["products"])
app.include_router(orders.router, prefix="/api/orders", tags=["orders"])
app.include_router(health.router, prefix="/api/health", tags=["health"])


# TODO: 上線後 reload = False
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=True,
    )
