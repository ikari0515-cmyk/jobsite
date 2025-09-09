import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

function StackedCircularFooter() {
  return (
    <footer className="bg-white border-t py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo */}
          <div className="rounded-full bg-blue-50 p-6">
            <Icons.logo className="w-8 h-8 text-blue-600" />
          </div>
          
          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6 text-gray-600">
            <a href="/" className="hover:text-blue-600 transition-colors">トップページ</a>
          </nav>
          
          {/* Social Links */}
          <div className="flex space-x-4">
            <Button variant="outline" size="icon" className="rounded-full w-10 h-10">
              <Facebook className="h-4 w-4" />
              <span className="sr-only">Facebook</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full w-10 h-10">
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full w-10 h-10" asChild>
              <a href="https://www.instagram.com/hoiku5151?igsh=Z2gzcGFuamlxNTEz&utm_source=qr" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </a>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full w-10 h-10">
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </div>
          
          {/* LINE Registration */}
          <div className="w-full max-w-md">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">公式LINEで最新の求人情報をお届け！</p>
              <Button asChild className="rounded-full px-8 bg-green-500 hover:bg-green-600">
                <a href="https://lin.ee/xVCllgr" target="_blank" rel="noopener noreferrer">
                  公式LINE登録
                </a>
              </Button>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              © 2025 Asteris+求人ナビ. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { StackedCircularFooter }
