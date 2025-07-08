import { defineStore } from 'pinia'

import { getAllDraftedTasks, getAllFinishedTasks, getTasks } from '@/controller/task-controller'
import { computed, ref } from 'vue'
import type { Task } from '@/interface/Task'

export const taskStore = defineStore('taskStore', () => {
  const allTasks = ref<Task[]>([])
  const draftedTasks = ref<Task[]>([])
  const finishedTasks = ref<Task[]>([])

  const refreshTasks = async () => {
    allTasks.value = await getTasks()
    draftedTasks.value = await getAllDraftedTasks()
    finishedTasks.value = await getAllFinishedTasks()
  }

  const defaultTasks = computed(() =>
    allTasks.value.filter((task) => !task.isDrafted && !task.isFinished),
  )

  return {
    defaultTasks,
    draftedTasks,
    finishedTasks,
    refreshTasks,
  }
})
