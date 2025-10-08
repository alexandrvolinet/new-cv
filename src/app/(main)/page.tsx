'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import Preloader from '@/components/shared/Preloader'
import ShaderBlurContainer from "@/components/ui/ShaderBlurContainer";
import StickyPin from '@/lib/animations/StickyPin'

const Cuboid = dynamic(() => import('@/components/ui/shaders/Cuboid'), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-gray-100" />
})

const HeroSection = dynamic(() => import('@/app/(main)/home/heroSection/Hero'))
const TechSection = dynamic(() => import('@/app/(main)/home/techSection/Tech'))

export default function Page() {
  const [loading, setLoading] = useState(true)

  return (
    <div>
      {loading && <Preloader />}

      <StickyPin>
        <Cuboid onReady={() => setLoading(false)} />
      </StickyPin>

      <ShaderBlurContainer>
        <HeroSection />
        <TechSection />
      </ShaderBlurContainer>

    </div>
  )
}
