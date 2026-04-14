import { motion } from 'framer-motion'

interface ProgressIndicatorProps {
  label: string
  filled: number
  total: number
}

export function ProgressIndicator({ label, filled, total }: ProgressIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        position: 'fixed',
        top: '1.25rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        gap: '0.85rem',
        background: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(24px) saturate(150%)',
        WebkitBackdropFilter: 'blur(24px) saturate(150%)',
        border: '1px solid rgba(255,255,255,0.75)',
        outline: '1px solid rgba(196,176,240,0.22)',
        outlineOffset: '-1px',
        borderRadius: '60px',
        padding: '0.45rem 1.1rem',
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.9),' +
          '0 4px 20px rgba(139,111,212,0.10),' +
          '0 1px 4px rgba(0,0,0,0.04)',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-ui)',
          fontWeight: 400,
          fontSize: '0.6rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--lav-500)',   /* accent colour — readable */
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            style={{
              width: i < filled ? '18px' : '5px',
              height: '5px',
              borderRadius: '3px',
              background: i < filled
                ? 'linear-gradient(to right, var(--lav-400), var(--blush-400))'
                : 'rgba(169,142,230,0.20)',
              transition: 'all 0.4s var(--ease-silk)',
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}
