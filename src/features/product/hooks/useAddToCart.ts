import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import type { ToastData } from '@/shared/components/Toast'

export function useAddToCart() {
  const { addItem } = useCart()
  const [toast, setToast] = useState<ToastData | null>(null)

  const addToCart = (product: { product_id: number; product_name: string; price: number; image_url: string; stock: number }, quantity: number) => {
    const ok = addItem(
      { productId: String(product.product_id), name: product.product_name, price: product.price, image: product.image_url, stock: product.stock },
      quantity
    )
    if (ok) {
      setToast({ type: 'success', message: 'カートに追加しました', sub: `${product.product_name} × ${quantity}` })
    } else {
      setToast({ type: 'error', message: 'カートに入れられる商品は20種類までです' })
    }
    setTimeout(() => setToast(null), 3000)
  }

  const closeToast = () => setToast(null)

  return { addToCart, toast, closeToast }
}
