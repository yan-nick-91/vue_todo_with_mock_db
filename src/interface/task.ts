import type { BulletItem } from './BulletItem'

export interface Task {
  id: string
  task: string
  createdAt: string
  updatedAt: string
  priority: string
  isFinished: boolean
  isDrafted: boolean
  bulletList: BulletItem[]
}
