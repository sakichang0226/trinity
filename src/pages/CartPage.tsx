import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import { CartItemCard } from '@/components/common/CartItemCard'
import { OrderSummary } from '@/components/common/OrderSummary'
import { ActionButton } from '@/components/common/ActionButton'

export function CartPage() {
  const { items, totalPrice, updateQuantity, removeItem } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleCheckout = () => {
    navigate(isAuthenticated ? '/checkout' : '/login', { state: { from: { pathname: '/checkout' } } })
  }

  if (items.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-16 h-16 mx-auto mb-4 text-gray-300">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
          <p className="text-gray-500 text-lg">カートに商品がありません</p>
          <ActionButton to="/" label="お買い物を続ける →" className="mt-4 inline-block w-auto px-6 py-2" />
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
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
    </main>
  )
}
