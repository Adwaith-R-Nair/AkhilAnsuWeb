import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'

export function MusicPlayer() {
  const [expanded, setExpanded] = useState(false)
  const { audioEnabled, setAudioEnabled, isMuted, setIsMuted, volume, setVolume, currentTrack } = useAppStore()

  const trackName = currentTrack
    ? currentTrack.split('/').pop()?.replace(/\.\w+$/, '') || 'Unknown'
    : 'No track playing'

  return (
    <motion.div
      onHoverStart={() => setExpanded(true)}
      onHoverEnd={() => setExpanded(false)}
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '1.5rem',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        background: 'rgba(255,255,255,0.90)',
        backdropFilter: 'blur(24px) saturate(150%)',
        WebkitBackdropFilter: 'blur(24px) saturate(150%)',
        border: '1px solid rgba(255,255,255,0.75)',
        outline: '1px solid rgba(196,176,240,0.22)',
        outlineOffset: '-1px',
        borderRadius: '60px',
        padding: '0.5rem 1.1rem',
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.9),' +
          '0 4px 20px rgba(139,111,212,0.10),' +
          '0 1px 4px rgba(0,0,0,0.04)',
        cursor: 'pointer',
      }}
    >
      {/* Toggle audio */}
      <button
        onClick={() => setAudioEnabled(!audioEnabled)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1rem',
          color: audioEnabled ? 'var(--lav-500)' : 'var(--text-faint)',
          padding: 0,
          lineHeight: 1,
        }}
        aria-label={audioEnabled ? 'Disable music' : 'Enable music'}
      >
        {audioEnabled ? '♪' : '♩'}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden' }}
          >
            {/* Track name */}
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 300,
                fontSize: '0.6rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                whiteSpace: 'nowrap',
                maxWidth: '120px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {trackName}
            </span>

            {/* Mute toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                padding: 0,
              }}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? '🔇' : '🔊'}
            </button>

            {/* Volume slider */}
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              style={{
                width: '64px',
                accentColor: 'var(--lav-500)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
