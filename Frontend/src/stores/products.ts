import { ref } from "vue"
import { defineStore } from "pinia"
import type { Product } from "@/types"
import { fetchProducts } from "@/api/product"

export const useProductStore = defineStore("products", () => {
  const list = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadProduct() {
    loading.value = true
    try {
      list.value = await fetchProducts()
    } catch (err) {
      error.value = "無法載入商品資料"
      console.error(err)
    } finally {
      loading.value = false
    }
  }

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

  return { list, loading, error, deductStock, adjustStock, loadProduct }
})
