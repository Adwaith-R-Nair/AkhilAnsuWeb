import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'

const LINEAR_FLOW = [
  '/',
  '/apology',
  '/love',
  '/memories',
  '/letter',
  '/video',
  '/choice',
]

export function useNavigation() {
  const navigate = useNavigate()
  const { userChoice, setIsTransitioning } = useAppStore()

  const navigateTo = (path: string) => {
    setIsTransitioning(true)
    setTimeout(() => {
      navigate(path)
      setIsTransitioning(false)
    }, 600)
  }

  const getPrevPath = (current: string): string | null => {
    const idx = LINEAR_FLOW.indexOf(current)
    if (idx <= 0) return null
    return LINEAR_FLOW[idx - 1]
  }

  const getNextPath = (current: string): string | null => {
    // Video page has no nav arrows
    if (current === '/video' || current === '/choice') return null

    if (current === '/reconcile' || current === '/closure') return '/future'
    if (current === '/future') return '/easter'
    if (current === '/easter') return '/creator'
    if (current === '/creator') return null

    const idx = LINEAR_FLOW.indexOf(current)
    if (idx < 0 || idx >= LINEAR_FLOW.length - 1) return null
    return LINEAR_FLOW[idx + 1]
  }

  return { navigateTo, getPrevPath, getNextPath, userChoice }
}
