<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAllFinishedTasks } from '@/controller/task-controller'
import type { Task } from '@/interface/task'
import TheTask from '../components/home/TheTask.vue'

const finishedTasks = ref<Task[]>([])

const getFinishedTasks = async () => {
  try {
    const tasks = await getAllFinishedTasks()
    finishedTasks.value = tasks
  } catch (error) {
    console.error('Error fetching finished tasks:', error)
  }
}

onMounted(() => {
  getFinishedTasks()
})
</script>

<template>
  <h1>About</h1>
  <ul>
    <li v-for="task in finishedTasks" :key="task.id">
      <TheTask :task="task" />
    </li>
  </ul>
</template>
