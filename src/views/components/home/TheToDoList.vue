<script setup lang="ts">
import { type PropType } from 'vue'
import { deleteTask } from '@/controller/task-controller'
import TheTask from './TheTask.vue'

interface Task {
  id: string
  task: string
}

defineProps({
  tasks: {
    type: Array as PropType<Task[]>,
    required: true,
  },
})

// const tasks = ref([...props.tasks])
const emit = defineEmits(['remove'])

const removeTask = async (id: string) => {
  try {
    await deleteTask(id)
    emit('remove', id)
    // tasks.value = tasks.value.filter((task) => task.id !== id)
  } catch (error) {
    console.error('Failed to delete task', error)
  }
}

// onMounted(fetchTasks)
</script>

<template>
  <section v-if="tasks.length > 0">
    <ul>
      <TheTask v-for="task in tasks" :key="task.id" :task="task" @remove="removeTask" />
    </ul>
  </section>

  <section v-else>Nothing found.</section>
</template>
