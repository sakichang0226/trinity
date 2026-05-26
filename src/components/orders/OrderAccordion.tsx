import { AccordionCard } from '@/components/common/AccordionCard'
import { ChevronIcon } from '@/components/common/ChevronIcon'
import { DateLabel } from '@/components/common/DateLabel'
import { DetailList } from '@/components/orders/DetailList'
import { OrderNumberLabel } from '@/components/orders/OrderNumberLabel'
import { PriceLabel } from '@/components/common/PriceLabel'
import { StatusBadge } from '@/components/common/StatusBadge'
import type { OrderDetail } from '@/services/orderService'

const CubeIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
  </svg>
)

export function OrderAccordion({ order }: { order: OrderDetail }) {
  const isDelivered = order.delivery_status === 'ED'

  const rows = order.details.map(item => ({
    key: item.detail_id,
    name: item.product_name,
    quantity: item.order_num,
    price: item.total,
  }))

  const header = (
    <>
      <div className="flex items-center gap-3">
        {CubeIcon}
        <div className="text-left">
          <OrderNumberLabel orderId={order.order_id} />
          <DateLabel timestamp={order.created_at} />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <StatusBadge
          label={isDelivered ? '配送済み' : '処理中'}
          color={isDelivered ? 'green' : 'blue'}
        />
        <PriceLabel price={order.total} />
        <ChevronIcon />
      </div>
    </>
  )

  return (
    <AccordionCard header={header}>
      <DetailList rows={rows} />
    </AccordionCard>
  )
}
