const PAD_TWO_DIGITS = 2
const pad = (numb: number, digits: number) => numb.toString().padStart(digits, '0')

export const generateTaskId = () => {
  const now = new Date()
  const dateStringValue = generateDateStringValue(now)
  const timeStringValue = generatedTimeStringValue(now)

  return `${dateStringValue}-${timeStringValue}`
}

const generateDateStringValue = (now: Date) => {
  const day = pad(now.getDate(), PAD_TWO_DIGITS)
  const month = pad(now.getMonth() + 1, PAD_TWO_DIGITS)
  const year = now.getFullYear()

  return `${day}${month}${year}`
}

const generatedTimeStringValue = (now: Date) => {
  const PAD_THREE_DIGITS = 6
  const hours = pad(now.getHours(), PAD_TWO_DIGITS)
  const minutes = pad(now.getMinutes(), PAD_TWO_DIGITS)
  const seconds = pad(now.getSeconds(), PAD_TWO_DIGITS)
  const milliseconds = pad(now.getMilliseconds(), PAD_THREE_DIGITS)

  return `${hours}${minutes}${seconds}${milliseconds}`
}
