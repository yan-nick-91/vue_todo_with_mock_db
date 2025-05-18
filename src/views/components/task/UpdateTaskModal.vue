<script setup lang="ts">
import { type PropType } from 'vue'
import BaseContainer from '@/views/UI/BaseContainer.vue'
import BaseButton from '@/views/UI/BaseButton.vue'
import type { Task } from '@/interface/task'
import { updateTask } from '@/controller/task-controller'
import { SUCCESS } from '@/const/base-types'

defineProps({
  modalIsOpen: {
    type: Boolean,
  },
  updateBtnIsSelected: {
    type: Boolean,
    required: true,
  },
  taskToEdit: {
    type: Object as PropType<Task>,
  },
})

const emit = defineEmits(['updated', 'close'])

const handleUpdate = async (updatedTask: Task) => {
  try {
    await updateTask(updatedTask.id, updatedTask)
    emit('updated', updatedTask)
    emit('close')
  } catch (error) {
    console.error('Failed to update task:', error)
  }
}

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <BaseContainer>
    <h2>Update</h2>
    <div>
      <input type="text" class="border" />
    </div>
    <div class="flex gap-2">
      <BaseButton
        @click="handleUpdate"
        :btn-type="SUCCESS"
        class="cursor-pointer p-1 transform active:scale-95"
        >Confirm</BaseButton
      >
      <BaseButton @click="closeModal" class="cursor-pointer p-1 transform active:scale-95"
        >Cancel</BaseButton
      >
    </div>
  </BaseContainer>
</template>
