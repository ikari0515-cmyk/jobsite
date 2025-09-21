'use client'

import { Phone } from 'lucide-react'

interface JobContactButtonsProps {
  phoneNumber?: string | null
}

const sanitizePhoneNumber = (phone: string) => phone.replace(/[^\d+]/g, '')

export function JobContactButtons({ phoneNumber }: JobContactButtonsProps) {
  const sanitized = phoneNumber ? sanitizePhoneNumber(phoneNumber) : ''
  const telHref = sanitized ? `tel:${sanitized}` : null

  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
        <p className="text-xs font-semibold text-blue-800">応募はこちら</p>
        {phoneNumber ? (
          <>
            {telHref ? (
              <a
                href={telHref}
                className="mt-2 flex items-center text-blue-900 hover:text-blue-800 transition-colors"
              >
                <Phone size={20} className="mr-2" />
                <span className="text-lg font-semibold">{phoneNumber}</span>
              </a>
            ) : (
              <div className="mt-2 flex items-center text-blue-900">
                <Phone size={20} className="mr-2" />
                <span className="text-lg font-semibold">{phoneNumber}</span>
              </div>
            )}
            <p className="mt-3 text-xs text-blue-700">
              お電話の際は「お試し勤務の求人を見て電話しました」とお伝えください。
            </p>
          </>
        ) : (
          <p className="mt-2 text-sm text-blue-900">
            電話番号の情報が登録されていません。求人詳細をご確認のうえ、別の方法でお問い合わせください。
          </p>
        )}
      </div>
    </div>
  )
}
