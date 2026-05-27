import { Link } from 'react-router-dom'
import { ErrorCard } from '@/shared/components/ErrorCard'
import { Button } from '@/shared/components/Button'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { ArrowPathIcon } from '@heroicons/react/20/solid'

interface OrderErrorCardProps {
  message: string
  isProductError: boolean
  onRetry: () => void
}

export function OrderErrorCard({ message, isProductError, onRetry }: OrderErrorCardProps) {
  const action = isProductError ? (
    <Link to="/cart" className="inline-flex items-center gap-2 bg-danger-600 text-white px-5 py-2.5 rounded-lg hover:bg-danger-700 text-sm font-medium transition">
      <ShoppingCartIcon className="w-4 h-4" />
      カートへ戻る
    </Link>
  ) : (
    <Button onClick={onRetry} variant="danger" size="sm">
      <ArrowPathIcon className="w-4 h-4" />
      もう一度試す
    </Button>
  )

  return (
    <ErrorCard
      title="注文の処理に失敗しました"
      message={message}
      action={action}
      className="mt-6"
    />
  )
}
