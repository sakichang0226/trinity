import { Badge } from '@/shared/components/Badge'

export function NewBadge() {
  return (
    <span className="absolute top-2 left-2">
      <Badge label="NEW" color="red-solid" size="sm" className="font-bold rounded" />
    </span>
  )
}
