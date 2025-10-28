import React from "react";
import { CheckCircle2, HeartHandshake, Users, Clock, ShieldCheck, MessageCircleHeart, ArrowRight } from "lucide-react";
import Link from "next/link";
import {} from "lucide-react";
/**
 * お試し勤務 LP（信頼＋新しさ重視）
 * - Tailwind CSS 前提
 * - 1ファイルで完結 / データ差替えしやすい構成
 * - 柔らかいグリーン基調 / 余白たっぷり / 中央CTA
 */

const FEATURES = [
  {
    icon: <Users className="w-6 h-6" aria-hidden />,
    title: "お互いに選ぶ採用",
    desc: "企業が選ぶだけでなく、保育士さんも職場を“感じて”選べる。ミスマッチを防ぎます。",
  },
  {
    icon: <Clock className="w-6 h-6" aria-hidden />,
    title: "約1ヶ月・週20h未満",
    desc: "31日未満・週20時間以内（中途インターン）で実際に働いて相性を確かめられます。",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" aria-hidden />,
    title: "キャリアサポート同伴",
    desc: "お試し勤務中も、就職後1年間もプロが伴走。いつでも気軽に相談できます。",
  },
];

const VOICES = [
  {
    name: "Aさん（保育士/28歳）",
    text:
      "面接では分からなかった雰囲気や人の温かさを体感できました。\n1ヶ月後、迷いなく入職を決められてよかったです。",
  },
  {
    name: "Bさん（保育士/32歳）",
    text:
      "キャリアサポートの面談が心の支えに。悩みをその場で整理できて、安心して選べました。",
  },
];

const FAQS = [
  {
    q: "お試し勤務の報酬は出ますか？",
    a: "各園の条件に準じます。募集要項に明記し、事前に必ずご案内します。",
  },
  {
    q: "フルタイムで働けますか？",
    a: "制度上は週20時間未満が上限です。曜日・時間帯は柔軟にご相談ください。",
  },
  {
    q: "就職しない選択もできますか？",
    a: "もちろん可能です。無理な勧誘は一切ありません。合う園を一緒に探しましょう。",
  },
];

function Section({ children, className = "" }) {
  return (
    <section className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>
  );
}

