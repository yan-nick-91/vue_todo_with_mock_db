import {
  sendRequestToCreateNewTask,
  sendRequestToGetAllTasks,
  sendRequestToUpdateTask,
  sendRequestToDeleteTask,
  sendRequestToGetSpecificTask,
  sendRequestToGetAllFinishedTasks,
  sendRequestToGetAllDraftTasks,
} from '@/service/task-services'

export const addTask = (taskData: unknown) => sendRequestToCreateNewTask(taskData)

export const getTasks = () => sendRequestToGetAllTasks()

export const getTaskId = (id: string) => sendRequestToGetSpecificTask(id)

export const getAllFinishedTasks = () => sendRequestToGetAllFinishedTasks()

export const getAllDraftedTasks = () => sendRequestToGetAllDraftTasks()

export const updateTask = (id: string, taskData: unknown) => sendRequestToUpdateTask(id, taskData)

export const deleteTask = (id: string) => sendRequestToDeleteTask(id)
