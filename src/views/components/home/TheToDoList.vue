<script setup lang="ts">
import { type PropType, computed } from 'vue'
import type { Task } from '@/interface/TaskItem'
import TheTaskRow from '../task/TheTaskRow.vue'
import BaseMessageDisplay from '@/views/UI/BaseMessageDisplay.vue'
import { LIST_OF_NON_COMPLETED_TASKS_IS_EMPTY } from '@/const/task'
import { TaskItemMode } from '@/const/enums/ModeStates'

const props = defineProps({
  tasks: {
    type: Array as PropType<Task[]>,
    required: true,
  },
})

const emit = defineEmits(['selected'])

const visibleTasks = computed(() => {
  return props.tasks.filter((task) => !task.is_finished && !task.is_drafted)
})
</script>

<template>
  <div>
    <section v-if="visibleTasks.length > LIST_OF_NON_COMPLETED_TASKS_IS_EMPTY">
      <ul aria-label="To-Do List">
        <TheTaskRow
          v-for="task in visibleTasks"
          :key="task.id"
          :task="task"
          @selected="emit('selected', $event)"
          :mode="TaskItemMode.DEFAULT"
          :task-mode="'main'"
        />
      </ul>
    </section>
    <section v-else>
      <BaseMessageDisplay :message="'Nothing found.'" />
    </section>
  </div>
</template>
