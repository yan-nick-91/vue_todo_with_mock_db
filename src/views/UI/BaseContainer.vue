<script setup lang="ts">
defineProps({
  isBordered: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <section :class="`w-[80%] ${isBordered ? 'border' : ''}`">
    <slot> </slot>
  </section>
</template>
