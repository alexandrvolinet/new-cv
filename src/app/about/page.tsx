// import Preloader from "@/components/shared/Preloader";
// import InteractiveDroplets from "@/components/ui/shaders/interactiveDroplets/InteractiveDroplets";
'use client'
import dynamic from 'next/dynamic'

const InteractiveDroplets = dynamic(() => import('@/components/ui/shaders/interactiveDroplets/InteractiveDroplets'), {
  ssr: false,
})

export default function Page() {
  return (
    <main className="bg-black p-4">
        {/* <Preloader/> */}
        <InteractiveDroplets/>
    </main>
  );
}