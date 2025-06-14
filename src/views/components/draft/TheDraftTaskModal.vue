<script setup lang="ts">
import type { PropType } from 'vue'
import TaskForm from '../task/TaskForm.vue'
import type { Task } from '@/interface/Task'

defineProps({
  modalIsOpen: {
    type: Boolean,
  },
  draftedTasks: {
    type: Object as PropType<Task>,
  },
})

const emit = defineEmits(['open:draft', 'close:draft'])
</script>

<template>
  <TaskForm
    :mode="'draft'"
    :modal-is-open="modalIsOpen"
    :drafted-task="draftedTasks"
    @close="emit('close:draft')"
  />
</template>
