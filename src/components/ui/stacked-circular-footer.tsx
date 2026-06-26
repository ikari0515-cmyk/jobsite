import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

function StackedCircularFooter() {
  return (
    <footer className="bg-white border-t py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8">
          
          {/* LINE Registration */}
          <div className="w-full max-w-md">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">公式LINEで最新のお試し勤務情報をお届け！</p>
              <Button asChild className="rounded-full px-8 bg-green-500 hover:bg-green-600">
                <a href="https://lin.ee/xVCllgr" target="_blank" rel="noopener noreferrer">
                  LINEでチェック！
                </a>
              </Button>
            </div>
          </div>
          {/* ▼ ここから追加：ページリンクとコピーライト ▼ */}
          <div className="w-full pt-8 mt-4 border-t border-gray-100 flex flex-col items-center">
          {/* ▼ 修正：target="_blank" rel="noopener noreferrer" を追加しました ▼ */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-4 text-sm text-gray-600 text-center">
          <Link href="/company" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors underline sm:no-underline">
            会社概要・明示事項
          </Link>
          <span className="hidden sm:inline text-gray-300">|</span>
          <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors underline sm:no-underline">
            プライバシーポリシー
          </Link>
        </div>
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} Asterisk+ All Rights Reserved.
            </p>
          </div>
          {/* ▲ ここまで追加 ▲ */}
        </div>
      </div>
    </footer>
  )
}

export { StackedCircularFooter }
