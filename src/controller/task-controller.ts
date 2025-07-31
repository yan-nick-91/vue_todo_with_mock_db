import type { BulletItem } from '@/interface/BulletItem'
import {
  sendRequestToCreateNewTask,
  sendRequestToGetAllTasks,
  sendRequestToUpdateTask,
  sendRequestToDeleteTask,
  sendRequestToGetSpecificTask,
  sendRequestToGetAllFinishedTasks,
  sendRequestToGetAllDraftTasks,
  sendRequestToAddBulletsToTask,
  sendRequestToToggleItemIsFinished,
  sendRequestToGetBulletsByTaskId,
  sendRequestToDeleteBulletFromTask,
  sendRequestToDeleteAllBulletsByTaskId,
} from '@/service/supabase/task-services'

export const addTask = (taskData: unknown) => sendRequestToCreateNewTask(taskData)

export const addBulletsToTask = (bulletData: BulletItem[]) =>
  sendRequestToAddBulletsToTask(bulletData)

export const toggleBulletItemFinishingState = (BulletItem: BulletItem, id: string) =>
  sendRequestToToggleItemIsFinished(BulletItem, id)

export const getBulletsByTaskId = (id: string) => sendRequestToGetBulletsByTaskId(id)

export const deleteBulletFromTask = (id: string) => {
  sendRequestToDeleteBulletFromTask(id)
}

export const deleteAllBulletsByTaskId = (taskId: string) =>
  sendRequestToDeleteAllBulletsByTaskId(taskId)

export const getTasks = () => sendRequestToGetAllTasks()

export const getTaskId = (id: string) => sendRequestToGetSpecificTask(id)

export const getAllFinishedTasks = () => sendRequestToGetAllFinishedTasks()

export const getAllDraftedTasks = () => sendRequestToGetAllDraftTasks()

export const updateTask = (id: string, taskData: unknown) => sendRequestToUpdateTask(id, taskData)

export const deleteTask = (id: string) => sendRequestToDeleteTask(id)
