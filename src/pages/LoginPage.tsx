import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { login } from '@/services/userService'
import { ErrorCode } from '@/types/api'
import { LoginForm } from '@/components/LoginForm'
import { ServerErrorPage } from '@/pages/ServerErrorPage'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login: setAuthUser, refreshUser } = useAuth()

  const [authError, setAuthError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isServerError, setIsServerError] = useState(false)

  const handleSubmit = async (email: string, password: string) => {
    setAuthError('')
    setIsServerError(false)
    setIsLoading(true)
    const result = await login({ email, password })
    if (result.success) {
      const user = await refreshUser()
      if (!user) {
        setAuthUser({ userId: 0, userName: result.data.user_name, email })
      }
      const from = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/'
      navigate(from, { replace: true })
      return
    } else if (result.errorCode === ErrorCode.LOGIN_AUTH) {
      setAuthError('メールアドレスまたはパスワードが正しくありません')
    } else {
      setIsServerError(true)
    }
    setIsLoading(false)
  }

  if (isServerError) {
    return <ServerErrorPage onRetry={() => setIsServerError(false)} />
  }

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-8">ログイン</h1>
          <LoginForm onSubmit={handleSubmit} authError={authError} isLoading={isLoading} />
        </div>
      </div>
    </main>
  )
}
