import { useState } from 'react'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { login } from '@/services/userService'
import { ErrorCode } from '@/types/api'
import { LoginForm } from '@/features/auth/components/LoginForm'
import { ServerErrorPage } from '@/features/error/routes/ServerErrorPage'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login: setAuthUser, refreshUser, isAuthenticated, isLoading } = useAuth()

  const [authError, setAuthError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isServerError, setIsServerError] = useState(false)

  const handleSubmit = async (email: string, password: string) => {
    setAuthError('')
    setIsServerError(false)
    setIsSubmitting(true)
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
    setIsSubmitting(false)
  }

  if (isServerError) {
    return <ServerErrorPage onRetry={() => setIsServerError(false)} />
  }

  if (isLoading) return null
  if (isAuthenticated) return <Navigate to="/" replace />

  return (
    <>
      <title>ログイン | SUNABA</title>
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-8">ログイン</h1>
            <LoginForm onSubmit={handleSubmit} authError={authError} isLoading={isSubmitting} />
          </div>
        </div>
      </div>
    </>
  )
}
