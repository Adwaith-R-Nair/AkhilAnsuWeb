import { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import { PAGE_LABELS } from '../../config/content'
import { ProgressIndicator } from '../ui/ProgressIndicator'
import { MusicPlayer } from '../ui/MusicPlayer'

const NO_NAV_PAGES = ['/video', '/choice']

const LINEAR_FLOW = ['/', '/apology', '/love', '/memories', '/letter', '/video', '/choice']
const FULL_FLOW = ['/', '/apology', '/love', '/memories', '/letter', '/video', '/choice', '/future', '/easter', '/creator']

function getPrevPath(pathname: string): string | null {
  const idx = LINEAR_FLOW.indexOf(pathname)
  if (idx <= 0) return null
  return LINEAR_FLOW[idx - 1]
}

function getNextPath(pathname: string, userChoice: 'reconcile' | 'closure' | null): string | null {
  if (NO_NAV_PAGES.includes(pathname)) return null
  if (pathname === '/reconcile' || pathname === '/closure') return '/future'
  if (pathname === '/future') return '/easter'
  if (pathname === '/easter') return '/creator'
  if (pathname === '/creator') return null
  const idx = LINEAR_FLOW.indexOf(pathname)
  if (idx < 0 || idx >= LINEAR_FLOW.length - 1) return null
  return LINEAR_FLOW[idx + 1]
}

function getPageName(pathname: string): string {
  const map: Record<string, string> = {
    '/': 'intro',
    '/apology': 'apology',
    '/love': 'love',
    '/memories': 'memories',
    '/letter': 'letter',
    '/video': 'video',
    '/choice': 'choice',
    '/reconcile': 'reconcile',
    '/closure': 'closure',
    '/future': 'future',
    '/easter': 'easter',
    '/creator': 'creator',
  }
  return map[pathname] || 'intro'
}

function getProgressDots(pathname: string): { filled: number; total: number } {
  const total = FULL_FLOW.length
  const idx = FULL_FLOW.indexOf(pathname)
  return { filled: Math.max(0, idx), total }
}

interface PageLayoutProps {
  children: ReactNode
  hideNav?: boolean
}

export function PageLayout({ children, hideNav = false }: PageLayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { loaderDone, userChoice } = useAppStore()
  const pathname = location.pathname

  const showNav = loaderDone && !hideNav && !NO_NAV_PAGES.includes(pathname)
  const prevPath = getPrevPath(pathname)
  const nextPath = getNextPath(pathname, userChoice)
  const pageName = getPageName(pathname)
  const { filled, total } = getProgressDots(pathname)

  const navBtnStyle: React.CSSProperties = {
    position: 'fixed',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.90)',
    backdropFilter: 'blur(24px) saturate(150%)',
    WebkitBackdropFilter: 'blur(24px) saturate(150%)',
    border: '1px solid rgba(255,255,255,0.75)',
    outline: '1px solid rgba(196,176,240,0.22)',
    outlineOffset: '-1px',
    cursor: 'pointer',
    color: 'var(--lav-500)',
    fontSize: '1rem',
    boxShadow:
      'inset 0 1px 0 rgba(255,255,255,0.9),' +
      '0 4px 20px rgba(139,111,212,0.10),' +
      '0 1px 4px rgba(0,0,0,0.04)',
    transition: 'all 0.3s ease',
  }

  return (
    <div className="page-wrapper page-bg" style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Progress indicator */}
      {loaderDone && <ProgressIndicator label={PAGE_LABELS[pageName] || pageName} filled={filled} total={total} />}

      {/* Left nav arrow */}
      {showNav && prevPath && (
        <motion.button
          style={{ ...navBtnStyle, left: '1.5rem' }}
          whileHover={{ scale: 1.1, boxShadow: '0 6px 28px rgba(139,111,212,0.25)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(prevPath)}
          aria-label="Previous page"
        >
          ←
        </motion.button>
      )}

      {/* Right nav arrow */}
      {showNav && nextPath && (
        <motion.button
          style={{ ...navBtnStyle, right: '1.5rem' }}
          whileHover={{ scale: 1.1, boxShadow: '0 6px 28px rgba(139,111,212,0.25)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(nextPath)}
          aria-label="Next page"
        >
          →
        </motion.button>
      )}

      {/* Page content */}
      {children}

      {/* Music player */}
      {loaderDone && <MusicPlayer />}
    </div>
  )
}
