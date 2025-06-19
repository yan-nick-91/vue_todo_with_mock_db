<script setup lang="ts">
import type { PropType } from 'vue'
import type { Task } from '@/interface/Task'
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
    <input type="checkbox" class="border" :checked="isSelected" @change="onSelected" @click.stop />
    <BaseButton
      class="flex justify-between w-full p-2 border transform cursor-pointer active:scale-99"
      :btn-type="'transparent'"
      @click="onClick"
    >
      <div class="flex items-center gap-2">
        <ChevronRightIcon class="h-6 w-6 text-gray-800" />
        {{ props.task.task }}
      </div>
      <span><strong>Created at:</strong> {{ props.task.createdAt }}</span>
    </BaseButton>
  </div>
</template>
