import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { PageLayout } from '../components/layout/PageLayout'
import { PageTransition } from '../components/transitions/PageTransition'
import { VideoPlayer } from '../components/ui/VideoPlayer'
import { AKHIL_YOUTUBE_ID } from '../config/content'

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

          {/* Main video — YouTube embed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{ width: '100%', maxWidth: '840px' }}
          >
            {AKHIL_YOUTUBE_ID === 'YOUR_VIDEO_ID_HERE' ? (
              /* Placeholder shown until YouTube ID is set */
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16/9',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, var(--lav-100), var(--blush-100))',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  boxShadow: '0 16px 48px rgba(139,111,212,0.12)',
                }}
              >
                <span style={{ fontSize: '2rem', opacity: 0.3 }}>▶</span>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--text-faint)', textTransform: 'uppercase' }}>
                  akhil's message · coming soon
                </span>
              </div>
            ) : (
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16/9',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 16px 48px rgba(139,111,212,0.14), 0 4px 16px rgba(0,0,0,0.08)',
                }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${AKHIL_YOUTUBE_ID}?rel=0&modestbranding=1&color=white`}
                  title="A message from Akhil"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onLoad={() => setTimeout(() => setShowContinue(true), 3000)}
                  style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                />
              </div>
            )}
          </motion.div>

          {/* ── Blue reel — special featured placement ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
          >
            <div style={{ textAlign: 'center' }}>
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: 'var(--lav-400)',
                  marginBottom: '0.25rem',
                }}
              >
                especially for you
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-script)',
                  fontSize: '1.5rem',
                  color: 'var(--blush-500)',
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                For Blue 💙
              </p>
            </div>

            {/* Glowing gradient border frame */}
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 28px rgba(139,111,212,0.25), 0 8px 40px rgba(139,111,212,0.12)',
                  '0 0 44px rgba(196,176,240,0.45), 0 8px 48px rgba(139,111,212,0.18)',
                  '0 0 28px rgba(139,111,212,0.25), 0 8px 40px rgba(139,111,212,0.12)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                borderRadius: '22px',
                padding: '3px',
                background: 'linear-gradient(135deg, rgba(196,176,240,0.8), rgba(228,181,192,0.6), rgba(196,176,240,0.7))',
                maxWidth: '300px',
                width: '100%',
              }}
            >
              <div style={{ borderRadius: '20px', overflow: 'hidden' }}>
                <VideoPlayer
                  src="/assets/videos/blue-reel.mp4"
                  vertical
                  label="for blue · coming soon"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* ── Small reels row ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            style={{
              display: 'flex',
              gap: '1.5rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              width: '100%',
              maxWidth: '720px',
            }}
          >
            {[
              { src: 'zootopia-clip.mp4', label: 'A scene we loved 🦊' },
              { src: 'reel1.mp4',         label: 'Something for you 🎬' },
              { src: 'reel2.mp4',         label: 'Just the beginning 🎬' },
              { src: 'reel3.mp4',         label: 'Delulu 🎬' },
            ].map((v) => (
              <div
                key={v.src}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}
              >
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
                  {v.label}
                </p>
                <VideoPlayer
                  src={`/assets/videos/${v.src}`}
                  small
                  vertical
                  label={`${v.src.replace('.mp4', '')} · coming soon`}
                />
              </div>
            ))}
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
