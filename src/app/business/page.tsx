import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Users, TrendingDown, ShieldCheck, Building } from 'lucide-react'
import Image from 'next/image'

export const metadata = {
  title: '企業・施設様へ（お試し勤務のご案内） | Asterisk+',
}

export default function BusinessPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー部分 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
            <ArrowLeft size={20} className="mr-2" /> トップページに戻る
          </Link>
          <span className="text-sm font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            企業・施設様向け
          </span>
        </div>
      </header>

      <main>
        {/* ヒーローセクション */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-16 sm:py-24 border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
              「とりあえず採用」から、<br className="sm:hidden" />
              <span className="text-blue-600">「お試し」で納得の採用へ。</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Asterisk+は、従来の紹介業や派遣業とは異なる、新しい採用支援サービスです。<br className="hidden sm:block" />
              即戦力となる経験豊富な保育士と、定着率を一番に考えた貴園のベストマッチを実現します。
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <a href="#contact" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:-translate-y-1 text-lg">
                導入について相談する
              </a>
            </div>
          </div>
        </section>

        {/* 3つの特徴セクション */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Asterisk+ 選ばれる3つの理由</h2>
              <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* 特徴1 */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 relative mt-4">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md">1</div>
                <Users size={40} className="text-blue-500 mb-4 mx-auto mt-2" />
                <h3 className="text-xl font-bold text-center text-gray-900 mb-4">中途の「経験者」のみ</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  ご案内するのは、保育現場での経験を持つ中途採用の保育士のみです。現場の即戦力となる人材とのマッチングに特化しているため、教育コストを抑えることができます。
                </p>
              </div>

              {/* 特徴2 */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 relative mt-4">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md">2</div>
                <Building size={40} className="text-blue-500 mb-4 mx-auto mt-2" />
                <h3 className="text-xl font-bold text-center text-gray-900 mb-4">紹介でも派遣でもない</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  高額な紹介手数料が発生する紹介業や、期間で区切られる派遣業のビジネスモデルではありません。独自のサポート型システムで、定着率を重視した新しい形を提案します。
                </p>
              </div>

              {/* 特徴3 */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 relative mt-4">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md">3</div>
                <TrendingDown size={40} className="text-blue-500 mb-4 mx-auto mt-2" />
                <h3 className="text-xl font-bold text-center text-gray-900 mb-4">お試し期間は売上ゼロ設計</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  1ヶ月のお試し勤務期間中は、当サービスへの費用は発生しません。双方が納得した後のサイト登録料と月額サポートによって成り立つモデルのため、ノーリスクで相性を確認できます。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ▼ 追加：料金体系セクション ▼ */}
        <section className="py-16 sm:py-24 bg-gray-50 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">明瞭で安心な料金体系</h2>
              <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
              <p className="text-gray-600 leading-relaxed">
                高額な初期費用がかかる紹介モデルとは異なり、導入しやすいサイト登録料と、<br className="hidden sm:block" />
                採用後の定着を目的とした月額制（12ヶ月間）のサポートモデルを採用しています。
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* プラン1: サイト登録料 */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-bl-lg">導入時のみ</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">お試し勤務サイト登録料</h3>
                <p className="text-sm text-gray-500 mb-6">求人ページの作成・永年掲載</p>
                <div className="flex items-baseline mb-4 border-b border-gray-100 pb-4">
                  <span className="text-4xl font-extrabold text-blue-600">100,000</span>
                  <span className="text-lg text-gray-600 font-medium ml-1">円</span>
                  <span className="text-sm text-gray-500 ml-2">(税抜)</span>
                </div>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start"><CheckCircle2 size={18} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" /> 当サイトへの永年掲載</li>
                  <li className="flex items-start"><CheckCircle2 size={18} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" /> 求人票の作成代行</li>
                  <li className="flex items-start"><CheckCircle2 size={18} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" /> 候補者とのマッチング調整</li>
                  <li className="flex items-start"><CheckCircle2 size={18} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" /> <span className="font-bold text-orange-600">お試し期間（1ヶ月）は費用負担なし</span></li>
                </ul>
              </div>

              {/* プラン2: 正式採用後 */}
              <div className="bg-white rounded-2xl p-8 border-2 border-blue-500 shadow-md relative overflow-hidden transform md:-translate-y-2 transition-transform">
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">双方合意で就職決定後</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">就職後サポート料</h3>
                <p className="text-sm text-gray-500 mb-6">正式採用後から12ヶ月間</p>
                <div className="flex items-baseline mb-4 border-b border-gray-100 pb-4">
                  <span className="text-4xl font-extrabold text-gray-900">50,000</span>
                  <span className="text-lg text-gray-600 font-medium ml-1">円 / 月</span>
                  <span className="text-sm text-gray-500 ml-2">(税抜)</span>
                </div>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start"><CheckCircle2 size={18} className="text-blue-500 mr-2 flex-shrink-0 mt-0.5" /> 正式な就職が決定した場合のみ発生</li>
                  <li className="flex items-start"><CheckCircle2 size={18} className="text-blue-500 mr-2 flex-shrink-0 mt-0.5" /> 毎月5万円 × 12ヶ月間の定額制</li>
                  <li className="flex items-start"><CheckCircle2 size={18} className="text-blue-500 mr-2 flex-shrink-0 mt-0.5" /> 合計60万円(税抜)で優秀な人材を獲得</li>
                  <li className="flex items-start"><CheckCircle2 size={18} className="text-blue-500 mr-2 flex-shrink-0 mt-0.5" /> 就職後の定着に向けたフォローアップ</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200 text-sm text-gray-600 text-center">
              ※ お試し勤務期間中（1ヶ月）に発生する給与等は、貴園から求職者へ直接お支払いいただきます。<br className="hidden sm:block" />
              当サービスへのお支払いはお試し期間中には一切発生いたしません。
            </div>
          </div>
        </section>
        {/* ▲ 追加：料金体系セクション ここまで ▲ */}

        {/* 導入の流れセクション */}
        <section className="py-16 bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">導入から正式採用までの流れ</h2>
            
            <div className="space-y-6">
              {[
                { step: '01', title: 'ヒアリング・求人作成', desc: '貴園が求める人物像や条件を丁寧にヒアリングし、求人票を作成します。' },
                { step: '02', title: '経験者とのマッチング', desc: '経験豊富な保育士の中から、貴園の方針に合う候補者をご紹介・面談を実施します。' },
                { step: '03', title: 'お試し勤務スタート（1ヶ月）', desc: '実際に現場に入り、スキルやマッチングを確認します。' },
                { step: '04', title: '双方合意で正式採用', desc: '園と保育士、双方の合意をもって正式採用（就職）となります。' },
              ].map((item, index) => (
                <div key={index} className="flex bg-gray-50 p-6 rounded-xl border border-gray-100 items-center">
                  <div className="text-3xl font-extrabold text-blue-200 mr-6 w-16 text-center">{item.step}</div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* お問い合わせCTA */}
        <section id="contact" className="py-20 bg-white-900 text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
              まずは詳しい内容をご相談ください
            </h2>


            <div className="flex justify-center">
              <a
                href="https://forms.gle/DrnFBXTRbc2ZWHMB9"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-xl shadow-md transition-transform hover:-translate-y-1 text-lg"
              >
                お問い合わせはこちら
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}