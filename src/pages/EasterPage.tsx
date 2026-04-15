import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { useAppStore } from '../store/useAppStore'
import { PageLayout } from '../components/layout/PageLayout'
import { PageTransition } from '../components/transitions/PageTransition'
import { AudioCard } from '../components/ui/AudioCard'

const AUDIO_NOTES = [
  { src: '/assets/audio/note-1.mp3', label: 'Voice Note 01' },
  { src: '/assets/audio/note-2.mp3', label: 'Voice Note 02' },
  { src: '/assets/audio/note-3.mp3', label: 'Voice Note 03' },
  { src: '/assets/audio/note-4.mp3', label: 'Voice Note 04' },
]

// Burst sparkle particle — rendered in the container, NOT inside the orb
function BurstSparkle({ angle, distance, delay, char, color }: {
  angle: number
  distance: number
  delay: number
  char: string
  color: string
}) {
  const rad = (angle * Math.PI) / 180
  const tx = Math.cos(rad) * distance
  const ty = Math.sin(rad) * distance
  return (
    <motion.div
      initial={{ opacity: 1, x: 0, y: 0, scale: 1.2 }}
      animate={{ opacity: 0, x: tx, y: ty, scale: 0 }}
      transition={{ duration: 0.85 + Math.random() * 0.4, delay, ease: [0.2, 0, 0.4, 1] }}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-6px',
        marginLeft: '-6px',
        color,
        fontSize: `${0.55 + Math.random() * 0.7}rem`,
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      {char}
    </motion.div>
  )
}

// Falling confetti after all audio played
function FallingSparkle({ x, delay }: { x: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: `${x}vw`, scale: 0.5 }}
      animate={{ opacity: [0, 1, 1, 0], y: '110vh', scale: [0.5, 1, 0.8] }}
      transition={{ duration: 4 + Math.random() * 2, delay, ease: 'linear' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        color: Math.random() > 0.5 ? 'var(--lav-400)' : 'var(--blush-300)',
        fontSize: `${0.5 + Math.random() * 0.7}rem`,
        pointerEvents: 'none',
        zIndex: 200,
      }}
    >
      {Math.random() > 0.5 ? '✦' : '✧'}
    </motion.div>
  )
}

