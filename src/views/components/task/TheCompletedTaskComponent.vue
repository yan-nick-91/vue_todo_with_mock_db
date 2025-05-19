<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAllFinishedTasks } from '@/controller/task-controller'
import type { Task } from '@/interface/task'
import BaseContainer from '@/views/UI/BaseContainer.vue'
import TheCompletionList from './TheCompletionList.vue'

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
  <BaseContainer class="mx-auto my-5 p-4" is-bordered>
    <h1>Completed tasks</h1>
    <hr />
    <TheCompletionList class="mt-2 mb-2" :finished-tasks="finishedTasks" />
  </BaseContainer>
</template>
