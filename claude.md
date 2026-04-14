# CLAUDE.md — Master Brief for "Ansu & Ichu's World"

## A Cinematic Romantic Web Experience

> Read this entire document before writing a single line of code.
> This is the complete brief, content, design system, animation spec, and page-by-page blueprint.
> Build everything with the mindset: **"When Ann Grace opens this, will she feel it?"**

---

## 0. PROJECT OVERVIEW

**What this is:** A premium, cinematic, multipage romantic website built as a heartfelt gesture from Akhil (Ichu) to Ann Grace (Ansu / Blue). It is not a template. It is a handcrafted emotional experience — equal parts art installation and love letter.

**Who it's for:** Ann Grace. She is emotionally intelligent, deeply feeling, and knows Adwaith (the creator) personally. She will notice detail. She will feel inauthenticity. Everything must be real.

**Who built it:** Adwaith — Akhil's best friend, who also gave Ann significant emotional support during their relationship. His creator's note closes the experience.

**Tone:** Sincere. Poetic. Cinematic. Never cheesy. Never over-decorated. Every element earns its place.

**Deployed on:** Vercel. Built with npm.

---

## 1. TECHNICAL STACK

**Choose React 18 + Vite + TypeScript** — best fit for the animation stack required.

**Core dependencies to install:**

```bash
npm install react-router-dom@7 framer-motion gsap @gsap/react three @react-three/fiber @react-three/drei lenis zustand howler
npm install -D @types/three @types/howler tailwindcss @tailwindcss/vite
```

**Key libraries and what they do:**

- **React Router v7** — multipage routing with `BrowserRouter`
- **Framer Motion** — page transitions, component animations, AnimatePresence
- **GSAP + ScrollTrigger** — scroll-driven animations, text splits, timeline orchestration
- **Three.js + React Three Fiber** — WebGL background (particles, shaders, atmospheric effects)
- **@react-three/drei** — Stars, Environment, helper utilities
- **Lenis** — physics-based smooth scrolling
- **Zustand** — global state (current page, choices, audio, easter egg)
- **Howler.js** — per-page audio management with crossfade
- **Custom GLSL shaders** — nebula, particle glow, image reveal effects

**Vercel config** (`vercel.json`):

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

**index.html meta:**

```html
<meta name="robots" content="noindex, nofollow" />
<meta name="theme-color" content="#faf7ff" />
<title>For Ansu 💙</title>
```

---

## 2. DESIGN SYSTEM — SOFT LIGHT ROMANTIC LAVENDER

### Philosophy

Near-white backgrounds. Lavender as the primary accent. Blush rose as the emotional accent. Soft and dreamy — like morning light through sheer curtains. Every surface feels like it breathes.

### Color Tokens (CSS Variables)

```css
:root {
  /* Backgrounds */
  --bg-base: #faf7ff; /* near-white with lavender tint */
  --bg-soft: #f3eeff; /* slightly deeper lavender white */
  --bg-mist: #ede5ff; /* misty lavender for sections */
  --bg-parchment: #fdf6f9; /* warm parchment for letter */
  --bg-overlay: rgba(250, 247, 255, 0.85);

  /* Lavender palette */
  --lav-900: #2d1b69;
  --lav-700: #5b3fa6;
  --lav-500: #8b6fd4;
  --lav-400: #a98ee6;
  --lav-300: #c4b0f0;
  --lav-200: #ddd0f8;
  --lav-100: #ede5ff;

  /* Blush / Rose */
  --blush-600: #c2607a;
  --blush-500: #d4788f;
  --blush-400: #e09aad;
  --blush-300: #edbfca;
  --blush-100: #fce8ed;

  /* Text */
  --text-primary: #1a1230; /* deep dark lavender-tinted */
  --text-body: #3d2f5a; /* rich purple-dark for body */
  --text-muted: #7a6a96; /* soft muted purple */
  --text-faint: #b0a0c8; /* very faint for labels */

  /* Accents */
  --accent: var(--lav-500);
  --accent-glow: rgba(139, 111, 212, 0.2);
  --rose: var(--blush-500);
  --rose-glow: rgba(212, 120, 143, 0.2);
  --gold: #c9956e;
  --gold-lt: #e0b898;

  /* Typography */
  --font-display: "Cormorant Garamond", Georgia, serif;
  --font-heading: "Playfair Display", Georgia, serif;
  --font-body: "Cormorant Garamond", Georgia, serif;
  --font-ui: "DM Sans", system-ui, sans-serif;
  --font-script: "Dancing Script", cursive;
  --font-mono: "JetBrains Mono", monospace;

  /* Motion */
  --ease-silk: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-expo: cubic-bezier(0.19, 1, 0.22, 1);
  --ease-in-out: cubic-bezier(0.87, 0, 0.13, 1);
}
```

### Google Fonts Import

```
Cormorant Garamond (300, 400, 500, 600 — normal + italic)
Playfair Display (400, 500, 700 — normal + italic)
DM Sans (300, 400, 500)
Dancing Script (400, 600, 700)
```

### Typography Scale

- **Hero titles:** Playfair Display, italic, `clamp(4rem, 10vw, 9rem)`, color `--text-primary`
- **Section headings:** Cormorant Garamond, italic, `clamp(2.4rem, 5vw, 4.5rem)`
- **Body text:** Cormorant Garamond, 400, `clamp(1.05rem, 1.9vw, 1.3rem)`, line-height 1.9
- **UI labels:** DM Sans, 300, `0.65rem`, letter-spacing `0.25em`, uppercase
- **Script accents:** Dancing Script, for signatures, salutations, emotional highlights
- **Gradient text:** `linear-gradient(135deg, var(--lav-500) 0%, var(--blush-500) 100%)` + background-clip

