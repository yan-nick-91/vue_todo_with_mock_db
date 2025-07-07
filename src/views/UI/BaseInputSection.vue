<script setup lang="ts">
import { DANGER } from '@/const/base-types';
import BaseContainer from '@/views/UI/BaseContainer.vue';
import BaseMessageDisplay from '@/views/UI/BaseMessageDisplay.vue';

defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  labelDisplay: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
  inputError: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}
</script>

<template>
  <BaseContainer full-width>
    <div>
      <label :for="id" class="block font-semibold mb-1">{{ labelDisplay }}</label>
      <input
        :id="id"
        class="border p-1 w-full"
        :class="{ 'border-red-500 bg-red-200': inputError }"
        type="text"
        placeholder="Enter a task..."
        :value="modelValue"
        @input="updateValue"
        aria-required="true"
        :aria-invalid="inputError ? 'true' : 'false'"
        aria-describedby="inputError"
      />
    </div>
    <div class="mb-2 min-h-[1.5rem]">
      <BaseMessageDisplay
        v-if="inputError"
        :id="'inputError'"
        :type="DANGER"
        :message="inputError"
        role="alert"
      />
    </div>
  </BaseContainer>
</template>
