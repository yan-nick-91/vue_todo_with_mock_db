<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getTasks, deleteTask } from '@/controller/task-controller'

interface Task {
  id: string
  task: string
}

const tasks = ref<Task[]>([])

const fetchTasks = async () => {
  try {
    tasks.value = await getTasks()
  } catch (error) {
    console.error('Error fetching tasks:', error)
  }
}

const removeTask = async (id: string) => {
  try {
    await deleteTask(id)
    tasks.value = tasks.value.filter((task) => task.id !== id)
  } catch (error) {
    console.error('Failed to delete task', error)
  }
}

onMounted(fetchTasks)
</script>

<template>
  <section v-if="tasks.length > 0">
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <div class="flex gap-2 mb-2">
          <span class="mr-2 w-[80%] p-2 border">
            {{ task.task }}
          </span>
          <button class="cursor-pointer p-2 bg-teal-600 text-amber-50 rounded">Update</button>
          <button
            class="cursor-pointer p-2 bg-red-500 text-amber-50 rounded"
            @click="removeTask(task.id)"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
  </section>

  <section v-else>Nothing found.</section>
</template>
