'use client'

import { MessageSquare, Video } from 'lucide-react'
import { ParticleButton } from '@/components/ui/particle-button'

export function JobContactButtons() {
  const handleLineConsultation = () => {
    window.open('https://line.me/R/ti/p/@fuji-job', '_blank')
  }

  const handleWebReservation = () => {
    window.open('https://timerex.net/s/asterisk.mt.fuji_5e6a/57d94a1c', '_blank')
  }

  return (
    <div className="space-y-3">
      <ParticleButton 
        className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 font-medium"
        successDuration={1000}
        showIcon={false}
        onClick={handleLineConsultation}
      >
        <MessageSquare size={20} className="mr-2" />
        LINE相談
      </ParticleButton>
      <ParticleButton 
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 font-medium"
        successDuration={1000}
        showIcon={false}
        onClick={handleWebReservation}
      >
        <Video size={20} className="mr-2" />
        ウェブ予約
      </ParticleButton>
    </div>
  )
}
