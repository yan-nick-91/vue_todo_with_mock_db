<script setup lang="ts">
import { DANGER } from '@/const/base-types'
import BaseButton from '@/views/UI/BaseButton.vue'
import BaseContainer from '@/views/UI/BaseContainer.vue'
import { ExclamationCircleIcon } from '@heroicons/vue/16/solid'

defineProps({
  taskLabel: {
    type: String,
  },
  deleteBtnSelected: {
    type: Boolean,
    required: true,
  },
})
</script>

<template>
  <BaseContainer>
    <div>
      <div class="flex gap-1">
        <ExclamationCircleIcon class="h-6 w-6 text-red-700" /> <strong>Warning:</strong>
      </div>
    </div>
    <div class="px-2 pl-6">
      <p>You are about to permanently delete the task: {{ taskLabel }}</p>
      <p>
        This action cannot be undone. Click <strong>Confirm</strong> to proceed, or
        <strong>Cancel</strong> to close this window
      </p>
    </div>
    <div class="flex gap-2 mt-4">
      <BaseButton
        @click="$emit('delete')"
        :btn-type="DANGER"
        class="cursor-pointer p-1 rounded transform active:scale-95"
        >Confirm</BaseButton
      >
      <BaseButton
        @click="$emit('cancel')"
        class="cursor-pointer p-1 rounded transform active:scale-95"
        >Cancel</BaseButton
      >
    </div>
  </BaseContainer>
</template>
