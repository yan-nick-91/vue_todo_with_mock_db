import {
  sendRequestToCreateNewTask,
  sendRequestToGetAllTasks,
  sendRequestToDeleteTask,
} from '@/service/task-services'

export const addTask = (taskData: unknown) => sendRequestToCreateNewTask(taskData)

export const getTasks = () => sendRequestToGetAllTasks()

export const deleteTask = (id: string) => sendRequestToDeleteTask(id)
