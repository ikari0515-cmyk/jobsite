import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // ✅ /service は Vercel 側で表示（リダイレクトしない）
  if (url.pathname.startsWith("/service")) {
    return NextResponse.next();
  }

  // ✅ それ以外は全部 Canva の LP へ
  return NextResponse.redirect(`https://job.asteriskjob.com${url.pathname}`);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
