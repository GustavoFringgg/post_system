import { ref, computed } from "vue"
import { defineStore } from "pinia"
import type { Product } from "@/types"
import { useProductStore } from "@/stores/products"

export interface CartItem {
  product: Product
  quantity: number
}

export const useCartStore = defineStore("cart", () => {
  const productStore = useProductStore()
  const items = ref<CartItem[]>([])
  const paymentInput = ref<string>("0")

  const itemCount = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))

  const subtotal = computed(() => items.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0))

  function addProduct(product: Product) {
    const existing = items.value.find((i) => i.product.id === product.id)
    const latest = productStore.list.find((p) => p.id === product.id)

    if (!latest || latest.stock <= 0) return
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ product, quantity: 1 })
    }
    productStore.adjustStock(product.id, -1)
  }

  function updateCartQuantity(productId: number, targetQuantity: number) {
    if (targetQuantity <= 0) {
      removeCartProduct(productId)
      return
    }
    const item = items.value.find((i) => i.product.id === productId)
    if (!item) return
    const currentStock = productStore.list.find((p) => p.id === productId)?.stock ?? 0
    const maxQuantity = item.quantity + currentStock
    const clamped = Math.min(targetQuantity, maxQuantity)

    const delta = clamped - item.quantity
    item.quantity = clamped
    productStore.adjustStock(productId, -delta)
  }

  function removeCartProduct(productId: number) {
    const item = items.value.find((i) => i.product.id === productId)
    if (item) {
      productStore.adjustStock(productId, item.quantity)
    }
    items.value = items.value.filter((i) => i.product.id !== productId)
  }

  function clearCart() {
    for (const item of items.value) {
      productStore.adjustStock(item.product.id, item.quantity)
    }
    items.value = []
    paymentInput.value = "0"
  }

  function checkout() {
    items.value = []
    paymentInput.value = "0"
  }

  function updatePaymentInput(key: string) {
    console.log("appendNumpad")
    if (key === "backspace") {
      paymentInput.value = "0"
    } else if (key === "00") {
      if (paymentInput.value !== "0") {
        paymentInput.value += "00"
      }
    } else {
      paymentInput.value = paymentInput.value === "0" ? key : paymentInput.value + key
    }
  }

  return {
    items,
    paymentInput,
    itemCount,
    subtotal,
    addProduct,
    removeCartProduct,
    updateCartQuantity,
    clearCart,
    checkout,
    updatePaymentInput
  }
})
