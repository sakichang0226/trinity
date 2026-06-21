import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Button } from '@/shared/components/Button'
import { LoadingSpinner } from '@/shared/components/LoadingSpinner'

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

  return (
    <Button
      variant={isDisabled && !isLoading ? 'disabled' : 'primary'}
      size="md"
      disabled={isDisabled}
      className={`w-full ${className ?? ''}`}
      {...props}
    >
      {isLoading ? (
        <>
          <LoadingSpinner />
          {loadingLabel ?? label}
        </>
      ) : (
        <>
          {icon}
          {isDisabled && disabledLabel ? disabledLabel : label}
        </>
      )}
    </Button>
  )
}
