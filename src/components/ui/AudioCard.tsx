import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

interface AudioCardProps {
  src: string
  label: string
  index: number
  onPlayed: () => void
}

export function AudioCard({ src, label, index, onPlayed }: AudioCardProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const blobUrlRef = useRef<string | null>(null)
  const rafRef = useRef<number | null>(null)

  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [played, setPlayed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  const tick = useCallback(() => {
    const a = audioRef.current
    if (!a) return
    if (a.duration > 0) setProgress(a.currentTime / a.duration)
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  const stopTick = () => {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
  }

  const pause = () => {
    audioRef.current?.pause()
    setPlaying(false)
    stopTick()
  }

  const play = async () => {
    if (loading) return

    // Pause any other AudioCard that's playing
    window.dispatchEvent(new CustomEvent('audiocardpause', { detail: src }))

    try {
      // Lazily fetch & cache the blob URL so we don't depend on the CDN
      if (!blobUrlRef.current) {
        setLoading(true)
        const res = await fetch(src)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const blob = await res.blob()
        blobUrlRef.current = URL.createObjectURL(blob)
        setLoading(false)
      }

      // Create or reuse the audio element
      if (!audioRef.current) {
        const a = new Audio(blobUrlRef.current)
        a.addEventListener('timeupdate', () => {
          if (a.duration > 0) setProgress(a.currentTime / a.duration)
        })
        a.addEventListener('ended', () => {
          setPlaying(false)
          setProgress(1)
          stopTick()
          if (!played) { setPlayed(true); onPlayed() }
        })
        audioRef.current = a
      } else {
        audioRef.current.src = blobUrlRef.current
      }

      await audioRef.current.play()
      setPlaying(true)
      tick()
    } catch (err) {
      console.error('[AudioCard] failed to load/play:', src, err)
      setLoading(false)
      setHasError(true)
    }
  }

  const togglePlay = () => {
    if (playing) { pause() } else { play() }
  }

  // Listen for other cards starting so we pause
  const handlePause = useCallback((e: Event) => {
    const evt = e as CustomEvent<string>
    if (evt.detail !== src && playing) pause()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, src])

  // Register/unregister listener on every render (playing changes)
  if (typeof window !== 'undefined') {
    window.removeEventListener('audiocardpause', handlePause as EventListener)
    window.addEventListener('audiocardpause', handlePause as EventListener)
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
          disabled={hasError || loading}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: hasError ? 'rgba(237,229,255,0.5)' : 'var(--lav-100)',
            border: '1px solid rgba(139,111,212,0.2)',
            cursor: (hasError || loading) ? 'default' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: loading ? '0.6rem' : '0.9rem',
            color: 'var(--lav-500)',
            flexShrink: 0,
          }}
        >
          {loading ? '...' : playing ? '⏸' : '▶'}
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
    </motion.div>
  )
}
