import { BackToTopLink } from '@/features/error/components/BackToTopLink'
import { Button } from '@/shared/components/Button'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { ArrowPathIcon } from '@heroicons/react/20/solid'

export function ServerErrorPage({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 w-full min-h-[calc(100vh-160px)] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm p-10 text-center flex flex-col items-center justify-center">
        <ExclamationTriangleIcon className="w-20 h-20 mx-auto mb-6 text-amber-400" strokeWidth={1} />
        <h2 className="text-lg font-semibold text-gray-800 mb-2">エラーが発生しました</h2>
        <p className="text-sm text-gray-500 mb-8">しばらく時間をおいて再度お試しください。</p>
        <div className="flex flex-col gap-3 items-center">
          <Button onClick={onRetry} variant="primary" size="sm">
            <ArrowPathIcon className="w-4 h-4" />
            再読み込み
          </Button>
          <BackToTopLink />
        </div>
      </div>
    </div>
  )
}
