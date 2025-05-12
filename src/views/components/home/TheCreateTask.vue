<script setup lang="ts">
import { ref } from 'vue'

import { addTask } from '@/controller/task-controller'
import { generateTaskId } from '@/util/IDgenerator'
import { invalidInput } from '@/errors/task-error-handler'
import BaseNotification from '@/UI/BaseNotification.vue'
import { DANGER } from '@/const/base-types'

const emit = defineEmits(['close', 'handleSubmit'])
defineProps({
  modalIsOpen: {
    type: Boolean,
    default: false,
  },
})

const taskInput = ref('')
const errorMessage = ref('')

const submitNewTask = async () => {
  if (taskInput.value.trim() === '') {
    errorMessage.value = invalidInput('Input field should not be empty').message
    return
  }
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

const closeModalFormTask = () => {
  taskInput.value = ''
  errorMessage.value = ''
  emit('close')
}
</script>

<template>
  <section v-if="modalIsOpen" class="border w-[80%] mx-auto p-4">
    <form @submit.prevent="submitNewTask">
      <div class="mb-2">
        <input
          :class="`border p-1
          ${errorMessage ? 'border-red-500 bg-red-200' : ''}`"
          type="text"
          placeholder="Enter a task..."
          v-model="taskInput"
          @input="errorMessage = ''"
        />
      </div>
      <div class="mb-2 min-h-[1.5rem]">
        <BaseNotification v-if="errorMessage" :type="DANGER" :message="errorMessage" />
      </div>

      <div class="flex gap-2">
        <button type="submit" class="cursor-pointer p-2 bg-emerald-700 text-amber-50 rounded">
          Add Task</button
        ><button
          type="button"
          class="cursor-pointer p-2 bg-red-500 text-amber-50 rounded"
          @click="closeModalFormTask"
        >
          Cancel
        </button>
      </div>
    </form>
  </section>
</template>
