import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAppStore } from '../store/useAppStore'
import { PageLayout } from '../components/layout/PageLayout'
import { PageTransition } from '../components/transitions/PageTransition'
import { LOVE_REASONS } from '../config/content'
import { motion } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

export function LovePage() {
  const { setCurrentPage } = useAppStore()
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    setCurrentPage('love')
  }, [setCurrentPage])

  useEffect(() => {
    const setup = setTimeout(() => {
      const ctx = gsap.context(() => {
        cardsRef.current.forEach((card, i) => {
          if (!card) return
          gsap.fromTo(
            card,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
              delay: (i % 3) * 0.07,
            }
          )
        })
        ScrollTrigger.refresh()
      })
      return () => ctx.revert()
    }, 400)
    return () => clearTimeout(setup)
  }, [])

  return (
    <PageLayout>
      <PageTransition variant="dissolve">
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '7rem 2rem 5rem',
          }}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>20 reasons — and counting</p>
            <h1 className="section-heading">Why I Love You</h1>
            <div className="deco-rule" />
            <p
              style={{
                fontFamily: 'var(--font-script)',
                fontSize: '1.5rem',
                color: 'var(--text-muted)',
                marginTop: '0.5rem',
              }}
            >
              — Ichu
            </p>
          </motion.div>

          {/* Cards grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
              gap: '1.25rem',
            }}
          >
            {LOVE_REASONS.map((reason, i) => {
              const isInfinity = reason.number === '∞'
              return (
                <div
                  key={reason.number}
                  ref={(el) => (cardsRef.current[i] = el)}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.transform = 'translateY(-5px)'
                    el.style.boxShadow = isInfinity
                      ? '0 0 0 1.5px rgba(169,142,230,0.55), 0 16px 50px rgba(139,111,212,0.22), 0 4px 12px rgba(0,0,0,0.04)'
                      : 'inset 0 1px 0 rgba(255,255,255,0.98), 0 0 0 1px rgba(169,142,230,0.35), 0 12px 40px rgba(139,111,212,0.14), 0 4px 12px rgba(0,0,0,0.04)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.transform = 'translateY(0)'
                    el.style.boxShadow = isInfinity
                      ? '0 0 0 1px rgba(196,176,240,0.40), 0 8px 32px rgba(139,111,212,0.14), 0 2px 8px rgba(0,0,0,0.03)'
                      : 'inset 0 1px 0 rgba(255,255,255,0.95), 0 0 0 1px rgba(196,176,240,0.22), 0 4px 20px rgba(139,111,212,0.08), 0 1px 4px rgba(0,0,0,0.03)'
                  }}
                  style={{
                    position: 'relative',
                    background: isInfinity
                      ? 'linear-gradient(135deg, rgba(237,229,255,0.72) 0%, rgba(252,232,237,0.65) 100%)'
                      : 'rgba(255,255,255,0.92)',
                    backdropFilter: 'blur(20px) saturate(140%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(140%)',
                    borderRadius: '20px',
                    padding: isInfinity ? '2.2rem 1.65rem' : '1.65rem',
                    boxShadow: isInfinity
                      ? '0 0 0 1px rgba(196,176,240,0.40), 0 8px 32px rgba(139,111,212,0.14), 0 2px 8px rgba(0,0,0,0.03)'
                      : 'inset 0 1px 0 rgba(255,255,255,0.95), 0 0 0 1px rgba(196,176,240,0.22), 0 4px 20px rgba(139,111,212,0.08), 0 1px 4px rgba(0,0,0,0.03)',
                    transition: 'all 0.35s var(--ease-silk)',
                    opacity: 0,
                    overflow: 'hidden',
                    textAlign: isInfinity ? 'center' : 'left',
                  }}
                >
                  {/* Watermark number */}
                  <div
                    style={{
                      position: 'absolute',
                      top: isInfinity ? '50%' : '0.5rem',
                      right: isInfinity ? '50%' : '0.85rem',
                      transform: isInfinity ? 'translate(50%, -50%)' : undefined,
                      fontFamily: 'var(--font-heading)',
                      fontSize: isInfinity ? '9rem' : '5rem',
                      lineHeight: 1,
                      color: isInfinity ? 'rgba(169,142,230,0.11)' : 'rgba(169,142,230,0.09)',
                      pointerEvents: 'none',
                      userSelect: 'none',
                      fontStyle: 'italic',
                      letterSpacing: isInfinity ? '-0.02em' : undefined,
                    }}
                  >
                    {reason.number}
                  </div>

                  {/* Lavender dot accent — hidden on infinity card */}
                  {!isInfinity && (
                    <div
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--lav-400), var(--blush-400))',
                        marginBottom: '0.9rem',
                        boxShadow: '0 0 8px rgba(169,142,230,0.4)',
                      }}
                    />
                  )}

                  {/* Infinity card top sparkle */}
                  {isInfinity && (
                    <div
                      style={{
                        fontSize: '1.4rem',
                        marginBottom: '0.85rem',
                        opacity: 0.7,
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      ✦
                    </div>
                  )}

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontStyle: 'italic',
                      fontSize: isInfinity ? '1.3rem' : '1.15rem',
                      color: isInfinity ? 'var(--lav-700)' : 'var(--text-primary)',
                      marginBottom: '0.65rem',
                      lineHeight: 1.35,
                      letterSpacing: '0.005em',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    {reason.title}
                  </h3>

                  {/* Body */}
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: isInfinity ? '1.05rem' : '1.02rem',
                      color: isInfinity ? 'var(--text-muted)' : 'var(--text-body)',
                      lineHeight: 1.85,
                      opacity: isInfinity ? 0.92 : 0.88,
                      position: 'relative',
                      zIndex: 1,
                      fontStyle: isInfinity ? 'italic' : 'normal',
                    }}
                  >
                    {reason.body}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </PageTransition>
    </PageLayout>
  )
}
