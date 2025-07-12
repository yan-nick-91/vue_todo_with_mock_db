import { getTaskId } from './../controller/task-controller'
import { defineStore } from 'pinia'

import { getAllDraftedTasks, getAllFinishedTasks, getTasks } from '@/controller/task-controller'
import { computed, ref } from 'vue'
import type { Task } from '@/interface/Task'

export const taskStore = defineStore('taskStore', () => {
  const allTasks = ref<Task[]>([])
  const draftedTasks = ref<Task[]>([])
  const finishedTasks = ref<Task[]>([])
  const selectedTask = ref<Task | null>(null)

  const refreshTasks = async () => {
    allTasks.value = await getTasks()
    draftedTasks.value = await getAllDraftedTasks()
    finishedTasks.value = await getAllFinishedTasks()
  }

  const defaultTasks = computed(() =>
    allTasks.value.filter((task) => !task.isDrafted && !task.isFinished),
  )

  const fetchTaskById = async (id: string) => {
    try {
      selectedTask.value = await getTaskId(id)
    } catch {
      selectedTask.value = null
    }
  }

  return {
    defaultTasks,
    draftedTasks,
    finishedTasks,
    selectedTask,
    refreshTasks,
    fetchTaskById,
  }
})
