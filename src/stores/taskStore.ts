import { getTaskId } from './../controller/task-controller'
import { defineStore } from 'pinia'

import { getAllDraftedTasks, getAllFinishedTasks, getTasks } from '@/controller/task-controller'
import { computed, ref } from 'vue'
import type { Task } from '@/interface/Task'
import type { PRIORITIES } from '@/const/base-types'
import { FilterTaskMode } from '@/const/enums/ModeStates'

export const taskStore = defineStore('taskStore', () => {
  const allTasks = ref<Task[]>([])
  const createdTasks = ref<Task[]>([])
  const draftedTasks = ref<Task[]>([])
  const finishedTasks = ref<Task[]>([])
  const selectedTask = ref<Task | null>(null)

  // const filteredTaskMode = ref<FilterTaskMode>()
  const filteredTasks = ref<Task[]>([])
  const selectedPriority = ref<(typeof PRIORITIES)[number] | ''>('')
  const filterApplied = ref(false)

  const refreshTasks = async () => {
    createdTasks.value = await getTasks()
    draftedTasks.value = await getAllDraftedTasks()
    finishedTasks.value = await getAllFinishedTasks()
  }

  const activeTasks = computed(() =>
    createdTasks.value.filter((task) => !task.is_drafted && !task.is_finished),
  )

  const completedTasks = computed(() => {
    const tasks = finishedTasks.value.filter((task) => !task.isDrafted && task.isFinished)
    if (!filterApplied.value || !selectedPriority.value) return tasks
    return tasks.filter((task) => task.priority === selectedPriority.value)
  })

  const fetchTaskById = async (id: string) => {
    try {
      selectedTask.value = await getTaskId(id)
    } catch {
      selectedTask.value = null
    }
  }

  const filterByPriority = (taskMode: FilterTaskMode) => {
    const baseTasks = getTaskByMode(taskMode)

    if (!selectedPriority.value) {
      filteredTasks.value = baseTasks
      filterApplied.value = false
    } else {
      filteredTasks.value = baseTasks.filter((task) => task.priority === selectedPriority.value)
      filterApplied.value = true
    }
  }

  const getTaskByMode = (taskMode: FilterTaskMode) => {
    switch (taskMode) {
      case FilterTaskMode.HOME:
        return activeTasks.value
      case FilterTaskMode.COMPLETED:
        return completedTasks.value
      default:
        return []
    }
  }

  const clearAllFiltering = (taskMode: FilterTaskMode) => {
    selectedPriority.value = ''
    filteredTasks.value = getTaskByMode(taskMode)
    filterApplied.value = false
  }

  return {
    // state
    allTasks,
    activeTasks,
    completedTasks,
    draftedTasks,
    finishedTasks,
    selectedTask,
    selectedPriority,
    filterApplied,
    filteredTasks,
    // actions
    refreshTasks,
    fetchTaskById,
    filterByPriority,
    clearAllFiltering,
  }
})
