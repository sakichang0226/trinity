import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { fetchProduct } from '@/services/productService'
import { useAddToCart } from '@/features/product/hooks/useAddToCart'
import { ErrorCode } from '@/types/api'
import { Image } from '@/shared/components/Image'
import { ProductPrice } from '@/features/product/components/ProductPrice'
import { RatingStars } from '@/features/product/components/RatingStars'
import { ReviewCount } from '@/features/product/components/ReviewCount'
import { AddToCartButton } from '@/features/product/components/AddToCartButton'
import { Breadcrumb } from '@/features/product/components/Breadcrumb'
import { QuantitySelector } from '@/shared/components/QuantitySelector'
import { LowStockLabel } from '@/features/product/components/LowStockLabel'
import { Toast } from '@/shared/components/Toast'
import { NotFoundPage } from '@/features/error/routes/NotFoundPage'
import { ServerErrorPage } from '@/features/error/routes/ServerErrorPage'
import { isProductUnavailable, getUnavailableLabel } from '@/features/product/utils/productStatus'
import type { Product } from '@/features/product/types/product'

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
      } else if (result.errorCode === ErrorCode.PRODUCT_NOT_FOUND) {
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
      {toast && <Toast toast={toast} onClose={closeToast} />}

      <main className="max-w-7xl mx-auto px-4 py-6">
        <Breadcrumb productName={product.product_name} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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

            {!isUnavailable && (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">数量:</span>
                <QuantitySelector quantity={quantity} max={product.stock} onChange={setQuantity} />
              </div>
            )}

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
