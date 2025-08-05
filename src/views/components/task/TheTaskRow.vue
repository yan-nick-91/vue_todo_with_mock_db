<script setup lang="ts">
import { type PropType } from 'vue'
import { RouterLink } from 'vue-router'
import type { Task } from '@/interface/TaskItem'
import { ChevronRightIcon } from '@heroicons/vue/16/solid'
import TheDraftedTask from '../draft/TheDraftedTask.vue'
import { TaskItemMode } from '@/const/enums/ModeStates'

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
    type: String as PropType<TaskItemMode>,
  },
  taskMode: {
    type: String as PropType<'main' | 'complete'>,
  },
})

const emit = defineEmits(['selected', 'click'])
</script>

<template>
  <li v-if="props.mode === TaskItemMode.DEFAULT">
    <div v-if="props.taskMode === 'main' || props.taskMode === 'complete'">
      <article class="flex gap-2 mb-2" :aria-labelledby="`task-${task.id}-label`">
        <input
          type="checkbox"
          class="border cursor-pointer"
          :checked="isSelected"
          :id="`checkbox-${task.id}`"
          :aria-checked="isSelected"
          :aria-labelledby="`checkbox-${task.id} task-${task.id}-label`"
          @change="emit('selected', task)"
        />
        <RouterLink
          :to="{ name: 'task', params: { id: props.task.id } }"
          class="flex flex-col md:flex-row justify-between w-full p-2 border transform active:scale-99"
          :aria-labelledby="`task-${task.id}-label`"
          role="link"
        >
          <div class="flex items-center gap-2 md:mb-0 mb-2">
            <ChevronRightIcon class="h-6 w-6 text-gray-800" />
            {{ props.task.task }}
            <span v-if="new Date(props.task.end_date) < new Date() && !props.task.is_finished">
              <span class="text-red-600 text-sm font-medium">(Past Due)</span>
            </span>
          </div>
          <hr class="md:hidden w-full border-gray-300 my-1" />
          <span
            :id="`task-${task.id}-label`"
            class="flex items-center gap-1 flex-wrap sm:flex-nowrap"
          >
            <strong>Created at: </strong>
            <time :datetime="props.task.created_at" class="block sm:inline">
              {{ props.task.created_at }}
            </time>
          </span>
        </RouterLink>
      </article>
    </div>
  </li>
  <li v-if="props.mode === TaskItemMode.DRAFT">
    <TheDraftedTask
      :task="task"
      :is-selected="isSelected"
      @selected="emit('selected', task)"
      @click="emit('click')"
    />
  </li>
</template>
