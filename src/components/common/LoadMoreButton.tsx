interface LoadMoreButtonProps {
  onClick: () => void
  isLoading: boolean
}

export function LoadMoreButton({ onClick, isLoading }: LoadMoreButtonProps) {
  return (
    <div className="mt-6 text-center">
      <button
        onClick={onClick}
        disabled={isLoading}
        className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-50 transition text-sm font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? '読み込み中...' : 'もっと見る'}
        {isLoading && (
          <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
      </button>
      <p className="mt-2 text-xs text-gray-400">10件ずつ表示されます</p>
    </div>
  )
}
