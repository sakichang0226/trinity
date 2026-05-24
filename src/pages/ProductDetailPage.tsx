import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { fetchProduct } from '@/services/productService'
import { useAddToCart } from '@/hooks/useAddToCart'
import { Image } from '@/components/common/Image'
import { ProductPrice } from '@/components/common/ProductPrice'
import { RatingStars } from '@/components/common/RatingStars'
import { ReviewCount } from '@/components/common/ReviewCount'
import { AddToCartButton } from '@/components/common/AddToCartButton'
import { Breadcrumb } from '@/components/common/Breadcrumb'
import { QuantitySelector } from '@/components/common/QuantitySelector'
import { LowStockLabel } from '@/components/common/LowStockLabel'
import { Toast } from '@/components/common/Toast'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ServerErrorPage } from '@/pages/ServerErrorPage'
import { isProductUnavailable, getUnavailableLabel } from '@/utils/productStatus'
import type { Product } from '@/types/product'

type PageState =
  | { status: 'loading' }
  | { status: 'success'; product: Product }
  | { status: 'error'; code: '404' | '500' }

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { addToCart, toast, closeToast } = useAddToCart()
  const [state, setState] = useState<PageState>({ status: 'loading' })
  const [quantity, setQuantity] = useState(1)

  const load = useCallback(() => {
    setState({ status: 'loading' })
    setQuantity(1)
    fetchProduct(id!).then(result => {
      if (result.success) {
        setState({ status: 'success', product: result.data })
      } else if (result.errorCode === 'API_ERR004') {
        setState({ status: 'error', code: '404' })
      } else {
        setState({ status: 'error', code: '500' })
      }
    })
  }, [id])

  useEffect(() => { load() }, [load])

  const handleAddToCart = () => {
    if (state.status !== 'success') return
    addToCart(state.product, quantity)
  }

  if (state.status === 'loading') return <Skeleton />
  if (state.status === 'error') return state.code === '404' ? <NotFoundPage /> : <ServerErrorPage onRetry={load} />

  const { product } = state
  const isUnavailable = isProductUnavailable(product.stock, product.status)
  const unavailableLabel = getUnavailableLabel(product.status)

  return (
    <>
      {/* トースト通知 */}
      {toast && <Toast toast={toast} onClose={closeToast} />}

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* パンくずリスト */}
        <Breadcrumb productName={product.product_name} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* 商品画像 */}
          <div className="bg-white rounded-2xl shadow-sm p-8 flex items-center justify-center aspect-square max-h-96 mx-auto">
            <Image src={product.image_url} alt={product.product_name} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">{product.product_name}</h1>
            <ProductPrice price={product.price} />

            <div className="flex items-center gap-2 mt-3">
              <RatingStars rating={product.rating} scoreLabel={product.rating} size="lg" />
              <ReviewCount count={product.review_count} />
            </div>

            <LowStockLabel stock={product.stock} />

            <hr className="my-6" />

            {/* 数量選択 */}
            {!isUnavailable && (
              <QuantitySelector quantity={quantity} max={product.stock} onChange={setQuantity} />
            )}

            {/* カート追加 */}
            <AddToCartButton onClick={handleAddToCart} disabled={isUnavailable} label={isUnavailable ? unavailableLabel : undefined} />

            <hr className="my-6" />

            <div>
              <h3 className="font-bold text-gray-800 mb-2">商品説明</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

function Skeleton() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      <div className="animate-pulse h-4 w-40 bg-gray-200 rounded mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="animate-pulse bg-gray-200 rounded-2xl aspect-square" />
        <div className="space-y-4">
          <div className="animate-pulse h-8 w-3/4 bg-gray-200 rounded" />
          <div className="animate-pulse h-10 w-1/3 bg-gray-200 rounded" />
          <div className="animate-pulse h-4 w-1/2 bg-gray-200 rounded" />
          <div className="animate-pulse h-px w-full bg-gray-200" />
          <div className="animate-pulse h-10 w-40 bg-gray-200 rounded" />
          <div className="animate-pulse h-12 w-full bg-gray-200 rounded-lg" />
          <div className="animate-pulse h-px w-full bg-gray-200" />
          <div className="animate-pulse h-20 bg-gray-200 rounded" />
        </div>
      </div>
    </main>
  )
}
