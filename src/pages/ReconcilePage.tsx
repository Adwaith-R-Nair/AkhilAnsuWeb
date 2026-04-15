import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { PageLayout } from '../components/layout/PageLayout'
import { PageTransition } from '../components/transitions/PageTransition'
import { RECONCILE_YOUTUBE_ID } from '../config/content'

const PARAGRAPHS = [
  '"If trust can somehow find its way back, then maybe there is still something worth holding onto — and I would meet that chance with everything I\'ve learned."',
  "That's not a promise of perfection. It's something more honest than that — a commitment to show up differently. To communicate before withdrawing. To choose patience before pride.",
  'What we had was real. And what we could build — with more understanding, more honesty, more willingness to truly see each other — could be even more real.',
  "This isn't a fairytale restart. It's a quiet agreement to try again, more carefully. With more awareness of each other's silences, and less fear of each other's truths.",
]

export function ReconcilePage() {
  const { setCurrentPage } = useAppStore()
  const navigate = useNavigate()

  useEffect(() => {
    setCurrentPage('reconcile')
  }, [setCurrentPage])

  return (
    <PageLayout>
      <PageTransition variant="dissolve">
        {/* Floating lavender petals */}
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: ['0vh', '110vh'],
              x: [0, (i % 2 === 0 ? 20 : -20)],
              rotate: [0, 360],
              opacity: [0, 0.18, 0.18, 0],
            }}
            transition={{
              duration: 14 + i * 2,
              repeat: Infinity,
              delay: i * 2.2,
              ease: 'linear',
            }}
            style={{
              position: 'fixed',
              top: '-5%',
              left: `${10 + i * 16}%`,
              fontSize: '1.4rem',
              pointerEvents: 'none',
              zIndex: 5,
              color: 'var(--lav-300)',
            }}
          >
            🌸
          </motion.div>
        ))}

        <div
          style={{
            maxWidth: '680px',
            margin: '0 auto',
            padding: '7rem 2rem 5rem',
          }}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          >
            <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>if we choose to try again</p>
            <h1 className="section-heading">A Hopeful Beginning</h1>
            <div className="deco-rule" />
          </motion.div>

          {/* Body paragraphs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {PARAGRAPHS.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
                  lineHeight: 1.9,
                  color: i === 0 ? 'var(--text-primary)' : 'var(--text-body)',
                  fontStyle: i === 0 ? 'italic' : 'normal',
                }}
              >
                {p}
              </motion.p>
            ))}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.7 }}
              style={{
                fontFamily: 'var(--font-script)',
                fontSize: '1.5rem',
                color: 'var(--lav-500)',
              }}
            >
              — Ichu
            </motion.p>
          </div>

          {/* Video section */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginTop: '4rem' }}
          >
            {/* Section label */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: 'var(--lav-400)',
                  marginBottom: '0.5rem',
                }}
              >
                in his own words
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontStyle: 'italic',
                  fontSize: '1.05rem',
                  color: 'var(--text-muted)',
                }}
              >
                Something he wanted to say directly, just to you.
              </p>
            </div>

            {/* Thin lavender rule */}
            <div
              style={{
                width: '60px',
                height: '1px',
                background: 'linear-gradient(to right, transparent, var(--lav-300), transparent)',
                margin: '0 auto 1.5rem',
              }}
            />

            {RECONCILE_YOUTUBE_ID === 'YOUR_VIDEO_ID_HERE' ? (
              <div
                style={{
                  width: '100%', aspectRatio: '16/9', borderRadius: '20px',
                  background: 'linear-gradient(135deg, var(--lav-100), var(--blush-100))',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                  boxShadow: '0 16px 48px rgba(139,111,212,0.12)',
                }}
              >
                <span style={{ fontSize: '2rem', opacity: 0.3 }}>▶</span>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--text-faint)', textTransform: 'uppercase' }}>
                  akhil's message · coming soon
                </span>
              </div>
            ) : (
              <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 16px 48px rgba(139,111,212,0.14)' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${RECONCILE_YOUTUBE_ID}?rel=0&modestbranding=1&color=white`}
                  title="A message from Akhil"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                />
              </div>
            )}
          </motion.div>

          {/* Continue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            style={{ textAlign: 'center', marginTop: '3.5rem' }}
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(139,111,212,0.25)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/future')}
              style={{
                background: 'transparent',
                border: '1px solid rgba(139,111,212,0.35)',
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
              Continue →
            </motion.button>
          </motion.div>
        </div>
      </PageTransition>
    </PageLayout>
  )
}
