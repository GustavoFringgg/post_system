import { ref } from "vue"
import { defineStore } from "pinia"
import type { Product } from "@/types"

export const useProductStore = defineStore("products", () => {
  const list = ref<Product[]>([
    { id: 1, name: "衣服A", price: 890, category: "clothes", stock: 3 },
    { id: 2, name: "衣服B", price: 1200, category: "clothes", stock: 2 },
    { id: 3, name: "衣服C", price: 950, category: "clothes", stock: 2 },
    { id: 4, name: "衣服D", price: 1100, category: "clothes", stock: 3 },
    { id: 5, name: "衣服E", price: 1300, category: "clothes", stock: 2 },
    { id: 6, name: "衣服F", price: 1000, category: "clothes", stock: 2 },
    { id: 7, name: "褲子A", price: 1200, category: "pants", stock: 54 },
    { id: 8, name: "褲子B", price: 1500, category: "pants", stock: 3 },
    { id: 9, name: "褲子C", price: 980, category: "pants", stock: 2 },
    { id: 10, name: "褲子D", price: 1200, category: "pants", stock: 1 },
    { id: 11, name: "褲子E", price: 1500, category: "pants", stock: 2 },
    { id: 12, name: "褲子F", price: 980, category: "pants", stock: 3 },
    { id: 13, name: "鞋子A", price: 1200, category: "shoes", stock: 3 },
    { id: 14, name: "鞋子B", price: 1500, category: "shoes", stock: 5 },
    { id: 15, name: "鞋子C", price: 980, category: "shoes", stock: 2 },
    { id: 16, name: "鞋子D", price: 1200, category: "shoes", stock: 2 },
    { id: 17, name: "鞋子E", price: 1500, category: "shoes", stock: 3 },
    { id: 18, name: "鞋子F", price: 980, category: "shoes", stock: 3 }
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