### Surface Patterns

```css
/* Frosted glass panel on light */
.glass-panel {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(139, 111, 212, 0.15);
  border-radius: 24px;
  box-shadow:
    0 8px 40px rgba(139, 111, 212, 0.08),
    0 2px 8px rgba(0, 0, 0, 0.04);
}

/* Lavender glow card */
.lav-card {
  background: rgba(237, 229, 255, 0.5);
  border: 1px solid rgba(196, 176, 240, 0.3);
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(139, 111, 212, 0.1);
}

/* Soft shadow */
.soft-shadow {
  box-shadow:
    0 20px 60px rgba(139, 111, 212, 0.12),
    0 4px 16px rgba(0, 0, 0, 0.05);
}
```

### Background Texture

On every page, apply a subtle noise grain overlay (z-index: 9999, pointer-events: none, opacity 0.25, mix-blend-mode: multiply) using an SVG noise filter.

Also apply a soft radial gradient background on each page:

```css
background:
  radial-gradient(
    ellipse at 30% 20%,
    rgba(196, 176, 240, 0.25) 0%,
    transparent 60%
  ),
  radial-gradient(
    ellipse at 70% 80%,
    rgba(228, 181, 192, 0.2) 0%,
    transparent 55%
  ),
  var(--bg-base);
```

---

## 3. WEBGL BACKGROUND

A persistent `<BackgroundCanvas />` component sits fixed behind all pages (`z-index: 0`). It uses React Three Fiber.

**What it renders:**

1. **Floating particle field** — ~6,000 soft particles. Color: mix of lavender (`#c4b0f0`) and blush (`#edbfca`) and pearl white. Small, soft, slowly drifting upward. Custom GLSL shader with per-particle twinkle.
2. **Nebula atmosphere** — Two large plane meshes with animated Simplex noise GLSL shader. Colors: soft lavender `#c4b0f0` and blush `#f0c4d4`. Very low opacity (0.12-0.18), additive blending.
3. **Subtle shooting stars** — Occasional streak across the canvas, rare enough to feel like a gift when she notices.
4. **Camera drift** — Very slow automatic drift (0.0003 rad/s rotation on Y axis). Feels alive, not animated.

**Vertex shader (particles):**

```glsl
uniform float uTime;
uniform float uSize;
attribute float aScale;
attribute float aTwinkle;
varying float vTwinkle;

void main() {
  vTwinkle = aTwinkle;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = uSize * aScale * (1.0 / -mvPosition.z);
  // Slow upward drift
  vec3 pos = position;
  pos.y += mod(uTime * 0.8 + aTwinkle * 100.0, 200.0) - 100.0;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
```

**Fragment shader (particles):**

```glsl
varying float vTwinkle;
void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float dist = length(uv);
  if (dist > 0.5) discard;
  float alpha = pow(1.0 - dist * 2.0, 2.5);
  // Lavender to blush tint per particle
  vec3 lavColor   = vec3(0.82, 0.75, 0.97);
  vec3 blushColor = vec3(0.95, 0.80, 0.85);
  vec3 color = mix(lavColor, blushColor, vTwinkle);
  // Twinkle
  float twinkle = sin(uTime * 2.0 + vTwinkle * 6.28) * 0.3 + 0.7;
  gl_FragColor = vec4(color, alpha * twinkle * 0.6);
}
```

**Per-page color shift:** The nebula colors shift subtly based on which page is active (passed as a uniform from Zustand store). Use smooth lerp transitions between page color states.

---

## 4. GLOBAL STATE (Zustand)

```typescript
interface AppState {
  // Loader
  loaderDone: boolean;
  setLoaderDone: (v: boolean) => void;

  // Navigation
  currentPage: PageId;
  setCurrentPage: (p: PageId) => void;
  isTransitioning: boolean;
  setIsTransitioning: (v: boolean) => void;

  // The critical branch
  userChoice: "reconcile" | "closure" | null;
  setUserChoice: (c: "reconcile" | "closure") => void;

  // Easter egg
  easterEggUnlocked: boolean;
  setEasterEggUnlocked: (v: boolean) => void;

  // Audio
  audioEnabled: boolean;
  setAudioEnabled: (v: boolean) => void;
  isMuted: boolean;
  setIsMuted: (v: boolean) => void;
  volume: number;
  setVolume: (v: number) => void;
  currentTrack: string | null;
  setCurrentTrack: (t: string | null) => void;
}

type PageId =
  | "intro"
  | "apology"
  | "love"
  | "memories"
  | "letter"
  | "video"
  | "reconcile"
  | "closure"
  | "future"
  | "easter"
  | "creator";
```

---

## 5. PAGE TRANSITIONS

Use Framer Motion `AnimatePresence` with `mode="wait"` wrapping all routes.

**Transition assignment per page:**

| From → To                  | Style                                              |
| -------------------------- | -------------------------------------------------- |
| intro → apology            | Curtain wipe (GSAP dual-panel sweep left-to-right) |
| apology → love             | Dissolve + upward float                            |
| love → memories            | Film cut (soft white flash)                        |
| memories → letter          | Morph (blur dissolve + scale)                      |
| letter → video             | Film cut (darker, more dramatic)                   |
| video → reconcile/closure  | Scale bloom (choice expands to fill screen)        |
| reconcile/closure → future | Dissolve + blur                                    |
| future → easter            | Soft fade                                          |
| easter → creator           | Gentle cross-dissolve                              |

