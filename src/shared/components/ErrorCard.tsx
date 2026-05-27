import { type ReactNode } from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'

interface ErrorCardProps {
  title: string
  message: string
  action: ReactNode
  className?: string
}

export function ErrorCard({ title, message, action, className }: ErrorCardProps) {
  return (
    <div className={`bg-danger-50 border border-danger-200 rounded-xl p-6 text-center ${className ?? ''}`}>
      <ExclamationCircleIcon className="w-12 h-12 mx-auto mb-3 text-danger-400" />
      <h3 className="text-base font-semibold text-danger-800 mb-1">{title}</h3>
      <p className="text-sm text-danger-600 mb-4">{message}</p>
      {action}
    </div>
  )
}
