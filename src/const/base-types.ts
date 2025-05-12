export const SUCCESS = 'success'
export const INFO = 'info'
export const WARNING = 'warning'
export const DANGER = 'danger'
export const DEFAULT = 'default'
export const TRANSPARENT = 'transparent'

export const BUTTON_TYPES = [SUCCESS, INFO, WARNING, DANGER, DEFAULT, TRANSPARENT] as const
export const NOTIFICATION_TYPES = [SUCCESS, INFO, WARNING, DANGER, DEFAULT] as const

export type buttonType = (typeof BUTTON_TYPES)[number]
export type notificationType = (typeof NOTIFICATION_TYPES)[number]
