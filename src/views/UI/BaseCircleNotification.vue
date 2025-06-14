<script setup lang="ts">
defineProps({
  counterDisplay: {
    type: [String, Number],
    required: true,
  },
})
</script>

<template>
  <div class="pr-1 flex items-center gap-2 cursor-pointer">
    <span
      v-if="counterDisplay"
      class="flex h-5 w-5 items-center justify-center rounded-full px-2 py-1 text-xs font-bold text-white bg-red-600"
    >
      {{ counterDisplay }}
    </span>
  </div>
</template>
