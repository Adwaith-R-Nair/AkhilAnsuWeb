import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { duckAudioForVideo, restoreAudioAfterVideo } from '../../hooks/useAudioManager'

interface AudioCardProps {
  src: string
  label: string
  index: number
  onPlayed: () => void
}

export function AudioCard({ src, label, index, onPlayed }: AudioCardProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [played, setPlayed] = useState(false)
  const [hasError, setHasError] = useState(false)

  const togglePlay = () => {
    const a = audioRef.current
    if (!a) return
    if (a.paused) {
      a.play()
      setPlaying(true)
      duckAudioForVideo()
    } else {
      a.pause()
      setPlaying(false)
      restoreAudioAfterVideo()
    }
  }

  const handleTimeUpdate = () => {
    const a = audioRef.current
    if (a && a.duration) setProgress(a.currentTime / a.duration)
  }

  const handleEnded = () => {
    setPlaying(false)
    restoreAudioAfterVideo()
    if (!played) { setPlayed(true); onPlayed() }
  }

  const BAR_COUNT = 20

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(24px) saturate(150%)',
        WebkitBackdropFilter: 'blur(24px) saturate(150%)',
        border: '1px solid rgba(255,255,255,0.75)',
        outline: '1px solid rgba(196,176,240,0.22)',
        outlineOffset: '-1px',
        borderRadius: '18px',
        padding: '1.35rem 1.5rem',
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.95),' +
          '0 4px 20px rgba(139,111,212,0.09),' +
          '0 1px 4px rgba(0,0,0,0.03)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={togglePlay}
          disabled={hasError}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: hasError ? 'rgba(237,229,255,0.5)' : 'var(--lav-100)',
            border: '1px solid rgba(139,111,212,0.2)',
            cursor: hasError ? 'default' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.9rem',
            color: 'var(--lav-500)',
            flexShrink: 0,
          }}
        >
          {playing ? '⏸' : '▶'}
        </button>
        <div>
          <div
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-faint)',
            }}
          >
            {label}
          </div>
          {played && (
            <div style={{ color: 'var(--lav-400)', fontSize: '0.7rem', fontFamily: 'var(--font-ui)' }}>
              ✓ played
            </div>
          )}
        </div>
      </div>

      {/* Waveform-style progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '24px' }}>
        {Array.from({ length: BAR_COUNT }).map((_, i) => {
          const ratio = i / BAR_COUNT
          const isActive = ratio <= progress
          const height = 40 + Math.sin(i * 1.2) * 30 + Math.cos(i * 0.7) * 20
          return (
            <motion.div
              key={i}
              animate={playing && isActive ? { scaleY: [1, 1.4, 0.8, 1.2, 1] } : { scaleY: 1 }}
              transition={{ duration: 0.5, repeat: playing ? Infinity : 0, delay: i * 0.02 }}
              style={{
                flex: 1,
                height: `${height}%`,
                background: isActive ? 'var(--lav-400)' : 'rgba(196,176,240,0.3)',
                borderRadius: '2px',
                transformOrigin: 'bottom',
              }}
            />
          )
        })}
      </div>

      {hasError && (
        <span style={{ fontSize: '0.65rem', color: 'var(--text-faint)', fontFamily: 'var(--font-ui)' }}>
          audio coming soon
        </span>
      )}

      <audio
        ref={audioRef}
        src={src}
        preload="none"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onError={() => setHasError(true)}
      />
    </motion.div>
  )
}
