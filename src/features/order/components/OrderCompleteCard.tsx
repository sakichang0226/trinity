import { Link } from 'react-router-dom'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { OrderNumberLabel } from '@/features/order/components/OrderNumberLabel'

export function OrderCompleteCard({ orderId }: { orderId: number }) {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-sm p-10 text-center">
        <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircleIcon className="w-10 h-10 text-brand-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">注文が完了しました！</h2>
        <OrderNumberLabel orderId={orderId} />
        <p className="text-sm text-gray-400 mt-1">確認メールをお送りしました</p>
        <div className="mt-6 flex justify-center gap-4">
          <Link to="/" className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition">TOPへ戻る</Link>
          <Link to="/orders" className="bg-brand-600 text-white px-6 py-2 rounded-lg hover:bg-brand-700 transition">注文履歴を見る</Link>
        </div>
      </div>
    </main>
  )
}
