import { ref, computed } from "vue"
import { defineStore } from "pinia"
import type { Product } from "@/types"
import type { Order, OrderItem } from "@/types"
import { useProductStore } from "@/stores/products"
import { useUserStore } from "@/stores/users"
import { createOrder } from "@/api/orders"

export interface CartItem {
  product: Product
  quantity: number
}

export const useCartStore = defineStore("cart", () => {
  const productStore = useProductStore()
  const userStore = useUserStore()

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

  async function checkout() {
    const orderItems: OrderItem[] = items.value.map((item) => ({
      product_id: item.product.id,
      quantity: item.quantity
    }))
    const order: Order = {
      user_id: userStore.currentUser.id,
      items: orderItems
    }
    await createOrder(order)
    items.value = []
    paymentInput.value = "0"
  }

  function updatePaymentInput(key: string) {
    if (key === "backspace") {
      paymentInput.value = "0"
    } else if (key === "00") {
      if (paymentInput.value !== "0") {
        const next = paymentInput.value + "00"
        if (Number(next) <= 100000000) {
          paymentInput.value = next
        }
      }
    } else {
      const next = paymentInput.value === "0" ? key : paymentInput.value + key
      if (Number(next) <= 100000000) {
        paymentInput.value = next
      }
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
