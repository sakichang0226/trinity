import { BackToTopLink } from '@/features/error/components/BackToTopLink'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export function NotFoundPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 w-full min-h-[calc(100vh-160px)] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm p-10 text-center flex flex-col items-center justify-center">
        <MagnifyingGlassIcon className="w-20 h-20 mx-auto mb-6 text-gray-300" strokeWidth={1} />
        <h2 className="text-lg font-semibold text-gray-800 mb-2">お探しの商品は見つかりませんでした。</h2>
        <p className="text-sm text-gray-500 mb-8">削除されたか、URLが間違っている可能性があります。</p>
        <BackToTopLink />
      </div>
    </div>
  )
}