export default function TryWorkLP() {
  return (
    <main className="font-sans text-slate-800">
       <div className="min-h-screen bg-gray-50">
        {/* ✅ ヘッダー */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <Link
                href="/"
                className="text-xl sm:text-2xl font-bold text-blue-700 hover:text-blue-800"
              >
                Asterisk<span className="text-green-600">+</span>
              </Link>
              <nav className="flex space-x-6 md:space-x-8">
                <Link href="/" className="text-blue-600 font-medium">
                  サービス
                </Link>
                <Link
                  href="/service"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  お試し勤務一覧
                </Link>
              </nav>
            </div>
          </div>
        </header>

      {/* ヒーロー */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-emerald-50 to-white">
        <Section className="pt-20 sm:pt-28 pb-14">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/60 px-3 py-1 text-sm text-emerald-700 shadow-sm">
              <HeartHandshake className="w-4 h-4" aria-hidden />
              キャリアサポート付きの“お試し勤務”
            </span>
            <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-emerald-900">
              転職の不安を、<span className="whitespace-nowrap">“お試し勤務”</span>でなくそう。
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              約1ヶ月（31日未満・週20時間以内）働いてみてから選べる、新しい転職のカタチ。
              保育士も園も「お互いに選ぶ」時代へ。
            </p>
            {/* 中央配置CTA（ユーザー要望） */}
            <div className="flex justify-center mt-6 mb-4">
              <a
                href="#entry"
                className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 transition"
              >
                無料でお試し勤務を探す
                <ArrowRight className="w-4 h-4" aria-hidden />
              </a>
            </div>
            <p className="text-xs text-slate-500">※相談のみでもOK / 全国対応</p>
          </div>
        </Section>
      </div>

      {/* 共感セクション */}
      <Section className="py-14">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-emerald-900">
              面接だけでは、<br className="hidden sm:block" />本当に合う職場は分からない。
            </h2>
            <p className="mt-4 text-slate-600 leading-7">
              履歴書と面接だけの転職では、実際の雰囲気や人間関係は見えません。
              お試し勤務なら、実際に働きながら「自分に合う」を感じてから選べます。
            </p>
            <ul className="mt-4 space-y-2 text-slate-700">
              {[
                "入職後に『思っていたのと違う』を防ぐ",
                "子どもや職員との関わり方まで見える",
                "時間・曜日を調整しながら無理なく体験",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 text-emerald-600" aria-hidden />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* 画像プレースホルダ：自然光×木の温もりイメージ */}
          <div className="relative">
            <div className="aspect-[4/3] w-full rounded-3xl bg-gradient-to-br from-emerald-100 to-white border border-emerald-200 shadow-sm flex items-center justify-center">
              <div className="text-center px-8">
                <div className="text-emerald-700 font-semibold">現場の空気を“感じる”</div>
                <div className="mt-2 text-sm text-slate-500">お手元の写真に差し替えてください（保育の現場・自然光）</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* コンセプト */}
      <Section className="py-14 bg-white">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-emerald-900">約1ヶ月、“お試し”で働いてから選ぶ</h2>
          <p className="mt-4 text-slate-600">
            31日未満・週20時間以内の中途インターン期間で、職場の雰囲気・人間関係・自分のペースとの相性を確認。
            そのうえで就職の意思決定ができます。
          </p>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-3xl border border-emerald-200 bg-white/80 p-6 shadow-sm hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                {f.icon}
              </div>
              <h3 className="mt-4 font-semibold text-emerald-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* キャリアサポート */}
      <div className="bg-gradient-to-b from-white to-emerald-50">
        <Section className="py-14">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-emerald-900">働く前も、働いた後も。ずっと寄り添うキャリアサポート</h2>
              <p className="mt-4 text-slate-600 leading-7">
                お試し勤務の期間中はもちろん、<span className="font-semibold">就職後も1年間</span>、
                キャリアコンサルタントが伴走。人間関係や仕事内容、キャリアの方向性まで、その都度相談できます。
              </p>
              <div className="mt-4 grid sm:grid-cols-2 gap-4">
                {[
                  "定期面談（オンライン/対面）",
                  "悩みの即時チャット相談",
                  "成長プランの設計と振り返り",
                  "職場との調整・橋渡し",
                ].map((t) => (
                  <div key={t} className="flex items-start gap-2">
                    <MessageCircleHeart className="w-5 h-5 mt-0.5 text-emerald-600" aria-hidden />
                    <span className="text-sm text-slate-700">{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="aspect-[4/3] w-full rounded-3xl bg-white border border-emerald-200 shadow-sm p-6">
                <div className="h-full rounded-2xl border border-dashed border-emerald-300 flex items-center justify-center text-center px-6">
                  <div>
                    <div className="text-emerald-700 font-semibold">“いつでも相談できる”安心感</div>
                    <p className="mt-2 text-sm text-slate-500">面談カルテやチャットUIの画面キャプチャに差し替え推奨</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* 体験の声 */}
      <Section className="py-14">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-emerald-900">体験の声</h2>
          <p className="mt-3 text-slate-600">お試し勤務から就職した保育士さんのリアルな声です。</p>
        </div>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {VOICES.map((v, i) => (
            <figure key={i} className="rounded-3xl border border-emerald-200 bg-white p-6 shadow-sm">
              <blockquote className="text-slate-700 leading-7 whitespace-pre-line">“{v.text}”</blockquote>
              <figcaption className="mt-4 text-sm font-medium text-emerald-800">{v.name}</figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section className="py-14">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-emerald-900 text-center">よくある質問</h2>
          <div className="mt-6 divide-y divide-emerald-200 rounded-3xl border border-emerald-200 bg-white">
            {FAQS.map((f, idx) => (
              <details key={idx} className="group p-6 open:bg-emerald-50/40">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                  <span className="font-semibold text-emerald-900">{f.q}</span>
                  <span className="shrink-0 rounded-full border border-emerald-300 px-2 text-xs text-emerald-700">
                    開く
                  </span>
                </summary>
                <p className="mt-3 text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* 最終CTA */}
      <div className="bg-emerald-700">
        <Section className="py-14 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold">“働く前に感じる”転職を、あなたも</h2>
          <p className="mt-3 text-emerald-50">まずは気軽に相談から。無理な勧誘は一切ありません。</p>
          <div className="flex justify-center mt-6 mb-4">{/* 中央配置CTA */}
            <a
              id="entry"
              href="#"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-base font-semibold text-emerald-800 shadow-lg hover:bg-emerald-50 focus:outline-none focus:ring-4 focus:ring-white/40 transition"
            >
              無料で相談してみる
              <ArrowRight className="w-4 h-4" aria-hidden />
            </a>
          </div>
          <p className="text-xs text-emerald-100">キャリアサポートつき・全国対応</p>
        </Section>
      </div>

      {/* ✅ フッター */}
        <footer className="bg-white border-t mt-10">
          <Section className="py-8 text-sm text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} お試し勤務（中途インターン × キャリアサポート）</p>
            <nav className="flex items-center gap-4">
              <a href="#" className="hover:text-slate-700 underline-offset-2 hover:underline">
                プライバシーポリシー
              </a>
              <a href="#" className="hover:text-slate-700 underline-offset-2 hover:underline">
                利用規約
              </a>
              <a href="#" className="hover:text-slate-700 underline-offset-2 hover:underline">
                お問い合わせ
              </a>
            </nav>
          </Section>
        </footer>
      </div>
    </main>
  );
}

