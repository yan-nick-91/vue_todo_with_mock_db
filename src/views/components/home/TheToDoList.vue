<script setup lang="ts">
import { type PropType, computed } from 'vue'
import TheTaskRow from '../task/TheTaskRow.vue'
import type { Task } from '@/interface/Task'
import BaseNotification from '@/views/UI/BaseNotification.vue'
import { LIST_OF_NON_COMPLETED_TASKS_IS_EMPTY } from '@/const/task'

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
  <section v-if="visibleTasks.length > LIST_OF_NON_COMPLETED_TASKS_IS_EMPTY">
    <ul>
      <TheTaskRow
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
