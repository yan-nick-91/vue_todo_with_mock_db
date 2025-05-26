const PORT = import.meta.env.VITE_PORT // Declare the value in the .env at the project root as VITE_PORT (e.g., VITE_PORT=3000)
const HOST = import.meta.env.VITE_HOST // Declare the value in the .env at the project root as VITE_HOST (e.g., VITE_HOST=http://localhost)

export const TASK_ENDPOINT = `${HOST}:${PORT}/tasks`
