import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { PageLayout } from '../components/layout/PageLayout'
import { PageTransition } from '../components/transitions/PageTransition'

interface Para {
  text: string
  style: 'greeting' | 'body' | 'accent-lav' | 'accent-blush' | 'signature'
}

const PARAGRAPHS: Para[] = [
  {
    text: "Hey, Ann. 💙",
    style: 'greeting',
  },
  {
    text: "You weren't supposed to find me at the end of this. But I couldn't build something this personal and stay invisible.",
    style: 'body',
  },
  {
    text: "Adwaith here, the person who wrote every line of code you just moved through. Akhil's best friend. And someone who, I hope, has been quietly in your corner too.",
    style: 'body',
  },
  {
    text: "I've had the strange privilege of watching this story from both sides. I've seen how much Akhil feels. I've heard how much you've felt. And somewhere between those two truths, I realised, this wasn't just a relationship. It was something genuinely rare.",
    style: 'body',
  },
  {
    text: "What stayed with me most, through everything, was you. The way you keep showing up even when it's hard. The way you try to understand people even when understanding hurts. The way you love, not for show, but quietly, deeply, for real.",
    style: 'body',
  },
  {
    text: "Whatever you chose on that page, I want you to know I think you got it right. Not because either answer is easy, but because you chose with your whole heart. And that's the only kind of choosing that actually means something.",
    style: 'body',
  },
  {
    text: "If you chose to try again, I hope this time is gentler. More honest. More patient. You both deserve a version of this that doesn't cost you your peace.",
    style: 'accent-lav',
  },
  {
    text: "If you chose to let go, that took courage too. Choosing yourself, even when love is still there, is one of the hardest things a person can do. It isn't giving up. It's knowing what you deserve.",
    style: 'accent-blush',
  },
  {
    text: "Either way: the love you gave was real. It wasn't wasted. It shaped you, and it will keep shaping you into something even more whole.",
    style: 'body',
  },
  {
    text: "I built this because Akhil asked me to. I put everything into it because I wanted you to feel, really feel, that you were seen. That what you went through mattered. That you matter.",
    style: 'body',
  },
  {
    text: "Take care of yourself, Ann. Be kind to yourself, especially on the days when the world isn't. And know that you are loved, by people who don't need a reason to.",
    style: 'body',
  },
  {
    text: "With warmth and a quiet kind of pride in you,\nAdwaith 🤍",
    style: 'signature',
  },
]

const DEV_SIG = '// built with care, adwaith'

