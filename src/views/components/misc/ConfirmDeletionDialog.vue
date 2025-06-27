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
  <section
    v-if="showConfirmDialog"
    class="flex justify-center items-center z-50"
    role="dialog"
    aria-modal="true"
    aria-labelledby="confirm-dialog-title"
    aria-describedby="confirm-dialog-description"
  >
    <div class="bg-white p-6 rounded shadow-lg w-[90%] max-w-md">
      <h2 id="confirm-dialog-title" class="text-xl font-bold mb-4">Are you sure?</h2>
      <p id="confirm-dialog-description" class="mb-4">
        This will permanently remove the selected tasks.
      </p>
      <section class="flex gap-4 justify-end">
        <BaseButton :btn-type="DANGER" @click="emit('confirm')" :aria-label="'Confirm removal'"
          >Yes, remove</BaseButton
        >
        <BaseButton :btn-type="SUCCESS" @click="emit('cancel')" :aria-label="'Cancel removal'"
          >Cancel</BaseButton
        >
      </section>
    </div>
  </section>
</template>
