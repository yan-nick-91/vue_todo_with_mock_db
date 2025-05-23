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

const emit = defineEmits(['update:modelValue'])

const onChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <section>
    <select
      :class="`cursor-pointer ${isBordered ? 'border' : ''}`"
      :value="modelValue"
      @change="onChange"
    >
      <option v-for="item in items" :key="item" :value="item">
        {{ item }}
      </option>
    </select>
  </section>
</template>
