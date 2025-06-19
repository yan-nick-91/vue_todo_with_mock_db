<script setup lang="ts">
import { type PropType, computed } from 'vue'
import type { Task } from '@/interface/Task'
import TheTaskRow from '../task/TheTaskRow.vue'
import BaseMessageDisplay from '@/views/UI/BaseMessageDisplay.vue'
import { LIST_OF_NON_COMPLETED_TASKS_IS_EMPTY } from '@/const/task'

const props = defineProps({
  tasks: {
    type: Array as PropType<Task[]>,
    required: true,
  },
})

const emit = defineEmits(['selected'])

const visibleTasks = computed(() => {
  return props.tasks.filter((task) => !task.isFinished && !task.isDrafted)
})
</script>

<template>
  <div>
    <section v-if="visibleTasks.length > LIST_OF_NON_COMPLETED_TASKS_IS_EMPTY">
      <ul>
        <TheTaskRow
          v-for="task in visibleTasks"
          :key="task.id"
          :task="task"
          @selected="emit('selected', $event)"
          :mode="'task'"
          :task-mode="'main'"
        />
      </ul>
    </section>
    <section v-else>
      <BaseMessageDisplay :message="'Nothing found.'" />
    </section>
  </div>
</template>
