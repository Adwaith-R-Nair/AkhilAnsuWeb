import { useEffect, useRef } from 'react'
import { duckAudioForVideo, restoreAudioAfterVideo } from '../../hooks/useAudioManager'

// ─── Minimal YT type declarations ────────────────────────────────────────────
declare global {
  interface Window {
    YT: {
      Player: new (el: HTMLElement, opts: YTPlayerOptions) => YTPlayer
      PlayerState: { PLAYING: number; PAUSED: number; ENDED: number; BUFFERING: number }
    }
    onYouTubeIframeAPIReady?: () => void
  }
}

interface YTPlayerOptions {
  videoId: string
  playerVars?: Record<string, string | number>
  events?: {
    onReady?: () => void
    onStateChange?: (e: { data: number }) => void
  }
}

interface YTPlayer {
  destroy: () => void
}

// ─── Load the YouTube IFrame API once across all components ──────────────────
let _apiReady = false
let _apiLoading = false
const _queue: Array<() => void> = []

function loadYTApi(cb: () => void) {
  if (_apiReady) { cb(); return }
  _queue.push(cb)
  if (_apiLoading) return
  _apiLoading = true
  const script = document.createElement('script')
  script.src = 'https://www.youtube.com/iframe_api'
  document.head.appendChild(script)
  window.onYouTubeIframeAPIReady = () => {
    _apiReady = true
    _queue.forEach(fn => fn())
    _queue.length = 0
  }
}

// ─── Component ────────────────────────────────────────────────────────────────
interface YouTubeEmbedProps {
  videoId: string
  title?: string
  onEnded?: () => void
}

export function YouTubeEmbed({ videoId, title, onEnded }: YouTubeEmbedProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<YTPlayer | null>(null)

  useEffect(() => {
    let cancelled = false

    loadYTApi(() => {
      if (cancelled || !divRef.current) return

      playerRef.current = new window.YT.Player(divRef.current, {
        videoId,
        playerVars: {
          rel:             0,
          modestbranding:  1,
          color:           'white',
          playsinline:     1,
        },
        events: {
          onStateChange: ({ data }: { data: number }) => {
            const S = window.YT.PlayerState
            if (data === S.PLAYING) {
              duckAudioForVideo()
            } else if (data === S.PAUSED || data === S.ENDED || data === S.BUFFERING === false) {
              restoreAudioAfterVideo()
            }
            if (data === S.ENDED) {
              onEnded?.()
            }
          },
        },
      })
    })

    return () => {
      cancelled = true
      restoreAudioAfterVideo()
      playerRef.current?.destroy()
      playerRef.current = null
    }
  }, [videoId]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '16/9',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow:
          '0 16px 48px rgba(139,111,212,0.14),' +
          '0 4px 16px rgba(0,0,0,0.08)',
      }}
    >
      {/* YouTube API replaces this div with the iframe */}
      <div ref={divRef} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}
