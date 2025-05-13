<script setup lang="ts">
import { ref } from 'vue'

import { addTask } from '@/controller/task-controller'
import { generateCurrentDate, generateTaskId } from '@/util/valueGenerator'
import { invalidInput } from '@/errors/task-error-handler'
import BaseNotification from '@/UI/BaseNotification.vue'
import { DANGER, SUCCESS } from '@/const/base-types'
import BaseButton from '@/UI/BaseButton.vue'

defineProps({
  modalIsOpen: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close', 'handleSubmit'])

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
      createdAt: generateCurrentDate(),
      updatedAt: '',
      isFinished: false,
      bulletList: [],
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
          :class="`border p-1 w-[100%]
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
        <BaseButton
          type="submit"
          :btn-type="SUCCESS"
          class="cursor-pointer p-2 rounded transform active:scale-95"
        >
          Add Task
        </BaseButton>
        <BaseButton
          class="cursor-pointer rounded p-2 transform active:scale-95"
          :btn-type="DANGER"
          @click="closeModalFormTask"
        >
          Cancel
        </BaseButton>
      </div>
    </form>
  </section>
</template>
