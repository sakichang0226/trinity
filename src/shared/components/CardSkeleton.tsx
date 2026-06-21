interface CardSkeletonProps {
  count?: number
}

export function CardSkeleton({ count = 3 }: CardSkeletonProps) {
  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-1/3 mb-3" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
        </div>
      ))}
    </div>
  )
}
