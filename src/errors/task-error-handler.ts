export const invalidInput = (message: string) => {
  const error = new Error(message)
  error.name = 'InvalidInputError'
  return error
}
