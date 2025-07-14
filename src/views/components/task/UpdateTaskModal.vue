<script setup lang="ts">
import { type PropType } from 'vue'
import type { Task } from '@/interface/Task'

import TaskForm from './form/TaskForm.vue'

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
    <div @click.stop class="w-[80%] max-h-[100vh] overflow-y-auto bg-white shadow-md">
      <TaskForm
        :mode="'edit'"
        :modal-is-open="modalIsOpen"
        :task-to-edit="taskToEdit"
        @handle-submit="handleUpdate"
        @close="closeModal"
        class="w-full"
      />
    </div>
  </div>
</template>
