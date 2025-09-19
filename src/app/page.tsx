import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Mail, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Asterisk+ | 実践×伴走で採用の常識を変える',
  description: '実践×伴走で採用の常識を変える。採用後もサポートする実践型求人サービス誕生！',
  openGraph: {
    title: 'Asterisk+ | 実践×伴走で採用の常識を変える',
    description: '実践×伴走で採用の常識を変える。採用後もサポートする実践型求人サービス誕生！',
    type: 'website',
  },
}

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* ヘッダー */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <Link
                href="/"
                className="text-xl sm:text-2xl font-bold text-blue-600"
              >
                Asterisk+
              </Link>
               <nav className="flex space-x-6 md:space-x-8">
                 <Link href="/" className="text-blue-600 font-medium">
                   サービス
                 </Link>
                 <Link href="/service" className="text-gray-700 hover:text-blue-600 transition-colors">
                   求人一覧
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

          {/* サービス説明画像2 */}
          <div className="mb-4">
            <div className="w-full max-w-4xl mx-auto">
              <Image
                src="/service-image-2.jpeg"
                alt="採用の流れと料金について"
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg shadow-lg"
                priority
              />
            </div>
          </div>

          {/* サービス説明画像1 */}
          <div className="mb-20">
            <div className="w-full max-w-4xl mx-auto">
              <Image
                src="/service-image-1.jpeg"
                alt="実践×伴走で採用の常識を変える - メリット紹介"
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg shadow-lg"
              />
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
              <p>&copy; 2025 Asterisk+ All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}