<script setup lang="ts">
import type { PropType } from 'vue'

interface Task {
  id: string
  task: string
}

const props = defineProps({
  task: {
    type: Object as PropType<Task>,
    required: true,
  },
})

const emit = defineEmits(['remove'])

const removeTask = () => {
  emit('remove', props.task.id)
}
</script>

<template>
  <li>
    <div class="flex gap-2 mb-2">
      <span class="mr-2 w-[80%] p-2 border">
        {{ props.task.task }}
      </span>
      <button class="cursor-pointer p-2 bg-teal-600 text-amber-50 rounded">Update</button>
      <button class="cursor-pointer p-2 bg-red-500 text-amber-50 rounded" @click="removeTask">
        Delete
      </button>
    </div>
  </li>
</template>
