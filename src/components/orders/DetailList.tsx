import { PriceLabel } from '@/components/common/PriceLabel'
import { QuantityLabel } from '@/components/common/QuantityLabel'

export interface DetailRow {
  key: string | number
  name: string
  quantity: number
  price: number
}

export function DetailList({ rows }: { rows: DetailRow[] }) {
  return (
    <div className="space-y-2 text-sm">
      {rows.map(row => (
        <div key={row.key} className="flex justify-between">
          <QuantityLabel name={row.name} quantity={row.quantity} />
          <PriceLabel price={row.price} size="sm" color="secondary" />
        </div>
      ))}
    </div>
  )
}
