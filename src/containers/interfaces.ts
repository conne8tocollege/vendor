export interface Course {
  id: number
  name: string
  duration: string
  collegeId: number
  fees: number
  imageUrl: string
  description: string
  createdAt: Date
  updatedAt: Date
}

export interface College {
  id: number
  name: string
  address: string
  isRanked: boolean
  imageUrl: string
  createdAt: Date
  updatedAt: Date
  courses: Course[] // Ensures that `courses` is an array of `Course` objects
}
