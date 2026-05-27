export function ReviewCount({ count }: { count: number }) {
  return (
    <span className="text-sm text-blue-600 hover:underline cursor-pointer">{count}件のレビュー</span>
  )
}
