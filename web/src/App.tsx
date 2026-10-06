import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import SavingsGoalsPage from './pages/SavingsGoalsPage'
import GoalDetailsPage from './pages/GoalDetailsPage'
import TransactionsPage from './pages/TransactionsPage'
import ProfilePage from './pages/ProfilePage'
import CurrencyConverterPage from './pages/CurrencyConverterPage'
import NotificationsPage from './pages/NotificationsPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import ProtectedRoute from './components/ProtectedRoute'
import AppLoader from './components/AppLoader'
import { useDemoAuth } from './context/DemoAuthContext'

function AppRoutes() {
  const location = useLocation()
  const [renderedLocation, setRenderedLocation] = useState(location)
  const isChangingPage = location.key !== renderedLocation.key

  useEffect(() => {
    if (!isChangingPage) return

    const timer = window.setTimeout(() => setRenderedLocation(location), 300)
    return () => window.clearTimeout(timer)
  }, [isChangingPage, location])

  if (isChangingPage) return <AppLoader label="Loading page…" />

  return (
    <Routes location={renderedLocation}>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/goals" element={<SavingsGoalsPage />} />
        <Route path="/dashboard/goals/:goalId" element={<GoalDetailsPage />} />
        <Route path="/dashboard/transactions" element={<TransactionsPage />} />
        <Route path="/dashboard/profile" element={<ProfilePage />} />
        <Route path="/dashboard/converter" element={<CurrencyConverterPage />} />
        <Route path="/dashboard/notifications" element={<NotificationsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  const { isInitializing } = useDemoAuth()

  if (isInitializing) return <AppLoader />

  return <AppRoutes />
}

export default App
