import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: '会社概要・明示事項 | Asterisk+',
}

export default function CompanyProfile() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-gray-100">

        {/* --- 会社概要セクション --- */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">
          会社概要
        </h1>

        <div className="mb-12">
          <dl className="divide-y divide-gray-100 border-t border-b border-gray-100">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-900">屋号・サービス名</dt>
              <dd className="mt-1 text-sm text-gray-700 sm:mt-0 sm:col-span-2">Asterisk+（アスタリスクプラス）</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-900">代表者</dt>
              <dd className="mt-1 text-sm text-gray-700 sm:mt-0 sm:col-span-2">碇ほの加</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-900">所在地</dt>
              <dd className="mt-1 text-sm text-gray-700 sm:mt-0 sm:col-span-2">
                〒671-1301<br />
                兵庫県たつの市御津町黒崎1842-14
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-900">お問い合わせ先</dt>
              <dd className="mt-1 text-sm text-gray-700 sm:mt-0 sm:col-span-2">
                公式LINEアカウント、または本サイトの相談フォームよりお問い合わせください。<br />
                Email: asterisk.mt.fujiagmail.com
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-900">事業内容</dt>
              <dd className="mt-1 text-sm text-gray-700 sm:mt-0 sm:col-span-2">
                保育士・幼稚園教諭向け求人情報等の提供、お試し勤務キャリアサポート 等
              </dd>
            </div>
          </dl>
        </div>

        {/* --- 特定募集情報等提供事業に関する明示事項セクション --- */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
          特定募集情報等提供事業に関する明示事項
        </h2>
        
        <p className="text-sm text-gray-600 mb-8">
          職業安定法第32条の14等の規定に基づき、以下の通り明示いたします。
        </p>

        <div className="space-y-6 text-gray-700 text-sm sm:text-base">
          <section>
            <h3 className="font-bold text-gray-900 mb-2 border-l-4 border-blue-500 pl-3">1. 手数料に関する事項</h3>
            <p className="pl-4">求職者（ご利用者様）からの手数料は一切徴収いたしません。すべてのサービスを無料でご利用いただけます。</p>
          </section>

          <section>
            <h3 className="font-bold text-gray-900 mb-2 border-l-4 border-blue-500 pl-3">2. 苦情の処理に関する事項</h3>
            <p className="pl-4">
              求職者様または求人者様からの苦情につきましては、誠意をもって適切かつ迅速に対応いたします。<br />
              【苦情・相談窓口】本サイトのお問い合わせフォーム、または公式LINEよりご連絡ください。
            </p>
          </section>

          <section>
            <h3 className="font-bold text-gray-900 mb-2 border-l-4 border-blue-500 pl-3">3. 個人情報の取扱いに関する事項</h3>
            <p className="pl-4">
              個人情報の取扱いについては、別途定める
              <Link href="/privacy" className="text-blue-600 underline hover:text-blue-800 mx-1">
                プライバシーポリシー
              </Link>
              に従い、適正に管理・保護いたします。
            </p>
          </section>

          <section>
            <h3 className="font-bold text-gray-900 mb-2 border-l-4 border-blue-500 pl-3">4. 求人情報の的確な表示等に関する事項</h3>
            <p className="pl-4 mb-2">
              当サイトに掲載する求人情報は、虚偽のないよう正確かつ最新の内容を保つよう努めます。求人情報の掲載にあたっては、以下の措置を講じます。
            </p>
            <ul className="list-disc pl-10 space-y-1">
              <li>求人情報の提供元（保育施設等）に対し、正確な情報の提供を求めます。</li>
              <li>掲載情報に変更が生じた場合は、速やかに情報の更新・削除を行います。</li>
              <li>求職者様より「掲載内容と実際の条件が異なる」等のご指摘を受けた場合は、速やかに事実確認を行い、必要な訂正等を実施いたします。</li>
            </ul>
          </section>
        </div>

      </div>
    </div>
  )
}