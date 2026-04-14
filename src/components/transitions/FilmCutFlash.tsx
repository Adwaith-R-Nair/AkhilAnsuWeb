import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface FilmCutFlashProps {
  active: boolean
  dark?: boolean
  onComplete?: () => void
}

export function FilmCutFlash({ active, dark = false, onComplete }: FilmCutFlashProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!active || !ref.current) return
    const color = dark ? 'rgba(30, 20, 50, 1)' : 'rgba(250, 247, 255, 1)'
    gsap.fromTo(
      ref.current,
      { opacity: 0, backgroundColor: color },
      {
        keyframes: [
          { opacity: 1, duration: 0.08 },
          { opacity: 0.6, duration: 0.05 },
          { opacity: 1, duration: 0.07 },
          { opacity: 0, duration: 0.15 },
        ],
        onComplete: () => onComplete?.(),
      }
    )
  }, [active]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!active) return null

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        pointerEvents: 'none',
        backgroundColor: dark ? 'rgba(30,20,50,1)' : 'rgba(250,247,255,1)',
      }}
    />
  )
}
