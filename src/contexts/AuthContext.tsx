import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { fetchMe, type UserInfo } from '@/services/userService'

interface AuthContextType {
  user: UserInfo | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (user: UserInfo) => void
  logout: () => void
  refreshUser: () => Promise<UserInfo | null>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshUser = useCallback(async () => {
    const result = await fetchMe()
    const userData = result.success ? result.data : null
    setUser(userData)
    setIsLoading(false)
    return userData
  }, [])

  useEffect(() => {
    refreshUser()
  }, [refreshUser])

  const login = useCallback((newUser: UserInfo) => {
    setUser(newUser)
  }, [])

  const logout = useCallback(() => {
    document.cookie = 'token=; Path=/; Max-Age=0'
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
