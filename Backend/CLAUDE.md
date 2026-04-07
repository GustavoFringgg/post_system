# Frontend CLAUDE.md — 給後端開發者的前端說明文件

此文件描述前端（Vue 3）的資料格式、API 預期介面與注意事項，  
目的是讓後端（FastAPI + PostgreSQL）開發者快速掌握前端需求，對接時不踩雷。

---

## 專案概述

這是一套 **POS（收銀）系統**，目前前端功能包含：
- 依類別瀏覽商品
- 加入購物車、調整數量
- 數字鍵盤輸入客付金額
- 結帳（目前純前端，尚未呼叫後端）

---

## 前端技術棧

| 項目 | 版本 |
|------|------|
| Vue | 3.5 (Composition API) |
| Pinia | 2.2 |
| Vue Router | 4.5 |
| TypeScript | 6.0 |
| Vite | 6.2（dev server port: 5173） |

---

## API 代理設定

Vite dev server 已設定代理，前端所有 `/api/*` 請求會自動轉發到後端：

```
/api/* → http://localhost:8000
```

因此後端所有路由必須以 `/api` 為前綴（例如 `/api/products/`）。

---

## TypeScript 型別定義

位置：`src/types/index.ts`

```typescript
interface Product {
  id: number
  sku_code: string       // 商品 SKU，例如 "TSHIRT-001"
  name: string           // 商品名稱，例如 "衣服A"
  price: number          // 單價（整數，新台幣）
  stock: number          // 現貨庫存數量
  category_id: Category  // 商品類別（見下方 Category 型別）
  image_url: string | null  // 商品圖片 URL，可為 null
  group_id: string       // 商品群組代碼，例如 "G_SHIRT_A"
  created_at: string     // ISO 8601 時間字串，例如 "2026-04-01T00:00:00Z"
}

// 類別只有這四個值
type Category = "all" | "clothes" | "pants" | "shoes"

interface CartItem {
  product: Product
  quantity: number
}
```

> **注意：** `category_id` 欄位名稱在前端雖然叫 `category_id`，但型別是字串 enum（`Category`），
> 不是數字 FK。後端如果使用數字 ID，**必須在 API 回傳時將其轉換成對應字串**，
> 或與前端協商統一格式後修改型別定義。

---

## 商品類別對照

| `category_id` 值 | 中文顯示 |
|-----------------|---------|
| `"all"`         | 全部（僅前端篩選用，不對應實際類別） |
| `"clothes"`     | 衣服 |
| `"pants"`       | 褲子 |
| `"shoes"`       | 鞋子 |

`"all"` 是前端 UI 用於「不篩選」的虛擬值，**不應存入資料庫**，  
後端商品的 category 只需處理 `clothes`、`pants`、`shoes`。

---

## 需要後端提供的 API 端點

### 1. 取得商品列表

```
GET /api/products/
```

**Query Parameters（選填）：**
- `category` — `"clothes"` | `"pants"` | `"shoes"`（不傳或傳 `"all"` 時回傳全部）

**Response Body（JSON Array）：**
```json
[
  {
    "id": 1,
    "sku_code": "TSHIRT-001",
    "name": "衣服A",
    "price": 890,
    "stock": 3,
    "category_id": "clothes",
    "image_url": null,
    "group_id": "G_SHIRT_A",
    "created_at": "2026-04-01T00:00:00Z"
  }
]
```

> 前端 Pinia store 目前使用此結構的 mock 資料（15 筆），  
> 改接 API 時只需替換 store 中的 hardcoded list 為 fetch 呼叫。

---

### 2. 結帳

```
POST /api/orders/
```

**Request Body：**
```json
{
  "items": [
    {
      "product_id": 1,
      "quantity": 2
    }
  ],
  "subtotal": 1780,
  "payment_amount": 2000,
  "change": 220
}
```

| 欄位 | 型別 | 說明 |
|------|------|------|
| `items` | array | 購物車商品列表 |
| `items[].product_id` | number | 商品 ID |
| `items[].quantity` | number | 購買數量（正整數） |
| `subtotal` | number | 應付金額（前端計算） |
| `payment_amount` | number | 客付金額（0 代表剛好付清，不找零） |
| `change` | number | 找零金額（= payment_amount - subtotal，可為 0） |

