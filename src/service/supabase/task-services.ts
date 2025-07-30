import type { BulletItem } from '@/interface/BulletItem'
import supabase from './config/supabase'

export const sendRequestToCreateNewTask = async (taskData: unknown) => {
  const { error } = await supabase.from('tasks').insert(taskData)

  if (error) throw new Error(error.message)
}

export const sendRequestToAddBulletsToTask = async (bulletItem: BulletItem[]) => {
  const { error } = await supabase.from('task_bullet_list').upsert(bulletItem, { onConflict: 'id' })

  if (error) throw new Error(error.message)
}

export const sendRequestToGetBulletsByTaskId = async (taskId: string) => {
  const { data, error } = await supabase.from('task_bullet_list').select('*').eq('task_id', taskId)

  if (error) throw new Error(error.message)
  return data
}

export const sendRequestToToggleItemIsFinished = async (bulletItem: BulletItem, id: string) => {
  const { data, error } = await supabase
    .from('task_bullet_list')
    .update({ item_is_finished: bulletItem.item_is_finished })
    .eq('id', id)

  if (error) throw new Error(error.message)
  return data
}

export const sendRequestToDeleteBulletFromTask = async (taskId: string) => {
  const { error } = await supabase.from('task_bullet_list').delete().eq('task_id', taskId)

  if (error) throw new Error(error.message)
}

export const sendRequestToGetAllTasks = async () => {
  const { data, error } = await supabase.from('tasks').select('*')

  if (error) throw new Error(error.message)
  return data
}

export const sendRequestToGetSpecificTask = async (id: string) => {
  const taskWithBulletsQuery = `id, task, created_at, updated_at, priority, start_date, end_date,
     is_finished, is_drafted, bullet_list:task_bullet_list(id, task_id, bullet_item, item_is_finished)`

  const { data, error } = await supabase
    .from('tasks')
    .select(taskWithBulletsQuery)
    .eq('id', id)
    .single()

  if (error) throw new Error(error.message)
  else return data
}

export const sendRequestToGetAllFinishedTasks = async () => {
  const { data, error } = await supabase.from('tasks').select('*').eq('is_finished', true)

  if (error) throw new Error(error.message)
  return data
}

export const sendRequestToGetAllDraftTasks = async () => {
  const { data, error } = await supabase.from('tasks').select('*').eq('is_drafted', true)

  if (error) throw new Error(error.message)
  return data
}

export const sendRequestToUpdateTask = async (id: string, taskData: unknown) => {
  const { data, error } = await supabase.from('tasks').update(taskData).eq('id', id)

  if (error) throw new Error(error.message)
  return data
}

export const sendRequestToDeleteTask = async (id: string) => {
  const { data, error } = await supabase.from('tasks').delete().eq('id', id)

  if (error) throw new Error(error.message)
  return data
}
