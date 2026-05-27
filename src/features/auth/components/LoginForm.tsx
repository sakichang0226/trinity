import { useState, type FormEvent } from 'react'
import { LoginFormField } from '@/features/auth/components/LoginFormField'
import { SubmitButton } from '@/shared/components/SubmitButton'
import { validateLoginForm } from '@/features/auth/utils/validateLoginForm'
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>
  authError: string
  isLoading: boolean
}

export function LoginForm({ onSubmit, authError, isLoading }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const newErrors = validateLoginForm(email, password)
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return
    await onSubmit(email, password)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {authError && (
        <div className="mb-5 bg-danger-50 border border-danger-200 text-danger-700 rounded-lg px-4 py-3 text-sm flex items-center gap-2">
          <ExclamationTriangleIcon className="w-5 h-5 shrink-0" />
          {authError}
        </div>
      )}

      <LoginFormField
        id="email"
        label="メールアドレス"
        type="email"
        placeholder="example@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />

      <LoginFormField
        id="password"
        label="パスワード"
        type="password"
        placeholder="パスワードを入力"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />

      <SubmitButton type="submit" label="ログイン" loadingLabel="ログイン中..." isLoading={isLoading} />
    </form>
  )
}
