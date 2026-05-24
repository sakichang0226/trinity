export function Image({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className ?? 'h-full w-full object-cover'}
      onError={(e) => {
        const target = e.currentTarget
        target.style.display = 'none'
        target.parentElement!.classList.add('flex', 'items-center', 'justify-center')
        target.parentElement!.insertAdjacentHTML('beforeend', '<span class="text-gray-400 text-sm">No Image</span>')
      }}
    />
  )
}
