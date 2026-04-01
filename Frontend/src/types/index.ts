export interface Product {
  id: number
  name: string
  price: number
  category: Category
  image?: string
  stock:number
}

export type Category = 'all' | 'clothes' | 'pants' | 'shoes'

export interface NavItem {
  id: string
  label: string
  icon: string
  category: Category
}
