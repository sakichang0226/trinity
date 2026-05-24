export function ProductPrice({ price }: { price: number }) {
  return (
    <p className="text-3xl font-bold text-green-700 mt-3">
      ¥{price.toLocaleString('ja-JP')} <span className="text-sm font-normal text-gray-500">（税込）</span>
    </p>
  )
}
