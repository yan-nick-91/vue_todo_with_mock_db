<script setup lang="ts">
import { type PropType } from 'vue'
import { RouterLink } from 'vue-router'
import type { Task } from '@/interface/Task'
import { ChevronRightIcon } from '@heroicons/vue/16/solid'
import TheDraftedTask from '../draft/TheDraftedTask.vue'

const props = defineProps({
  task: {
    type: Object as PropType<Task>,
    required: true,
  },
  isSelected: {
    type: Boolean,
    required: false,
    default: false,
  },
  mode: {
    type: String as PropType<'draft' | 'task'>,
  },
  taskMode: {
    type: String as PropType<'main' | 'complete'>,
  },
})

const emit = defineEmits(['selected', 'click'])
</script>

<template>
  <li v-if="props.mode === 'task'">
    <div v-if="props.taskMode === 'main'">
      <div class="flex gap-2 mb-2">
        <input
          type="checkbox"
          class="border"
          :checked="isSelected"
          @change="emit('selected', task)"
        />
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
    </div>

    <div v-if="props.taskMode === 'complete'">
      <div class="flex gap-2 mb-2">
        <input
          type="checkbox"
          class="border"
          :checked="isSelected"
          @change="emit('selected', task)"
        />
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
    </div>
  </li>
  <li v-if="props.mode === 'draft'">
    <TheDraftedTask
      :task="task"
      :is-selected="isSelected"
      @selected="emit('selected', task)"
      @click="emit('click')"
    />
  </li>
</template>
