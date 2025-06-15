<script setup lang="ts">
import type { PropType } from 'vue'
import type { Task } from '@/interface/Task'
import TaskForm from '../task/TaskForm.vue'

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
  <div
    v-if="modalIsOpen"
    class="fixed inset-0 z-40 flex items-center justify-center bg-black/40"
    @click="emit('close:draft')"
  >
    <div @click.stop>
      <TaskForm
        :mode="'draft'"
        :modal-is-open="modalIsOpen"
        :drafted-task="draftedTasks"
        @close="emit('close:draft')"
        class="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-xl"
      />
    </div>
  </div>
</template>
