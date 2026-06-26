import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'プライバシーポリシー | Asterisk+',
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-gray-100">

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">
          プライバシーポリシー（個人情報保護方針）
        </h1>

        <div className="space-y-8 text-gray-700 leading-relaxed text-sm sm:text-base">
          <p>
            Asterisk+（以下「当サービス」といいます）は、ご利用いただく皆様（以下「ユーザー」といいます）の個人情報の保護を重要視し、以下の通りプライバシーポリシーを定めます。
          </p>

          {/* 第1条 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 border-l-4 border-blue-500 pl-3">第1条（収集する個人情報）</h2>
            <p className="mb-2">当サービスでは、以下の個人情報を収集する場合があります。</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>氏名、生年月日、性別</li>
              <li>連絡先情報（LINEアカウント情報、メールアドレス、電話番号等）</li>
              <li>保有資格（保育士資格等）、経歴、職務経歴に関する情報</li>
              <li>その他、当サービスが提供するフォームや面談を通じてユーザーが提供する情報</li>
            </ul>
          </section>

          {/* 第2条 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 border-l-4 border-blue-500 pl-3">第2条（個人情報の利用目的）</h2>
            <p className="mb-2">お預かりした個人情報は、以下の目的で利用いたします。</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>お試し勤務先（保育施設等）とのマッチングおよび就業サポートのため</li>
              <li>ユーザーからのご相談、お問い合わせへの対応（LINE・WEB面談等）のため</li>
              <li>当サービスに関する重要なお知らせや、求人情報をご案内するため</li>
              <li>サービスの品質向上および新しいサポート体制の開発・分析のため</li>
            </ul>
          </section>

          {/* 第3条 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 border-l-4 border-blue-500 pl-3">第3条（個人情報の第三者提供について）</h2>
            <p className="mb-2">
              当サービスは、法令に定める場合を除き、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、以下の場合は例外とします。
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>お試し勤務の実施に向け、ユーザーの同意を得た上で、受け入れ候補となる保育施設等に対してマッチングに必要な範囲で情報を提供する場合</strong></li>
              <li>人の生命、身体または財産の保護のために必要があり、本人の同意を得ることが困難である場合</li>
              <li>国の機関もしくは地方公共団体などの要請により協力する必要がある場合</li>
            </ul>
          </section>

          {/* 第4条 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 border-l-4 border-blue-500 pl-3">第4条（個人情報の安全管理）</h2>
            <p>
              当サービスは、ユーザーの個人情報を正確かつ最新の状態に保ち、個人情報への不正アクセス、紛失、破損、改ざん、漏洩などを防止するため、セキュリティシステムの維持・管理体制の整備等、必要な措置を講じ、安全対策を実施します。
            </p>
          </section>

          {/* 第5条 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 border-l-4 border-blue-500 pl-3">第5条（個人情報の開示・訂正・削除）</h2>
            <p>
              ユーザーご本人から個人情報の開示、訂正、追加、削除、利用停止などのご請求があった場合には、ご本人であることを確認の上、速やかに対応いたします。
            </p>
          </section>

          {/* 第6条 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 border-l-4 border-blue-500 pl-3">第6条（プライバシーポリシーの変更）</h2>
            <p>
              本ポリシーの内容は、法令等の変更や当サービスの運営方針の変更に伴い、ユーザーに通知することなく変更することができるものとします。変更後のプライバシーポリシーは、本サイトに掲載したときから効力を生じるものとします。
            </p>
          </section>

          {/* 第7条 */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 border-l-4 border-blue-500 pl-3">第7条（お問い合わせ窓口）</h2>
            <p>
              本ポリシーに関するお問い合わせ、または個人情報の取り扱いに関するご相談は、当サイトのLINE公式アカウント、または各種相談窓口よりご連絡ください。
            </p>
          </section>

          {/* 制定日 */}
          <div className="pt-8 mt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 font-medium">
              制定日：2026年6月25日<br />
              屋号・事業者名：Asterisk+<br />
              代表者：碇ほの加<br />
              所在地：兵庫県たつの市御津町黒崎1842-14
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}