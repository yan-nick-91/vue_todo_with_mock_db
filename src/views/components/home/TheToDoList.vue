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
})
</script>

<template>
  <section v-if="tasks.length > 0">
    <ul>
      <TheTask v-for="task in tasks" :key="task.id" :task="task" />
    </ul>
  </section>
  <section v-else>
    <BaseNotification :message="'Nothing found.'" />
  </section>
</template>
