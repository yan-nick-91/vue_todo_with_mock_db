<script setup lang="ts">
import type { PropType } from 'vue'
import type { Task } from '@/interface/TaskItem'
import BaseButton from '@/views/UI/BaseButton.vue'
import { ChevronRightIcon } from '@heroicons/vue/16/solid'

const props = defineProps({
  task: {
    type: Object as PropType<Task>,
    required: true,
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click', 'selected'])

const onSelected = () => emit('selected', props.task)
const onClick = () => emit('click')
</script>

<template>
  <div class="flex gap-2 mb-2">
    <input
      type="checkbox"
      class="border cursor-pointer"
      :checked="isSelected"
      @change="onSelected"
      @click.stop
    />
    <BaseButton
      class="flex flex-col md:flex-row justify-between w-full p-2 border transform cursor-pointer active:scale-99"
      :btn-type="'transparent'"
      @click="onClick"
    >
      <div class="flex items-center gap-2 md:mb-0 mb-2">
        <ChevronRightIcon class="h-6 w-6 text-gray-800" />
        {{ props.task.task }}
      </div>
      <hr class="md:hidden w-full border-gray-300 my-1" />
      <span class="flex items-center gap-1 flex-wrap sm:flex-nowrap">
        <strong>Created at:</strong>
        <time :datetime="props.task.created_at" class="block sm:inline">{{
          props.task.created_at
        }}</time></span
      >
    </BaseButton>
  </div>
</template>
