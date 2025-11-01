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
      </div>
    </main>
  );
}
