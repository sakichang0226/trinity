export function QuantityLabel({ name, quantity }: { name: string; quantity: number }) {
  return <span className="text-gray-600">{name} × {quantity}</span>
}
