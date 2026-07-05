import { type ReactNode } from 'react'

export function OrderHistoryContainer({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">注文履歴</h1>
      {children}
    </div>
  )
}
