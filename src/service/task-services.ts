import { TASK_ENDPOINT } from '@/const/api'

/**
 * Uses the data which is given by the client to send a request to persist this data
 * @param taskData the given data by client
 */
export const sendRequestToCreateNewTask = async (taskData: unknown) => {
  const response = await fetch(TASK_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  })

  if (!response.ok) throw new Error(response.statusText)
}

/**
 * Sends request from client to retrieve all available tasks
 * @returns All available tasks that were persisted
 */
export const sendRequestToGetAllTasks = async () => {
  const response = await fetch(TASK_ENDPOINT, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) throw new Error(response.statusText)
  return response.json()
}

export const sendRequestToDeleteTask = async (id: unknown) => {
  const response = await fetch(`${TASK_ENDPOINT}/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) throw new Error(response.statusText)

  console.log(`Task with id ${id} deleted`)
}
