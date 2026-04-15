import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { PageLayout } from '../components/layout/PageLayout'
import { PageTransition } from '../components/transitions/PageTransition'
import { CLOSURE_YOUTUBE_ID } from '../config/content'

const PARAGRAPHS = [
  '"You loved me with sincerity, with depth, and with a heart that was real. There was nothing foolish or wrong about the way you loved. You were not \'too much,\' not \'too trusting\' — and not someone who deserved to feel cheated or broken. What you gave was pure — and that will always hold value, no matter how things turned out."',
  '"And I want you to hear this clearly — none of what happened is a reflection of your worth."',
  "What we had was real. But sometimes, real isn't enough when two people carry different ways of understanding and different ways of handling pain. We tried. More than once. And that trying matters.",
  '"I won\'t pretend that love alone can fix everything." If it can\'t be rebuilt, then the most honest thing is to let this chapter close with dignity — not resentment, not blame.',
  '"And in all of this, I truly hope life becomes kinder to you. I hope you grow into an even stronger, happier version of yourself — not because of me, but because of who you already are."',
  'I wish you success in everything you chase, joy in the smallest moments, and a kind of peace that stays. You deserve a life that feels full, light, and certain.',
  'You deserve a love that feels safe, steady, and unquestioned.',
  'Be well, Blue. 🔵\n\nWith honesty,\nWith love,\nAlways a little yours. 💙\n\n— Ichu',
]

export function ClosurePage() {
  const { setCurrentPage } = useAppStore()
  const navigate = useNavigate()

  useEffect(() => {
    setCurrentPage('closure')
  }, [setCurrentPage])

  return (
    <PageLayout>
      <PageTransition variant="dissolve">
        {/* Blush gradient bleeds */}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background:
              'radial-gradient(ellipse at 0% 100%, rgba(237,191,202,0.25) 0%, transparent 50%), radial-gradient(ellipse at 100% 0%, rgba(228,181,192,0.2) 0%, transparent 45%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        <div
          style={{
            maxWidth: '680px',
            margin: '0 auto',
            padding: '7rem 2rem 5rem',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          >
            <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>if this is where we part</p>
            <h1 className="section-heading">Thank You, Blue</h1>
            <div className="deco-rule" />
          </motion.div>

          {/* Body */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {PARAGRAPHS.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.18, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: i < 2 ? 'var(--font-body)' : 'var(--font-body)',
                  fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                  lineHeight: 1.95,
                  color: 'var(--text-body)',
                  fontStyle: i < 2 ? 'italic' : 'normal',
                  whiteSpace: 'pre-line',
                  ...(i === PARAGRAPHS.length - 1
                    ? {
                        fontFamily: 'var(--font-script)',
                        fontSize: '1.5rem',
                        color: 'var(--blush-500)',
                        fontStyle: 'normal',
                      }
                    : {}),
                }}
              >
                {p}
              </motion.p>
            ))}
          </div>

          {/* Video section */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
                  color: 'var(--blush-400)',
                  marginBottom: '0.5rem',
                }}
              >
                one last thing
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontStyle: 'italic',
                  fontSize: '1.05rem',
                  color: 'var(--text-muted)',
                }}
              >
                He wanted to say this in his own voice.
              </p>
            </div>

            {/* Thin blush rule */}
            <div
              style={{
                width: '60px',
                height: '1px',
                background: 'linear-gradient(to right, transparent, var(--blush-300), transparent)',
                margin: '0 auto 1.5rem',
              }}
            />

            {CLOSURE_YOUTUBE_ID === 'YOUR_VIDEO_ID_HERE' ? (
              <div
                style={{
                  width: '100%', aspectRatio: '16/9', borderRadius: '20px',
                  background: 'linear-gradient(135deg, var(--blush-100), var(--lav-100))',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                  boxShadow: '0 16px 48px rgba(204,122,148,0.12)',
                }}
              >
                <span style={{ fontSize: '2rem', opacity: 0.3 }}>▶</span>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--text-faint)', textTransform: 'uppercase' }}>
                  akhil's message · coming soon
                </span>
              </div>
            ) : (
              <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 16px 48px rgba(204,122,148,0.14)' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${CLOSURE_YOUTUBE_ID}?rel=0&modestbranding=1&color=white`}
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
            transition={{ delay: 2.2 }}
            style={{ textAlign: 'center', marginTop: '3.5rem' }}
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(204,122,148,0.2)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/future')}
              style={{
                background: 'transparent',
                border: '1px solid rgba(204,122,148,0.35)',
                borderRadius: '60px',
                padding: '0.75rem 2.5rem',
                fontFamily: 'var(--font-ui)',
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--blush-500)',
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
