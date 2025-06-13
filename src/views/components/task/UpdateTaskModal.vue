<script setup lang="ts">
import { type PropType } from 'vue'
import type { Task } from '@/interface/Task'

import TaskForm from './TaskForm.vue'

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
  <div
    v-if="modalIsOpen"
    class="fixed inset-0 z-40 flex items-center justify-center bg-black/40"
    @click="closeModal"
  >
    <div @click.stop>
      <TaskForm
        :mode="'edit'"
        :modal-is-open="modalIsOpen"
        :task-to-edit="taskToEdit"
        @handle-submit="handleUpdate"
        @close="closeModal"
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-xl"
      />
    </div>
  </div>
</template>
