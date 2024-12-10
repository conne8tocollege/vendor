import { Auth } from '@/api'
import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const useAuth = () => {
  const [user, setUser] = useState<string | null>(
    localStorage.getItem('at-token')
  )

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const navigate = useNavigate()
  const queryClient = useQueryClient() // This needs QueryClientProvider

  const onAuthChange = async (auth: string | null) => {
    if (!auth) {
      setUser(null)
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    setUser(auth)
    localStorage.setItem('at-token', auth)
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const res = await Auth.login(email, password)
      if (res.data.access_token) {
        localStorage.setItem('at-token', res.data.access_token)
        setUser(res.data.access_token)
        setIsLoading(false)
        toast.success('Login Successful')
        navigate('/')
        queryClient.invalidateQueries()
      } else {
        toast.error('Error Login! Check credentials')
      }
    } catch (error) {
      toast.error('Error Login! Check credentials')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      const res = await Auth.logout()
      if (res.data) {
        localStorage.removeItem('at-token')
        setUser(null)
        setIsLoading(false)
        navigate('/sign-in-2')
        queryClient.invalidateQueries()
      }
    } catch (error) {
      console.error(error)
      toast.error('Error while logging out!')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const auth = localStorage.getItem('at-token')
    onAuthChange(auth)
  }, [])

  return { login, isLoading, user, logout }
}

export default useAuth
