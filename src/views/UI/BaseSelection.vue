<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  items: {
    type: Array as PropType<readonly string[]>,
    required: true,
  },
  isBordered: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <section>
    <select
      :class="`cursor-pointer ${isBordered ? 'border' : ''}`"
      :value="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option v-for="item in items" :key="item" :value="item">
        {{ item }}
      </option>
    </select>
  </section>
</template>
