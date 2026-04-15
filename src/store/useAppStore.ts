import { create } from 'zustand'

export type PageId =
  | 'intro'
  | 'apology'
  | 'love'
  | 'memories'
  | 'letter'
  | 'video'
  | 'choice'
  | 'reconcile'
  | 'closure'
  | 'future'
  | 'easter'
  | 'creator'
  | 'memories-of-you'

interface AppState {
  // Loader
  loaderDone: boolean
  setLoaderDone: (v: boolean) => void

  // Navigation
  currentPage: PageId
  setCurrentPage: (p: PageId) => void
  isTransitioning: boolean
  setIsTransitioning: (v: boolean) => void

  // The critical branch
  userChoice: 'reconcile' | 'closure' | null
  setUserChoice: (c: 'reconcile' | 'closure') => void

  // Easter egg
  easterEggUnlocked: boolean
  setEasterEggUnlocked: (v: boolean) => void

  // Audio
  audioEnabled: boolean
  setAudioEnabled: (v: boolean) => void
  isMuted: boolean
  setIsMuted: (v: boolean) => void
  volume: number
  setVolume: (v: number) => void
  currentTrack: string | null
  setCurrentTrack: (t: string | null) => void
}

export const useAppStore = create<AppState>((set) => ({
  loaderDone: false,
  setLoaderDone: (v) => set({ loaderDone: v }),

  currentPage: 'intro',
  setCurrentPage: (p) => set({ currentPage: p }),
  isTransitioning: false,
  setIsTransitioning: (v) => set({ isTransitioning: v }),

  userChoice: null,
  setUserChoice: (c) => set({ userChoice: c }),

  easterEggUnlocked: false,
  setEasterEggUnlocked: (v) => set({ easterEggUnlocked: v }),

  audioEnabled: true,
  setAudioEnabled: (v) => set({ audioEnabled: v }),
  isMuted: false,
  setIsMuted: (v) => set({ isMuted: v }),
  volume: 0.6,
  setVolume: (v) => set({ volume: v }),
  currentTrack: null,
  setCurrentTrack: (t) => set({ currentTrack: t }),
}))
