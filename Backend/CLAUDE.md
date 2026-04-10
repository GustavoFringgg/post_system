# Frontend CLAUDE.md

## 結帳 API 規格（給後端參考）

### POST /api/orders

**Request Body**
```json
{
  "user_id": 1,
  "items": [
    {
      "product_id": 1,
      "quantity": 2
    }
  ]
}
```

**注意事項**
- `user_id`：目前 hardcode 為 `1`（derek-tsai / admin），待 JWT 實作後改由 token 解出
- `payment_amount` 不傳：客人付多少是收銀員當下的操作，不入庫
- `total_amount` 不傳：**後端必須自己從 DB 撈 price 計算**，不能信任前端的金額
- `unit_price` 不傳：此專案為短期市集用途，價格不會異動，直接用 DB 現有 price 即可

**Response**
- 成功：`201 Created`（不需要 body）
- 失敗：標準 HTTP error code

**庫存處理**
- 前端在加入購物車時已做本地扣庫存
- 後端結帳時需同步扣 DB 庫存
- 此專案為單一收銀台，不需考慮多台並發超賣問題

---

## 相關前端檔案

| 檔案 | 說明 |
|------|------|
| `src/types/index.ts` | `Order`、`OrderItem` interface 定義 |
| `src/api/orders.ts` | `createOrder()` API function |
| `src/stores/cart.ts` | `checkout()` 組裝 payload 並呼叫 API |
| `src/stores/users.ts` | mock user（derek-tsai, id: 1） |
