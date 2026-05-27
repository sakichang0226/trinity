import { IconButton } from '@/shared/components/IconButton'
import { TrashIcon } from '@heroicons/react/24/outline'

export function DeleteIconButton({ onClick }: { onClick: () => void }) {
  return (
    <IconButton
      onClick={onClick}
      label="削除"
      className="text-danger-400 hover:text-danger-600"
      icon={<TrashIcon className="w-5 h-5" />}
    />
  )
}
