<script setup lang="ts">
import { DANGER } from '@/const/base-types'

defineProps({
  dateInputValue: {
    type: String,
    required: true,
  },
  dateInputErrorMessage: {
    type: String,
    required: true,
  },
  dateId: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <label for="startDate">Start date</label>
  <input
    type="date"
    :class="`border p-1 mb-2 w-[100%] ${dateInputErrorMessage ? 'border-red-500 bg-red-200' : ''}`"
    @input="updateValue"
    id="startDate"
  />
  <BaseMessageDisplay
    v-if="dateInputErrorMessage"
    :type="DANGER"
    :message="dateInputErrorMessage"
  />
</template>
