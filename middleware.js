import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // ✅ /service は Next.js 側
  if (url.pathname.startsWith("/service")) {
    return NextResponse.next();
  }

  // ✅ それ以外は Canva
  return NextResponse.redirect(`https://job.asteriskjob.com${url.pathname}`);
}

export const config = {
  matcher: ["/:path*"],
};
