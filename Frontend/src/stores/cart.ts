import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Product } from '@/types'

export interface CartItem {
  product: Product
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const paymentInput = ref<string>('0')

  const itemCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  )

  function addProduct(product: Product) {
    const existing = items.value.find(i => i.product.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ product, quantity: 1 })
    }
  }

  function removeItem(productId: number) {
    items.value = items.value.filter(i => i.product.id !== productId)
  }

  function updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }
    const item = items.value.find(i => i.product.id === productId)
    if (item) item.quantity = quantity
  }

  function clearCart() {
    items.value = []
    paymentInput.value = '0'
  }

  function appendNumpad(key: string) {
    if (key === 'backspace') {
      paymentInput.value = '0'
    } else if (key === '00') {
      if (paymentInput.value !== '0') {
        paymentInput.value += '00'
      }
    } else {
      paymentInput.value = paymentInput.value === '0' ? key : paymentInput.value + key
    }
  }

  return {
    items,
    paymentInput,
    itemCount,
    subtotal,
    addProduct,
    removeItem,
    updateQuantity,
    clearCart,
    appendNumpad,
  }
})
