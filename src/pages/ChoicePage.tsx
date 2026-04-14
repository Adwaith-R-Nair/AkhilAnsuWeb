import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { PageLayout } from '../components/layout/PageLayout'
import { PageTransition } from '../components/transitions/PageTransition'

export function ChoicePage() {
  const { setCurrentPage, setUserChoice } = useAppStore()
  const navigate = useNavigate()

  useEffect(() => {
    setCurrentPage('choice')
  }, [setCurrentPage])

  const handleChoice = (choice: 'reconcile' | 'closure') => {
    setUserChoice(choice)
    navigate(`/${choice}`)
  }

  return (
    <PageLayout hideNav>
      <PageTransition variant="dissolve">
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            gap: '3.5rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Atmospheric blobs */}
          <motion.div
            animate={{ opacity: [0.05, 0.12, 0.05], scale: [1, 1.08, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, var(--lav-200), transparent 70%)',
              top: '50%',
              left: '30%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              filter: 'blur(60px)',
            }}
          />
          <motion.div
            animate={{ opacity: [0.04, 0.10, 0.04], scale: [1, 1.06, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            style={{
              position: 'absolute',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, var(--blush-200), transparent 70%)',
              top: '50%',
              left: '70%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              filter: 'blur(60px)',
            }}
          />

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="eyebrow"
          >
            a moment of honesty
          </motion.p>

          {/* Quote */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-body)',
              fontStyle: 'italic',
              fontSize: 'clamp(1rem, 2vw, 1.3rem)',
              color: 'var(--text-muted)',
              textAlign: 'center',
              maxWidth: '520px',
              lineHeight: 1.75,
            }}
          >
            "It wasn't easy for either of us. Whatever you choose — know that it comes from an honest place."
          </motion.p>

          {/* Thin decorative rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: '100px',
              height: '1px',
              background: 'linear-gradient(to right, transparent, var(--lav-300), transparent)',
              transformOrigin: 'center',
              marginTop: '-1.5rem',
            }}
          />

          {/* Choice buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '2.5rem',
              justifyContent: 'center',
              alignItems: 'stretch',
            }}
          >
            {/* RECONCILE */}
            <motion.button
              whileHover={{
                background: 'var(--lav-500)',
                color: 'white',
                boxShadow: '0 12px 50px rgba(139,111,212,0.4), 0 0 0 1px rgba(139,111,212,0.3)',
                y: -4,
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleChoice('reconcile')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.7rem',
                padding: '1.85rem 3.25rem',
                borderRadius: '18px',
                cursor: 'pointer',
                background: 'rgba(237,229,255,0.4)',
                border: '2px solid var(--lav-500)',
                color: 'var(--lav-700)',
                transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                minWidth: '220px',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 500,
                  fontSize: '0.82rem',
                  letterSpacing: '0.22em',
                }}
              >
                RECONCILE
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontStyle: 'italic',
                  fontSize: '0.78rem',
                  color: 'inherit',
                  opacity: 0.7,
                  maxWidth: '200px',
                  textAlign: 'center',
                  lineHeight: 1.5,
                }}
              >
                "If trust can somehow find its way back..."
              </span>
            </motion.button>

            {/* CLOSURE */}
            <motion.button
              whileHover={{
                background: 'var(--blush-500)',
                color: 'white',
                boxShadow: '0 12px 50px rgba(204,122,148,0.4), 0 0 0 1px rgba(204,122,148,0.3)',
                y: -4,
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleChoice('closure')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.7rem',
                padding: '1.85rem 3.25rem',
                borderRadius: '18px',
                cursor: 'pointer',
                background: 'rgba(252,232,237,0.4)',
                border: '2px solid var(--blush-500)',
                color: 'var(--blush-600)',
                transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                minWidth: '220px',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 500,
                  fontSize: '0.82rem',
                  letterSpacing: '0.22em',
                }}
              >
                CLOSURE
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontStyle: 'italic',
                  fontSize: '0.78rem',
                  color: 'inherit',
                  opacity: 0.7,
                  maxWidth: '200px',
                  textAlign: 'center',
                  lineHeight: 1.5,
                }}
              >
                "To leave with dignity, not wounds"
              </span>
            </motion.button>
          </motion.div>

          {/* Footer hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.6rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--text-faint)',
              textAlign: 'center',
            }}
          >
            neither choice is wrong — both come from love
          </motion.p>
        </div>
      </PageTransition>
    </PageLayout>
  )
}
