import { Link } from 'react-router-dom'
import { useCart } from '@/contexts/CartContext'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'

export function CartIcon() {
  const { items } = useCart()

  return (
    <Link to="/cart" className="relative text-gray-600 hover:text-brand-700">
      <ShoppingCartIcon className="w-6 h-6" />
      {items.length > 0 && (
        <span className="absolute -top-2 -right-3 bg-danger-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
          {items.length}
        </span>
      )}
    </Link>
  )
}
