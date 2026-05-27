export function DateLabel({ timestamp }: { timestamp: number }) {
  const formatted = new Date(timestamp).toLocaleDateString('ja-JP', {
    year: 'numeric', month: '2-digit', day: '2-digit',
  })
  return <p className="text-sm text-gray-500">{formatted}</p>
}
