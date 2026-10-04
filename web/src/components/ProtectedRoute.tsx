import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useDemoAuth } from '../context/DemoAuthContext'

function ProtectedRoute() {
  const { isAuthenticated } = useDemoAuth()
  const location = useLocation()

  return isAuthenticated
    ? <Outlet />
    : <Navigate to="/login" replace state={{ from: location }} />
}

export default ProtectedRoute
