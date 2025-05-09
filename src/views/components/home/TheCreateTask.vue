<script setup lang="ts">
import { ref } from 'vue'

import { addTask } from '@/controller/task-controller'
import { generateTaskId } from '@/util/IDgenerator'

const emit = defineEmits(['close', 'handleSubmit'])
defineProps({
  modalIsOpen: {
    type: Boolean,
    default: false,
  },
})

const taskInput = ref('')

const submitNewTask = async () => {
  if (!taskInput.value) return

  try {
    await addTask({
      id: generateTaskId(),
      task: taskInput.value,
    })

    emit('handleSubmit', taskInput.value)
    emit('close')

    taskInput.value = ''
  } catch (err) {
    console.error('Failed to add task:', err)
  }
}
</script>

<template>
  <section v-if="modalIsOpen" class="border w-[80%] mx-auto p-4">
    <form @submit.prevent="submitNewTask">
      <div class="mb-2">
        <input class="border p-1" type="text" placeholder="Enter a task..." v-model="taskInput" />
      </div>
      <div class="flex gap-2">
        <button type="submit" class="cursor-pointer p-2 bg-emerald-700 text-amber-50 rounded">
          Add Task</button
        ><button
          type="button"
          class="cursor-pointer p-2 bg-red-500 text-amber-50 rounded"
          @click="emit('close')"
        >
          Cancel
        </button>
      </div>
    </form>
  </section>
</template>
