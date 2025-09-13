// utils/gsap.ts
'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

function setupGlobalRefresh() {
  const refresh = () => ScrollTrigger.refresh()

  window.addEventListener('load', refresh)

  window.addEventListener('shaderReady', refresh)
}

if (typeof window !== 'undefined') {
  setupGlobalRefresh()
}

export { gsap, ScrollTrigger, ScrollToPlugin }
