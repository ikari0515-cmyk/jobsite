'use client';
import Image from "next/image";
import React from "react";

export default function CanvaLP() {
  return (
    <main className="relative bg-[#fefcf9]">
      {/* Canva LP画像 */}
      <div className="relative w-full">
        <Image
          src="/canva-lp.png"
          alt="お試し勤務LP"
          width={1440}
          height={6500}
          className="w-full h-auto"
          priority
        />

        {/* ==== ボタン①：お試し勤務を探す ==== */}
        <a
          href="https://www.asteriskjob.com/service"
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: "430px",
            width: "260px",
            height: "60px",
            borderRadius: "9999px",
          }}
          aria-label="お試し勤務を探す"
        />

        {/* ==== ボタン②：お試し勤務の相談はこちら ==== */}
        <a
          href="https://timerex.net/s/asterisk.mt.fuji_5e6a/57d94a1c"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: "2050px",
            width: "280px",
            height: "60px",
            borderRadius: "9999px",
          }}
          aria-label="お試し勤務の相談はこちら"
        />

        {/* ==== ボタン③：お試し勤務ができる園を探す ==== */}
        <a
          href="https://www.asteriskjob.com/service"
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: "5650px",
            width: "280px",
            height: "60px",
            borderRadius: "9999px",
          }}
          aria-label="お試し勤務ができる園を探す"
        />
        {/* ===== フッターセクション ===== */}
<footer className="bg-[#F5EFE6] text-slate-800 py-12 px-6">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
    {/* 左側：ブランドと理念 */}
    <div>
      <h2 className="font-serif text-lg md:text-xl font-semibold mb-4">
        Asterisk＋は、「試す」から始まる保育の未来を応援します。
      </h2>
      <p className="text-sm text-slate-700 leading-relaxed">
        保育士も園も、どちらも笑顔になる採用を。
      </p>

      <div className="mt-6">
        <h3 className="text-xl font-bold mb-1">Asterisk＋</h3>
        <p className="text-sm">人財コンサル事業部</p>
      </div>
    </div>

    {/* 右側：連絡先 */}
    <div className="flex flex-col gap-2 text-sm md:text-base">
      <div className="flex items-center gap-2">
        <span className="font-semibold w-16">電話</span>
        <a
          href="tel:090-3848-4431"
          className="text-emerald-700 hover:underline"
        >
          090-3848-4431
        </a>
      </div>

      <div className="flex items-center gap-2">
        <span className="font-semibold w-16">メール</span>
        <a
          href="mailto:asterisk.mt.fuji@gmail.com"
          className="text-emerald-700 hover:underline break-all"
        >
          asterisk.mt.fuji@gmail.com
        </a>
      </div>

      <div className="flex items-start gap-2">
        <span className="font-semibold w-16">住所</span>
        <p className="text-slate-700 leading-snug">
          兵庫県たつの市御津町黒崎1842-14
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="font-semibold w-16">SNS</span>
        <a
          href="https://www.instagram.com/job.asterisk/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-700 hover:underline flex items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 3h9a4.5 4.5 0 014.5 4.5v9a4.5 4.5 0 01-4.5 4.5h-9A4.5 4.5 0 013 16.5v-9A4.5 4.5 0 017.5 3z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 7.5h.008v.008H16.5V7.5zM12 9a3 3 0 100 6 3 3 0 000-6z"
            />
          </svg>
          Instagram
        </a>
      </div>
    </div>
  </div>

  {/* コピーライト */}
  <div className="mt-10 border-t border-slate-300 pt-4 text-center text-xs text-slate-500">
    © {new Date().getFullYear()} Asterisk＋ All Rights Reserved.
  </div>
</footer>

      </div>
    </main>
  );
}
