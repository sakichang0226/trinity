import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface SubmitButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
  label: string
  loadingLabel?: string
  disabledLabel?: string
  isLoading?: boolean
  icon?: ReactNode
  className?: string
}

export function SubmitButton({ label, loadingLabel, disabledLabel, isLoading, icon, className, disabled, ...props }: SubmitButtonProps) {
  const isDisabled = isLoading || disabled

  const baseClass = isDisabled && !isLoading
    ? 'w-full bg-gray-400 text-white font-semibold py-3 rounded-lg cursor-not-allowed text-lg'
    : 'w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition text-lg disabled:opacity-75 disabled:cursor-not-allowed'

  return (
    <button
      disabled={isDisabled}
      className={className ? `${baseClass} ${className}` : baseClass}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          {loadingLabel ?? label}
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          {icon}
          {isDisabled && disabledLabel ? disabledLabel : label}
        </span>
      )}
    </button>
  )
}
