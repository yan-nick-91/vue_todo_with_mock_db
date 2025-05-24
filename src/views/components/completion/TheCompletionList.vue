<script setup lang="ts">
import type { PropType } from 'vue'
import { type Task } from '@/interface/task'
import BaseNotification from '@/views/UI/BaseNotification.vue'
import TheTask from '../task/TheTask.vue'

defineProps({
  finishedTasks: {
    type: Array as PropType<Task[]>,
    required: true,
  },
})
</script>

<template>
  <section v-if="finishedTasks.length > 0">
    <ul>
      <TheTask
        v-for="task in finishedTasks"
        :key="task.id"
        :task="task"
        v-show="task.isFinished"
        @selected="$emit('selected', $event)"
      />
    </ul>
  </section>
  <section v-else>
    <BaseNotification :message="'No task has been finished yet'" />
  </section>
</template>
