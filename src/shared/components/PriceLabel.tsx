const sizes = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
} as const

const colors = {
  primary: 'font-bold text-brand-700',
  default: 'font-bold text-gray-800',
  secondary: 'text-gray-800',
  muted: 'text-gray-500',
} as const

type Size = keyof typeof sizes
type Color = keyof typeof colors

const formatPrice = (price: number) => `¥${price.toLocaleString()}`

export function PriceLabel({ price, size = 'base', color = 'default' }: { price: number; size?: Size; color?: Color }) {
  return <span className={`${sizes[size]} ${colors[color]}`}>{formatPrice(price)}</span>
}
