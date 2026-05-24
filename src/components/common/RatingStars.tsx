export function RatingStars({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  const stars = Array.from({ length: 5 }, (_, i) => (i < Math.round(rating) ? '★' : '☆')).join('')
  return (
    <div className="flex items-center gap-1 mt-1">
      <span className="text-yellow-400 text-xs">{stars}</span>
      <span className="text-xs text-gray-400">({reviewCount})</span>
    </div>
  )
}
