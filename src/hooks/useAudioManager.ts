import { useEffect } from 'react'
import { Howl, Howler } from 'howler'
import { useAppStore } from '../store/useAppStore'
import { AUDIO_MAP } from '../config/content'
import type { PageId } from '../store/useAppStore'

const CROSSFADE_MS = 2000
const DUCK_MS      = 400
const RESTORE_MS   = 900

// Howler handles autoplay unlock automatically via Web Audio API (autoUnlock: true by default).
// We just call play() — if blocked, Howler queues it and fires when the browser allows.
Howler.autoUnlock = true
Howler.autoSuspend = false  // keep audio context alive between pages

// ─── Module-level singletons ─────────────────────────────────────────────────
let _activeHowl:  Howl   | null = null
let _targetVolume               = 0.6
let _isDucked                   = false
let _currentSrc                 = ''

// ─── Duck / Restore (called by VideoPlayer & FuturePage) ─────────────────────
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

// ─── The hook (called from PageLayout on every page) ─────────────────────────
export function useAudioManager(page: PageId) {
  const { audioEnabled, isMuted, volume, setCurrentTrack } = useAppStore()

  useEffect(() => {
    const trackPath = AUDIO_MAP[page]

    // No track for this page, or audio disabled — stop music
    if (!audioEnabled || !trackPath) {
      if (_activeHowl) {
        const h = _activeHowl
        h.fade(h.volume(), 0, CROSSFADE_MS)
        setTimeout(() => h.stop(), CROSSFADE_MS)
        _activeHowl = null
        _currentSrc = ''
        _isDucked   = false
        setCurrentTrack(null)
      }
      return
    }

    // Same track already playing — don't restart, just continue
    if (_currentSrc === trackPath && _activeHowl) return

    const fadeTarget  = isMuted ? 0 : volume
    _targetVolume     = fadeTarget

    // Crossfade out old track
    if (_activeHowl) {
      const old = _activeHowl
      old.fade(old.volume(), 0, CROSSFADE_MS)
      setTimeout(() => old.stop(), CROSSFADE_MS)
    }

    // Create new Howl — Web Audio API (no html5:true) so Howler's autoUnlock works
    const newHowl = new Howl({
      src:    [trackPath],
      format: ['mp3'],
      loop:   true,
      volume: 0,
      onplayerror: (_id, err) => {
        console.warn('[audio] play blocked:', err)
        // Howler will retry automatically once the context unlocks
        newHowl.once('unlock', () => {
          newHowl.play()
          newHowl.fade(0, _targetVolume, CROSSFADE_MS)
        })
      },
      onplay: () => {
        newHowl.fade(0, fadeTarget, CROSSFADE_MS)
      },
    })

    _activeHowl = newHowl
    _currentSrc = trackPath
    _isDucked   = false
    setCurrentTrack(trackPath)

    // Howler queues this automatically if context is still locked
    newHowl.play()

  }, [page, audioEnabled]) // eslint-disable-line react-hooks/exhaustive-deps

  // React to volume / mute changes in real time
  useEffect(() => {
    if (!_activeHowl || _isDucked) return
    const v = isMuted ? 0 : volume
    _targetVolume = v
    _activeHowl.volume(v)
  }, [isMuted, volume])
}
