import type { CartItem } from '@/contexts/CartContext'
import { Image } from '@/shared/components/Image'
import { QuantitySelector } from '@/shared/components/QuantitySelector'
import { DeleteIconButton } from '@/shared/components/DeleteIconButton'
import { PriceLabel } from '@/shared/components/PriceLabel'

interface Props {
  item: CartItem
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemove: (productId: string) => void
}

export function CartItemCard({ item, onUpdateQuantity, onRemove }: Props) {
  return (
    <div className="p-4 flex items-center gap-4">
      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
        <Image src={item.image} alt={item.name} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-800">{item.name}</p>
        <PriceLabel price={item.price} size="sm" color="muted" />
      </div>
      <QuantitySelector quantity={item.quantity} max={item.stock} onChange={(v) => onUpdateQuantity(item.productId, v)} />
      <p className="w-20 text-right shrink-0"><PriceLabel price={item.price * item.quantity} /></p>
      <DeleteIconButton onClick={() => onRemove(item.productId)} />
    </div>
  )
}