**Curtain Wipe (GSAP):**
Two panels, lavender gradient (`var(--lav-700)` to `var(--blush-600)`), sweep across in 0.45s, hold, sweep back. Route change happens at the midpoint (peak coverage).

**Film Cut Flash:**
Quick white/lavender flash: opacity 0 → 1 → 0.6 → 1 → 0 over 0.35s total. New page renders underneath.

**Dissolve + Float:**
`framer-motion` variants: `initial: { opacity: 0, y: 24, filter: 'blur(8px)' }` → `animate: { opacity: 1, y: 0, filter: 'blur(0px)' }`. Duration 0.9s, ease `[0.16, 1, 0.3, 1]`.

---

## 6. NAVIGATION SHELL

A shared `<PageLayout>` wraps every page and renders:

1. **Left arrow** (previous page) — fixed, vertically centered, subtle glass button
2. **Right arrow** (next page) — same, only shown when there IS a next page in the linear flow
3. **Top center progress indicator** — pill with page label + dot progress bar
4. **Bottom left music player** — floating, expandable on hover, shows track name + volume

Navigation arrows must NOT appear on the video page (she must make her choice naturally), and must NOT appear during the loader.

On the choice page (after video), there are no navigation arrows — only the two choice buttons.

---

## 7. PAGE-BY-PAGE SPECIFICATIONS

---

### PAGE 1: INTRO — "Ansu & Ichu's World" (`/`)

**Purpose:** First impression. Must be breathtaking. Sets the entire emotional register.

**Transition in:** Cinematic loader

**Loader sequence (before hero appears):**

1. Screen starts pure white (`#faf7ff`)
2. Particles slowly emerge from center outward — 2.5 seconds
3. A single thin horizontal line draws itself across the center
4. Text appears character by character, center screen:
   ```
   For Blue. 🔵
   ```
   (Playfair Display, italic, 3.5rem, color `--lav-700`)
5. Below it, smaller DM Sans 300:
   ```
   from Ichu — with everything he had left to say.
   ```
6. 1.8 second hold
7. Dissolve to hero content

**Hero content (after loader):**

Layout: full viewport, vertically centered.

- **Eyebrow label** (DM Sans, 0.65rem, `--text-faint`, letter-spacing 0.3em, uppercase):
  `a world that was ours`

- **Main title** (Playfair Display italic, `clamp(4rem, 10vw, 8rem)`):
  `Ansu & Ichu's World`
  → Animate each character in with GSAP: staggered entry from Y+60px, rotateX(-35deg) → 0. Duration 1.1s per char, stagger amount 0.7s.
  → Text gradient: `linear-gradient(135deg, var(--lav-500) 0%, var(--blush-500) 100%)`

- **Subtitle** (Cormorant Garamond italic, 1.3rem, `--text-muted`):
  `One year. Every feeling. All of it — finally said.`

- **Thin decorative rule:** 100px wide, 1px, gradient `transparent → var(--lav-400) → transparent`

- **Begin button** at bottom: DM Sans, small, uppercase, letter-spacing. On click → navigate to apology with curtain wipe.
  Text: `begin →`
  Style: no background, border: 1px solid `rgba(139,111,212,0.3)`, padding `0.75rem 2.5rem`, borderRadius 60px.
  Hover: border glows lavender, subtle background fill.

- **Floating ambient detail:** 3-4 small `✦` sparkle characters placed at random positions, slowly rotating and pulsing opacity with Framer Motion.

- **Scroll cue arrow** at very bottom, breathing animation.

**Three.js background on this page:** Particles denser, nebula more vibrant. Camera very slowly zooming out.

---

### PAGE 2: APOLOGY (`/apology`)

**Purpose:** The most emotionally raw page. Must feel honest and safe, not performative.

**Transition in:** Curtain wipe from intro.

**Layout:** Centered, single column, max-width 720px, generous vertical padding.

**Section heading:**

- Eyebrow: `an honest letter`
- Title: `I Owe You This`

**Content — render as three sequential glass panels, each staggered in on scroll:**

**Panel 1 — The Acknowledgment:**

```
I'm writing this without excuses, without justifications — only truth.

I know I gave you reasons to doubt me. I know my actions fed your overthinking and deepened the trust issues you were already fighting. What hurts the most is knowing that the pain you carried wasn't accidental — it came from me. And that's something I will always regret.

I didn't always think before I acted. I didn't always protect your peace the way I should have. Some of my choices were careless, some selfish, and some just deeply thoughtless. Even when my intentions weren't bad, the impact was — and I understand now that intentions don't erase wounds.
```

**Panel 2 — The Apology:**

```
I am truly sorry for the nights you cried silently, for the constant second-guessing in your mind, for the heaviness I added to your heart. You trusted me, and I didn't honour that trust the way you deserved.

I'm not asking you to forget. I'm not asking you to forgive me immediately or at all. I only hope you never hate me or curse me for the mistakes I made while still learning how to love properly. Please know that none of it came from a place of wanting to hurt you.
```

**Panel 3 — The Lesson:**

```
Loving you changed me. Losing your trust taught me more than comfort ever could. Whether we walk forward together or separately, I will carry this lesson with me — to be more aware, more honest, and more responsible with someone's heart.

If someday you think of me, I hope it's not with anger — but with the understanding that I was flawed, learning, and genuinely remorseful.

I'm sorry for everything I broke that I should have protected.
```

