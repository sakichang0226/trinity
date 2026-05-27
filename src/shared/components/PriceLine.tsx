import { PriceLabel } from '@/shared/components/PriceLabel'

export function PriceLine({ label, price }: { label: string; price: number }) {
  return (
    <div className="flex justify-between text-sm text-gray-600">
      <span>{label}</span>
      <PriceLabel price={price} size="sm" color="muted" />
    </div>
  )
}
