import { useEffect } from 'react'
import { Howl } from 'howler'
import { useAppStore } from '../store/useAppStore'
import { AUDIO_MAP } from '../config/content'
import type { PageId } from '../store/useAppStore'

const CROSSFADE_MS = 2000
const DUCK_MS      = 350
const RESTORE_MS   = 900

// ─── Module-level singletons ────────────────────────────────────────────────
let _activeHowl: Howl | null = null
let _targetVolume             = 0.6
let _isDucked                 = false
let _currentSrc               = ''

// Autoplay unlock: browsers block audio until first user gesture.
// We queue a play call and fire it on the first interaction.
let _pendingPlay: (() => void) | null = null
let _unlocked                          = false

function _onFirstInteraction() {
  if (_unlocked) return
  _unlocked = true
  window.removeEventListener('click',      _onFirstInteraction, true)
  window.removeEventListener('touchstart', _onFirstInteraction, true)
  window.removeEventListener('keydown',    _onFirstInteraction, true)
  _pendingPlay?.()
  _pendingPlay = null
}

// Register once at module load — captures ANY click anywhere on the page
window.addEventListener('click',      _onFirstInteraction, true)
window.addEventListener('touchstart', _onFirstInteraction, true)
window.addEventListener('keydown',    _onFirstInteraction, true)

// ─── Duck / Restore (called by VideoPlayer) ──────────────────────────────────
export function duckAudioForVideo() {
  if (!_activeHowl || _isDucked) return
  _isDucked = true
  _activeHowl.fade(_activeHowl.volume(), 0, DUCK_MS)
}

export function restoreAudioAfterVideo() {
  if (!_activeHowl || !_isDucked) return
  _isDucked = false
  _activeHowl.fade(_activeHowl.volume(), _targetVolume, RESTORE_MS)
}

// ─── Format hint: .mpeg is usually MP3-encoded ───────────────────────────────
function formatHint(path: string): string[] {
  const ext = path.split('.').pop()?.toLowerCase() ?? ''
  if (ext === 'mpeg' || ext === 'mpg') return ['mp3']
  return [ext]
}

// ─── The hook ────────────────────────────────────────────────────────────────
export function useAudioManager(page: PageId) {
  const { audioEnabled, isMuted, volume, setCurrentTrack } = useAppStore()

  useEffect(() => {
    const trackPath = AUDIO_MAP[page]

    // Disabled or no track for this page → stop music
    if (!audioEnabled || !trackPath) {
      if (_activeHowl) {
        const h = _activeHowl
        h.fade(h.volume(), 0, CROSSFADE_MS)
        setTimeout(() => h.stop(), CROSSFADE_MS)
        _activeHowl  = null
        _currentSrc  = ''
        _isDucked    = false
        setCurrentTrack(null)
      }
      return
    }

    // Same track already playing — don't restart
    if (_currentSrc === trackPath && _activeHowl) return

    const fadeTarget  = isMuted ? 0 : volume
    _targetVolume     = fadeTarget

    const newHowl = new Howl({
      src:    [trackPath],
      format: formatHint(trackPath),
      loop:   true,
      volume: 0,
      html5:  true,
    })

    // Crossfade out old track
    if (_activeHowl) {
      const old = _activeHowl
      old.fade(old.volume(), 0, CROSSFADE_MS)
      setTimeout(() => old.stop(), CROSSFADE_MS)
    }

    _activeHowl = newHowl
    _currentSrc = trackPath
    _isDucked   = false
    setCurrentTrack(trackPath)

    const startPlaying = () => {
      newHowl.play()
      newHowl.fade(0, fadeTarget, CROSSFADE_MS)
    }

    if (_unlocked) {
      // Browser already unlocked by a prior interaction — play immediately
      startPlaying()
    } else {
      // Queue for first interaction (autoplay policy)
      _pendingPlay = startPlaying
    }
  }, [page, audioEnabled]) // eslint-disable-line react-hooks/exhaustive-deps

  // React to volume / mute changes
  useEffect(() => {
    if (!_activeHowl || _isDucked) return
    const v   = isMuted ? 0 : volume
    _targetVolume = v
    _activeHowl.volume(v)
  }, [isMuted, volume])
}