export function CreatorPage() {
  const { setCurrentPage } = useAppStore()
  const navigate = useNavigate()
  const [visibleCount, setVisibleCount] = useState(0)
  const [showHeart, setShowHeart] = useState(false)
  const [showSurprise, setShowSurprise] = useState(false)
  const [devSig, setDevSig] = useState('')
  const [sigDone, setSigDone] = useState(false)

  useEffect(() => {
    setCurrentPage('creator')
  }, [setCurrentPage])

  useEffect(() => {
    let count = 0
    const interval = setInterval(() => {
      count++
      setVisibleCount(count)
      if (count >= PARAGRAPHS.length) {
        clearInterval(interval)
        // Type the dev signature
        let charCount = 0
        const sigInterval = setInterval(() => {
          charCount++
          setDevSig(DEV_SIG.slice(0, charCount))
          if (charCount >= DEV_SIG.length) {
            clearInterval(sigInterval)
            setSigDone(true)
            setTimeout(() => setShowHeart(true), 500)
            setTimeout(() => setShowSurprise(true), 3200)
          }
        }, 52)
      }
    }, 720)
    return () => clearInterval(interval)
  }, [])

  const lineProgress = PARAGRAPHS.length > 0 ? visibleCount / PARAGRAPHS.length : 0

  return (
    <PageLayout hideNav>
      <PageTransition variant="fade">

        {/* Ambient drifting orbs, unique to this page */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -(20 + i * 10), 0],
              x: [0, (i % 2 === 0 ? 18 : -14), 0],
              opacity: [0.05, 0.12, 0.05],
            }}
            transition={{
              duration: 9 + i * 2.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 1.6,
            }}
            style={{
              position: 'fixed',
              width: `${200 + i * 55}px`,
              height: `${200 + i * 55}px`,
              borderRadius: '50%',
              background: i % 2 === 0
                ? 'radial-gradient(circle, rgba(196,176,240,1) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(237,191,202,1) 0%, transparent 70%)',
              top: `${8 + i * 14}%`,
              left: `${4 + i * 19}%`,
              pointerEvents: 'none',
              zIndex: 1,
              filter: 'blur(45px)',
            }}
          />
        ))}

        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '7rem 2rem 7rem',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <div style={{ maxWidth: '640px', width: '100%' }}>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: 'center', marginBottom: '4rem' }}
            >
              <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>from the person who built this</p>
              <h1
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                  color: 'var(--text-primary)',
                  marginBottom: '0.25rem',
                  filter: 'drop-shadow(0 2px 18px rgba(255,255,255,0.6))',
                }}
              >
                A Note from Adwaith
              </h1>
              <div className="deco-rule" />
            </motion.div>

            {/* Body, ink line + paragraphs */}
            <div style={{ display: 'flex', gap: '1.6rem', alignItems: 'flex-start' }}>

              {/* Animated vertical ink line */}
              <div style={{ position: 'relative', width: '2px', flexShrink: 0, alignSelf: 'stretch' }}>
                {/* Track */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0, left: 0,
                    width: '2px',
                    height: '100%',
                    background: 'rgba(196,176,240,0.12)',
                    borderRadius: '1px',
                  }}
                />
                {/* Fill */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: 0, left: 0,
                    width: '2px',
                    borderRadius: '1px',
                    background: 'linear-gradient(to bottom, var(--lav-400), var(--lavrose), var(--blush-400))',
                    originY: 0,
                  }}
                  animate={{ height: `${lineProgress * 100}%` }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                />
                {/* Glowing tip dot */}
                {visibleCount > 0 && visibleCount < PARAGRAPHS.length && (
                  <motion.div
                    animate={{
                      top: `${lineProgress * 100}%`,
                      opacity: [0.55, 1, 0.55],
                    }}
                    transition={{
                      top: { duration: 0.55, ease: 'easeOut' },
                      opacity: { duration: 1.4, repeat: Infinity, ease: 'easeInOut' },
                    }}
                    style={{
                      position: 'absolute',
                      left: '-3px',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: 'var(--lav-400)',
                      boxShadow: '0 0 10px rgba(169,142,230,0.8)',
                      transform: 'translateY(-50%)',
                    }}
                  />
                )}
              </div>

              {/* Paragraphs */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {PARAGRAPHS.slice(0, visibleCount).map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -14, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {p.style === 'greeting' && (
                      <p
                        style={{
                          fontFamily: 'var(--font-script)',
                          fontSize: '2.1rem',
                          color: 'var(--text-primary)',
                          margin: 0,
                          lineHeight: 1.4,
                        }}
                      >
                        {p.text}
                      </p>
                    )}

                    {p.style === 'body' && (
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                          lineHeight: 1.95,
                          color: 'var(--text-body)',
                          margin: 0,
                        }}
                      >
                        {p.text}
                      </p>
                    )}

                    {(p.style === 'accent-lav' || p.style === 'accent-blush') && (
                      <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'stretch' }}>
                        <div
                          style={{
                            width: '3px',
                            borderRadius: '2px',
                            background: p.style === 'accent-lav' ? 'var(--lav-400)' : 'var(--blush-400)',
                            flexShrink: 0,
                            alignSelf: 'stretch',
                          }}
                        />
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                            lineHeight: 1.95,
                            color: p.style === 'accent-lav' ? 'var(--lav-700)' : 'var(--blush-600)',
                            fontStyle: 'italic',
                            margin: 0,
                          }}
                        >
                          {p.text}
                        </p>
                      </div>
                    )}

                    {p.style === 'signature' && (
                      <p
                        style={{
                          fontFamily: 'var(--font-script)',
                          fontSize: '1.65rem',
                          color: 'var(--blush-500)',
                          margin: 0,
                          lineHeight: 1.65,
                          whiteSpace: 'pre-line',
                        }}
                      >
                        {p.text}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Dev signature, types itself character by character */}
            <AnimatePresence>
              {devSig && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--text-faint)',
                    marginTop: '2.5rem',
                    paddingLeft: '3.6rem',
                    letterSpacing: '0.06em',
                  }}
                >
                  {devSig}
                  {!sigDone && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.7, repeat: Infinity }}
                      style={{ marginLeft: '1px', opacity: 1 }}
                    >
                      |
                    </motion.span>
                  )}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Heart + final line */}
            <AnimatePresence>
              {showHeart && (
                <>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.3, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.1 }}
                    style={{
                      textAlign: 'center',
                      marginTop: '3.5rem',
                      fontSize: '2.2rem',
                    }}
                    className="heartbeat"
                  >
                    💙
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      textAlign: 'center',
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 300,
                      fontSize: '0.65rem',
                      color: 'var(--text-faint)',
                      letterSpacing: '0.14em',
                      marginTop: '1.1rem',
                      textTransform: 'lowercase',
                    }}
                  >
                    this page will always be here. whenever you need to come back to it.
                  </motion.p>
                </>
              )}
            </AnimatePresence>

            {/* Surprise — one more thing */}
            <AnimatePresence>
              {showSurprise && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ textAlign: 'center', marginTop: '3rem' }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontStyle: 'italic',
                      fontSize: '0.85rem',
                      color: 'var(--text-faint)',
                      marginBottom: '1.2rem',
                      letterSpacing: '0.04em',
                    }}
                  >
                    actually... he left you one more thing.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(139,111,212,0.22)' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate('/easter')}
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(139,111,212,0.28)',
                      borderRadius: '60px',
                      padding: '0.7rem 2.2rem',
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.7rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--lav-500)',
                      cursor: 'pointer',
                    }}
                  >
                    open it ✦
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </PageTransition>
    </PageLayout>
  )
}
