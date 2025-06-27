<script setup lang="ts">
import { DANGER } from '@/const/base-types'
import BaseMessageDisplay from '@/views/UI/BaseMessageDisplay.vue'

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  dateInputErrorMessage: {
    type: String,
    required: true,
    default: '',
  },
  dateId: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <section>
    <h4 class="sr-only">{{ label }} input section</h4>
    <label :for="`${dateId}`">{{ label }}</label>
    <input
      type="date"
      class="border p-1 mb-2 w-full"
      :class="dateInputErrorMessage ? 'border-red-500 bg-red-200' : ''"
      :value="modelValue"
      @input="updateValue"
      :id="`${dateId}`"
    />
    <BaseMessageDisplay
      v-if="dateInputErrorMessage"
      :type="DANGER"
      :message="dateInputErrorMessage"
    />
  </section>
</template>
