<script setup lang="ts">
const emit = defineEmits<{
  (e: "input", key: string): void
}>()

const keys: Array<{ label: string; value: string }> = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "←", value: "backspace" },
  { label: "0", value: "0" },
  { label: "00", value: "00" }
]
</script>

<template>
  <div class="grid grid-cols-3 gap-1.5" role="group" aria-label="數字鍵盤">
    <button
      v-for="key in keys"
      :key="key.value"
      :class="
        key.value === 'backspace'
          ? 'bg-red-100 hover:bg-red-200 text-red-500'
          : 'bg-numpad-btn hover:bg-[#E8D5C8] text-text-main'
      "
      class="h-11 rounded-lg text-base font-normal active:bg-[#D4C0B0] active:scale-95 transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      :aria-label="key.value === 'backspace' ? '退格' : key.label"
      @click="emit('input', key.value)"
    >
      <template v-if="key.value === 'backspace'">
        <svg
          class="mx-auto"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
          <line x1="18" y1="9" x2="12" y2="15" />
          <line x1="12" y1="9" x2="18" y2="15" />
        </svg>
      </template>
      <template v-else>{{ key.label }}</template>
    </button>
  </div>
</template>
