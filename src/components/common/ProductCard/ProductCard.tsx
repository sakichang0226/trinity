import { Link } from 'react-router-dom'
import { Image } from '@/components/common/Image'
import { NewBadge } from '@/components/common/NewBadge'
import { RatingStars } from '@/components/common/RatingStars'
import type { Product } from '@/types/product'

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
        <p className="text-green-700 font-bold mt-1">¥{product.price.toLocaleString()}</p>
        {!isNew && <RatingStars rating={product.rating} reviewCount={product.review_count} />}
      </div>
    </Link>
  )
}
