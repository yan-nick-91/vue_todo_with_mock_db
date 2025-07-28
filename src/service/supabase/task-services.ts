import supabase from './config/supabase'

export const sendRequestToCreateNewTask = async (taskData: unknown) => {
  const { error } = await supabase.from('tasks').insert(taskData)

  if (error) throw new Error(error.message)
}

export const sendRequestToGetAllTasks = async () => {
  const { data, error } = await supabase.from('tasks').select('*')

  if (error) throw new Error(error.message)
  else return JSON.stringify(data)
}

export const sendRequestToGetSpecificTask = async (id: string) => {
  const { data, error } = await supabase.from('tasks').select('*').eq('id', id)

  if (error) throw new Error(error.message)
  else return JSON.stringify(data)
}

export const sendRequestToGetAllFinishedTasks = async () => {
  const { data, error } = await supabase.from('tasks').select('*').eq('is_finished', true)

  if (error) throw new Error(error.message)
  else return JSON.stringify(data)
}

export const sendRequestToGetAllDraftTasks = async () => {
  const { data, error } = await supabase.from('tasks').select('*').eq('is_drafted', true)

  if (error) throw new Error(error.message)
  else return JSON.stringify(data)
}

export const sendRequestToUpdateTask = async (id: string, taskData: unknown) => {
  const { data, error } = await supabase.from('tasks').update(taskData).eq('id', id)

  if (error) throw new Error(error.message)
  else return JSON.stringify(data)
}

export const sendRequestToDeleteTask = async (id: string) => {
  const { data, error } = await supabase.from('tasks').delete().eq('id', id)

  if (error) throw new Error(error.message)
  else return JSON.stringify(data)
}