**Signature block** (Dancing Script, rose color):

```
With sincerity,
Always accountable,
Ichu 🚩🚩
```

**Design details:**

- Each panel: white/0.7 background, 1px lavender border, 24px border-radius, generous padding
- Left border accent: 3px solid `var(--lav-400)`, fades in with the panel
- On scroll entry: panel rises from Y+50px, opacity 0 → 1, with 0.15s stagger between panels
- Subtle rose petal SVG icons float in background (2-3, very low opacity, slowly drifting)

---

### PAGE 3: WHY I LOVE YOU (`/love`)

**Purpose:** Celebrate who Ann is, specifically and truthfully.

**Transition in:** Dissolve + upward float.

**Layout:** Full page, centered heading, then a masonry/grid of cards.

**Section heading:**

- Eyebrow: `20 reasons — and still counting`
- Title: `Why I Love You`
- Subtitle (italic, muted): `— Ichu`

**The 20 reason cards** (use ALL content below exactly):

```typescript
const LOVE_REASONS = [
  {
    number: "01",
    title: "You made me feel emotionally safe",
    body: "I didn't have to pretend or filter myself around you. I could be real — even in my worst moments — and still feel accepted.",
  },
  {
    number: "02",
    title: "You stayed when things weren't easy",
    body: "Not everything between us was smooth, but you didn't walk away at the first sign of difficulty. That effort mattered.",
  },
  {
    number: "03",
    title: "You understood me beyond words",
    body: "There were moments you just got it — without me having to explain everything. That kind of connection is rare.",
  },
  {
    number: "04",
    title: "You believed in me when I couldn't",
    body: "Even when I doubted myself, you held onto faith in me. That support shaped me more than you probably realize.",
  },
  {
    number: "05",
    title: "You handled my flaws with care",
    body: "You didn't try to break me down because of my imperfections. You held them with patience instead of judgment.",
  },
  {
    number: "06",
    title: "We shared something real, not perfect",
    body: "It wasn't flawless, but it was honest. And honesty carries more weight than perfection ever could.",
  },
  {
    number: "07",
    title: "You brought calm into my chaos",
    body: "In moments where I felt overwhelmed, your presence grounded me in a way nothing else could.",
  },
  {
    number: "08",
    title: "You showed consistency, not just intensity",
    body: "It wasn't just about big moments — it was the small, steady ways you showed up that made a difference.",
  },
  {
    number: "09",
    title: "You listened to understand, not just respond",
    body: "You didn't just hear me — you tried to feel what I was saying. That made me feel valued.",
  },
  {
    number: "10",
    title: "You cared in ways that weren't always visible",
    body: "Not everything you did was loud or obvious, but your care showed in subtle, meaningful ways.",
  },
  {
    number: "11",
    title: "You helped me grow as a person",
    body: "Being with you made me reflect, learn, and become more aware of myself — even through the difficult parts.",
  },
  {
    number: "12",
    title: "You were honest, even when it was uncomfortable",
    body: "You didn't hide behind convenience. You chose truth, even when it was hard to say or hear.",
  },
  {
    number: "13",
    title: "We created moments that actually meant something",
    body: "Not just memories, but moments that stayed — because they were genuine.",
  },
  {
    number: "14",
    title: "You respected parts of me that others overlooked",
    body: "You saw value in things about me that I didn't even notice myself.",
  },
  {
    number: "15",
    title: "You made me feel chosen, not just kept around",
    body: "There was intention in how you showed up — and that made all the difference.",
  },
  {
    number: "16",
    title: "Because you are you",
    body: "Not for what you do, not for what you give — but simply for who you are at your core. And that, by itself, is enough.",
  },
  {
    number: "17",
    title: "Your quiet strength",
    body: "You don't always show it loudly, but it's there — in how you handle things, in how you endure, in how you stay even when things aren't easy.",
  },
  {
    number: "18",
    title: "The warmth of your hug",
    body: "It feels like a pause. Like everything chaotic outside just softens for a moment.",
  },
  {
    number: "19",
    title: 'The way you say "I\'m here"',
    body: "Simple words — but when you say them, they actually mean something. And that consistency matters more than grand promises.",
  },
  {
    number: "20",
    title: "And so much more...",
    body: "Twenty reasons felt like a start. The truth is, the list doesn't have an end.",
  },
];
```

**Card design:**

- White background, 1px lavender border, 20px border-radius
- Watermark number: `5rem`, Playfair Display, `rgba(139,111,212,0.07)`, absolute positioned top-right
- Small lavender dot (6px) as visual accent top-left
- Title: Playfair Display italic, 1.1rem, `--text-primary`
- Body: Cormorant Garamond, 1rem, `--text-muted`, line-height 1.85
- On hover: subtle lift (`translateY(-4px)`), border brightens to `rgba(139,111,212,0.35)`, soft box-shadow
- Entry animation: each card fades up staggered as page loads (GSAP, 0.08s stagger)

**Grid layout:** `grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr))`, gap 1.25rem.

---

### PAGE 4: MEMORIES (`/memories`)

**Purpose:** Make their shared moments feel precious, permanent, real.

**Transition in:** Film cut (white flash).

**Layout:** Vertical timeline, centered axis, alternating left/right cards.

**Section heading:**

- Eyebrow: `what we built, moment by moment`
- Title: `Our Story`

**Timeline design:**

