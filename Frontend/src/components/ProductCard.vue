<script setup lang="ts">
import type { Product } from '@/types'

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  (e: 'add', product: Product): void
}>()

function formatPrice(price: number): string {
  return `$${price.toLocaleString()}`
}
</script>

<template>
  <div
    class="flex flex-col bg-white rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow duration-200"
    role="article"
    :aria-label="product.name"
  >
    <!-- Image area -->
    <div class="flex items-center justify-center bg-card-bg" style="height: 200px;">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#AAAAAA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    </div>

    <!-- Info row -->
    <div class="flex items-center justify-between px-3.5 py-3">
      <div class="flex flex-col gap-0.5 min-w-0">
        <span class="text-sm font-medium text-text-main truncate">{{ product.name }}</span>
        <span class="text-sm font-medium text-primary tabular-nums">{{ formatPrice(product.price) }}</span>
      </div>

      <button
        class="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white hover:bg-primary-light active:scale-95 transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        :aria-label="`加入 ${product.name} 到購物車`"
        @click="emit('add', product)"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5"  y1="12" x2="19" y2="12"/>
        </svg>
      </button>
    </div>
  </div>
</template>
