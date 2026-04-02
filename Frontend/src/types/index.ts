export interface Product {
  id: number
  sku_code: string
  name: string
  price: number
  stock: number
  category_id: Category
  image_url: string | null
  group_id: string
  created_at: string
}

export type Category = "all" | "clothes" | "pants" | "shoes"

export interface NavItem {
  id: string
  label: string
  icon: string
  category: Category
}
