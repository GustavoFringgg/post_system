<script setup lang="ts">
import { computed } from "vue"
import { useCartStore } from "@/stores/cart"
import NumPad from "./NumPad.vue"

const cart = useCartStore()

function formatPrice(amount: number): string {
  return `$${amount.toLocaleString()}`
}

const paymentAmount = computed(() => {
  const val = parseInt(cart.paymentInput, 10)
  return isNaN(val) ? 0 : val
})

const change = computed(() => paymentAmount.value - cart.subtotal)
</script>

<template>
  <aside class="flex flex-col w-[440px] min-h-screen bg-white border-l border-border flex-shrink-0">
    <!-- Header -->
    <div class="px-4 py-4 border-b border-border">
      <h2 class="text-base font-medium text-text-main flex items-center gap-2">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        購物車
      </h2>
      <p class="text-[13px] text-text-muted mt-0.5">{{ cart.itemCount }} 件商品</p>
    </div>

    <!-- Item list or empty state -->
    <div class="flex-1 overflow-y-auto">
      <!-- Empty state -->
      <div v-if="cart.items.length === 0" class="flex flex-col items-center justify-center h-full gap-2 py-12">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#CCCCCC"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        <p class="text-sm text-text-muted">購物車是空的</p>
        <p class="text-xs text-text-faint">請選擇商品加入購物車</p>
      </div>

      <!-- Cart items -->
      <ul v-else class="divide-y divide-border">
        <li v-for="item in cart.items" :key="item.product.id" class="flex items-center justify-between px-4 py-3 gap-2">
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-text-main truncate">
              {{ item.product.name }}
            </p>
            <p class="text-xs text-primary tabular-nums">
              {{ formatPrice(item.product.price) }}
            </p>
          </div>

          <!-- Quantity controls -->
          <div class="flex items-center gap-1.5">
            <button
              class="w-6 h-6 flex items-center justify-center rounded bg-numpad-btn hover:bg-[#E0E0E0] text-text-main text-sm transition-colors duration-150 cursor-pointer"
              :aria-label="`減少 ${item.product.name} 數量`"
              @click="cart.updateQuantity(item.product.id, item.quantity - 1)"
            >
              −
            </button>

            <span class="w-6 text-center text-sm tabular-nums text-text-main">{{ item.quantity }}</span>

            <button
              class="w-6 h-6 flex items-center justify-center rounded bg-numpad-btn hover:bg-[#E0E0E0] text-text-main text-sm transition-colors duration-150 cursor-pointer"
              :aria-label="`增加 ${item.product.name} 數量`"
              @click="cart.updateQuantity(item.product.id, item.quantity + 1)"
            >
              +
            </button>
          </div>

          <span class="text-sm font-medium text-text-main tabular-nums w-16 text-right">
            {{ formatPrice(item.product.price * item.quantity) }}
          </span>

          <button
            class="text-text-muted hover:text-red-500 transition-colors duration-150 cursor-pointer ml-1"
            :aria-label="`移除 ${item.product.name}`"
            @click="cart.removeItem(item.product.id)"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </li>
      </ul>
    </div>

    <!-- Payment section -->
    <div class="border-t border-border px-4 pt-4 pb-4">
      <!-- Payment input display -->
      <p class="text-xs text-text-muted mb-2">客人付款</p>
      <div class="flex items-center justify-between bg-[#F8FAFC] rounded-lg px-3 py-2.5 mb-3 border border-border">
        <span class="text-sm text-text-muted">付款金額</span>
        <span class="text-lg font-semibold text-text-main tabular-nums">
          ${{ Number(cart.paymentInput).toLocaleString() }}
        </span>
      </div>

      <!-- 數字鍵盤儀表板 -->
      <NumPad @input="cart.appendNumpad" />

      <!-- Summary -->
      <div class="mt-4 pt-3 border-t border-border space-y-2">
        <div class="flex justify-between items-baseline pt-1">
          <span class="text-[30px] font-medium text-text-main">總計</span>
          <span class="text-[30px] font-semibold text-primary tabular-nums">{{ formatPrice(cart.subtotal) }}</span>
        </div>
        <div class="flex justify-between text-[13px] pt-1">
          <span class="text-[30px]" :class="!(cart.items.length > 0 && paymentAmount > 0) ? 'invisible' : ''">
            找零
          </span>
          <span
            class="tabular-nums text-[30px]"
            :class="[
              !(cart.items.length > 0 && paymentAmount > 0) ? 'invisible' : '',
              change >= 0 ? 'text-green-600' : 'text-red-500'
            ]"
          >
            {{ formatPrice(change) }}
          </span>
        </div>
      </div>

      <!-- Checkout button -->
      <button
        class="mt-4 w-full h-14 rounded-xl font-medium text-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        :class="
          cart.items.length > 0
            ? 'bg-primary text-white hover:bg-primary-light cursor-pointer active:scale-[0.98]'
            : 'bg-numpad-btn text-text-muted cursor-not-allowed'
        "
        :disabled="cart.items.length === 0"
        aria-label="結帳"
      >
        結帳
      </button>

      <button
        class="mt-4 w-full h-9 text-xl text-text-muted py-1 transition-colors duration-150"
        :class="cart.items.length > 0 ? 'hover:text-red-500 cursor-pointer' : 'invisible cursor-default'"
        aria-label="清空購物車"
        :disabled="cart.items.length === 0"
        @click="cart.clearCart()"
      >
        清空購物車
      </button>
    </div>
  </aside>
</template>
