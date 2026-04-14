import { useEffect, useRef } from 'react'
import { Howl } from 'howler'
import { useAppStore } from '../store/useAppStore'
import { AUDIO_MAP } from '../config/content'
import type { PageId } from '../store/useAppStore'

const CROSSFADE_MS = 2000

export function useAudioManager(page: PageId) {
  const { audioEnabled, isMuted, volume, setCurrentTrack } = useAppStore()
  const currentHowl = useRef<Howl | null>(null)

  useEffect(() => {
    const trackPath = AUDIO_MAP[page]
    if (!audioEnabled || !trackPath) {
      // Fade out current track if any
      if (currentHowl.current) {
        const h = currentHowl.current
        h.fade(h.volume(), 0, CROSSFADE_MS)
        setTimeout(() => h.stop(), CROSSFADE_MS)
        currentHowl.current = null
        setCurrentTrack(null)
      }
      return
    }

    const newHowl = new Howl({
      src: [trackPath],
      loop: true,
      volume: 0,
      html5: true,
    })

    // Fade out old
    if (currentHowl.current) {
      const old = currentHowl.current
      old.fade(old.volume(), 0, CROSSFADE_MS)
      setTimeout(() => old.stop(), CROSSFADE_MS)
    }

    // Fade in new
    newHowl.play()
    newHowl.fade(0, isMuted ? 0 : volume, CROSSFADE_MS)
    currentHowl.current = newHowl
    setCurrentTrack(trackPath)

    return () => {
      if (currentHowl.current) {
        currentHowl.current.fade(currentHowl.current.volume(), 0, 500)
        setTimeout(() => currentHowl.current?.stop(), 500)
      }
    }
  }, [page, audioEnabled]) // eslint-disable-line react-hooks/exhaustive-deps

  // React to mute/volume changes
  useEffect(() => {
    if (!currentHowl.current) return
    currentHowl.current.volume(isMuted ? 0 : volume)
  }, [isMuted, volume])
}