- Central vertical line: 1px, `linear-gradient(to bottom, transparent, var(--lav-300) 10%, var(--lav-300) 90%, transparent)`
- Timeline dot per entry: 10px circle, `var(--lav-500)`, glow: `0 0 12px rgba(139,111,212,0.5)`
- Cards: 44% width, alternate left/right of center line

**Each memory entry has:**

1. A period label (DM Sans, 0.6rem, uppercase, `--lav-400`, letter-spacing 0.2em)
2. A title (Playfair Display italic, 1.3rem)
3. A 1-line photo caption / description (Cormorant Garamond italic, 1rem, `--text-muted`)
4. A photo slot:
   - If photo exists: render `<img>` with border-radius 14px, object-fit cover, aspect-ratio 4/3
   - **IMPORTANT: WebGL shader reveal on scroll entry** — use a custom GLSL displacement shader that wipes the photo from grayscale noise → full color as it enters viewport. This is the premium effect that makes this section extraordinary.
   - Photo hover: subtle 3D tilt (`perspective: 800px`, `rotateX`, `rotateY` based on mouse position — CSS custom property trick or Framer Motion)
   - Click → fullscreen lightbox with Framer Motion shared layout animation

**Photo reveal GLSL shader approach:**
Use `@react-three/drei` `<Image>` or a custom Three.js plane per photo. Apply a ShaderMaterial with:

- A `uProgress` uniform (0 → 1, driven by IntersectionObserver + GSAP)
- A noise-based threshold: pixels reveal when `noise(uv) < uProgress`
- Colors shift from desaturated to full color during reveal

