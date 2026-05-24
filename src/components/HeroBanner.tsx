import { useState } from 'react'

const banners = [
  { title: '夏のセール開催中！', subtitle: '最大50%OFF — 期間限定', label: '今週のおすすめ' },
  { title: '新作コレクション', subtitle: 'トレンドアイテムが続々入荷', label: 'NEW ARRIVAL' },
  { title: '送料無料キャンペーン', subtitle: '¥3,000以上のお買い物で送料無料', label: '期間限定' },
]

export function HeroBanner() {
  const [current, setCurrent] = useState(0)
  const banner = banners[current]

  return (
    <section className="max-w-7xl mx-auto px-4 mt-6">
      <div className="relative bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl overflow-hidden h-64 flex items-center">
        <div className="px-10 text-white">
          <p className="text-sm font-medium opacity-80">{banner.label}</p>
          <h2 className="text-3xl font-bold mt-2">{banner.title}</h2>
          <p className="mt-2 opacity-90">{banner.subtitle}</p>
          <button className="mt-4 bg-white text-green-700 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100">
            詳しく見る →
          </button>
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-3">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full ${i === current ? 'bg-green-600' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </section>
  )
}
