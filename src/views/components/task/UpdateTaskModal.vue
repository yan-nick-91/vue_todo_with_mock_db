<script setup lang="ts">
import { type PropType } from 'vue'
import type { Task } from '@/interface/task'

import TaskForm from '../misc/TaskForm.vue'

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
    emit('updated', JSON.parse(JSON.stringify(updatedTask)))
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
  <TaskForm
    :mode="'edit'"
    :modal-is-open="modalIsOpen"
    :task-to-edit="taskToEdit"
    @handle-submit="handleUpdate"
    @close="closeModal"
  />
</template>
