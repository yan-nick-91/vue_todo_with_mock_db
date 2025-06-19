<script setup lang="ts">
defineProps({
  badgeDisplay: {
    type: [String, Number],
    required: true,
  },
  ariaLabel: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: false,
  },
})
</script>

<template>
  <div class="pr-1 flex items-center gap-2 cursor-pointer">
    <span
      v-if="badgeDisplay"
      class="flex h-5 w-5 items-center justify-center rounded-full px-2 py-1 text-[13.5px] font-bold text-white bg-red-600"
      :role="role"
      :aria-label="ariaLabel"
    >
      {{ badgeDisplay }}
    </span>
  </div>
</template>
