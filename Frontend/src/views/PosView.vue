<script setup lang="ts">
import { ref, computed } from "vue"
import AppSidebar from "@/components/AppSidebar.vue"
import ProductCard from "@/components/ProductCard.vue"
import CartPanel from "@/components/CartPanel.vue"
import { useProductStore } from "@/stores/products"
import { useCartStore } from "@/stores/cart"
import type { Category } from "@/types"

const cart = useCartStore()
const activeCategory = ref<Category>("all")
const productStore = useProductStore()

const filteredProducts = computed(() =>
  activeCategory.value === "all"
    ? productStore.list
    : productStore.list.filter((p) => p.category === activeCategory.value)
)

const categoryLabel: Record<Category, string> = {
  all: "全部商品",
  clothes: "衣服",
  pants: "褲子",
  shoes: "鞋子"
}
</script>

<template>
  <div class="flex h-screen w-screen overflow-hidden bg-white font-sans">
    <!-- Left: Sidebar -->
    <AppSidebar
      :active-category="activeCategory"
      @select="activeCategory = $event"
    />

    <!-- Center: Product list -->
    <main class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <!-- Header -->
      <div class="px-5 py-4 border-b border-border">
        <h1 class="text-lg font-medium text-text-main font-heading">
          {{ categoryLabel[activeCategory] }}
        </h1>
        <p class="text-xs text-text-muted mt-0.5">
          {{ filteredProducts.length }} 件商品
        </p>
      </div>

      <!-- Grid -->
      <div class="flex-1 overflow-y-auto p-5">
        <div v-if="filteredProducts.length > 0" class="grid grid-cols-5 gap-4">
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
            @add="cart.addProduct"
          />
        </div>

        <!-- Empty state for category with no products -->
        <div
          v-else
          class="flex flex-col items-center justify-center h-full gap-3 text-center"
        >
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
            <path
              d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
            />
          </svg>
          <p class="text-sm text-text-muted">此分類目前沒有商品</p>
        </div>
      </div>
    </main>

    <!-- Right: Cart panel -->
    <CartPanel />
  </div>
</template>
