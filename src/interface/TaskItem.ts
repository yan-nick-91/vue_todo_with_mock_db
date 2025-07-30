import type { BulletItem } from './BulletItem'

export interface Task {
  id: string
  task: string
  created_at: string
  updated_at?: string
  priority: string
  start_date: string
  end_date: string
  is_finished: boolean
  is_drafted: boolean
  bullet_list?: BulletItem[]
}
