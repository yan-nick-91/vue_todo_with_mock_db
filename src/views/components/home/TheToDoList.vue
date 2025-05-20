<script setup lang="ts">
import { type PropType } from 'vue'
import TheTask from './TheTask.vue'
import type { Task } from '@/interface/task'
import BaseNotification from '@/views/UI/BaseNotification.vue'

defineProps({
  tasks: {
    type: Array as PropType<Task[]>,
    required: true,
  },
  selectedTaskItem: {
    type: Array as PropType<Task[]>,
    required: false,
    default: () => [],
  },
})
</script>

<template>
  <section v-if="tasks.length > 0">
    <ul>
      <TheTask
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        v-show="!task.isFinished"
        :is-selected="selectedTaskItem?.some((t) => t.id === task.id)"
        @selected="$emit('selected', $event)"
      />
    </ul>
  </section>
  <section v-else>
    <BaseNotification :message="'Nothing found.'" />
  </section>
</template>
