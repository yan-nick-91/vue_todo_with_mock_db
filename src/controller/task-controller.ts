import {
  sendRequestToCreateNewTask,
  sendRequestToGetAllTasks,
  sendRequestToUpdateTask,
  sendRequestToDeleteTask,
} from '@/service/task-services'


export const addTask = (taskData: unknown) => sendRequestToCreateNewTask(taskData)

export const getTasks = () => sendRequestToGetAllTasks()

export const updateTask = (id: string, taskData: unknown) => sendRequestToUpdateTask(id, taskData)

export const deleteTask = (id: string) => sendRequestToDeleteTask(id)
