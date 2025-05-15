<script setup lang="ts">
import { onMounted, ref } from 'vue'
import TheCreateTask from '../home/TheCreateTask.vue'
import TheToDoList from '../home/TheToDoList.vue'
import BaseContainer from '@/UI/BaseContainer.vue'
import { getTasks, updateTask } from '@/controller/task-controller'
import type { Task } from '@/interface/task'
import BaseButton from '@/UI/BaseButton.vue'
import { DANGER, SUCCESS } from '@/const/base-types'

const createTaskModalIsOpen = ref(false)
const updateModalIsOpen = ref(false)
const tasks = ref<Task[]>([])
const selectedTask = ref<Task | null>(null)

const fetchTasks = async () => {
  try {
    tasks.value = await getTasks()
  } catch (error) {
    console.error('Error fetching tasks:', error)
  }
}

const openCreateTaskModal = () => {
  createTaskModalIsOpen.value = true
}

const closeCreateTaskModal = () => {
  createTaskModalIsOpen.value = false
}

const onTaskCreated = async (newTask: never) => {
  tasks.value.push(newTask)
}

const saveUpdatedTask = async () => {
  console.log('Selected Task:', selectedTask.value)
  // Logic to save the updated task
  if (selectedTask.value) {
    try {
      await updateTask(selectedTask.value.id, selectedTask.value)
      tasks.value = tasks.value.map((task) =>
        task.id === selectedTask.value!.id ? selectedTask.value! : task,
      )
      updateModalIsOpen.value = false
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }
}

onMounted(fetchTasks)
</script>

<template>
  <section>
    <BaseContainer class="mx-auto my-5 p-4" is-bordered>
      <h1>To Do's</h1>
      <hr />
      <TheToDoList class="mt-2 mb-2" :tasks="tasks" />
      <BaseButton
        :btn-type="SUCCESS"
        class="cursor-pointer p-2 rounded transform active:scale-95"
        @click="openCreateTaskModal"
      >
        Create task
      </BaseButton>
    </BaseContainer>
    <TheCreateTask
      :modal-is-open="createTaskModalIsOpen"
      @close="closeCreateTaskModal"
      @handelSubmit="onTaskCreated"
    />
    <div v-if="updateModalIsOpen" class="border w-[80%] mx-auto p-4">
      <input type="text" v-model="selectedTask!.task" class="border p-1 w-[100%]" />
      <div class="flex gap-2 mt-2">
        <BaseButton
          :btn-type="SUCCESS"
          class="cursor-pointer p-2 rounded transform active:scale-95"
          @click="saveUpdatedTask"
        >
          Save
        </BaseButton>
        <BaseButton
          :btn-type="DANGER"
          class="cursor-pointer p-2 rounded transform active:scale-95"
          @click="updateModalIsOpen = false"
        >
          Cancel
        </BaseButton>
      </div>
    </div>
  </section>
</template>