**結帳邏輯（前端已實作）：**
- `payment_amount === 0`：視為「剛好付清」，允許結帳，`change = 0`
- `payment_amount > 0 && payment_amount < subtotal`：**不允許結帳**（按鈕 disabled）
- `payment_amount >= subtotal`：正常結帳，`change = payment_amount - subtotal`

**Response Body：**
```json
{
  "order_id": 101,
  "created_at": "2026-04-07T10:30:00Z",
  "status": "completed"
}
```

---

### 3. 取得單一商品（選用）

```
GET /api/products/{id}
```

Response 結構同商品列表中的單一物件。

---

## 庫存管理注意事項

目前前端是**本地即時扣減庫存**（加入購物車時立即扣 stock，取消時還回去），  
這套邏輯在串接後端後需要重新評估，建議：

- **加入購物車時**：不呼叫後端，僅前端暫存
- **結帳時**：後端原子性扣減庫存，並回傳最新庫存
- **若庫存不足**：後端回傳 `409 Conflict` 或 `422` 並說明哪個商品庫存不足

---

## 金額相關規則

- 所有金額為**整數，新台幣**
- 客付金額上限：`100,000,000`（前端已限制輸入）
- 找零 = 客付金額 - 小計（前端計算，後端應驗證）

---

## 現有 Mock 資料（供後端資料初始化參考）

15 筆商品，前端 hardcoded 在 `src/stores/products.ts`：

| ID | SKU | 名稱 | 價格 | 庫存 | 類別 | Group ID |
|----|-----|------|------|------|------|----------|
| 1  | TSHIRT-001 | 衣服A | 890  | 3 | clothes | G_SHIRT_A |
| 2  | TSHIRT-002 | 衣服B | 1200 | 2 | clothes | G_SHIRT_B |
| 3  | TSHIRT-003 | 衣服C | 950  | 4 | clothes | G_SHIRT_C |
| 4  | TSHIRT-004 | 衣服D | 1100 | 3 | clothes | G_SHIRT_D |
| 5  | TSHIRT-005 | 衣服E | 1300 | 2 | clothes | G_SHIRT_E |
| 6  | PANTS-001  | 褲子A | 1200 | 5 | pants   | G_PANTS_A |
| 7  | PANTS-002  | 褲子B | 1500 | 3 | pants   | G_PANTS_B |
| 8  | PANTS-003  | 褲子C | 980  | 2 | pants   | G_PANTS_C |
| 9  | PANTS-004  | 褲子D | 1200 | 1 | pants   | G_PANTS_D |
| 10 | PANTS-005  | 褲子E | 1500 | 4 | pants   | G_PANTS_E |
| 11 | SHOES-001  | 鞋子A | 1800 | 3 | shoes   | G_SHOES_A |
| 12 | SHOES-002  | 鞋子B | 2200 | 5 | shoes   | G_SHOES_B |
| 13 | SHOES-003  | 鞋子C | 1600 | 2 | shoes   | G_SHOES_C |
| 14 | SHOES-004  | 鞋子D | 1950 | 2 | shoes   | G_SHOES_D |
| 15 | SHOES-005  | 鞋子E | 2500 | 1 | shoes   | G_SHOES_E |

> 所有 `image_url` 目前為 `null`，`created_at` 為 `2026-04-01T00:00:00Z`。

---

## 尚未實作的功能（後端先保留擴充空間）

- 使用者登入 / 權限管理（目前無 auth）
- 報表頁（側欄有按鈕但未實作）
- 設定頁（側欄有按鈕但未實作）
- 商品圖片上傳
- 訂單歷史查詢

---

## 前端目錄結構速覽

```
src/
├── types/index.ts          ← 所有 TypeScript 型別定義
├── stores/
│   ├── products.ts         ← 商品 store（目前含 mock 資料）
│   └── cart.ts             ← 購物車 store（含結帳邏輯）
├── components/
│   ├── AppSidebar.vue      ← 左側類別導航
│   ├── ProductCard.vue     ← 商品卡片
│   ├── CartPanel.vue       ← 購物車 + 結帳面板
│   └── NumPad.vue          ← 數字鍵盤（客付金額輸入）
├── views/
│   └── PosView.vue         ← 主畫面（唯一路由 "/"）
└── router/index.ts         ← 路由設定
```
