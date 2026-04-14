import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface CurtainWipeProps {
  active: boolean
  onMidpoint?: () => void
  onComplete?: () => void
}

export function CurtainWipe({ active, onMidpoint, onComplete }: CurtainWipeProps) {
  const panelARef = useRef<HTMLDivElement>(null)
  const panelBRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!active) return
    const tl = gsap.timeline()
    // Sweep in
    tl.fromTo(
      [panelARef.current, panelBRef.current],
      { scaleX: 0, transformOrigin: 'left center' },
      {
        scaleX: 1,
        duration: 0.45,
        ease: 'power3.inOut',
        stagger: 0.05,
        onComplete: () => onMidpoint?.(),
      }
    )
    // Hold then sweep out
    tl.to([panelARef.current, panelBRef.current], {
      scaleX: 0,
      transformOrigin: 'right center',
      duration: 0.4,
      ease: 'power3.inOut',
      stagger: 0.05,
      delay: 0.1,
      onComplete: () => onComplete?.(),
    })
  }, [active]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!active) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        ref={panelARef}
        style={{
          flex: 1,
          background: 'linear-gradient(135deg, #5040a4, #be6680)',
          transformOrigin: 'left center',
        }}
      />
      <div
        ref={panelBRef}
        style={{
          flex: 1,
          background: 'linear-gradient(135deg, #8368cc, #cc7a94)',
          transformOrigin: 'left center',
        }}
      />
    </div>
  )
}
