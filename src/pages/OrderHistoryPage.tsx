import { useState, useEffect, useCallback } from 'react'
import { CardSkeleton } from '@/components/common/CardSkeleton'
import { ClipboardIcon } from '@/components/common/ClipboardIcon'
import { EmptyState } from '@/components/common/EmptyState'
import { LoadMoreButton } from '@/components/common/LoadMoreButton'
import { Toast, type ToastData } from '@/components/common/Toast'
import { OrderAccordion, OrderHistoryContainer } from '@/components/orders'
import { getOrders, type OrderDetail } from '@/services/orderService'
import { ServerErrorPage } from '@/pages/ServerErrorPage'

export function OrderHistoryPage() {
  const [orders, setOrders] = useState<OrderDetail[]>([])
  const [lastOrderId, setLastOrderId] = useState<number | null>(null)
  const [status, setStatus] = useState<'loading' | 'success' | 'empty' | 'error'>('loading')
  const [loadingMore, setLoadingMore] = useState(false)
  const [toast, setToast] = useState<ToastData | null>(null)

  const fetchOrders = useCallback(async (cursor?: number) => {
    const result = await getOrders(cursor)
    if (!result.success) {
      if (cursor) {
        setToast({ type: 'error', message: '読み込みに失敗しました', sub: '時間をおいて再度お試しください' })
      } else {
        setStatus('error')
      }
      return
    }
    const { orders: newOrders, last_order_id } = result.data
    if (!cursor) {
      if (newOrders.length === 0) {
        setStatus('empty')
      } else {
        setOrders(newOrders)
        setStatus('success')
      }
    } else {
      setOrders(prev => [...prev, ...newOrders])
    }
    setLastOrderId(last_order_id)
  }, [])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const handleLoadMore = async () => {
    if (!lastOrderId) return
    setLoadingMore(true)
    await fetchOrders(lastOrderId)
    setLoadingMore(false)
  }

  const handleRetry = () => {
    setStatus('loading')
    setOrders([])
    fetchOrders()
  }

  if (status === 'loading') {
    return (
      <OrderHistoryContainer>
        <CardSkeleton />
      </OrderHistoryContainer>
    )
  }

  if (status === 'error') {
    return <ServerErrorPage onRetry={handleRetry} />
  }

  if (status === 'empty') {
    return (
      <OrderHistoryContainer>
        <EmptyState
          icon={<ClipboardIcon />}
          message="注文履歴がありません"
          linkTo="/"
          linkLabel="お買い物をはじめる →"
        />
      </OrderHistoryContainer>
    )
  }

  return (
    <>
      {toast && <Toast toast={toast} onClose={() => setToast(null)} />}
      <OrderHistoryContainer>
        <div className="space-y-4">
          {orders.map(order => (
            <OrderAccordion key={order.order_id} order={order} />
          ))}
        </div>
        {lastOrderId && (
          <LoadMoreButton onClick={handleLoadMore} isLoading={loadingMore} />
        )}
      </OrderHistoryContainer>
    </>
  )
}
