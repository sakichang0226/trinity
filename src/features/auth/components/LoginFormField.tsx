import { useState, type InputHTMLAttributes } from 'react'
import { IconButton } from '@/shared/components/IconButton'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

interface FormFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: string
  error?: string
}

export function LoginFormField({ label, error, id, type, ...props }: FormFieldProps) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

  const inputClassName = `w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 ${isPassword ? 'pr-12' : ''} ${error ? 'border-danger-400 focus:ring-danger-400 bg-danger-50' : 'border-gray-300 focus:ring-brand-500 focus:border-transparent'}`

  return (
    <div className="mb-5">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className={isPassword ? 'relative' : undefined}>
        <input id={id} type={inputType} className={inputClassName} {...props} />
        {isPassword && (
          <IconButton
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            label={showPassword ? 'パスワードを非表示' : 'パスワードを表示'}
            icon={showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
          />
        )}
      </div>
      {error && <p className="text-danger-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
