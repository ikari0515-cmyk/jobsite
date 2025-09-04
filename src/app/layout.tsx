import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Asteris+求人ナビ | 保育士・幼稚園教諭の求人情報",
    template: "%s | Asteris+求人ナビ"
  },
  description: "保育士・幼稚園教諭専門の求人情報サイト。保育園、認定こども園、幼稚園など様々な施設の求人を掲載。正社員、パートなど様々な雇用形態をご紹介。",
  keywords: ["保育士", "幼稚園教諭", "求人", "転職", "保育園", "認定こども園", "幼稚園", "正社員", "パート"],
  authors: [{ name: "Asteris+求人ナビ運営事務局" }],
  creator: "Asteris+求人ナビ",
  publisher: "Asteris+求人ナビ",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: '/',
    title: 'Asteris+求人ナビ | 保育士・幼稚園教諭の求人情報',
    description: '保育士・幼稚園教諭専門の求人情報サイト。保育園、認定こども園、幼稚園など様々な施設の求人を掲載。',
    siteName: 'Asteris+求人ナビ',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asteris+求人ナビ | 保育士・幼稚園教諭の求人情報',
    description: '保育士・幼稚園教諭専門の求人情報サイト。保育園、認定こども園、幼稚園など様々な施設の求人を掲載。',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'your-google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
