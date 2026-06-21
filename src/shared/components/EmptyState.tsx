import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'

export interface EmptyStateProps {
  icon: ReactNode
  message: string
  linkTo: string
  linkLabel: string
}

export function EmptyState({ icon, message, linkTo, linkLabel }: EmptyStateProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
      {icon}
      <p className="text-gray-500 text-lg">{message}</p>
      <Link to={linkTo} className="mt-4 inline-block bg-brand-600 text-white px-6 py-2 rounded-lg hover:bg-brand-700 transition">
        {linkLabel}
      </Link>
    </div>
  )
}
