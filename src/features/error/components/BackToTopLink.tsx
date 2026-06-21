import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/20/solid'

export function BackToTopLink() {
  return (
    <Link to="/" className="inline-flex items-center gap-2 text-brand-700 hover:text-brand-800 font-medium text-sm transition">
      <ArrowLeftIcon className="w-4 h-4" />
      TOPへ戻る
    </Link>
  )
}
