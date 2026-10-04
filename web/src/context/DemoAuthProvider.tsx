import { useMemo, useState, type ReactNode } from 'react'
import { DemoAuthContext } from './DemoAuthContext'

export function DemoAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const value = useMemo(() => ({
    isAuthenticated,
    login: () => setIsAuthenticated(true),
    logout: () => setIsAuthenticated(false),
  }), [isAuthenticated])

  return <DemoAuthContext.Provider value={value}>{children}</DemoAuthContext.Provider>
}
