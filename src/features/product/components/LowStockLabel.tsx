export function LowStockLabel({ stock }: { stock: number }) {
  if (stock <= 0 || stock > 5) return null
  return <p className="mt-2 text-orange-600 text-sm font-semibold">残りわずか</p>
}
