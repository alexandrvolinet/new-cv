'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import Preloader from '@/components/shared/Preloader'

const Cuboid = dynamic(() => import('@/components/ui/shaders/Cuboid'), {
  ssr: false,
})

export default function Page() {
  const [loading, setLoading] = useState(true)

  return (
    <main>
      {loading && <Preloader />}
      <Cuboid onReady={() => setLoading(false)} />

    </main>
  )
}
