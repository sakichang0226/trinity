export function QuantitySelector({ quantity, min = 1, max, onChange }: { quantity: number; min?: number; max: number; onChange: (value: number) => void }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium text-gray-700">数量:</span>
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
        <button onClick={() => onChange(Math.max(min, quantity - 1))} disabled={quantity <= min} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 text-lg font-bold transition">−</button>
        <input type="text" value={quantity} readOnly className="w-12 h-10 text-center border-x border-gray-300 text-sm" />
        <button onClick={() => onChange(Math.min(max, quantity + 1))} disabled={quantity >= max} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 text-lg font-bold transition">+</button>
      </div>
    </div>
  )
}
