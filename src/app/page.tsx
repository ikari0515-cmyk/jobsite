'use client';
import React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  HeartHandshake,
  Users,
  Clock,
  ShieldCheck,
  MessageCircleHeart,
  ArrowRight,
} from "lucide-react";

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
    text: "面接では分からなかった雰囲気や人の温かさを体感できました。\n1ヶ月後、迷いなく入職を決められてよかったです。",
  },
  {
    name: "Bさん（保育士/32歳）",
    text: "キャリアサポートの面談が心の支えに。悩みをその場で整理できて、安心して選べました。",
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

// ✅ Section コンポーネント
function Section({ children, className = "" }) {
  return (
    <section
      className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </section>
  );
}

// ✅ メインコンポーネント
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

        {/* ✅ 以下、LPコンテンツ */}
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

        {/* --- 以下は省略可能（既に動作OK） --- */}

        {/* ✅ フッター */}
        <footer className="bg-white mt-10">
          <Section className="py-8 text-sm text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>
              © {new Date().getFullYear()} お試し勤務（中途インターン × キャリアサポート）
            </p>
            <nav className="flex items-center gap-4">
              <a
                href="#"
                className="hover:text-slate-700 underline-offset-2 hover:underline"
              >
                プライバシーポリシー
              </a>
              <a
                href="#"
                className="hover:text-slate-700 underline-offset-2 hover:underline"
              >
                利用規約
              </a>
              <a
                href="#"
                className="hover:text-slate-700 underline-offset-2 hover:underline"
              >
                お問い合わせ
              </a>
            </nav>
          </Section>
        </footer>
      </div>
    </main>
  );
}
