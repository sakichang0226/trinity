import { Link } from 'react-router-dom'
import { Image } from '@/shared/components/Image'
import { NewBadge } from '@/shared/components/NewBadge'
import { RatingStars } from '@/features/product/components/RatingStars'
import { PriceLabel } from '@/shared/components/PriceLabel'
import type { Product } from '@/features/product/types/product'

export function ProductCard({ product, isNew }: { product: Product; isNew?: boolean }) {
  return (
    <Link
      to={`/products/${product.product_id}`}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden group"
    >
      <div className="relative bg-gray-100 h-48 flex items-center justify-center group-hover:scale-105 transition">
        <Image src={product.image_url} alt={product.product_name} />
        {isNew && <NewBadge />}
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-800 font-medium">{product.product_name}</p>
        <PriceLabel price={product.price} color="primary" />
        {!isNew && <RatingStars rating={product.rating} scoreLabel={product.review_count} />}
      </div>
    </Link>
  )
}
