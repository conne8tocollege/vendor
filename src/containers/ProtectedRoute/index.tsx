import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '@/hooks/use-auth'
import { IContainer } from '../types'
import { Loader } from 'lucide-react'

interface ProtectedRouteProps extends IContainer {
  redirectTo?: string // Default redirect path
  loaderTimeout?: number // Optional timeout for loader (in milliseconds)
}

const ProtectedRoute = ({
  children,
  redirectTo = '/sign-in-2', // Default redirect path
  loaderTimeout = 10000, // 10-second timeout for loading
}: ProtectedRouteProps) => {
  const { isLoading, user } = useAuth()
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    // Hide loader if timeout is reached
    const timeout = setTimeout(() => setShowLoader(false), loaderTimeout)

    // Clear timeout on component unmount
    return () => clearTimeout(timeout)
  }, [loaderTimeout])

  if (isLoading && showLoader) {
    return <Loader />
  }

  if (!user) {
    return <Navigate to={redirectTo} replace />
  }

  return children
}

export default ProtectedRoute
