import { Link } from 'react-router-dom'
import { Button } from '@/shared/components/Button'

interface ActionButtonProps {
  label: string
  to?: string
  onClick?: () => void
  className?: string
}

export function ActionButton({ label, to, onClick, className }: ActionButtonProps) {
  if (to && onClick) {
    throw new Error('ActionButton: Cannot use both "to" and "onClick" props simultaneously')
  }

  const baseClass = 'w-full text-center'
  const cls = className ? `${baseClass} ${className}` : baseClass

  if (to) {
    return <Link to={to} className={`block w-full bg-brand-600 text-white font-semibold py-3 rounded-lg hover:bg-brand-700 transition text-center text-lg ${className ?? ''}`}>{label}</Link>
  }

  return <Button variant="primary" size="md" onClick={onClick} className={cls}>{label}</Button>
}
