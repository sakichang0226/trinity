import { PriceLabel } from '@/shared/components/PriceLabel'
import { PriceLine } from '@/shared/components/PriceLine'

export function PriceSummary({ subtotal, shipping = 0 }: { subtotal: number; shipping?: number }) {
  const total = subtotal + shipping
  return (
    <div className="space-y-2">
      <PriceLine label="小計" price={subtotal} />
      <PriceLine label="送料" price={shipping} />
      <hr />
      <div className="flex justify-between text-lg font-bold text-gray-900">
        <span>合計（税込）</span>
        <PriceLabel price={total} size="lg" color="primary" />
      </div>
    </div>
  )
}
