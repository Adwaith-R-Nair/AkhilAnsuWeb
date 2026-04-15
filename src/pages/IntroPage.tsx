import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { useAppStore } from '../store/useAppStore'
import { PageLayout } from '../components/layout/PageLayout'
import { PageTransition } from '../components/transitions/PageTransition'

const SPARKLES = [
  { top: '14%', left:  '8%',  size: '1.1rem', dur: 4.2 },
  { top: '72%', right: '10%', size: '0.85rem', dur: 5.1 },
  { top: '30%', right: '6%',  size: '1.05rem', dur: 3.8 },
  { top: '60%', left:  '5%',  size: '0.9rem',  dur: 4.6 },
  { top: '45%', right: '18%', size: '0.7rem',  dur: 5.8 },
  { top: '20%', left:  '22%', size: '0.65rem', dur: 3.4 },
]

// ─── Cinematic loader ────────────────────────────────────────────────────────
function Loader({ onDone }: { onDone: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef      = useRef<HTMLDivElement>(null)
  const text1Ref     = useRef<HTMLDivElement>(null)
  const text2Ref     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ onComplete: onDone })

    tl.fromTo(lineRef.current,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 1.0, ease: 'power2.inOut' },
      0.4
    )
    tl.fromTo(text1Ref.current,
      { opacity: 0, y: 22 },
      { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' },
      1.2
    )
    tl.fromTo(text2Ref.current,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
      1.95
    )
    tl.to(containerRef.current,
      { opacity: 0, duration: 0.8, ease: 'power2.in', pointerEvents: 'none' },
      3.5
    )

    return () => { tl.kill() }
  }, [onDone])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        background: '#faf7ff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
      }}
    >
      <div
        ref={lineRef}
        style={{
          width: '200px',
          height: '1px',
          background: 'linear-gradient(to right, transparent, var(--lav-400), transparent)',
          marginBottom: '1.5rem',
          transformOrigin: 'left center',
        }}
      />
      <div
        ref={text1Ref}
        style={{
          fontFamily: 'var(--font-heading)',
          fontStyle: 'italic',
          fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
          color: 'var(--lav-700)',
          opacity: 0,
        }}
      >
        For Blue. 🔵
      </div>
      <div
        ref={text2Ref}
        style={{
          fontFamily: 'var(--font-ui)',
          fontWeight: 300,
          fontSize: '0.88rem',
          color: 'var(--text-muted)',
          letterSpacing: '0.06em',
          opacity: 0,
        }}
      >
        from Ichu — with everything he had left to say.
      </div>
    </div>
  )
}

