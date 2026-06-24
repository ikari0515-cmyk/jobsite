import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

function StackedCircularFooter() {
  return (
    <footer className="bg-white border-t py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8">
          
          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6 text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">トップページ</Link>
          </nav>
          
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
        </div>
      </div>
    </footer>
  )
}

export { StackedCircularFooter }
