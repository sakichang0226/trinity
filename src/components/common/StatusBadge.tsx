const colorMap = {
  green: 'bg-green-100 text-green-700',
  blue: 'bg-blue-100 text-blue-700',
  red: 'bg-red-100 text-red-700',
  yellow: 'bg-yellow-100 text-yellow-700',
  gray: 'bg-gray-100 text-gray-700',
} as const

export type BadgeColor = keyof typeof colorMap

export interface StatusBadgeProps {
  label: string
  color: BadgeColor
}

export function StatusBadge({ label, color }: StatusBadgeProps) {
  return (
    <span className={`text-xs font-medium px-3 py-1 rounded-full ${colorMap[color]}`}>
      {label}
    </span>
  )
}
