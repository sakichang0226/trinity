import { PriceLabel } from '@/shared/components/PriceLabel'

export function OrderSummary({ totalPrice }: { totalPrice: number }) {
  return (
    <div className="flex justify-between items-center text-lg">
      <span className="font-medium text-gray-700">合計（税込）</span>
      <PriceLabel price={totalPrice} size="2xl" color="primary" />
    </div>
  )
}
