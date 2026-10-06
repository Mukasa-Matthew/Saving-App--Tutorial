import { createContext, useContext } from 'react'

export type DemoAuthContextValue = {
  isAuthenticated: boolean
  isInitializing: boolean
  login: () => void
  logout: () => void
}

export const DemoAuthContext = createContext<DemoAuthContextValue | null>(null)

export function useDemoAuth() {
  const context = useContext(DemoAuthContext)
  if (!context) throw new Error('useDemoAuth must be used inside DemoAuthProvider')
  return context
}
