import { Navigate } from 'react-router-dom'
import Loader from '@/components/loader'
import { IContainer } from '../types'
import useAuth from '@/hooks/use-auth'

const ProtectedRoute = ({ children }: IContainer) => {
  const { isLoading, user } = useAuth()

  if (isLoading) {
    return <Loader />
  }

  if (!user) {
    return <Navigate to='/sign-in-2' />
  }

  return children
}

export default ProtectedRoute
