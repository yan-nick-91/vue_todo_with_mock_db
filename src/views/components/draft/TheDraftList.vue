<script setup lang="ts">
import { type PropType, computed } from 'vue'
import type { Task } from '@/interface/Task'
import { LIST_OF_DRAFTED_TASKS_IS_EMPTY } from '@/const/task'
import BaseMessageDisplay from '@/views/UI/BaseMessageDisplay.vue'
import TheTaskRow from '../task/TheTaskRow.vue'

const props = defineProps({
  draftedTasks: {
    type: Array as PropType<Task[]>,
    required: true,
  },
})

const visibleDraftTasks = computed(() => {
  return props.draftedTasks.filter((task) => task.isDrafted)
})
</script>

<template>
  <section v-if="visibleDraftTasks.length > LIST_OF_DRAFTED_TASKS_IS_EMPTY">
    <ul>
      <TheTaskRow
        v-for="task in draftedTasks"
        :key="task.id"
        :task="task"
        :mode="'draft'"
        @selected="$emit('selected', $event)"
      />
    </ul>
  </section>
  <section v-else>
    <BaseMessageDisplay :message="'Nothing found.'" />
  </section>
</template>