**Placeholder memory entries** (to be filled with Akhil's actual captions):

```typescript
const MEMORIES = [
  {
    period: "The Beginning",
    title: "When We First Met",
    caption: "photo-01.jpg",
  },
  { period: "Early Days", title: "The Silly Outings", caption: "photo-02.jpg" },
  {
    period: "Growing Together",
    title: "Stolen Smiles",
    caption: "photo-03.jpg",
  },
  {
    period: "The Quiet Moments",
    title: "Just Existing Together",
    caption: "photo-04.jpg",
  },
  {
    period: "Adventures",
    title: "Somewhere We Loved",
    caption: "photo-05.jpg",
  },
  {
    period: "The Hard Parts",
    title: "We Stayed Anyway",
    caption: "photo-06.jpg",
  },
  {
    period: "Little Things",
    title: "Shared Food & Laughter",
    caption: "photo-07.jpg",
  },
  { period: "One Year", title: "Everything It Held", caption: "photo-08.jpg" },
];
```

_Note: Place real photos in `public/assets/photos/`. Update captions with 1-line descriptions per photo from Akhil._

**Timeline entry animation:**

- Each entry: `opacity: 0, y: 60` → `opacity: 1, y: 0` on scroll entry (GSAP ScrollTrigger)
- Alternating: left entries slide in from left, right entries from right
- Timeline dot: scale 0 → 1 with spring ease, slight delay after card

---

### PAGE 5: THE LETTER (`/letter`)

**Purpose:** The most intimate moment. Akhil's words directly to Ann. Must feel like holding a real letter.

**Transition in:** Morph (blur dissolve).

**The letter unfold animation:**

1. Page loads — a folded paper rectangle appears center screen (CSS 3D)
2. A wax seal sits on top (SVG, blush pink circle with small `💙`)
3. As page enters:
   - Seal cracks and falls away (GSAP scale 0, rotate 20deg, opacity 0)
   - Three folds open sequentially (CSS `rotateX` from -180deg → 0deg, one after another)
   - Each fold reveals a section of the letter
   - After all three open: letter paragraphs typewrite themselves in line by line
4. Letter sits on a parchment-colored surface (`var(--bg-parchment)`)

**Letter content (exact text — use as-is):**

```
My dear Ansu, 💕

One year.

It sounds small when written, but we both know it wasn't small at all. It was loud and silent, gentle and messy, beautiful and bruising — sometimes all on the same day.

We began as strangers. I still remember the first time we met — how ordinary the moment looked to the world, and how quietly it rearranged mine. I didn't know then that your presence would become a habit, or that your name would start living in my thoughts without asking permission.

This year held happiness — the kind that sneaks up on you during silly outings, shared food, stolen smiles, and those moments where nothing special was happening, yet everything felt right. It also held sorrow. Problems we didn't see coming. Misunderstandings born from tired minds and loud emotions. Arguments where words hit harder than they should have. Nights where silence spoke more than apologies.

And yet we stayed.
We talked. We fought. We learned.

We stayed awake through endless nights, not always talking, sometimes just existing together. We loved in ways that weren't perfect but were real.

College is over now — only exams and a few labs remain among us, but deep down, it already feels like that chapter is closing. The corridors that watched us grow, the benches that carried our endless conversations, the quiet places that held our laughter — they've all become memories. It's scary how fast "now" turns into "then." 🫠

Maybe life will take us in different directions from here. And this time, I'm not holding onto "what ifs" — just accepting things for what they are.

Loving you was never a mistake. It was real, and I will always respect it — and you.

We would have found a way to choose each other every day, with patience, honesty, and kinder words. And maybe that's where we fell short. But that doesn't take away what we had.

So this is me — with no bitterness, just truth.

I hope you remember me as someone who loved you genuinely. Not perfectly, but deeply. And I hope life gives you everything you deserve — peace, happiness, growth, and a love that feels right.

Thank you for the happiness, for the lessons, for the fights that taught me, and for the love that taught me courage. Thank you for being part of my life when it mattered the most.

This wasn't how I planned to say it. Still, this needed to be said.

No matter where life takes us — it will always belong to us.

Thank you for showing concern even in distance 🌍 — that's really admiring.
Take care of yourself.

With honesty,
With love,
Always a little yours. 💙
```

**Signature rendered in Dancing Script, blush rose color, 1.8rem.**

**Letter design:**

- Paper: `var(--bg-parchment)`, three-panel fold (top panel, middle panel, bottom panel)
- Subtle paper texture: repeating CSS gradient or SVG noise
- Font: Cormorant Garamond, 400, 1.1rem, `#3a2030`, line-height 2.1
- Short lines (like "And yet we stayed.") rendered italic, slightly larger
- Decorative corner: small `💙` pressed into top-right of letter

---

### PAGE 6: VIDEO (`/video`)

**Purpose:** Akhil speaks directly. This is the most personal moment.

**Transition in:** Film cut (dramatic, slightly darker flash).

**Layout:** Full viewport dark-ish section (light lavender tinted dark overlay), centered.

**Header:**

- Eyebrow: `in his own words`
- Title: `A Message from Akhil Su`

**Main video player:**

- Custom HTML5 video element, NO default browser controls
- Custom controls: play/pause button (centered overlay), progress bar (bottom, lavender-filled), time display, mute toggle, fullscreen button
- Video container: max-width 840px, 16:9 aspect ratio, border-radius 20px, soft shadow
- Film grain GLSL overlay on the video (slight noise texture, 0.03 opacity, animated)
- Pre-play state: poster image (placeholder) with large centered play button
- Video file: `public/assets/videos/akhil-message.mp4` (placeholder slot)

**Below main video — two smaller video slots in a grid:**

- "A scene we loved 🦊" → `public/assets/videos/zootopia-clip.mp4` (placeholder)
- "Something for you 🎬" → `public/assets/videos/reel1.mp4` (placeholder)
- Same custom player design, smaller

**After video ends / or a "Continue" button appears after 3s:**

A button appears at bottom:

```
"I've heard everything — now it's time to choose."
[Continue →]
```

→ Navigate to choice page

_Note: The video page has NO left/right navigation arrows. Ann must engage with the content and make her choice naturally._

---

### PAGE 7: THE CHOICE (`/choice`)

**Purpose:** The most significant moment of the experience. Ann chooses her own path.

**Transition in:** Scale bloom from the continue button.

**Layout:** Full viewport, perfectly centered, minimal. Nothing distracts from the choice.

**Top text** (Cormorant Garamond italic, 1.3rem, `--text-muted`, centered, max-width 500px):

```
"It wasn't easy for either of us. Whatever you choose — know that it comes from an honest place."
```

**Two choice buttons** — side by side (or stacked on mobile), equal size, equal weight. Neither is "bigger" or more prominent. This is intentional — she must feel no pressure in either direction.

**RECONCILE button:**

- Border: 2px solid `var(--lav-500)`
- Text: `RECONCILE` (DM Sans, 500, letter-spacing 0.2em)
- Subtext below button: `"If trust can somehow find its way back..."` (italic, faint, 0.75rem)
- Hover: fills with lavender, text turns white, soft glow
- Color: lavender family

**CLOSURE button:**

- Border: 2px solid `var(--blush-500)`
- Text: `CLOSURE` (DM Sans, 500, letter-spacing 0.2em)
- Subtext: `"To leave with dignity, not wounds"` (italic, faint, 0.75rem)
- Hover: fills with blush rose, text turns white, soft glow
- Color: rose/blush family

**On click:**

- The chosen button scales up to fill the screen (Framer Motion `layoutId` expansion)
- The other button fades out
- After full-screen fill (0.5s): navigate to respective page with the fill color becoming the next page's background, then fading back to light

**Store the choice in Zustand** (`userChoice: 'reconcile' | 'closure'`).

---

### PAGE 8A: RECONCILE (`/reconcile`)

**Purpose:** Hope. Not naive. Real and thoughtful.

**Transition in:** Bloom from lavender fill.

**Layout:** Centered, single column, max-width 680px.

**Content:**

**Header:**

- Eyebrow: `if we choose to try again`
- Title: `A Hopeful Beginning`

**Body text** (render as 4 sequential paragraphs, each fading in staggered):

```
"If trust can somehow find its way back, then maybe there is still something worth holding onto — and I would meet that chance with everything I've learned."

That's not a promise of perfection. It's something more honest than that — a commitment to show up differently. To communicate before withdrawing. To choose patience before pride.

What we had was real. And what we could build — with more understanding, more honesty, more willingness to truly see each other — could be even more real.

This isn't a fairytale restart. It's a quiet agreement to try again, more carefully. With more awareness of each other's silences, and less fear of each other's truths.

— Ichu
```

**Visual detail:** Soft lavender petals slowly drifting down (CSS animation or Three.js particles). Not overdone — maybe 5-6 petals, very transparent.

**Continue button** → navigate to `/future`

---

### PAGE 8B: CLOSURE (`/closure`)

**Purpose:** Dignity. Gratitude. Not sadness — release.

**Transition in:** Bloom from blush fill.

**Layout:** Centered, single column, max-width 680px.

**Content:**

**Header:**

- Eyebrow: `if this is where we part`
- Title: `Thank You, Blue`

**Body text** (staggered paragraphs):

```
"You loved me with sincerity, with depth, and with a heart that was real. There was nothing foolish or wrong about the way you loved. You were not 'too much,' not 'too trusting' — and not someone who deserved to feel cheated or broken. What you gave was pure — and that will always hold value, no matter how things turned out."

"And I want you to hear this clearly — none of what happened is a reflection of your worth."

What we had was real. But sometimes, real isn't enough when two people carry different ways of understanding and different ways of handling pain. We tried. More than once. And that trying matters.

"I won't pretend that love alone can fix everything." If it can't be rebuilt, then the most honest thing is to let this chapter close with dignity — not resentment, not blame.

"And in all of this, I truly hope life becomes kinder to you. I hope you grow into an even stronger, happier version of yourself — not because of me, but because of who you already are."

I wish you success in everything you chase, joy in the smallest moments, and a kind of peace that stays. You deserve a life that feels full, light, and certain.

You deserve a love that feels safe, steady, and unquestioned.

Be well, Blue. 🔵

With honesty,
With love,
Always a little yours. 💙

— Ichu
```

**Visual detail:** Soft watercolor-style blush gradient bleeds in from corners. Dignified, not tearful.

**Continue button** → navigate to `/future`

---

### PAGE 9: FUTURE — "What Could've Been" (`/future`)

**Purpose:** Dreamy, bittersweet. Not sad. Hopeful. The shared imagination of a life that shimmered.

**Transition in:** Dissolve + blur from either reconcile or closure.

**Layout:** Full page, image-forward gallery, minimal text.

**Header:**

- Eyebrow: `a little corner of imagination`
- Title: `What Could've Been`
- Subtitle (italic, muted): `Some futures only live in the heart.`

**AI Image/Video Gallery:**
4 placeholder slots for AI-generated videos of Akhil and Ann depicting bright future moments.

- Each slot: 16:9 container, border-radius 20px, soft shadow
- Placeholder state: lavender gradient background + centered text "✦ coming soon ✦" in DM Sans faint
- When media is provided: autoplay, muted, loop — ambient and dreamlike
- File paths: `public/assets/ai-videos/future-1.mp4` through `future-4.mp4`
- Layout: 2x2 grid on desktop, stacked on mobile
- Staggered entry: each card blooms in with scale 0.95 → 1 + opacity 0 → 1, 0.15s stagger

**Below the gallery** (Cormorant Garamond italic, centered, faint):

```
"Even if this is the last chapter we share — what we had was worth every page."
```

**Continue button** → `/easter`

---

### PAGE 10: EASTER EGG (`/easter`)

**Purpose:** A warm surprise. Akhil's voice notes + something unexpected and personal.

**Transition in:** Soft fade.

**Entry trigger:** Page is accessible but the route appears only after the future page. No link to it exists anywhere — it's the "there's one more thing..." moment.

**Header:**

- Eyebrow: `a little extra`
- Title: `One More Thing`
- Subtitle: `He couldn't fit everything into words.`

**Audio notes section:**
4 audio player cards (one per audio note from Akhil).

- File paths: `public/assets/audio/note-1.mp3` through `note-4.mp3`
- Custom audio player per card: play/pause button + waveform-style progress bar (CSS animated bars)
- Card label: "Voice Note 01", "Voice Note 02", etc.
- Design: white glass card, lavender border, soft shadow

**Below audio — a small text reveal:**
A hidden message that appears when all 4 audios have been played (track with state):

```
"If you made it this far — he really did mean every word. 💙"
```

**Visual:** Soft confetti of tiny ✦ sparkles falls from top of screen when the hidden message appears (GSAP particle animation).

**Continue button** → `/creator`

---

### PAGE 11: CREATOR'S NOTE (`/creator`)

**Purpose:** Adwaith speaks directly to Ann. Genuine, personal, warm.

**Transition in:** Gentle cross-dissolve.

**Layout:** Centered, single column, max-width 640px. Intimate. Like a handwritten note.

**Header:**

- Eyebrow: `from the person who built this`
- Title: `A Note from Adwaith`

**Content** (render in Cormorant Garamond, slightly warmer style than the rest of the site):

```
Hey Ann 👋

I know — you probably didn't expect to find my name here.

But I built this, and I can't let it end without saying something directly to you.

I've been on the sidelines of this story for a while now. I've seen both sides — the love, the confusion, the hurt, and the quiet hoping. And somewhere in all of that, I found myself genuinely rooting for you. Not just for the relationship — for you, as a person.

You gave this everything you had. I watched that. I heard it in the conversations we had, in the way you always tried to understand even when understanding hurt. That's not something everyone can do. That takes real strength — the kind that doesn't announce itself.

I built this website because Akhil asked me to. But I put everything into it because I wanted you to feel — really feel — that what you shared mattered. That you were seen. That you are valued.

Whatever you chose on that page earlier — reconcile or closure — I hope it brought you something real. Not just an answer, but a little peace.

You're going to be okay, Ann. More than okay.

Take care of yourself. And know that somewhere out there, there's a friend who built a whole website just so you could feel what words alone couldn't carry.

With warmth, always —
Adwaith 🤍
```

**Design:**

- Slightly different visual register from rest of site — warmer, more personal
- Background: slightly more cream/warm white (`#fffcf7`)
- Text renders with a gentle typewriter animation, paragraph by paragraph
- Small developer signature at bottom: monospace font, faint, `// built with care — adwaith`

**Final element:**
After all text has appeared, a small floating `💙` appears with a heartbeat pulse animation.

Below it, final text (DM Sans, very faint, 0.65rem, centered):

```
This page will always be here. Whenever you need to come back to it.
```

**No continue button.** The experience ends here. Naturally.

---

## 8. CONTENT FILES & ASSET PATHS

```
public/
├── assets/
│   ├── photos/
│   │   ├── photo-01.jpg  through  photo-16.jpg   (memories timeline)
│   ├── videos/
│   │   ├── akhil-message.mp4                      (main video)
│   │   ├── zootopia-clip.mp4                      (scene they loved)
│   │   ├── reel1.mp4                              (short reel)
│   │   └── reel2.mp4                              (short reel)
│   ├── ai-videos/
│   │   ├── future-1.mp4  through  future-4.mp4   (AI generated)
│   ├── audio/
│   │   ├── note-1.mp3    through  note-4.mp3     (Akhil's voice notes)
│   └── textures/
│       └── noise.png                              (grain overlay)
```

All media slots should render a graceful placeholder when the file doesn't exist yet (lavender gradient + centered faint label).

---

## 9. AUDIO SYSTEM

Use Howler.js for all audio.

**Per-page background music** (to be assigned when Akhil provides songs):

```typescript
const AUDIO_MAP: Record<string, string | null> = {
  intro: null,
  apology: null,
  love: null,
  memories: null,
  letter: null,
  video: null, // video has its own audio — mute bg music here
  choice: null,
  reconcile: null,
  closure: null,
  future: null,
  easter: null,
  creator: null,
};
```

**Crossfade:** 2000ms fade between tracks on page change.
**Volume duck:** When video plays, background music fades to 0.
**Floating music player:** Bottom-left, always visible after loader. Expand on hover.

---

## 10. PERFORMANCE NOTES

- **Lazy load** every page component with `React.lazy()` + `Suspense`
- **Image optimization:** Use `loading="lazy"` and `decoding="async"` on all photos
- **Three.js:** Dispose geometries and materials on component unmount
- **GSAP context:** Always use `gsap.context()` and `ctx.revert()` in useEffect cleanup
- **Lenis:** Init once at root level, not per-page
- **`will-change: transform`** on animated elements, removed after animation completes
- **Preload** fonts with `<link rel="preload">` in index.html

---

## 11. FOLDER STRUCTURE

```
src/
├── pages/
│   ├── IntroPage.tsx
│   ├── ApologyPage.tsx
│   ├── LovePage.tsx
│   ├── MemoriesPage.tsx
│   ├── LetterPage.tsx
│   ├── VideoPage.tsx
│   ├── ChoicePage.tsx
│   ├── ReconcilePage.tsx
│   ├── ClosurePage.tsx
│   ├── FuturePage.tsx
│   ├── EasterPage.tsx
│   └── CreatorPage.tsx
├── components/
│   ├── three/
│   │   ├── BackgroundCanvas.tsx
│   │   ├── ParticleField.tsx
│   │   ├── Nebula.tsx
│   │   └── ShootingStars.tsx
│   ├── transitions/
│   │   ├── CurtainWipe.tsx
│   │   ├── FilmCutFlash.tsx
│   │   └── PageTransition.tsx
│   ├── layout/
│   │   └── PageLayout.tsx
│   └── ui/
│       ├── MusicPlayer.tsx
│       ├── ProgressIndicator.tsx
│       ├── VideoPlayer.tsx
│       ├── AudioCard.tsx
│       └── PhotoLightbox.tsx
├── shaders/
│   ├── particles.vert.glsl
│   ├── particles.frag.glsl
│   ├── nebula.vert.glsl
│   ├── nebula.frag.glsl
│   └── imageReveal.frag.glsl
├── hooks/
│   ├── useNavigation.ts
│   ├── useAudioManager.ts
│   └── useLenis.ts
├── store/
│   └── useAppStore.ts
├── config/
│   └── content.ts          ← ALL text content lives here
├── App.tsx
├── main.tsx
└── index.css
```

---

## 12. QUALITY BAR

This is the standard every component must meet:

- **Godly.website / 21st.dev level** visual quality — not a template, a crafted experience
- Every animation has a purpose — nothing moves without reason
- Every transition earns its complexity — nothing is decorative noise
- Typography must be impeccable — correct optical sizing, line-heights, letter-spacing at every scale
- No Lorem Ipsum anywhere — all placeholder text must be emotionally consistent with the project's tone
- Glass panels must actually look like glass — correct backdrop-filter, correct border opacity, correct shadow depth
- The WebGL background must feel alive — not a screensaver, an atmosphere
- Mobile must work — test at 375px width. Navigation arrows become bottom buttons on mobile. Grid layouts stack. Letter panel reduces padding.

---

## 13. BUILD & DEPLOY COMMANDS

```bash
# Install
npm install

# Dev
npm run dev

# Build
npm run build

# Deploy
npx vercel --prod
```

---

## 14. FINAL INSTRUCTION TO CLAUDE CODE

Build this start to finish. Do not ask for clarification — make the best decision for every ambiguity. When content is missing (photos, videos, audio), render a beautiful placeholder that maintains the emotional register of the page.

Start with:

1. Project scaffold + all dependencies
2. Design system (CSS tokens, fonts, base styles)
3. Global store + routing
4. WebGL background
5. Transition engine
6. Pages in order: Intro → Apology → Love → Memories → Letter → Video → Choice → Reconcile → Closure → Future → Easter → Creator

Commit to the aesthetic vision completely. This website is a once-in-a-lifetime gesture. Build it like one.
