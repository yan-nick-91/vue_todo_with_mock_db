<script setup lang="ts">
defineProps({
  isBordered: {
    type: Boolean,
    default: false,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <section :class="`${fullWidth ? 'w-full' : 'w-[80%]'} ${isBordered ? 'border' : ''}`">
    <slot></slot>
  </section>
</template>
