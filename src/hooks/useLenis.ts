import { useEffect } from 'react'
import Lenis from 'lenis'

let lenisInstance: Lenis | null = null

export function initLenis() {
  if (lenisInstance) return lenisInstance
  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  })

  function raf(time: number) {
    lenisInstance!.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
  return lenisInstance
}

export function scrollToTop() {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate: true })
  } else {
    window.scrollTo(0, 0)
  }
}

export function useLenis() {
  useEffect(() => {
    initLenis()
  }, [])
}
