import { Link } from 'react-router-dom'

export function OrderCompleteCard({ orderId }: { orderId: number }) {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-sm p-10 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-green-600">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900">注文が完了しました！</h2>
        <p className="text-gray-500 mt-2">注文番号: <span className="font-mono font-bold text-gray-800">{orderId}</span></p>
        <p className="text-sm text-gray-400 mt-1">確認メールをお送りしました</p>
        <div className="mt-6 flex justify-center gap-4">
          <Link to="/" className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition">TOPへ戻る</Link>
          <Link to="/orders" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">注文履歴を見る</Link>
        </div>
      </div>
    </main>
  )
}
