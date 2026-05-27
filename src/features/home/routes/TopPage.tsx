import { useEffect, useState } from 'react'
import { HeroBanner } from '@/features/home/components/HeroBanner'
import { ProductSection } from '@/features/product/components/ProductSection'
import { fetchProducts } from '@/services/productService'
import type { Product } from '@/features/product/types/product'

const RECOMMENDED_IDS = [1, 2, 3, 4]
const NEW_ARRIVAL_IDS = [5, 6, 7, 8]

export function TopPage() {
  const [recommended, setRecommended] = useState<Product[]>([])
  const [newArrivals, setNewArrivals] = useState<Product[]>([])
  const [loadingRecommended, setLoadingRecommended] = useState(true)
  const [loadingNew, setLoadingNew] = useState(true)

  useEffect(() => {
    fetchProducts(RECOMMENDED_IDS)
      .then(r => { if (r.success) setRecommended(r.data) })
      .finally(() => setLoadingRecommended(false))
    fetchProducts(NEW_ARRIVAL_IDS)
      .then(r => { if (r.success) setNewArrivals(r.data) })
      .finally(() => setLoadingNew(false))
  }, [])

  return (
    <>
      <HeroBanner />
      <ProductSection title="おすすめ商品" products={recommended} isLoading={loadingRecommended} />
      <div className="mb-16">
        <ProductSection title="新着商品" products={newArrivals} isLoading={loadingNew} isNew />
      </div>
    </>
  )
}
