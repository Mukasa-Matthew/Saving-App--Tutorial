import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { DemoAuthContext } from './DemoAuthContext'

const SESSION_KEY = 'goalsave-demo-session'

export function DemoAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsAuthenticated(window.localStorage.getItem(SESSION_KEY) === 'authenticated')
      setIsInitializing(false)
    }, 450)

    return () => window.clearTimeout(timer)
  }, [])

  const value = useMemo(() => ({
    isAuthenticated,
    isInitializing,
    login: () => {
      window.localStorage.setItem(SESSION_KEY, 'authenticated')
      setIsAuthenticated(true)
    },
    logout: () => {
      window.localStorage.removeItem(SESSION_KEY)
      setIsAuthenticated(false)
    },
  }), [isAuthenticated, isInitializing])

  return <DemoAuthContext.Provider value={value}>{children}</DemoAuthContext.Provider>
}
