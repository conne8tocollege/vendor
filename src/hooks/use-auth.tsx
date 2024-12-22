import { useQueryClient } from '@tanstack/react-query'
import { Auth } from '@/api'
// import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { toast } from '@/hooks/use-toast'

const useAuth = () => {
  const {
    user,
    setUser,
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
    reset,
  } = useAuthStore((state) => state.auth)

  const queryClient = useQueryClient()
  // const navigate = useNavigate()

  const login = async (email: string, password: string) => {
    try {
      const res = await Auth.login(email, password)
      if (res.data) {
        const { access_token, refresh_token, ...userData } = res.data
        console.log(res.data)
        setAccessToken(access_token)
        setRefreshToken(refresh_token)
        setUser({
          id: userData.id,
          name: userData.name,
          phone: userData.phone,
          email: userData.email,
          isActive: userData.isActive,
          role: userData.role,
        })
        toast({
          variant: 'default',
          title: 'Login Successful!',
        })
        // Navigate to home/dashboard
        // navigate('/')
        queryClient.invalidateQueries()
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Login failed!',
      })
      console.error('Login failed:', error)
    }
  }

  const logout = async () => {
    try {
      const res = await Auth.logout()
      if (res.data) {
        reset()
        // navigate('/sign-in')
        queryClient.invalidateQueries()
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Logout failed!',
      })
      console.error('Logout failed:', error)
    }
  }

  const isLoading = !accessToken && !user

  return {
    user,
    accessToken,
    refreshToken,
    login,
    logout,
    isLoading,
  }
}

export default useAuth
