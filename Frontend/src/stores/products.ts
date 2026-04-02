import { ref } from "vue"
import { defineStore } from "pinia"
import type { Product } from "@/types"

export const useProductStore = defineStore("products", () => {
  const list = ref<Product[]>([
    { id: 1, sku_code: "TSHIRT-001", name: "衣服A", price: 890, stock: 3, category_id: "clothes", image_url: null, group_id: "G_SHIRT_A", created_at: "2026-04-01T09:00:00Z" },
    { id: 2, sku_code: "TSHIRT-002", name: "衣服B", price: 1200, stock: 2, category_id: "clothes", image_url: null, group_id: "G_SHIRT_B", created_at: "2026-04-01T09:05:00Z" },
    { id: 3, sku_code: "TSHIRT-003", name: "衣服C", price: 950, stock: 4, category_id: "clothes", image_url: null, group_id: "G_SHIRT_C", created_at: "2026-04-01T09:10:00Z" },
    { id: 4, sku_code: "TSHIRT-004", name: "衣服D", price: 1100, stock: 3, category_id: "clothes", image_url: null, group_id: "G_SHIRT_D", created_at: "2026-04-01T09:15:00Z" },
    { id: 5, sku_code: "TSHIRT-005", name: "衣服E", price: 1300, stock: 2, category_id: "clothes", image_url: null, group_id: "G_SHIRT_E", created_at: "2026-04-01T09:20:00Z" },
    { id: 6, sku_code: "PANTS-001", name: "褲子A", price: 1200, stock: 5, category_id: "pants", image_url: null, group_id: "G_PANTS_A", created_at: "2026-04-01T10:00:00Z" },
    { id: 7, sku_code: "PANTS-002", name: "褲子B", price: 1500, stock: 3, category_id: "pants", image_url: null, group_id: "G_PANTS_B", created_at: "2026-04-01T10:05:00Z" },
    { id: 8, sku_code: "PANTS-003", name: "褲子C", price: 980, stock: 2, category_id: "pants", image_url: null, group_id: "G_PANTS_C", created_at: "2026-04-01T10:10:00Z" },
    { id: 9, sku_code: "PANTS-004", name: "褲子D", price: 1200, stock: 1, category_id: "pants", image_url: null, group_id: "G_PANTS_D", created_at: "2026-04-01T10:15:00Z" },
    { id: 10, sku_code: "PANTS-005", name: "褲子E", price: 1500, stock: 4, category_id: "pants", image_url: null, group_id: "G_PANTS_E", created_at: "2026-04-01T10:20:00Z" },
    { id: 11, sku_code: "SHOES-001", name: "鞋子A", price: 1800, stock: 3, category_id: "shoes", image_url: null, group_id: "G_SHOES_A", created_at: "2026-04-01T11:00:00Z" },
    { id: 12, sku_code: "SHOES-002", name: "鞋子B", price: 2200, stock: 5, category_id: "shoes", image_url: null, group_id: "G_SHOES_B", created_at: "2026-04-01T11:05:00Z" },
    { id: 13, sku_code: "SHOES-003", name: "鞋子C", price: 1600, stock: 2, category_id: "shoes", image_url: null, group_id: "G_SHOES_C", created_at: "2026-04-01T11:10:00Z" },
    { id: 14, sku_code: "SHOES-004", name: "鞋子D", price: 1950, stock: 2, category_id: "shoes", image_url: null, group_id: "G_SHOES_D", created_at: "2026-04-01T11:15:00Z" },
    { id: 15, sku_code: "SHOES-005", name: "鞋子E", price: 2500, stock: 1, category_id: "shoes", image_url: null, group_id: "G_SHOES_E", created_at: "2026-04-01T11:20:00Z" }
  ])

  // 結帳後扣庫存
  function deductStock(cartItems: { product: Product; quantity: number }[]) {
    for (const item of cartItems) {
      const p = list.value.find((p) => p.id === item.product.id)
      if (p) p.stock -= item.quantity
    }
  }

  function adjustStock(productId: number, delta: number) {
    const p = list.value.find((p) => p.id === productId)
    if (p) p.stock += delta
  }

  return { list, deductStock, adjustStock }
})
