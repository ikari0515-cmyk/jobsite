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
    default: "【公式】Asterisk+｜保育士が働く前に体験できるお試し勤務サービス",
    template: "%s | Asterisk+"
  },
  description: "Asterisk+は求人サイトではありません。保育士が“就職前に職場を体験できる”新しいキャリア選択サービスです。人間関係・働き方・園の雰囲気を、働く前に知れる。",
  keywords: ["保育士", "幼稚,園教諭", "求人", "転職", "保育園", "認定こども園", "幼稚園", "正社員", "パート","お試し勤務"],
  authors: [{ name: "Asterisk+運営事務局" }],
  creator: "Asterisk+",
  publisher: "Asterisk+",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: '/',
    title: 'Asterisk+ | 保育士・幼稚園教諭の求人情報',
    description: '保育士・幼稚園教諭専門の求人情報サイト。保育園、認定こども園、幼稚園など様々な施設の求人を掲載。',
    siteName: 'Asterisk+',
    images: ['/favicon.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asterisk+ | 保育士・幼稚園教諭の求人情報',
    description: '保育士・幼稚園教諭専門の求人情報サイト。保育園、認定こども園、幼稚園など様々な施設の求人を掲載。',
    images: ['/favicon.png'],
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
