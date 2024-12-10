import { Users } from '@/api'
import { useQuery } from '@tanstack/react-query'

export interface User {
  id: number
  name: string
  email: string
  phone: string
  isActive: Boolean
  waitForOtp: Boolean
  role: []
}

const useCurrentUser = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ['current-user'],
    queryFn: async () => {
      const response = await Users.currentUser()
      return response.data // Assuming response has a data property
    },
  })

  return { user, isLoading }
}

export default useCurrentUser
