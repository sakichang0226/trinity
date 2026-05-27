import { Image } from '@/shared/components/Image'
import { PriceLabel } from '@/shared/components/PriceLabel'
import { PriceSummary } from '@/features/order/components/PriceSummary'

export interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

export function OrderItemsCard({ items, totalPrice }: { items: OrderItem[]; totalPrice: number }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="divide-y divide-gray-300">
        {items.map(item => (
          <div key={item.productId} className="px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                <Image src={item.image} alt={item.name} />
              </div>
              <div>
                <p className="font-medium text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">× {item.quantity}</p>
              </div>
            </div>
            <PriceLabel price={item.price * item.quantity} size="base" color="default" />
          </div>
        ))}
      </div>

      <div className="bg-gray-50 px-6 py-4">
        <PriceSummary subtotal={totalPrice} />
      </div>
    </div>
  )
}
