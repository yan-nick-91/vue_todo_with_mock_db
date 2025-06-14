<script setup lang="ts">
import { SUCCESS, DANGER } from '@/const/base-types'
import BaseButton from '@/views/UI/BaseButton.vue'

defineProps({
  showConfirmDialog: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
  <div v-show="showConfirmDialog" class="flex justify-center items-center z-50">
    <div class="bg-white p-6 rounded shadow-lg w-[90%] max-w-md">
      <h2 class="text-xl font-bold mb-4">Are you sure?</h2>
      <p class="mb-4">This will permanently remove the selected tasks.</p>
      <div class="flex gap-4 justify-end">
        <BaseButton :btn-type="DANGER" @click="emit('confirm')">Yes, remove</BaseButton>
        <BaseButton :btn-type="SUCCESS" @click="emit('cancel')">Cancel</BaseButton>
      </div>
    </div>
  </div>
</template>
