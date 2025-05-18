<script setup lang="ts">
import type { Task } from '@/interface/task'
import type { PropType } from 'vue'
import { RouterLink } from 'vue-router'
import { ChevronRightIcon } from '@heroicons/vue/16/solid'

const props = defineProps({
  task: {
    type: Object as PropType<Task>,
    required: true,
  },
})
</script>

<template>
  <li>
    <div class="flex gap-2 mb-2">
      <RouterLink
        :to="{ name: 'task', params: { id: props.task.id } }"
        class="flex justify-between w-full p-2 border transform active:scale-99"
      >
        <div class="flex items-center gap-2">
          <ChevronRightIcon class="h-6 w-6 text-gray-800" />
          {{ props.task.task }}
        </div>
        <span><strong>Created at:</strong> {{ props.task.createdAt }}</span>
      </RouterLink>
    </div>
  </li>
</template>
