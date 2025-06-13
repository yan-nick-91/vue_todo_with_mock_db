import type { BulletItem } from './BulletItem'

export interface Task {
  id: string
  task: string
  createdAt: string
  updatedAt: string
  priority: string
  startDate: string
  endDate: string
  isFinished: boolean
  isDrafted: boolean
  bulletList: BulletItem[]
}