export function EasterPage() {
  const { setCurrentPage } = useAppStore()
  const navigate = useNavigate()
  const orbRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  const [unlocked, setUnlocked] = useState(false)
  const [bursting, setBursting] = useState(false)
  const [burstParticles] = useState(() =>
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      angle: (i / 28) * 360 + Math.random() * 10,
      distance: 70 + Math.random() * 90,
      delay: Math.random() * 0.12,
      char: Math.random() > 0.5 ? '✦' : '✧',
      color: Math.random() > 0.5 ? 'var(--lav-400)' : 'var(--blush-400)',
    }))
  )
  const [playedCount, setPlayedCount] = useState(0)
  const [showSecret, setShowSecret] = useState(false)
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; delay: number }>>([])

  useEffect(() => { setCurrentPage('easter') }, [setCurrentPage])

  // Pulse ring animation (before unlock)
  useEffect(() => {
    if (unlocked) return
    if (!ringRef.current) return
    const tl = gsap.timeline({ repeat: -1, yoyo: true })
    tl.to(ringRef.current, {
      scale: 1.18,
      opacity: 0.3,
      duration: 1.6,
      ease: 'power1.inOut',
    })
    return () => { tl.kill() }
  }, [unlocked])

  const handleUnlock = () => {
    if (unlocked) return
    setBursting(true)
    // Orb crack animation
    if (orbRef.current) {
      gsap.timeline()
        .to(orbRef.current, { scale: 1.35, duration: 0.15, ease: 'power2.out' })
        .to(orbRef.current, { scale: 0, opacity: 0, duration: 0.4, ease: 'back.in(2)' })
    }
    setTimeout(() => {
      setUnlocked(true)
      setBursting(false)
    }, 500)
  }

  const handlePlayed = () => {
    setPlayedCount((c) => {
      const next = c + 1
      if (next >= AUDIO_NOTES.length) {
        setShowSecret(true)
        setConfetti(
          Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            delay: Math.random() * 2.5,
          }))
        )
      }
      return next
    })
  }

  return (
    <PageLayout>
      <PageTransition variant="fade">
        {/* Falling confetti when secret revealed */}
        {confetti.map((c) => (
          <FallingSparkle key={c.id} x={c.x} delay={c.delay} />
        ))}

        <div
          style={{
            maxWidth: '720px',
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
            <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>a little extra</p>
            <h1 className="section-heading">One More Thing</h1>
            <div className="deco-rule" />
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontStyle: 'italic',
                fontSize: '1.05rem',
                color: 'var(--text-muted)',
                marginTop: '0.5rem',
              }}
            >
              He couldn't fit everything into words.
            </p>
          </motion.div>

          {/* ── LOCKED STATE: Mystery orb ── */}
          <AnimatePresence mode="wait">
            {!unlocked ? (
              <motion.div
                key="locked"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '350px',
                  gap: '2.5rem',
                }}
              >
                {/* Orb + ring */}
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* Burst particles — in container so GSAP orb scale doesn't affect them */}
                  {bursting && burstParticles.map((p) => (
                    <BurstSparkle
                      key={p.id}
                      angle={p.angle}
                      distance={p.distance}
                      delay={p.delay}
                      char={p.char}
                      color={p.color}
                    />
                  ))}

                  {/* Pulsing ring */}
                  <div
                    ref={ringRef}
                    style={{
                      position: 'absolute',
                      width: '160px',
                      height: '160px',
                      borderRadius: '50%',
                      border: '2px solid rgba(169,142,230,0.45)',
                      boxShadow: '0 0 40px rgba(139,111,212,0.2)',
                      pointerEvents: 'none',
                    }}
                  />
                  {/* Second pulsing ring (offset phase) */}
                  <motion.div
                    animate={{ scale: [1, 1.28, 1], opacity: [0.2, 0.05, 0.2] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                    style={{
                      position: 'absolute',
                      width: '200px',
                      height: '200px',
                      borderRadius: '50%',
                      border: '1px solid rgba(169,142,230,0.25)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* The orb itself — GSAP scales this independently of burst particles */}
                  <div
                    ref={orbRef}
                    onClick={handleUnlock}
                    style={{
                      width: '110px',
                      height: '110px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle at 38% 38%, rgba(196,176,240,0.95), rgba(139,111,212,0.75) 60%, rgba(91,63,166,0.95))',
                      boxShadow:
                        '0 0 30px rgba(139,111,212,0.55), 0 0 65px rgba(139,111,212,0.25), inset 0 2px 10px rgba(255,255,255,0.45)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2.4rem',
                      userSelect: 'none',
                      position: 'relative',
                      zIndex: 2,
                    }}
                  >
                    💙
                  </div>
                </div>

                {/* Hint text */}
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ textAlign: 'center' }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.65rem',
                      letterSpacing: '0.25em',
                      textTransform: 'uppercase',
                      color: 'var(--text-faint)',
                      marginBottom: '0.4rem',
                    }}
                  >
                    something is hidden here
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontStyle: 'italic',
                      fontSize: '0.9rem',
                      color: 'var(--text-muted)',
                    }}
                  >
                    tap to open ✦
                  </p>
                </motion.div>
              </motion.div>
            ) : (

              /* ── UNLOCKED STATE: Audio cards ── */
              <motion.div
                key="unlocked"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {/* Unlock confirmation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    textAlign: 'center',
                    marginBottom: '3rem',
                  }}
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
                    style={{
                      display: 'inline-block',
                      fontSize: '2.5rem',
                      marginBottom: '0.75rem',
                    }}
                  >
                    💙
                  </motion.span>
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontStyle: 'italic',
                      fontSize: '1.1rem',
                      color: 'var(--text-muted)',
                    }}
                  >
                    Four voice notes. Just for you.
                  </motion.p>
                </motion.div>

                {/* Audio cards — staggered bloom in */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '1.25rem',
                    marginBottom: '4rem',
                  }}
                >
                  {AUDIO_NOTES.map((note, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30, scale: 0.92 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        delay: 0.15 + i * 0.18,
                        duration: 0.65,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <AudioCard
                        src={note.src}
                        label={note.label}
                        index={i}
                        onPlayed={handlePlayed}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Progress */}
                <AnimatePresence>
                  {playedCount < AUDIO_NOTES.length && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        textAlign: 'center',
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.65rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'var(--text-faint)',
                        marginBottom: '2rem',
                      }}
                    >
                      {playedCount} / {AUDIO_NOTES.length} played
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Secret message */}
                <AnimatePresence>
                  {showSecret && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        textAlign: 'center',
                        marginBottom: '3rem',
                        padding: '2rem 1.5rem',
                        background: 'rgba(237,229,255,0.55)',
                        border: '1px solid rgba(196,176,240,0.4)',
                        borderRadius: '20px',
                        boxShadow: '0 4px 32px rgba(139,111,212,0.12)',
                      }}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
                        style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}
                      >
                        ✦
                      </motion.div>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontStyle: 'italic',
                          fontSize: '1.2rem',
                          color: 'var(--lav-700)',
                          lineHeight: 1.7,
                        }}
                      >
                        "If you made it this far — he really did mean every word. 💙"
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Continue to final page */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  style={{ textAlign: 'center', marginTop: '1rem', paddingBottom: '2rem' }}
                >
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(139,111,212,0.2)' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate('/memories-of-you')}
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(139,111,212,0.3)',
                      borderRadius: '60px',
                      padding: '0.75rem 2.5rem',
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.75rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--lav-500)',
                      cursor: 'pointer',
                    }}
                  >
                    one last letter →
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </PageTransition>
    </PageLayout>
  )
}
