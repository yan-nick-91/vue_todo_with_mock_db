<script setup lang="ts">
import type { PropType } from 'vue'
import type { Task } from '@/interface/Task'
import TaskForm from '../task/form/TaskForm.vue'

defineProps({
  modalIsOpen: {
    type: Boolean,
  },
  draftedTask: {
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
    <div @click.stop class="w-[80%] max-h-[100vh] overflow-y-auto bg-white shadow-md">
      <TaskForm
        :mode="'draft'"
        :modal-is-open="modalIsOpen"
        :drafted-task="draftedTask"
        @close="emit('close:draft')"
        class="w-full"
      />
    </div>
  </div>
</template>
