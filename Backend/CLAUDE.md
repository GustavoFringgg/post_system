# Backend CLAUDE.md

## Commands

```bash
cd Backend
source .venv/bin/activate          # 啟動虛擬環境（已存在，勿重建）
python main.py                     # uvicorn on :8000 with --reload
python seed.py                     # 植入商品測試資料（products）

# Alembic
alembic current                                        # 確認 DB 目前版本
alembic revision --autogenerate -m "描述"              # 偵測 model 差異產生 migration
alembic upgrade head                                   # 套用最新 migration 至 DB
alembic downgrade -1                                   # 回滾一個版本
alembic history                                        # 列出所有 migration 歷史
```

## Architecture

FastAPI + SQLModel + asyncpg + PostgreSQL（Supabase 雲端 DB）。

**Entry point:** `main.py` — 建立 FastAPI app、掛載 CORS middleware、註冊集中式 `AppError` 例外處理器、include routers。

**Lifespan:** `init_db()` 目前被 comment 掉（`await init_db()` 已停用），改由 Alembic 負責 schema 管理。

**Factory pattern:** 無獨立 `create_app()`，app 直接在 `main.py` 建立。

## Directory Structure

```
Backend/
├── main.py                        # App 入口、middleware、exception handler
├── seed.py                        # 商品資料 seed（直接 asyncio.run）
├── requirements.txt
├── alembic.ini                    # Alembic 主設定檔
├── .env / .env.example            # DB 連線設定（含 DATABASE_URL）
├── migrations/                    # Alembic migration 目錄
│   ├── env.py                     # 連線設定、讀取 SQLModel metadata
│   ├── script.py.mako             # migration 腳本模板
│   └── versions/                  # migration 版本檔案
│       └── 33c1f6d74b81_init.py   # 初始 baseline（pass，table 已存在）
└── app/
    ├── core/
    │   ├── config.py              # pydantic-settings，Settings 單例
    │   ├── database.py            # engine、AsyncSessionLocal、get_session、init_db
    │   └── exceptions.py         # AppError、NotFoundError、StockNotEnough
    ├── models/                    # SQLModel table=True ORM 模型
    │   ├── product.py             # Product（sku_code unique）
    │   ├── order.py               # Order（FK → user.id）
    │   ├── order_item.py          # OrderItem（FK → order.id, product.id）
    │   └── user.py                # User（name, role）
    ├── schemas/                   # Pydantic request/response schema（非 table）
    │   ├── product.py             # Product response schema + Category Literal
    │   └── order.py               # OrderCreate、OrderItem（含 field_validator）
    └── api/routes/
        ├── health.py              # HEAD /api/health
        ├── products.py            # GET /api/products（支援 category query）
        └── orders.py              # POST /api/orders（含庫存驗證、原子寫入）
```

## Database

- **Driver:** `asyncpg`（非同步）
- **ORM:** SQLModel（SQLAlchemy 底層）
- **連線方式:** `settings.async_database_url` 將 `DATABASE_URL`（`postgresql://`）自動轉為 `postgresql+asyncpg://`
- **Hosted:** Supabase PostgreSQL（`DATABASE_URL` 寫在 `.env`）
- **Session 管理:** `get_session()` 依賴注入，`AsyncSessionLocal` + `expire_on_commit=False`

## Current State

- SQLModel models 已建立：`Product`、`Order`、`OrderItem`、`User`
- Alembic 已完整導入，migration 目錄存在，DB 版本為 `33c1f6d74b81 (head)`
- 初始 migration 為 baseline（`pass`），因 table 在 Alembic 導入前已存在於 Supabase
- `init_db()` 已 comment 掉，schema 改由 Alembic 全權管理
- `posts` 路由已移除，改為 `products` / `orders`
- `seed.py` 已可正常植入 products 資料

## Alembic 注意事項

**新增欄位或 model 的標準流程：**
```
改 SQLModel model
        ↓
alembic revision --autogenerate -m "描述"
        ↓
alembic upgrade head（確認 DB 更新成功）
        ↓
git commit（model + migration 腳本一起進去）
```

**新 model 要記得在 `migrations/env.py` 加 import：**
```python
import app.models.新model
```
否則 autogenerate 掃不到新 table。

## Models Overview

| Model | Table | 重要欄位 |
|-------|-------|---------|
| `Product` | `product` | `sku_code`(unique), `price`(int), `stock`(int), `category_id`(str) |
| `Order` | `order` | `user_id`(FK→user.id), `subtotal`(int), `status`(str) |
| `OrderItem` | `orderitem` | `order_id`(FK), `product_id`(FK), `quantity`, `unit_price` |
| `User` | `user` | `name`, `role` |

## Error Handling Pattern

```
AppError(status_code, detail)
├── NotFoundError(resource, id)    → 404
└── StockNotEnough(resource, id)   → 400
```
`main.py` 的 `@app.exception_handler(AppError)` 統一回傳 `{"detail": "..."}` JSON。

## Environment Variables（.env）

```
PROJECT_NAME=
CORS_ORIGINS=["http://localhost:5173"]
DB_USER=
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=5432
DB_NAME=
DATABASE_URL=postgresql://...  # Supabase 連線字串（必填）
```

## Next Steps

- [ ] 視需求新增 model 或欄位，透過 Alembic 管理 schema 變更
