import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { PageLayout } from '../components/layout/PageLayout'
import { PageTransition } from '../components/transitions/PageTransition'
import { duckAudioForVideo, restoreAudioAfterVideo } from '../hooks/useAudioManager'

const FUTURE_VIDEOS = [
  { path: '/assets/ai-videos/future-1.mp4', label: 'A morning together' },
  { path: '/assets/ai-videos/future-2.mp4', label: 'Adventures ahead' },
  { path: '/assets/ai-videos/future-3.mp4', label: 'Quiet evenings' },
  { path: '/assets/ai-videos/future-4.mp4', label: 'Every ordinary day' },
]

function VerticalVideoSlot({ path, label, index }: { path: string; label: string; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [hasError, setHasError] = useState(false)

  // Restore music if unmounted while playing
  useEffect(() => {
    return () => { if (playing) restoreAudioAfterVideo() }
  }, [playing])

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPlaying(true)
      duckAudioForVideo()
    } else {
      v.pause()
      setPlaying(false)
      restoreAudioAfterVideo()
    }
  }

  const handleTimeUpdate = () => {
    const v = videoRef.current
    if (!v || !v.duration) return
    setProgress(v.currentTime / v.duration)
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current
    if (!v) return
    const rect = e.currentTarget.getBoundingClientRect()
    v.currentTime = ((e.clientX - rect.left) / rect.width) * v.duration
  }

  const handleEnded = () => {
    setPlaying(false)
    restoreAudioAfterVideo()
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 + index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}
    >
      {/* Video container — 9/16 vertical */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '9/16',
          borderRadius: '20px',
          overflow: 'hidden',
          background: hasError
            ? 'linear-gradient(160deg, var(--lav-100) 0%, var(--blush-100) 100%)'
            : '#0a0812',
          boxShadow:
            '0 16px 48px rgba(139,111,212,0.14), 0 4px 16px rgba(0,0,0,0.08)',
          cursor: 'pointer',
        }}
        onClick={togglePlay}
      >
        {/* Video element */}
        {!hasError && (
          <video
            ref={videoRef}
            src={path}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            onError={() => setHasError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        )}

        {/* Placeholder when file missing */}
        {hasError && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
          >
            <span style={{ fontSize: '1.5rem', opacity: 0.3 }}>✦</span>
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                color: 'var(--text-faint)',
              }}
            >
              coming soon
            </span>
          </div>
        )}

        {/* Play/pause overlay */}
        {!hasError && (
          <AnimatePresence>
            {!playing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(10,8,18,0.30)',
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(12px)',
                    border: '2px solid rgba(255,255,255,0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.3rem',
                    color: 'white',
                  }}
                >
                  ▶
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Progress bar — bottom of video */}
        {!hasError && (
          <div
            onClick={(e) => { e.stopPropagation(); handleProgressClick(e) }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: 'rgba(255,255,255,0.15)',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progress * 100}%`,
                background: 'var(--lav-300)',
                transition: 'width 0.1s linear',
              }}
            />
          </div>
        )}
      </div>

      {/* Label below video */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontStyle: 'italic',
          fontSize: '0.88rem',
          color: 'var(--text-faint)',
          textAlign: 'center',
          margin: 0,
          letterSpacing: '0.01em',
        }}
      >
        {label}
      </p>
    </motion.div>
  )
}

export function FuturePage() {
  const { setCurrentPage } = useAppStore()
  const navigate = useNavigate()

  useEffect(() => {
    setCurrentPage('future')
  }, [setCurrentPage])

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
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>a little corner of imagination</p>
            <h1 className="section-heading">What Could've Been</h1>
            <div className="deco-rule" />
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontStyle: 'italic',
                fontSize: '1.1rem',
                color: 'var(--text-muted)',
                marginTop: '0.5rem',
              }}
            >
              Some futures only live in the heart.
            </p>
          </motion.div>

          {/* 2×2 grid of vertical videos */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1.25rem',
              marginBottom: '4rem',
            }}
          >
            {FUTURE_VIDEOS.map((v, i) => (
              <VerticalVideoSlot key={i} path={v.path} label={v.label} index={i} />
            ))}
          </div>

          {/* Closing quote */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontStyle: 'italic',
              fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
              color: 'var(--text-faint)',
              textAlign: 'center',
              lineHeight: 1.8,
              marginBottom: '3rem',
            }}
          >
            "Even if this is the last chapter we share — what we had was worth every page."
          </motion.p>

          {/* Continue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            style={{ textAlign: 'center' }}
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(139,111,212,0.2)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/easter')}
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
              Continue →
            </motion.button>
          </motion.div>
        </div>
      </PageTransition>
    </PageLayout>
  )
}
