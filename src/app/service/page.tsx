import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Mail, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'サービス紹介 | 求人広告サイト',
  description: '実践×伴走で採用の常識を変える。採用後もサポートする実践型求人サービス誕生！',
  openGraph: {
    title: 'サービス紹介 | 求人広告サイト',
    description: '実践×伴走で採用の常識を変える。採用後もサポートする実践型求人サービス誕生！',
    type: 'website',
  },
}

export default function ServicePage() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* ヘッダー */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <Link
                href="/"
                className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
              >
                求人広告サイト
              </Link>
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                  求人一覧
                </Link>
                <Link href="/service" className="text-blue-600 font-medium">
                  サービス
                </Link>
                <Link href="/admin" className="text-gray-700 hover:text-blue-600 transition-colors">
                  管理画面
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* メインコンテンツ */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* ヒーローセクション */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              「実践」×「伴走」で<br />
              <span className="text-green-600">採用の常識を変える。</span>
            </h1>
            <div className="inline-block bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg">
              採用後もサポートする実践型求人サービス誕生！
            </div>
          </div>

          {/* サービス説明画像1 */}
          <div className="mb-20">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="relative h-[600px] md:h-[800px]">
                <Image
                  src="/service-image-1.png"
                  alt="実践×伴走で採用の常識を変える - メリット紹介"
                  fill
                  className="object-contain p-8"
                  priority
                />
              </div>
            </div>
          </div>

          {/* サービス説明画像2 */}
          <div className="mb-20">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="relative h-[600px] md:h-[800px]">
                <Image
                  src="/service-image-2.png"
                  alt="採用の流れと料金について"
                  fill
                  className="object-contain p-8"
                />
              </div>
            </div>
          </div>

          {/* 特徴セクション */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">サービスの特徴</h2>
              <p className="text-xl text-gray-600">実践期間で見極め、伴走サポートで定着を実現</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">採用コストの削減</h3>
                <p className="text-gray-600 text-sm">実践期間で見極め「すぐに辞める」を防ぎ、無駄をなくす</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⭐</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">実務経験者が対象</h3>
                <p className="text-gray-600 text-sm">即戦力人材により不足をすぐに補える</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">定着率向上</h3>
                <p className="text-gray-600 text-sm">採用後のフォローで安定的な人材定着を実現</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">組織力アップ</h3>
                <p className="text-gray-600 text-sm">保育士の声を組織改善に繋げ、より良い園作りをサポート</p>
              </div>
            </div>
          </div>

          {/* 採用の流れ */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">採用の流れ</h2>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
              <div className="bg-white rounded-lg p-6 shadow-lg text-center max-w-xs">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold text-lg">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">実践申し込み</h3>
                <p className="text-gray-600 text-sm">まずはお気軽にお申し込みください</p>
              </div>
              
              <div className="hidden md:block text-gray-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5" />
                </svg>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg text-center max-w-xs">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold text-lg">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">1ヶ月実践</h3>
                <p className="text-gray-600 text-sm">実際の現場で業務を体験していただきます</p>
              </div>
              
              <div className="hidden md:block text-gray-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5" />
                </svg>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg text-center max-w-xs">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold text-lg">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">採用</h3>
                <p className="text-gray-600 text-sm">双方が合意すれば正式採用となります</p>
              </div>
              
              <div className="hidden md:block text-gray-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5" />
                </svg>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg text-center max-w-xs">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold text-lg">4</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">1年間キャリアサポート</h3>
                <p className="text-gray-600 text-sm">採用後も継続的にサポートいたします</p>
              </div>
            </div>
          </div>

          {/* 料金情報 */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">利用料金</h2>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">求人掲載永年</h3>
              <div className="text-5xl font-bold text-green-600 mb-2">50,000円</div>
              <div className="text-gray-500 mb-6">（税別）</div>
              <p className="text-gray-600">※その他の料金はお問い合わせください</p>
            </div>
          </div>

          {/* CTAセクション */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl shadow-2xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              園と保育士、双方にとって最高の出会いを
            </h2>
            <p className="text-xl mb-8 opacity-90">
              私たちは、保育士が安心して長く働ける環境づくりを園とともに考え、<br />
              長く続く関係を目指します。
            </p>
            
            <div className="space-y-4 md:space-y-0 md:space-x-6 md:flex md:justify-center md:items-center">
              <Link
                href="https://www.notion.so/2693bc6c0dbe80fb8df9c706d99fa12b?pvs=106"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-white text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
              >
                <ExternalLink className="mr-2" size={20} />
                お問い合わせはこちら
              </Link>
            </div>
          </div>
        </main>

        {/* フッター */}
        <footer className="bg-green-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Asterisk+</h3>
                <p className="text-green-200 mb-4">人材コンサル事業部</p>
                <div className="w-24 h-24 bg-white rounded-lg p-2">
                  <div className="w-full h-full bg-gray-800 rounded flex items-center justify-center">
                    <span className="text-white text-xs">QRコード</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">お問い合わせ</h4>
                <div className="space-y-2 text-green-200">
                  <div>
                    <strong>【所在地】</strong><br />
                    〒871-1301<br />
                    兵庫県たつの市御津町黒崎1842-14 Asterisk+
                  </div>
                  <div>
                    <strong>【メール】</strong><br />
                    asterisk.mt.fuji@gmail.com
                  </div>
                  <div>
                    <strong>【電話】</strong><br />
                    090-3848-4431
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-200">
              <p>&copy; 2024 Asterisk+ 人材コンサル事業部. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
