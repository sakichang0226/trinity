export function OrderNumberLabel({ orderId }: { orderId: number }) {
  return <p className="font-medium text-gray-800">注文番号: {orderId}</p>
}
