<script setup lang="ts">
import type { PropType } from 'vue'
import { type Task } from '@/interface/Task'
import BaseMessageDisplay from '@/views/UI/BaseMessageDisplay.vue'
import TheTask from '../task/TheTask.vue'
import { LIST_OF_COMPLETED_TASKS_IS_EMPTY } from '@/const/task'

defineProps({
  finishedTasks: {
    type: Array as PropType<Task[]>,
    required: true,
  },
})
</script>

<template>
  <section v-if="finishedTasks.length > LIST_OF_COMPLETED_TASKS_IS_EMPTY">
    <ul>
      <TheTask
        v-for="task in finishedTasks"
        :key="task.id"
        :task="task"
        :mode="'task'"
        :task-mode="'complete'"
        @selected="$emit('selected', $event)"
      />
    </ul>
  </section>
  <section v-else>
    <BaseMessageDisplay :message="'No task has been finished yet'" />
  </section>
</template>
