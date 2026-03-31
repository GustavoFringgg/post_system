# POS System — Figma 重建規格

> 來源：https://flat-form-17978531.figma.site/
> 用途：提供 Claude Code 建立對應 HTML/CSS 或 Figma 元件時的設計參考

---

## 1. 畫面尺寸與整體佈局

| 項目 | 規格 |
|------|------|
| Frame 寬度 | 1440px |
| Frame 高度 | 900px（內容可延伸） |
| 佈局方式 | 三欄 Fixed Layout |

### 三欄分配

```
┌──────────┬─────────────────────────────────────┬──────────────┐
│ Sidebar  │         主內容區（商品列表）            │   購物車     │
│  56px    │            ~1064px                  │   320px      │
└──────────┴─────────────────────────────────────┴──────────────┘
```

---

## 2. 顏色系統

### 主色盤

| 用途 | 色碼 | 說明 |
|------|------|------|
| Sidebar 背景 | `#1E1B3A` | 深藍紫色 |
| Active Nav 背景 | `#2C3BDB` | 藍色 |
| 主內容背景 | `#FFFFFF` | 白色 |
| 購物車背景 | `#FFFFFF` | 白色 |
| 商品卡片圖片區 | `#F4F4F5` | 淺灰色 |
| 數字鍵盤按鈕 | `#F0F0F0` | 淺灰色 |
| 分隔線 / Border | `#E5E5E5` | 淺灰色 |

### 文字顏色

| 用途 | 色碼 |
|------|------|
| 主標題、商品名稱 | `#111111` |
| 副標題（說明文字） | `#9CA3AF` |
| 商品價格、總計金額 | `#2563EB` |
| Inactive Nav 文字 | `#9CA3AF` |
| Active Nav 文字 | `#FFFFFF` |

### 互動元素

| 用途 | 色碼 |
|------|------|
| 加入購物車按鈕（圓形） | `#2563EB` |
| 按鈕內 Icon 顏色 | `#FFFFFF` |

---

## 3. 文字規格

| 元素 | 字級 | 字重 | 顏色 |
|------|------|------|------|
| 頁面主標題（商品列表） | 18–20px | 500 | `#111111` |
| 頁面副標題 | 12px | 400 | `#9CA3AF` |
| 購物車標題 | 16px | 500 | `#111111` |
| 商品名稱 | 14px | 500 | `#111111` |
| 商品價格 | 14px | 500 | `#2563EB` |
| 數字鍵盤數字 | 16px | 400 | `#111111` |
| 小計 / 稅金標籤 | 13px | 400 | `#111111` |
| 總計標籤 | 14px | 500 | `#111111` |
| 總計金額 | 16px | 600 | `#2563EB` |
| Sidebar Nav 文字 | 10px | 400 | `#9CA3AF` / `#FFFFFF` |

> 字型建議：系統預設 sans-serif（如 Inter、Noto Sans TC）

---

## 4. 元件規格

### 4.1 Sidebar（左側導覽列）

```
寬度：56px
高度：撐滿畫面高度
背景：#1E1B3A
佈局：Auto Layout 垂直，Align Center
Padding：12px 0（上下）
Item gap：8px
```

**NavItem 元件**

```
尺寸：40px × 52px
排列：垂直置中，Icon 在上，文字在下
Icon 大小：24px
文字：10px，#9CA3AF（inactive）/ #FFFFFF（active）
Active 背景：#2C3BDB，圓角 8px，Padding 8px 6px
```

Nav 項目清單：
- 全部商品（House icon）← 預設 active
- 衣服（Box icon）
- 褲子（Box icon）
- 鞋子（Box icon）
- 報表（BarChart icon）
- 設定（Settings icon）

---

### 4.2 ProductCard（商品卡片）

```
寬度：約 340px（依 Grid 欄寬計算）
背景：#FFFFFF
圓角：12px
Border：1px solid #E5E5E5
佈局：Auto Layout 垂直
```

**內部結構**

