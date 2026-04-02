<script setup lang="ts">
import type { Category } from "@/types"

interface NavItem {
  id: Category
  label: string
}

const navItems: NavItem[] = [
  { id: "all", label: "全部" },
  { id: "clothes", label: "衣服" },
  { id: "pants", label: "褲子" },
  { id: "shoes", label: "鞋子" }
]

const props = defineProps<{
  activeCategory: Category
}>()

const emit = defineEmits<{
  (e: "select", category: Category): void
}>()

console.log("props", props)
</script>

<template>
  <aside class="flex flex-col items-center w-24 min-h-screen bg-sidebar py-4 gap-2 flex-shrink-0">
    <!-- Logo area -->
    <div class="flex items-center justify-center w-10 h-10 mb-2">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FFFFFF"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    </div>

    <!-- Nav items -->
    <button
      v-for="item in navItems"
      :key="item.id"
      class="flex flex-col items-center justify-center w-12 rounded-lg gap-1.5 py-2.5 px-1 transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      :class="activeCategory === item.id ? 'bg-nav-active text-white' : 'text-text-muted hover:text-white'"
      :aria-label="item.label"
      :aria-current="activeCategory === item.id ? 'page' : undefined"
      @click="emit('select', item.id)"
    >
      <!-- All: House icon -->
      <template v-if="item.id === 'all'">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      </template>
      <!-- Clothes / Pants / Shoes: Box icon -->
      <template v-else-if="item.id === 'clothes' || item.id === 'pants' || item.id === 'shoes'">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
          />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      </template>

      <span class="text-[10px] leading-tight">{{ item.label }}</span>
    </button>

    <div class="flex-1" />

    <!-- Reports -->
    <button
      class="flex flex-col items-center justify-center w-12 rounded-lg gap-1.5 py-2.5 px-1 text-text-muted hover:text-white transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      aria-label="報表"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
      <span class="text-[10px] leading-tight">報表</span>
    </button>

    <!-- Settings -->
    <button
      class="flex flex-col items-center justify-center w-12 rounded-lg gap-1.5 py-2.5 px-1 text-text-muted hover:text-white transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      aria-label="設定"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="3" />
        <path
          d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
        />
      </svg>
      <span class="text-[10px] leading-tight">設定</span>
    </button>
  </aside>
</template>
