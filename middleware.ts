// middleware.ts（プロジェクト直下に配置）
// ※ src/ ではなくリポジトリのルート階層に置いてください

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || '';
  const { pathname, search } = req.nextUrl;

  // asteriskjob.com（www含む）以外では何もしない
  if (!/^(?:www\.)?asteriskjob\.com$/i.test(host)) {
    return NextResponse.next();
  }

  // Vercelで表示したいものは素通し
  if (pathname.startsWith('/service') || pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // それ以外は Canva の LP へ
  return NextResponse.redirect(`https://job.asteriskjob.com${pathname}${search}`, 307);
}

// ルート `/` を含め、_next/api 等は除外
export const config = {
  matcher: [
    '/((?!_next|api|favicon\\.ico|robots\\.txt|sitemap\\.xml|static|assets).*)',
    '/', // ルートも明示的に対象にする
  ],
};
