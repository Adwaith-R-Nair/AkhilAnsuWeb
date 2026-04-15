import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { duckAudioForVideo, restoreAudioAfterVideo } from '../../hooks/useAudioManager'

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
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('loading')

  // Prefetch the audio as a blob on mount so play() is always synchronous
  useEffect(() => {
    let cancelled = false
    fetch(src)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status} — file not found on server`)
        return res.blob()
      })
      .then(blob => {
        if (cancelled) return
        blobUrlRef.current = URL.createObjectURL(blob)
        const a = new Audio(blobUrlRef.current)
        a.addEventListener('timeupdate', () => {
          if (a.duration > 0) setProgress(a.currentTime / a.duration)
        })
        a.addEventListener('ended', () => {
          setPlaying(false)
          setProgress(1)
          if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
          restoreAudioAfterVideo()
          setPlayed(prev => { if (!prev) onPlayed(); return true })
        })
        audioRef.current = a
        setStatus('ready')
      })
      .catch(err => {
        if (cancelled) return
        const msg = err instanceof Error ? err.message : String(err)
        console.error('[AudioCard] prefetch failed:', src, msg)
        setStatus('error')
      })
    return () => { cancelled = true }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src])

  const togglePlay = () => {
    const a = audioRef.current
    if (!a || status !== 'ready') return

    if (playing) {
      a.pause()
      setPlaying(false)
      if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
      restoreAudioAfterVideo()
    } else {
      window.dispatchEvent(new CustomEvent('audiocardpause', { detail: src }))
      duckAudioForVideo()
      a.play()
        .then(() => {
          setPlaying(true)
          const tick = () => { rafRef.current = requestAnimationFrame(tick) }
          tick()
        })
        .catch(err => {
          const msg = err instanceof Error ? err.message : String(err)
          console.error('[AudioCard] play() rejected:', msg)
          setStatus('error')
        })
    }
  }

  // Stop this card when another starts
  useEffect(() => {
    const handler = (e: Event) => {
      const evt = e as CustomEvent<string>
      if (evt.detail !== src && audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause()
        setPlaying(false)
        if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
        // Don't restore here — the other card will duck immediately after
      }
    }
    window.addEventListener('audiocardpause', handler)
    return () => window.removeEventListener('audiocardpause', handler)
  }, [src])

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
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={togglePlay}
          disabled={status !== 'ready'}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: status === 'error' ? 'rgba(237,229,255,0.5)' : 'var(--lav-100)',
            border: '1px solid rgba(139,111,212,0.2)',
            cursor: status === 'ready' ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: status === 'loading' ? '0.55rem' : '0.9rem',
            color: 'var(--lav-500)',
            flexShrink: 0,
          }}
        >
          {status === 'loading' ? '...' : status === 'error' ? '✕' : playing ? '⏸' : '▶'}
        </button>
        <div>
          <div style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--text-faint)',
          }}>
            {label}
          </div>
          {played && (
            <div style={{ color: 'var(--lav-400)', fontSize: '0.7rem', fontFamily: 'var(--font-ui)' }}>
              ✓ played
            </div>
          )}
        </div>
      </div>

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

      {status === 'error' && (
        <span style={{ fontSize: '0.65rem', color: 'var(--text-faint)', fontFamily: 'var(--font-ui)' }}>
          audio coming soon
        </span>
      )}
    </motion.div>
  )
}
