import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '@/contexts/CartContext'
import { createOrder } from '@/services/orderService'
import { ErrorMessage, ORDER_ERROR_CODES } from '@/types/api'
import { SubmitButton } from '@/shared/components/SubmitButton'
import { OrderErrorCard } from '@/features/order/components/OrderErrorCard'
import { OrderCompleteCard } from '@/features/order/components/OrderCompleteCard'
import { OrderItemsCard } from '@/features/order/components/OrderItemsCard'

type OrderError = {
  code: string | null
  message: string
}

export function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [orderId, setOrderId] = useState<number | null>(null)
  const [error, setError] = useState<OrderError | null>(null)

  useEffect(() => {
    if (items.length === 0 && orderId === null) {
      navigate('/cart')
    }
  }, [items.length, orderId, navigate])

  const handleOrder = async () => {
    setLoading(true)
    setError(null)

    const result = await createOrder(
      items.map(i => ({ product_id: Number(i.productId), quantity: i.quantity }))
    )

    setLoading(false)

    if (result.success) {
      setOrderId(result.data.order_id)
      clearCart()
    } else {
      const code = result.errorCode
      const message = (code && ErrorMessage[code]) || ErrorMessage.API_ERR999
      setError({ code, message })
    }
  }

  if (orderId !== null) {
    return <OrderCompleteCard orderId={orderId} />
  }

  if (items.length === 0) {
    return null
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">注文内容の確認</h1>

      <OrderItemsCard items={items} totalPrice={totalPrice} />

      <SubmitButton
        onClick={handleOrder}
        label="注文を確定する"
        loadingLabel="処理中..."
        isLoading={loading}
        className="mt-6"
      />

      {error && (
        <OrderErrorCard
          message={error.message}
          isProductError={!!(error.code && ORDER_ERROR_CODES.includes(error.code as typeof ORDER_ERROR_CODES[number]))}
          onRetry={handleOrder}
        />
      )}
    </main>
  )
}