// ─── Hero page ───────────────────────────────────────────────────────────────
export function IntroPage() {
  const navigate = useNavigate()
  const { loaderDone, setLoaderDone, setCurrentPage } = useAppStore()
  const [showLoader, setShowLoader] = useState(!loaderDone)

  const heroRef     = useRef<HTMLDivElement>(null)
  const eyebrowRef  = useRef<HTMLParagraphElement>(null)
  const titleRef    = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ruleRef     = useRef<HTMLDivElement>(null)
  const btnRef      = useRef<HTMLButtonElement>(null)

  const hasAnimatedRef = useRef(false)

  useEffect(() => { setCurrentPage('intro') }, [setCurrentPage])

  const handleLoaderDone = useCallback(() => {
    setLoaderDone(true)
    setTimeout(() => setShowLoader(false), 100)
  }, [setLoaderDone])

  // Mouse parallax
  useEffect(() => {
    if (!loaderDone) return
    const onMove = (e: MouseEvent) => {
      const cx = (e.clientX / window.innerWidth  - 0.5) * 2
      const cy = (e.clientY / window.innerHeight - 0.5) * 2
      gsap.to(heroRef.current, {
        x: cx * 10,
        y: cy * 7,
        duration: 1.4,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [loaderDone])

  // Entrance animations — clean whole-element approach, no per-char opacity
  useEffect(() => {
    if (!loaderDone || hasAnimatedRef.current) return
    hasAnimatedRef.current = true

    const tl = gsap.timeline({ delay: 0.1 })

    tl.fromTo(eyebrowRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
    )
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 40, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, ease: 'power3.out' },
      '-=0.2'
    )
    tl.fromTo(ruleRef.current,
      { scaleX: 0, transformOrigin: 'center' },
      { scaleX: 1, duration: 0.7, ease: 'power2.inOut' },
      '-=0.5'
    )
    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.35'
    )
    tl.fromTo(btnRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
      '-=0.3'
    )

    return () => { tl.kill() }
  }, [loaderDone])

  return (
    <>
      {showLoader && <Loader onDone={handleLoaderDone} />}

      <PageLayout hideNav={!loaderDone}>
        <PageTransition variant="dissolve">
          <div
            style={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '2rem',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Floating ambient sparkles */}
            {SPARKLES.map((s, i) => (
              <motion.span
                key={i}
                style={{
                  position: 'absolute',
                  top: s.top,
                  left: (s as any).left,
                  right: (s as any).right,
                  fontSize: s.size,
                  color: i % 2 === 0 ? 'var(--lav-400)' : 'var(--blush-400)',
                  pointerEvents: 'none',
                  userSelect: 'none',
                  display: 'block',
                }}
                animate={{
                  rotate: [0, 360],
                  opacity: [0.1, 0.6, 0.1],
                  scale: [0.7, 1.3, 0.7],
                }}
                transition={{
                  duration: s.dur,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.55,
                }}
              >
                ✦
              </motion.span>
            ))}

            {/* Drifting blobs */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`blob-${i}`}
                animate={{
                  x: [0, (i - 1) * 30, 0],
                  y: [0, (i % 2 === 0 ? 20 : -20), 0],
                  opacity: [0.04, 0.10, 0.04],
                }}
                transition={{ duration: 8 + i * 3, repeat: Infinity, ease: 'easeInOut', delay: i * 2 }}
                style={{
                  position: 'absolute',
                  width: `${200 + i * 80}px`,
                  height: `${200 + i * 80}px`,
                  borderRadius: '50%',
                  background: i % 2 === 0
                    ? 'radial-gradient(circle, var(--lav-300), transparent 70%)'
                    : 'radial-gradient(circle, var(--blush-300), transparent 70%)',
                  top: `${20 + i * 25}%`,
                  left: `${10 + i * 30}%`,
                  pointerEvents: 'none',
                  filter: 'blur(40px)',
                }}
              />
            ))}

            {/* Hero content */}
            <div
              ref={heroRef}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.25rem',
                maxWidth: '860px',
                width: '100%',
                zIndex: 1,
              }}
            >
              {/* Eyebrow */}
              <p
                ref={eyebrowRef}
                className="eyebrow"
                style={{ opacity: 0 }}
              >
                a world that was ours
              </p>

              {/* Title — flowing gradient via CSS, no per-char opacity hack */}
              <h1
                ref={titleRef}
                className="title-gradient-flow"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(3.2rem, 8.5vw, 8rem)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.01em',
                  margin: 0,
                  opacity: 0,
                  textShadow: 'none',
                }}
              >
                Ansu & Ichu's World
              </h1>

              {/* Decorative rule */}
              <div
                ref={ruleRef}
                style={{
                  width: '120px',
                  height: '1px',
                  background: 'linear-gradient(to right, transparent, var(--lav-400), transparent)',
                  margin: '0.1rem 0',
                }}
              />

              {/* Subtitle */}
              <p
                ref={subtitleRef}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(1.05rem, 2vw, 1.3rem)',
                  color: 'var(--text-muted)',
                  opacity: 0,
                  lineHeight: 1.6,
                  maxWidth: '520px',
                }}
              >
                One year. Every feeling. All of it — finally said.
              </p>

              {/* Begin button */}
              <motion.button
                ref={btnRef}
                whileHover={{
                  borderColor: 'var(--lav-400)',
                  background: 'rgba(139,111,212,0.08)',
                  boxShadow: '0 0 40px rgba(139,111,212,0.28), 0 0 80px rgba(139,111,212,0.12)',
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/apology')}
                style={{
                  marginTop: '0.75rem',
                  background: 'transparent',
                  border: '1px solid rgba(139,111,212,0.3)',
                  borderRadius: '60px',
                  padding: '0.85rem 3rem',
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 400,
                  fontSize: '0.72rem',
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: 'var(--lav-500)',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease',
                  opacity: 0,
                }}
              >
                begin →
              </motion.button>
            </div>

            {/* Scroll cue */}
            <AnimatePresence>
              {loaderDone && (
                <motion.div
                  key="cue"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.5, duration: 0.7 }}
                  className="scroll-cue"
                  style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    color: 'var(--text-faint)',
                    fontSize: '1.1rem',
                  }}
                >
                  ↓
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </PageTransition>
      </PageLayout>
    </>
  )
}
