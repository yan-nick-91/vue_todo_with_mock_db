<script setup lang="ts">
import { type PropType, computed } from 'vue'
import TheTask from '../task/TheTask.vue'
import type { Task } from '@/interface/Task'
import BaseNotification from '@/views/UI/BaseNotification.vue'

const props = defineProps({
  tasks: {
    type: Array as PropType<Task[]>,
    required: true,
  },
})

const visibleTasks = computed(() => {
  return props.tasks.filter((task) => !task.isFinished)
})
</script>

<template>
  <section v-if="visibleTasks.length > 0">
    <ul>
      <TheTask
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        v-show="!task.isFinished"
        @selected="$emit('selected', $event)"
      />
    </ul>
  </section>
  <section v-else>
    <BaseNotification :message="'Nothing found.'" />
  </section>
</template>
