'use client';
import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <main className="bg-[#fefcf9]">
      {/* Canva LP画像 */}
      <section className="relative w-full">
        <Image
          src="/canva-lp.png"
          alt="お試し勤務LP"
          width={1440}
          height={6000}
          className="w-full h-auto"
          priority
        />
      </section>

      {/* 下部CTA（必要なら） */}
      <section className="text-center py-12 bg-white">
        <a
          href="/service"
          className="inline-block bg-[#FF895D] text-white font-bold px-8 py-4 rounded-full shadow-md hover:bg-[#ff7140] transition"
        >
          お試し勤務を探す
        </a>
      </section>
    </main>
  );
}
