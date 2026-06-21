import { useNavigate } from 'react-router-dom'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import { CartContainer } from '@/features/cart/components/CartContainer'
import { CartItemCard } from '@/features/cart/components/CartItemCard'
import { OrderSummary } from '@/features/order/components/OrderSummary'
import { ActionButton } from '@/shared/components/ActionButton'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'

export function CartPage() {
  const { items, totalPrice, updateQuantity, removeItem } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleCheckout = () => {
    navigate(isAuthenticated ? '/checkout' : '/login', { state: { from: { pathname: '/checkout' } } })
  }

  if (items.length === 0) {
    return (
      <CartContainer>
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <ShoppingCartIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" strokeWidth={1} />
          <p className="text-gray-500 text-lg">カートに商品がありません</p>
          <ActionButton to="/" label="お買い物を続ける →" className="mt-4 inline-block w-auto px-6 py-2" />
        </div>
      </CartContainer>
    )
  }

  return (
    <CartContainer>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">ショッピングカート <span className="text-gray-500 text-lg font-normal">({items.length}件)</span></h1>

      <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-300">
        {items.map(item => (
          <CartItemCard key={item.productId} item={item} onUpdateQuantity={updateQuantity} onRemove={removeItem} />
        ))}
      </div>

      <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
        <OrderSummary totalPrice={totalPrice} />
        <ActionButton onClick={handleCheckout} label="注文手続きへ進む →" className="mt-4" />
      </div>
    </CartContainer>
  )
}
