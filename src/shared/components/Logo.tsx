import { Link } from 'react-router-dom'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'

export function Logo() {
  return (
    <Link to="/" className="text-xl font-bold text-brand-700 shrink-0 flex items-center gap-1">
      <ShoppingBagIcon className="w-6 h-6" />
      EC Store
    </Link>
  )
}
