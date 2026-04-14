import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { PageLayout } from '../components/layout/PageLayout'
import { PageTransition } from '../components/transitions/PageTransition'
import { VideoPlayer } from '../components/ui/VideoPlayer'

export function VideoPage() {
  const { setCurrentPage } = useAppStore()
  const navigate = useNavigate()
  const [showContinue, setShowContinue] = useState(false)

  useEffect(() => {
    setCurrentPage('video')
  }, [setCurrentPage])

  // Show continue button after 3s on page load
  useEffect(() => {
    const timer = setTimeout(() => setShowContinue(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <PageLayout hideNav>
      <PageTransition variant="filmcut">
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '7rem 2rem 5rem',
            gap: '3rem',
          }}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center' }}
          >
            <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>in his own words</p>
            <h1 className="section-heading">A Message from Akhil Su</h1>
            <div className="deco-rule" />
          </motion.div>

          {/* Main video */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{ width: '100%', maxWidth: '840px' }}
          >
            <VideoPlayer
              src="/assets/videos/akhil-message.mp4"
              onEnded={() => setShowContinue(true)}
              label="akhil's message · coming soon"
            />
          </motion.div>

          {/* Secondary videos — vertical (portrait) layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{
              display: 'flex',
              gap: '2rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              width: '100%',
              maxWidth: '640px',
            }}
          >
            {/* Zootopia */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}>
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--text-faint)',
                  margin: 0,
                }}
              >
                A scene we loved 🦊
              </p>
              <VideoPlayer
                src="/assets/videos/zootopia-clip.mp4"
                small
                vertical
                label="zootopia clip · coming soon"
              />
            </div>

            {/* Reel */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}>
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--text-faint)',
                  margin: 0,
                }}
              >
                Something for you 🎬
              </p>
              <VideoPlayer
                src="/assets/videos/reel1.mp4"
                small
                vertical
                label="reel · coming soon"
              />
            </div>
          </motion.div>

          {/* Continue button */}
          <AnimatePresence>
            {showContinue && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                style={{ textAlign: 'center' }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontStyle: 'italic',
                    fontSize: '1.1rem',
                    color: 'var(--text-muted)',
                    marginBottom: '1.5rem',
                  }}
                >
                  "I've heard everything — now it's time to choose."
                </p>
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(139,111,212,0.25)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/choice')}
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
                    transition: 'all 0.3s ease',
                  }}
                >
                  Continue →
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </PageTransition>
    </PageLayout>
  )
}
