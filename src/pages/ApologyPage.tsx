import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAppStore } from '../store/useAppStore'
import { PageLayout } from '../components/layout/PageLayout'
import { PageTransition } from '../components/transitions/PageTransition'

gsap.registerPlugin(ScrollTrigger)

const PANELS = [
  {
    title: 'The Acknowledgment',
    paragraphs: [
      "I'm writing this without excuses, without justifications — only truth.",
      "I know I gave you reasons to doubt me. I know my actions fed your overthinking and deepened the trust issues you were already fighting. What hurts the most is knowing that the pain you carried wasn't accidental — it came from me. And that's something I will always regret.",
      "I didn't always think before I acted. I didn't always protect your peace the way I should have. Some of my choices were careless, some selfish, and some just deeply thoughtless. Even when my intentions weren't bad, the impact was — and I understand now that intentions don't erase wounds.",
    ],
  },
  {
    title: 'The Apology',
    paragraphs: [
      "I am truly sorry for the nights you cried silently, for the constant second-guessing in your mind, for the heaviness I added to your heart. You trusted me, and I didn't honour that trust the way you deserved.",
      "I'm not asking you to forget. I'm not asking you to forgive me immediately or at all. I only hope you never hate me or curse me for the mistakes I made while still learning how to love properly. Please know that none of it came from a place of wanting to hurt you.",
    ],
  },
  {
    title: 'The Lesson',
    paragraphs: [
      "Loving you changed me. Losing your trust taught me more than comfort ever could. Whether we walk forward together or separately, I will carry this lesson with me — to be more aware, more honest, and more responsible with someone's heart.",
      "If someday you think of me, I hope it's not with anger — but with the understanding that I was flawed, learning, and genuinely remorseful.",
      "I'm sorry for everything I broke that I should have protected.",
    ],
  },
]

export function ApologyPage() {
  const { setCurrentPage } = useAppStore()
  const panelsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    setCurrentPage('apology')
  }, [setCurrentPage])

  useEffect(() => {
    // Give Framer Motion's page transition time to settle before GSAP measures layout
    const setup = setTimeout(() => {
      const ctx = gsap.context(() => {
        panelsRef.current.forEach((panel, i) => {
          if (!panel) return
          gsap.fromTo(
            panel,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: panel,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
              delay: i * 0.12,
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
            maxWidth: '720px',
            margin: '0 auto',
            padding: '7rem 2rem 5rem',
          }}
        >
          {/* Floating rose petals (decorative) */}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, 80, 160],
                x: [i * 40 - 60, i * 30 - 40, i * 50 - 70],
                rotate: [0, 180, 360],
                opacity: [0, 0.12, 0],
              }}
              transition={{ duration: 12 + i * 3, repeat: Infinity, delay: i * 2.5, ease: 'linear' }}
              style={{
                position: 'fixed',
                top: '-5%',
                left: `${20 + i * 25}%`,
                fontSize: '1.2rem',
                pointerEvents: 'none',
                zIndex: 5,
              }}
            >
              🌸
            </motion.div>
          ))}

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          >
            <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>an honest letter</p>
            <h1 className="section-heading">I Owe You This</h1>
            <div className="deco-rule" />
          </motion.div>

          {/* Panels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {PANELS.map((panel, i) => (
              <div
                key={i}
                ref={(el) => (panelsRef.current[i] = el)}
                style={{
                  background: 'rgba(255,255,255,0.90)',
                  backdropFilter: 'blur(28px) saturate(160%)',
                  WebkitBackdropFilter: 'blur(28px) saturate(160%)',
                  border: '1px solid rgba(255,255,255,0.75)',
                  borderLeft: '3px solid var(--lav-400)',
                  borderRadius: '0 24px 24px 0',
                  padding: '2.25rem 2.25rem 2.25rem 2rem',
                  boxShadow:
                    'inset 0 1px 0 rgba(255,255,255,0.95),' +
                    '0 4px 24px rgba(139,111,212,0.10),' +
                    '0 16px 48px rgba(0,0,0,0.04)',
                  outline: '1px solid rgba(196,176,240,0.22)',
                  outlineOffset: '-1px',
                  opacity: 0,
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontStyle: 'italic',
                    fontSize: '1.15rem',
                    color: 'var(--lav-700)',
                    marginBottom: '1.25rem',
                    letterSpacing: '0.01em',
                  }}
                >
                  {panel.title}
                </h3>
                {panel.paragraphs.map((p, j) => (
                  <p
                    key={j}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                      lineHeight: 1.9,
                      color: 'var(--text-body)',
                      marginBottom: j < panel.paragraphs.length - 1 ? '1rem' : 0,
                    }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            style={{
              textAlign: 'right',
              marginTop: '3rem',
              paddingRight: '1rem',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-script)',
                fontSize: '1.6rem',
                color: 'var(--blush-500)',
                lineHeight: 1.7,
              }}
            >
              With sincerity,<br />
              Always accountable,<br />
              Ichu 🚩🚩
            </div>
          </motion.div>
        </div>
      </PageTransition>
    </PageLayout>
  )
}
