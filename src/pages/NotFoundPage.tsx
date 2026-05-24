import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 w-full min-h-[calc(100vh-160px)] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm p-10 text-center flex flex-col items-center justify-center">
        <div className="w-20 h-20 mx-auto mb-6 text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-full h-full">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">お探しの商品は見つかりませんでした。</h2>
        <p className="text-sm text-gray-500 mb-8">削除されたか、URLが間違っている可能性があります。</p>
        <Link to="/" className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 font-medium text-sm transition">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
          </svg>
          TOPへ戻る
        </Link>
      </div>
    </div>
  )
}
