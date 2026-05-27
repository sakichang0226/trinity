import { Link } from 'react-router-dom'
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline'

export function OrderHistoryLink({ className }: { className?: string }) {
  return (
    <Link to="/orders" className={className ?? "flex items-center gap-2 text-sm text-gray-700 hover:text-brand-700"}>
      <ClipboardDocumentListIcon className="w-4 h-4" />
      注文履歴
    </Link>
  )
}
