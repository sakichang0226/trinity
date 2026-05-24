import { useState, type FormEvent } from 'react'
import { FormField } from '@/components/common/FormField'
import { SubmitButton } from '@/components/common/SubmitButton'
import { validateLoginForm } from '@/utils/validateLoginForm'

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
        <div className="mb-5 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 shrink-0">
            <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
          </svg>
          {authError}
        </div>
      )}

      <FormField
        id="email"
        label="メールアドレス"
        type="email"
        placeholder="example@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />

      <FormField
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
