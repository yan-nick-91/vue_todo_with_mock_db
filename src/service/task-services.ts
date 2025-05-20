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

export const sendRequestToGetSpecificTask = async (id: string) => {
  const response = await fetch(`${TASK_ENDPOINT}/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  if (!response.ok) {
    let errorMessage = `HTTP ${response.status} - ${response.statusText}`
    try {
      // Probeer JSON eerst, als dat faalt wordt het opgevangen hieronder
      const contentType = response.headers.get('content-type')

      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json()
        errorMessage = errorData.message || errorMessage
      } else {
        const text = await response.text() // Alleen als het geen JSON is
        errorMessage = text || errorMessage
      }
    } catch {
      // Als zelfs het lezen mislukt
      errorMessage = 'Er trad een fout op bij het verwerken van de foutmelding.'
    }
    console.error('Failed to fetch task:', errorMessage)
    throw new Error(errorMessage)
  }
  return response.json()
}

export const sendRequestToGetAllFinishedTasks = async () => {
  const response = await fetch(`${TASK_ENDPOINT}?isFinished=true`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) throw new Error(response.statusText)
  return response.json()
}

export const sendRequestToUpdateTask = async (id: string, taskData: unknown) => {
  const response = await fetch(`${TASK_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  })
  if (!response.ok) {
    let errorMessage = `HTTP ${response.status} - ${response.statusText}`
    try {
      // Probeer JSON eerst, als dat faalt wordt het opgevangen hieronder
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json()
        errorMessage = errorData.message || errorMessage
      } else {
        const text = await response.text() // Alleen als het geen JSON is
        errorMessage = text || errorMessage
      }
    } catch {
      // Als zelfs het lezen mislukt
      errorMessage = 'Er trad een fout op bij het verwerken van de foutmelding.'
    }

    console.error('Failed to update task:', errorMessage)
    throw new Error(errorMessage)
  }
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
