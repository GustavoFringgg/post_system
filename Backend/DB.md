# 資料庫 Schema 設計

## 總覽

| 表名 | 說明 |
|------|------|
| `users` | 使用者帳號（店長 / 店員） |
| `products` | 商品資料與庫存 |
| `orders` | 訂單主記錄（金流資訊） |
| `order_items` | 訂單明細（購買商品清單） |

---

## users

| 欄位 | 型別 | 說明 |
|------|------|------|
| `id` | INTEGER PK | 流水號 |
| `name` | TEXT NOT NULL | 顯示名稱 |
| `role` | TEXT NOT NULL | 角色：`owner` / `clerk` |
| `created_at` | DATETIME | 建立時間 |

---

## products

| 欄位 | 型別 | 說明 |
|------|------|------|
| `id` | INTEGER PK | 流水號 |
| `sku_code` | TEXT UNIQUE NOT NULL | 商品編號 |
| `name` | TEXT NOT NULL | 商品名稱 |
| `price` | INTEGER NOT NULL | 售價（元） |
| `stock` | INTEGER NOT NULL | 庫存數量 |
| `category_id` | TEXT NOT NULL | 分類：`clothes` / `pants` / `shoes` |
| `image_url` | TEXT | 商品圖片網址（可為空） |
| `created_at` | DATETIME | 建立時間 |

---

## orders

| 欄位 | 型別 | 說明 |
|------|------|------|
| `id` | INTEGER PK | 流水號 |
| `user_id` | INTEGER FK → users.id | 結帳人員 |
| `subtotal` | INTEGER NOT NULL | 應收金額（元） |
| `status` | TEXT NOT NULL | 狀態：`completed` / `cancelled` |
| `created_at` | DATETIME | 結帳時間 |

---

## order_items

| 欄位 | 型別 | 說明 |
|------|------|------|
| `id` | INTEGER PK | 流水號 |
| `order_id` | INTEGER FK → orders.id | 所屬訂單 |
| `product_id` | INTEGER FK → products.id | 商品 |
| `quantity` | INTEGER NOT NULL | 購買數量 |
| `unit_price` | INTEGER NOT NULL | 下單當下的售價（元） |

---

## 關聯圖

```
users ──────────────< orders >──────────── order_items >──────────── products
       user_id = id          id = order_id   product_id = id
```
