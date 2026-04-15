import { Suspense, lazy, useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { BackgroundCanvas } from './components/three/BackgroundCanvas'
import { useLenis, scrollToTop } from './hooks/useLenis'
import { webglMouse } from './utils/webglMouse'

// Lazy load all pages
const IntroPage     = lazy(() => import('./pages/IntroPage').then(m => ({ default: m.IntroPage })))
const ApologyPage   = lazy(() => import('./pages/ApologyPage').then(m => ({ default: m.ApologyPage })))
const LovePage      = lazy(() => import('./pages/LovePage').then(m => ({ default: m.LovePage })))
const MemoriesPage  = lazy(() => import('./pages/MemoriesPage').then(m => ({ default: m.MemoriesPage })))
const LetterPage    = lazy(() => import('./pages/LetterPage').then(m => ({ default: m.LetterPage })))
const VideoPage     = lazy(() => import('./pages/VideoPage').then(m => ({ default: m.VideoPage })))
const ChoicePage    = lazy(() => import('./pages/ChoicePage').then(m => ({ default: m.ChoicePage })))
const ReconcilePage = lazy(() => import('./pages/ReconcilePage').then(m => ({ default: m.ReconcilePage })))
const ClosurePage   = lazy(() => import('./pages/ClosurePage').then(m => ({ default: m.ClosurePage })))
const FuturePage    = lazy(() => import('./pages/FuturePage').then(m => ({ default: m.FuturePage })))
const EasterPage        = lazy(() => import('./pages/EasterPage').then(m => ({ default: m.EasterPage })))
const CreatorPage       = lazy(() => import('./pages/CreatorPage').then(m => ({ default: m.CreatorPage })))
const MemoriesOfYouPage = lazy(() => import('./pages/MemoriesOfYouPage').then(m => ({ default: m.MemoriesOfYouPage })))

function PageFallback() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-base)',
      }}
    >
      <span style={{ color: 'var(--lav-300)', fontFamily: 'var(--font-ui)', fontSize: '0.7rem', letterSpacing: '0.2em' }}>
        loading...
      </span>
    </div>
  )
}

function AppRoutes() {
  const location = useLocation()

  useEffect(() => {
    scrollToTop()
  }, [location.pathname])

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Suspense fallback={<PageFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/"           element={<IntroPage />} />
          <Route path="/apology"    element={<ApologyPage />} />
          <Route path="/love"       element={<LovePage />} />
          <Route path="/memories"   element={<MemoriesPage />} />
          <Route path="/letter"     element={<LetterPage />} />
          <Route path="/video"      element={<VideoPage />} />
          <Route path="/choice"     element={<ChoicePage />} />
          <Route path="/reconcile"  element={<ReconcilePage />} />
          <Route path="/closure"    element={<ClosurePage />} />
          <Route path="/future"     element={<FuturePage />} />
          <Route path="/easter"          element={<EasterPage />} />
          <Route path="/creator"         element={<CreatorPage />} />
          <Route path="/memories-of-you" element={<MemoriesOfYouPage />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}

// ─── Smooth cursor glow — animated via direct DOM writes, zero React re-renders ──
function CursorGlow() {
  const glowRef  = useRef<HTMLDivElement>(null)
  const glowRef2 = useRef<HTMLDivElement>(null)
  const target   = useRef({ x: window.innerWidth / 2,  y: window.innerHeight / 2 })
  const current  = useRef({ x: window.innerWidth / 2,  y: window.innerHeight / 2 })
  const current2 = useRef({ x: window.innerWidth / 2,  y: window.innerHeight / 2 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
      // WebGL NDC coords (Y-flipped)
      webglMouse.x =  (e.clientX / window.innerWidth)  * 2 - 1
      webglMouse.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMove)

    let raf: number
    const tick = () => {
      // Primary glow — fast follow
      const f1 = 0.12
      current.current.x  += (target.current.x  - current.current.x)  * f1
      current.current.y  += (target.current.y  - current.current.y)  * f1
      // Secondary glow — slower lag for depth
      const f2 = 0.06
      current2.current.x += (target.current.x  - current2.current.x) * f2
      current2.current.y += (target.current.y  - current2.current.y) * f2

      if (glowRef.current) {
        glowRef.current.style.transform =
          `translate(${current.current.x - 250}px, ${current.current.y - 250}px)`
      }
      if (glowRef2.current) {
        glowRef2.current.style.transform =
          `translate(${current2.current.x - 180}px, ${current2.current.y - 180}px)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  const base: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 2,           // above canvas (0), below page content (10)
    willChange: 'transform',
    mixBlendMode: 'normal',
  }

  return (
    <>
      {/* Primary glow — lavender */}
      <div
        ref={glowRef}
        style={{
          ...base,
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(169,142,230,0.13) 0%, rgba(196,176,240,0.07) 40%, transparent 70%)',
        }}
      />
      {/* Secondary glow — blush, slower lag */}
      <div
        ref={glowRef2}
        style={{
          ...base,
          width: '360px',
          height: '360px',
          background: 'radial-gradient(circle, rgba(204,122,148,0.09) 0%, rgba(237,191,202,0.04) 40%, transparent 68%)',
        }}
      />
    </>
  )
}

export default function App() {
  useLenis()

  return (
    <>
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* WebGL background — persistent behind all pages */}
      <BackgroundCanvas />

      {/* Smooth cursor glow — sits between canvas and page content */}
      <CursorGlow />

      {/* Page routes */}
      <AppRoutes />
    </>
  )
}
