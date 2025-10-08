'use client'

import { gsap } from "gsap-trial"
import { ScrollTrigger } from "gsap-trial/ScrollTrigger"
import { ScrollToPlugin } from "gsap-trial/ScrollToPlugin"


gsap.registerPlugin(
  ScrollTrigger,
  ScrollToPlugin,
)

function setupGlobalRefresh() {
  const refresh = () => {
    ScrollTrigger.refresh()
  }

  window.addEventListener('load', refresh)
  window.addEventListener('shaderReady', refresh)
}

if (typeof window !== 'undefined') {
  setupGlobalRefresh()
}

export { gsap, ScrollTrigger, ScrollToPlugin }
