import { Button } from '@/shared/components/Button'
import { LoadingSpinner } from '@/shared/components/LoadingSpinner'

interface LoadMoreButtonProps {
  onClick: () => void
  isLoading: boolean
}

export function LoadMoreButton({ onClick, isLoading }: LoadMoreButtonProps) {
  return (
    <div className="mt-6 text-center">
      <Button onClick={onClick} disabled={isLoading} variant="outline" size="sm">
        {isLoading ? '読み込み中...' : 'もっと見る'}
        {isLoading && <LoadingSpinner className="h-4 w-4 text-gray-500" />}
      </Button>
      <p className="mt-2 text-xs text-gray-400">10件ずつ表示されます</p>
    </div>
  )
}
