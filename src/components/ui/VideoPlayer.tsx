import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface VideoPlayerProps {
  src: string
  poster?: string
  onEnded?: () => void
  small?: boolean
  vertical?: boolean
  label?: string
}

export function VideoPlayer({ src, poster, onEnded, small = false, vertical = false, label }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [muted, setMuted] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [hasError, setHasError] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) { v.play(); setPlaying(true) }
    else { v.pause(); setPlaying(false) }
  }

  const handleTimeUpdate = () => {
    const v = videoRef.current
    if (!v || !v.duration) return
    setProgress(v.currentTime / v.duration)
    setCurrentTime(v.currentTime)
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration)
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    if (videoRef.current) {
      videoRef.current.currentTime = ratio * videoRef.current.duration
    }
  }

  const fmt = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  const toggleFs = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setFullscreen(true)
    } else {
      document.exitFullscreen()
      setFullscreen(false)
    }
  }

  // Placeholder if no source or error
  const showPlaceholder = hasError || !src

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        borderRadius: small ? '14px' : '20px',
        overflow: 'hidden',
        aspectRatio: vertical ? '9/16' : '16/9',
        background: showPlaceholder
          ? 'linear-gradient(135deg, var(--lav-100), var(--blush-100))'
          : '#0a0812',
        boxShadow: '0 20px 60px rgba(139,111,212,0.15), 0 4px 16px rgba(0,0,0,0.1)',
        maxWidth: vertical ? (small ? '260px' : '360px') : (small ? '100%' : '840px'),
        width: '100%',
      }}
    >
      {showPlaceholder ? (
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
          <span style={{ fontSize: '2rem', opacity: 0.4 }}>🎬</span>
          <span
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-faint)',
            }}
          >
            {label || 'video coming soon'}
          </span>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            muted={muted}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => { setPlaying(false); onEnded?.() }}
            onError={() => setHasError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />

          {/* Play overlay */}
          <AnimatePresence>
            {!playing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={togglePlay}
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  background: 'rgba(10,8,18,0.35)',
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  style={{
                    width: small ? '48px' : '72px',
                    height: small ? '48px' : '72px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(12px)',
                    border: '2px solid rgba(255,255,255,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: small ? '1.2rem' : '1.8rem',
                    color: 'white',
                  }}
                >
                  ▶
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controls bar */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '0.75rem 1rem 0.75rem',
              background: 'linear-gradient(to top, rgba(10,8,18,0.8), transparent)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
            }}
          >
            {/* Progress bar */}
            <div
              onClick={handleProgressClick}
              style={{
                height: '3px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '2px',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${progress * 100}%`,
                  background: 'var(--lav-300)',
                  borderRadius: '2px',
                  transition: 'width 0.1s linear',
                }}
              />
            </div>

            {/* Buttons row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                onClick={togglePlay}
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1rem', padding: 0 }}
              >
                {playing ? '⏸' : '▶'}
              </button>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.65rem', fontFamily: 'var(--font-ui)' }}>
                {fmt(currentTime)} / {fmt(duration)}
              </span>
              <div style={{ flex: 1 }} />
              <button
                onClick={() => setMuted(!muted)}
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '0.9rem', padding: 0 }}
              >
                {muted ? '🔇' : '🔊'}
              </button>
              <button
                onClick={toggleFs}
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '0.9rem', padding: 0 }}
              >
                ⛶
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
