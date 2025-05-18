interface BulletItem {
  id: string
  bulletItem: string
  itemIsFinished: boolean
}

export interface Task {
  id: string
  task: string
  createdAt: string
  updatedAt: string
  isFinished: boolean
  bulletList: BulletItem[]
}
