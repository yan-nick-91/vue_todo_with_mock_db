const PAD_TWO_DIGITS = 2
const pad = (number: number, digits: number) => number.toString().padStart(digits, '0')

export const generateTaskId = () => {
  const now = new Date()
  const dateStringValue = generateDateStringValue(now)
  const timeStringValue = generatedTimeStringValue(now)
  return `${dateStringValue}-${timeStringValue}`
}

export const generateCurrentDate = () => {
  const now = new Date()
  const { day, month, year } = dateGenerator(now)
  return `${day}-${month}-${year}, ${generateCurrentTimeValue(now)}`
}

export const generateBulletItemId = () => `bid-${Math.random().toString(36).substring(2, 10)}`

const generateDateStringValue = (now: Date) => {
  const { day, month, year } = dateGenerator(now)
  return `${day}${month}${year}`
}

const generateCurrentTimeValue = (now: Date) => {
  const currentHour = generateCurrentHour(now)
  const currentMinute = generateCurrentMinute(now)

  return `${currentHour}:${currentMinute}`
}

const generatedTimeStringValue = (now: Date) => {
  const PAD_SIX_DIGITS = 6
  const hours = generateCurrentHour(now)
  const minutes = generateCurrentMinute(now)
  const seconds = generateCurrentSeconds(now)
  const milliseconds = generateCurrentMilliSeconds(now, PAD_SIX_DIGITS)

  return `${hours}${minutes}${seconds}${milliseconds}`
}

const generateCurrentHour = (now: Date) => pad(now.getHours(), PAD_TWO_DIGITS)
const generateCurrentMinute = (now: Date) => pad(now.getMinutes(), PAD_TWO_DIGITS)
const generateCurrentSeconds = (now: Date) => pad(now.getSeconds(), PAD_TWO_DIGITS)
const generateCurrentMilliSeconds = (now: Date, digits: number) => pad(now.getSeconds(), digits)

const dateGenerator = (now: Date) => {
  const day = pad(now.getDate(), PAD_TWO_DIGITS)
  const month = pad(now.getMonth() + 1, PAD_TWO_DIGITS)
  const year = now.getFullYear()

  return {
    day,
    month,
    year,
  }
}
