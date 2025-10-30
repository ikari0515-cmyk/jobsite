'use client';
import React from "react";
import { ArrowRight } from "lucide-react";

export default function TryWorkBizreachStyle() {
  return (
    <main className="font-sans bg-[#fffdfa] text-slate-800">
      {/* ✅ Hero Section */}
      <section className="text-center px-6 py-16 bg-[url('/bg-grid.svg')] bg-repeat">
        <h1 className="text-2xl font-bold leading-relaxed text-slate-900">
          お試し勤務は、<br />
          <span className="text-emerald-700">「転職するため」だけの制度</span>
          ではありません。
        </h1>
        <p className="mt-6 text-base text-slate-600 leading-7">
          働き方の選択肢が広がり、理想的なキャリアを追求できる時代になりました。
          <br />
          自分にとってベストな職場の選び方とは何か。
          <br />
          <span className="text-emerald-600 font-semibold">
            まずは「お試し勤務」で自分に合う環境を感じてみる
          </span>
          ことから始めましょう。
        </p>

        <a
          href="#try"
          className="inline-block mt-8 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-lg rounded-full px-8 py-3 transition"
        >
          お試し勤務を探す
        </a>
        <p className="mt-3 text-sm text-slate-500">
          ＼ 自分に合う職場の雰囲気を確かめよう ／
        </p>
      </section>

      {/* ✅ 選択セクション */}
      <section className="px-6 py-16 bg-white text-center">
        <h2 className="text-xl font-bold text-slate-900 mb-10">
          お試し勤務は、どちらの選択にも寄り添います。
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* 今すぐ試してみる */}
          <div className="border-2 border-emerald-500 rounded-2xl p-6">
            <h3 className="text-emerald-700 font-bold text-lg mb-4">
              今、試してみたいあなたへ
            </h3>
            <ul className="space-y-3 text-left text-slate-700">
              <li>✅ お試し勤務に登録する</li>
              <li>✅ 実際に職場で働いてみる</li>
              <li>✅ 人や環境の“リアル”を体感</li>
              <li>✅ 自分に合う職場に出会う</li>
            </ul>
            <div className="mt-6">
              <a
                href="#entry"
                className="inline-flex items-center justify-center w-full bg-emerald-600 text-white rounded-full py-3 font-semibold hover:bg-emerald-700 transition"
              >
                登録してお試し勤務を始める
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>

          {/* まだ考えたい */}
          <div className="border-2 border-sky-400 rounded-2xl p-6">
            <h3 className="text-sky-600 font-bold text-lg mb-4">
              まだ考えたいあなたへ
            </h3>
            <ul className="space-y-3 text-left text-slate-700">
              <li>💬 キャリアサポートに登録する</li>
              <li>💬 面談で自分の働き方を整理する</li>
              <li>💬 キャリアアップに必要な準備を知る</li>
              <li>💬 タイミングが来たらお試し勤務へ</li>
            </ul>
            <div className="mt-6">
              <a
                href="#support"
                className="inline-flex items-center justify-center w-full bg-sky-500 text-white rounded-full py-3 font-semibold hover:bg-sky-600 transition"
              >
                キャリア相談をしてみる
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ メッセージセクション */}
      <section className="px-6 py-16 bg-emerald-50 text-center">
        <h2 className="text-lg sm:text-xl font-bold text-emerald-900 mb-4">
          お試し勤務をする・しないにかかわらず、
          <br />
          「自分に合う職場を知る」ことが大切です。
        </h2>
        <p className="text-slate-700 mt-4 max-w-xl mx-auto leading-7">
          実際に多くの方が、お試し勤務を通して
          <br />
          「自分がどう働きたいか」を再確認しています。
        </p>
      </section>

      {/* ✅ 登録セクション */}
      <section
        id="entry"
        className="px-6 py-16 bg-white text-center border-t border-emerald-100"
      >
        <h2 className="text-xl font-bold text-slate-900 mb-6">
          あなたも「お試し勤務」で、
          <br />
          自分に合う職場を感じてみませんか？
        </h2>

        <div className="space-y-3 max-w-md mx-auto">
          <button className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-lg transition">
            LINEで登録
          </button>
        </div>
      </section>

      {/* ✅ フッター */}
      <footer className="bg-slate-900 text-slate-200 text-center py-6 text-sm">
        <p>© 2025 お試し勤務（中途インターン × キャリアサポート）</p>
      </footer>
    </main>
  );
}
