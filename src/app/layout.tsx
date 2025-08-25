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
    default: "求人広告サイト | 最新の求人情報",
    template: "%s | 求人広告サイト"
  },
  description: "最新の求人情報を掲載しています。正社員、アルバイト、パートなど様々な雇用形態の仕事を探すことができます。",
  keywords: ["求人", "転職", "仕事", "アルバイト", "パート", "正社員", "採用"],
  authors: [{ name: "求人広告サイト運営事務局" }],
  creator: "求人広告サイト",
  publisher: "求人広告サイト",
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
    title: '求人広告サイト | 最新の求人情報',
    description: '最新の求人情報を掲載しています。正社員、アルバイト、パートなど様々な雇用形態の仕事を探すことができます。',
    siteName: '求人広告サイト',
  },
  twitter: {
    card: 'summary_large_image',
    title: '求人広告サイト | 最新の求人情報',
    description: '最新の求人情報を掲載しています。正社員、アルバイト、パートなど様々な雇用形態の仕事を探すことができます。',
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
