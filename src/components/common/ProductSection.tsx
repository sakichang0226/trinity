import { ProductCard, ProductCardSkeleton } from '@/components/common/ProductCard'
import type { Product } from '@/types/product'

interface Props {
  title: string
  products: Product[]
  isLoading: boolean
  isNew?: boolean
}

export function ProductSection({ title, products, isLoading, isNew }: Props) {
  if (!isLoading && products.length === 0) return null

  return (
    <section className="max-w-7xl mx-auto px-4 mt-10">
      <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 4 }, (_, i) => <ProductCardSkeleton key={i} />)
          : products.map((p) => <ProductCard key={p.product_id} product={p} isNew={isNew} />)}
      </div>
    </section>
  )
}
