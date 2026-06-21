import { AccordionCard } from '@/shared/components/AccordionCard'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { DateLabel } from '@/shared/components/DateLabel'
import { DetailList } from '@/features/order/components/DetailList'
import { OrderNumberLabel } from '@/features/order/components/OrderNumberLabel'
import { PriceLabel } from '@/shared/components/PriceLabel'
import { Badge } from '@/shared/components/Badge'
import { CubeIcon } from '@heroicons/react/24/outline'
import type { OrderDetail } from '@/services/orderService'

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
        <CubeIcon className="w-6 h-6 text-gray-500" />
        <div className="text-left">
          <OrderNumberLabel orderId={order.order_id} />
          <DateLabel timestamp={order.created_at} />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Badge
          label={isDelivered ? '配送済み' : '処理中'}
          color={isDelivered ? 'green' : 'blue'}
        />
        <PriceLabel price={order.total} />
        <ChevronDownIcon className="w-5 h-5 text-gray-400 transition-transform duration-300 group-data-[open]:rotate-180" />
      </div>
    </>
  )

  return (
    <AccordionCard header={header}>
      <DetailList rows={rows} />
    </AccordionCard>
  )
}
