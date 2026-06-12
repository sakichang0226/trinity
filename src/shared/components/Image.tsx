import { useState } from 'react'

export function Image({ src, alt, className }: { src: string | null | undefined; alt: string; className?: string }) {
  const [hasError, setHasError] = useState(false)

  if (!src || hasError) {
    return (
      <div className="h-full w-full bg-gray-100 flex items-center justify-center">
        <span className="text-gray-400 text-sm">No Image</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className ?? 'h-full w-full object-cover'}
      onError={() => setHasError(true)}
    />
  )
}
