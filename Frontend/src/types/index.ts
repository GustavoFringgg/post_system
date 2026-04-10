// 主要商品
export interface Product {
  id: number
  sku_code: string
  name: string
  price: number
  stock: number
  category_id: Category
  image_url: string | null
  created_at: string
}

// 商品總類
export type Category = "all" | "clothes" | "pants" | "shoes"

// 左側選單分類
export interface NavItem {
  id: string
  label: string
  icon: string
  category: Category
}

// 購物車每筆資料
export interface OrderItem {
  product_id: number
  quantity: number
}

// 單筆訂單
export interface Order {
  user_id: number
  items: OrderItem[]
}
