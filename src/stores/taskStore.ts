import { defineStore } from 'pinia'

import { getAllDraftedTasks, getAllFinishedTasks } from '@/controller/task-controller'
import { ref } from 'vue'
import type { Task } from '@/interface/Task'

export const taskStore = defineStore('taskStore', () => {
  const draftedTasks = ref<Task[]>([])
  const finishedTasks = ref<Task[]>([])

  const refreshTasks = async () => {
    draftedTasks.value = await getAllDraftedTasks()
    finishedTasks.value = await getAllFinishedTasks()
  }

  return {
    draftedTasks,
    finishedTasks,
    refreshTasks,
  }
})
