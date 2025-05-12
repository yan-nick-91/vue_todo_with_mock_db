<script setup lang="ts">
import { onMounted, ref } from 'vue'
import TheCreateTask from '../home/TheCreateTask.vue'
import TheToDoList from '../home/TheToDoList.vue'
import BaseContainer from '@/UI/BaseContainer.vue'
import { getTasks } from '@/controller/task-controller'

interface Task {
  id: string
  task: string
}

const createTaskModalIsOpen = ref(false)
// const tasks = ref([])
const tasks = ref<Task[]>([])

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
  // closeCreateTaskModal()
}

const onTaskRemoved = (id: string) => {
  tasks.value = tasks.value.filter((task) => task.id !== id)
}

onMounted(fetchTasks)
</script>

<template>
  <section>
    <BaseContainer class="mx-auto my-5 p-4" is-bordered>
      <h1>To Do's</h1>
      <hr />
      <TheToDoList class="mt-2 mb-2" :tasks="tasks" @remove="onTaskRemoved" />
      <button
        class="bg-emerald-700 cursor-pointer p-2 text-amber-50 rounded"
        @click="openCreateTaskModal"
      >
        Create task
      </button>
    </BaseContainer>
    <TheCreateTask
      :modal-is-open="createTaskModalIsOpen"
      @close="closeCreateTaskModal"
      @handelSubmit="onTaskCreated"
    />
  </section>
</template>
