import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export function SearchBar() {
  return (
    <div className="flex-1 max-w-xl">
      <div className="relative">
        <input type="text" placeholder="商品を検索..." className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
        <span className="absolute right-3 top-2.5 text-gray-400">
          <MagnifyingGlassIcon className="w-5 h-5" />
        </span>
      </div>
    </div>
  )
}