```
┌─────────────────────────┐
│                         │  ← 圖片區
│    [Box placeholder]    │  背景 #F4F4F5，高約 280px
│                         │  Icon 置中（灰色 #AAAAAA，32px）
├─────────────────────────┤
│ 衣服A              [+] │  ← 底部資訊列
│ $890                    │     Padding：12px 14px
└─────────────────────────┘
```

**底部資訊列規格**

```
佈局：水平，Space Between
商品名稱：14px / 500 / #111111
商品價格：14px / 500 / #2563EB
加入按鈕：28px 圓形，背景 #2563EB，白色 + 號 Icon 16px
```

---

### 4.3 商品列表 Grid

```
欄數：3 欄
欄間距：16px
列間距：16px
Container padding：16px 20px
```

---

### 4.4 CartPanel（右側購物車面板）

```
寬度：320px
背景：#FFFFFF
左側 Border：1px solid #E5E5E5
佈局：Auto Layout 垂直
```

**分三個區塊：**

**① 標題區**
```
標題：「🛒 購物車」，16px / 500 / #111111
副標題：「0 件商品」，13px / 400 / #9CA3AF
Padding：16px
```

**② 商品清單區（空狀態）**
```
高度：flex 填滿
置中顯示：
  - 購物車 Icon，48px，#CCCCCC
  - 文字「購物車是空的」，14px / #9CA3AF
  - 文字「請選擇商品加入購物車」，12px / #BBBBBB
```

**③ 付款區**
```
Padding：16px
Border-top：1px solid #E5E5E5

標籤「客人付款」：12px / 400 / #9CA3AF，margin-bottom 8px
```

---

### 4.5 Numpad（數字鍵盤）

```
Grid：4 列 × 3 欄
Gap：6px
```

| 列 | 按鍵 |
|----|------|
| 第 1 列 | 1 / 2 / 3 |
| 第 2 列 | 4 / 5 / 6 |
| 第 3 列 | 7 / 8 / 9 |
| 第 4 列 | ← (退格) / 0 / 00 |

**按鍵規格**
```
高度：44px
背景：#F0F0F0
圓角：8px
文字：16px / 400 / #111111，置中
Hover 背景：#E0E0E0
```

---

### 4.6 結帳資訊列

```
位於 Numpad 下方
Padding：12px 0
Border-top：1px solid #E5E5E5
```

| 欄位 | 規格 |
|------|------|
| 小計 | 13px / 400，左：#111111，右：#111111 |
| 稅金 (5%) | 13px / 400，左：#9CA3AF，右：#111111 |
| 總計 | 14px / 500，左：#111111，右：`$0` 16px / 600 / `#2563EB` |

---

## 5. 建議 Figma 元件化清單

| 元件名稱 | Variants |
|----------|----------|
| `NavItem` | `state=active`, `state=inactive` |
| `ProductCard` | `image=placeholder`, `image=filled` |
| `NumpadKey` | `type=number`, `type=backspace`, `type=double-zero` |
| `CartItem` | 商品名稱 + 數量 + 小計一列 |
| `EmptyCartState` | Icon + 說明文字的空狀態 |
| `AddButton` | 藍色圓形 + 號按鈕 |

---

## 6. 頁面資料（商品範本）

| 商品名稱 | 價格 |
|----------|------|
| 衣服A | $890 |
| 衣服B | $1,200 |
| 衣服C | $950 |
| 褲子A | $1,200 |
| 褲子B | $1,500 |
| 褲子C | $980 |

---

## 7. Claude Code 建議建置順序

1. 建立 `1440 × 900` 主 Frame，切出三欄 Layout
2. 建立 `NavItem` 元件（active / inactive 兩個 Variant）
3. 建立 `ProductCard` 元件（圖片佔位 + 底部資訊列）
4. 用 3 欄 Grid 在主內容區排列 `ProductCard`
5. 建立 `NumpadKey` 元件，組出 4×3 鍵盤
6. 建立 `CartPanel`：標題 + 空狀態 + Numpad + 結帳資訊
7. 組合三欄完成整體畫面
