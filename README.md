# Ansu & Ichu's World 💙

A cinematic, multipage romantic web experience — built as a heartfelt gesture from Akhil (Ichu) to Ann Grace (Ansu). Not a template. A handcrafted emotional journey equal parts art installation and love letter.

**Built by:** Adwaith R Nair  
**Deployed on:** Vercel  
**Live at:** *(your Vercel URL)*

---

## What This Is

A premium romantic website that walks Ann Grace through 11 pages — an apology, 20 reasons she is loved, shared memories, a handwritten letter, video messages, a choice between reconcile or closure, a dreamy future gallery, voice notes, a creator's note, and a final page of memories.

Every page has its own transition, animation style, and emotional register. Nothing is decorative noise — every element earns its place.

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | React 18 + Vite + TypeScript |
| Routing | React Router v7 |
| Animation | Framer Motion + GSAP + ScrollTrigger |
| 3D / WebGL | Three.js + React Three Fiber + Drei |
| Audio | Howler.js |
| Smooth scroll | Lenis |
| State | Zustand |
| Deployment | Vercel |

---

## Pages

| Route | Page | Description |
|---|---|---|
| `/` | Intro | Cinematic loader → hero with flowing gradient title |
| `/apology` | Apology | Three glass panels — honest, raw, real |
| `/love` | Why I Love You | 20 reason cards with scroll animations |
| `/memories` | Our Story | Vertical timeline with photo lightbox |
| `/letter` | The Letter | Full handwritten letter with fold animation |
| `/video` | Video Messages | YouTube embeds with custom controls |
| `/choice` | The Choice | Reconcile or Closure — no pressure either way |
| `/reconcile` | Reconcile | Hopeful, lavender-toned |
| `/closure` | Closure | Dignified, blush-toned |
| `/future` | What Could've Been | AI video gallery, bittersweet and dreamy |
| `/creator` | Creator's Note | Adwaith speaks directly to Ann |
| `/easter` | One More Thing | Voice notes from Akhil |
| `/memories-of-you` | Memories of You | Final letter + polaroid photos + virtual hugs |

---

## Project Structure

```
src/
├── pages/          — one file per route
├── components/
│   ├── three/      — WebGL background (particles, nebula, shooting stars)
│   ├── transitions/ — page transition engine
│   ├── layout/     — PageLayout shell (nav arrows, progress, music player)
│   └── ui/         — AudioCard, VideoPlayer, YouTubeEmbed, PhotoLightbox
├── hooks/
│   ├── useAudioManager.ts   — Howler.js crossfade + duck/restore
│   └── useLenis.ts          — smooth scroll
├── store/
│   └── useAppStore.ts       — Zustand global state
├── config/
│   └── content.ts           — all text content + asset paths
├── assets/
│   └── audio/               — voice notes (Vite-processed for hashed URLs)
└── index.css                — design tokens + global styles
```

```
public/
└── assets/
    ├── photos/       — memory timeline photos
    ├── videos/       — reels and short clips
    ├── ai-videos/    — future page videos
    └── music/        — background music tracks
```

---

## Design System

**Palette:** Near-white lavender backgrounds, lavender as the primary accent, blush rose as the emotional accent.

**Fonts:**
- `Cormorant Garamond` — body and section headings
- `Playfair Display` — hero titles
- `DM Sans` — UI labels
- `Dancing Script` — signatures and script accents

**Key CSS variables:**
```css
--lav-500: #8b6fd4       /* primary lavender */
--blush-500: #d4788f     /* emotional rose */
--text-body: #3d2f5a     /* rich purple-dark */
--bg-base: #faf7ff       /* near-white with lavender tint */
```

---

## Audio System

- Background music per page via Howler.js with 2s crossfade between tracks
- Music automatically ducks (fades to 0) when any video or voice note plays
- Music restores when video/audio pauses or ends
- Voice notes are imported via Vite's module pipeline (content-hashed URLs) to bypass Vercel's SPA rewrite rule

---

## Key Technical Notes

### Why audio files are in `src/assets/audio/` not `public/`
Vercel's SPA rewrite rule (`/(.*) → /index.html`) intercepts requests to files in `public/` that aren't explicitly listed in Vite's build manifest. By importing audio files from `src/`, Vite processes them into content-hashed URLs (e.g. `/assets/note-1-DIvEqPOX.mp3`) which Vercel serves directly from its deployment manifest, bypassing the rewrite entirely.

### YouTube embeds
The three main video messages (Akhil's message, reconcile message, closure message) are hosted as unlisted YouTube videos and embedded via the YouTube IFrame API. A module-level singleton handles the API loading queue so multiple embeds on the same page don't conflict.

### WebGL background
A persistent `<BackgroundCanvas />` sits fixed behind all pages. It renders ~3,600 particles with a custom GLSL shader (twinkle, upward drift, mouse swirl), a nebula atmosphere, and occasional shooting stars. Camera drifts very slowly on the Y axis to keep it feeling alive.

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Deployment

Connected to GitHub via Vercel's GitHub integration. Every push to `main` triggers an automatic production deployment.

```bash
# Deploy manually if webhook fails
npx vercel --prod
```

If a push to GitHub doesn't trigger Vercel within a minute, go to **Vercel → Deployments → ⋯ → Redeploy** to manually kick it off.

---

## Assets Not in This Repo

The following files are excluded from git (too large / hosted elsewhere):

```
public/assets/videos/akhil-message.mp4       — hosted on YouTube (unlisted)
public/assets/videos/reconcile-message.mp4   — hosted on YouTube (unlisted)
public/assets/videos/closure-message.mp4     — hosted on YouTube (unlisted)
```

All other media (reels, photos, AI videos, music, voice notes) is tracked in git and deployed via Vercel.

---

*Built with care by Adwaith — because some things are too important to leave unsaid.*
