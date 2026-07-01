const colorMap = {
  green: 'bg-brand-100 text-brand-600',
  blue: 'bg-blue-100 text-blue-600',
  red: 'bg-danger-100 text-danger-700',
  'red-solid': 'bg-danger-500 text-white',
  yellow: 'bg-yellow-100 text-yellow-700',
  gray: 'bg-gray-100 text-gray-700',
} as const

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-xs',
} as const

export type BadgeColor = keyof typeof colorMap
export type BadgeSize = keyof typeof sizes

export interface BadgeProps {
  label: string
  color: BadgeColor
  size?: BadgeSize
  className?: string
}

export function Badge({ label, color, size = 'md', className }: BadgeProps) {
  return (
    <span className={`font-medium rounded-full ${colorMap[color]} ${sizes[size]} ${className ?? ''}`}>
      {label}
    </span>
  )
}
