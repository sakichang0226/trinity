import { PriceLabel } from '@/components/common/PriceLabel'

export function ProductPrice({ price }: { price: number }) {
  return (
    <p className="mt-3">
      <PriceLabel price={price} size="3xl" color="primary" />
      <span className="text-sm font-normal text-gray-500 ml-1">（税込）</span>
    </p>
  )
}
