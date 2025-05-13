const PAD_TWO_DIGITS = 2
const pad = (numb: number, digits: number) => numb.toString().padStart(digits, '0')
const now = new Date()

export const generateTaskId = () => {
  const dateStringValue = generateDateStringValue()
  const timeStringValue = generatedTimeStringValue()

  return `${dateStringValue}-${timeStringValue}`
}

export const generateCurrentDate = () => {
  const { day, month, year } = dateGenerator()
  return `${day}-${month}-${year}, ${generateCurrentTimeValue()}`
}
const generateDateStringValue = () => {
  const { day, month, year } = dateGenerator()
  return `${day}${month}${year}`
}

const generateCurrentTimeValue = () => {
  const currentHour = generateCurrentHour()
  const currentMinute = generateCurrentMinute()

  return `${currentHour}:${currentMinute}`
}

const generatedTimeStringValue = () => {
  const PAD_SIX_DIGITS = 6
  const hours = generateCurrentHour()
  const minutes = generateCurrentMinute()
  const seconds = generateCurrentSeconds()
  const milliseconds = generateCurrentMilliSeconds(PAD_SIX_DIGITS)

  return `${hours}${minutes}${seconds}${milliseconds}`
}

const generateCurrentHour = () => pad(now.getHours(), PAD_TWO_DIGITS)
const generateCurrentMinute = () => pad(now.getMinutes(), PAD_TWO_DIGITS)
const generateCurrentSeconds = () => pad(now.getSeconds(), PAD_TWO_DIGITS)
const generateCurrentMilliSeconds = (digits: number) => pad(now.getSeconds(), digits)

const dateGenerator = () => {
  const day = pad(now.getDate(), PAD_TWO_DIGITS)
  const month = pad(now.getMonth() + 1, PAD_TWO_DIGITS)
  const year = now.getFullYear()

  return {
    day,
    month,
    year,
  }
}
