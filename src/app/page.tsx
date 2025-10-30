'use client';
import React from "react";
import { ArrowDown, ArrowRight } from "lucide-react";

export default function TryWorkFlow() {
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

      <section className="bg-[#fffdfa] py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-emerald-800 mb-10">
          お試し勤務の流れ
        </h2>

        {/* 縦のフロー図 */}
        <div className="relative border-l-4 border-emerald-400 pl-6 space-y-12 text-left mx-auto max-w-md">

          {/* ステップ1 */}
          <div className="relative">
            <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-emerald-500"></div>
            <h3 className="text-lg font-bold text-emerald-800">① お試し勤務の相談</h3>
            <p className="text-slate-700 mt-2 text-sm leading-6">
              キャリアサポートに登録し、コンサルタントと一緒に希望条件を整理します。
            </p>
          </div>

          {/* ステップ2 */}
          <div className="relative">
            <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-emerald-500"></div>
            <h3 className="text-lg font-bold text-emerald-800">② お試し勤務の応募</h3>
            <p className="text-slate-700 mt-2 text-sm leading-6">
              気になる職場にエントリー。31日以内・週20h未満の「お試し勤務」を体験します。
            </p>
          </div>

          {/* ステップ3 */}
          <div className="relative">
            <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-emerald-500"></div>
            <h3 className="text-lg font-bold text-emerald-800">③ 1ヶ月後の分岐</h3>
            <p className="text-slate-700 mt-2 text-sm leading-6 mb-6">
              実際に働いた上で、今後の道を一緒に考えましょう。
            </p>

            {/* 枝分かれ図 */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-emerald-200 pt-6">
              {/* 左：就職 */}
              <div className="flex-1 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition">
                <h4 className="font-bold text-emerald-700">✅ 就職する</h4>
                <p className="text-sm text-slate-600 mt-2 leading-6">
                  職場に正式入職！<br />
                  <span className="font-semibold text-emerald-600">
                    12ヶ月のキャリアサポート
                  </span>
                  がついて安心スタート。
                </p>
              </div>

              {/* 矢印 */}
              <ArrowRight className="hidden sm:block w-6 h-6 text-emerald-400 mx-2" />

              {/* 右：他のお試し勤務へ */}
              <div className="flex-1 bg-white border border-emerald-200 rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition">
                <h4 className="font-bold text-emerald-700">🌿 他のお試し勤務を体験</h4>
                <p className="text-sm text-slate-600 mt-2 leading-6">
                  さらに自分に合う職場を探したい方へ。<br />
                  再度別の園でお試し勤務が可能です。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <a
            href="#entry"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:bg-emerald-700 transition"
          >
            無料でお試し勤務を探す
            <ArrowDown className="w-4 h-4" />
          </a>
          <p className="mt-3 text-xs text-slate-500">
            ※相談のみでもOK／全国対応
          </p>
        </div>
      </div>
    </section>
    </main>
  );
}
