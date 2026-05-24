export function RatingStars({ rating, scoreLabel, size = 'sm' }: { rating: number; scoreLabel?: number | string; size?: 'sm' | 'lg' }) {
  const stars = Array.from({ length: 5 }, (_, i) => (i < Math.round(rating) ? '★' : '☆')).join('')
  const isLg = size === 'lg'

  return (
    <div className={`flex items-center ${isLg ? 'gap-2' : 'gap-1 mt-1'}`}>
      <span className={`text-yellow-400 ${isLg ? 'text-lg' : 'text-xs'}`}>{stars}</span>
      {scoreLabel !== undefined && (
        <span className={isLg ? 'text-sm text-gray-500' : 'text-xs text-gray-400'}>({scoreLabel})</span>
      )}
    </div>
  )
}
