import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { useAppStore } from '../store/useAppStore'
import { PageLayout } from '../components/layout/PageLayout'
import { PageTransition } from '../components/transitions/PageTransition'

const LETTER_PARAGRAPHS = [
  { text: 'My dear Ansu, 💕', style: 'salutation' },
  { text: 'One year.', style: 'emphasis' },
  {
    text: "It sounds small when written, but we both know it wasn't small at all. It was loud and silent, gentle and messy, beautiful and bruising — sometimes all on the same day.",
    style: 'body',
  },
  {
    text: "We began as strangers. I still remember the first time we met — how ordinary the moment looked to the world, and how quietly it rearranged mine. I didn't know then that your presence would become a habit, or that your name would start living in my thoughts without asking permission.",
    style: 'body',
  },
  {
    text: "This year held happiness — the kind that sneaks up on you during silly outings, shared food, stolen smiles, and those moments where nothing special was happening, yet everything felt right. It also held sorrow. Problems we didn't see coming. Misunderstandings born from tired minds and loud emotions. Arguments where words hit harder than they should have. Nights where silence spoke more than apologies.",
    style: 'body',
  },
  { text: 'And yet we stayed.\nWe talked. We fought. We learned.', style: 'emphasis' },
  {
    text: "We stayed awake through endless nights, not always talking, sometimes just existing together. We loved in ways that weren't perfect but were real.",
    style: 'body',
  },
  {
    text: "College is over now — only exams and a few labs remain among us, but deep down, it already feels like that chapter is closing. The corridors that watched us grow, the benches that carried our endless conversations, the quiet places that held our laughter — they've all become memories. It's scary how fast \"now\" turns into \"then.\" 🫠",
    style: 'body',
  },
  {
    text: "Maybe life will take us in different directions from here. And this time, I'm not holding onto \"what ifs\" — just accepting things for what they are.",
    style: 'body',
  },
  { text: 'Loving you was never a mistake. It was real, and I will always respect it — and you.', style: 'body' },
  {
    text: "We would have found a way to choose each other every day, with patience, honesty, and kinder words. And maybe that's where we fell short. But that doesn't take away what we had.",
    style: 'body',
  },
  { text: 'So this is me — with no bitterness, just truth.', style: 'emphasis' },
  {
    text: "I hope you remember me as someone who loved you genuinely. Not perfectly, but deeply. And I hope life gives you everything you deserve — peace, happiness, growth, and a love that feels right.",
    style: 'body',
  },
  {
    text: "Thank you for the happiness, for the lessons, for the fights that taught me, and for the love that taught me courage. Thank you for being part of my life when it mattered the most.",
    style: 'body',
  },
  { text: "This wasn't how I planned to say it. Still, this needed to be said.", style: 'body' },
  { text: 'No matter where life takes us — it will always belong to us.', style: 'emphasis' },
  {
    text: "Thank you for showing concern even in distance 🌍 — that's really admiring.\nTake care of yourself.",
    style: 'body',
  },
  { text: 'With honesty,\nWith love,\nAlways a little yours. 💙', style: 'signature' },
]

export function LetterPage() {
  const { setCurrentPage } = useAppStore()
  const [phase, setPhase] = useState<'sealed' | 'opening' | 'open'>('sealed')
  const [visibleParagraphs, setVisibleParagraphs] = useState(0)

  // refs for GSAP
  const sealRef   = useRef<HTMLDivElement>(null)
  const letterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCurrentPage('letter')
  }, [setCurrentPage])

  // Stage 1 — crack seal, reveal letter card
  useEffect(() => {
    const timeout = setTimeout(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline()

        // Seal cracks and falls away
        tl.to(sealRef.current, {
          scale: 0,
          rotate: 25,
          opacity: 0,
          duration: 0.45,
          ease: 'back.in(2)',
          onComplete: () => setPhase('opening'),
        })

        // Letter card rises and sharpens
        tl.fromTo(
          letterRef.current,
          { opacity: 0, y: 30, scale: 0.94, filter: 'blur(6px)' },
          { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' },
          '+=0.1'
        )

        tl.call(() => setPhase('open'))
      })
      return () => ctx.revert()
    }, 600)

    return () => clearTimeout(timeout)
  }, [])

  // Stage 2 — typewrite paragraphs once 'open'
  useEffect(() => {
    if (phase !== 'open') return
    let count = 0
    const interval = setInterval(() => {
      count++
      setVisibleParagraphs(count)
      if (count >= LETTER_PARAGRAPHS.length) clearInterval(interval)
    }, 420)
    return () => clearInterval(interval)
  }, [phase])

  return (
    <PageLayout>
      <PageTransition variant="dissolve">
        <div
          style={{
            maxWidth: '680px',
            margin: '0 auto',
            padding: '7rem 2rem 6rem',
          }}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>the letter</p>
            <h1 className="section-heading">Read Carefully</h1>
            <div className="deco-rule" />
          </motion.div>

          {/* Wax seal — above the card, centered */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '-26px', position: 'relative', zIndex: 2 }}>
            <AnimatePresence>
              {phase === 'sealed' && (
                <div
                  ref={sealRef}
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    background: 'var(--blush-500)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.4rem',
                    boxShadow: '0 4px 20px rgba(204,122,148,0.35)',
                  }}
                >
                  💙
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Letter card — natural flow, NOT absolutely positioned */}
          <div
            ref={letterRef}
            style={{
              background: 'rgba(253,246,249,0.96)',
              backdropFilter: 'blur(24px) saturate(140%)',
              WebkitBackdropFilter: 'blur(24px) saturate(140%)',
              borderRadius: '20px',
              padding: 'clamp(2rem, 5vw, 3.25rem) clamp(1.75rem, 5vw, 3rem)',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.98),' +
                '0 0 0 1px rgba(196,176,240,0.18),' +
                '0 8px 40px rgba(139,111,212,0.08),' +
                '0 32px 80px rgba(0,0,0,0.04)',
              position: 'relative',
              opacity: 0,  // GSAP fades it in
            }}
          >
            {/* Corner detail */}
            <span
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1.5rem',
                fontSize: '1rem',
                opacity: 0.4,
              }}
            >
              💙
            </span>

            {/* Letter content — typewriters in */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {LETTER_PARAGRAPHS.slice(0, visibleParagraphs).map((para, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {para.style === 'salutation' && (
                    <p
                      style={{
                        fontFamily: 'var(--font-script)',
                        fontSize: 'clamp(1.3rem, 3vw, 1.6rem)',
                        color: 'var(--blush-500)',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {para.text}
                    </p>
                  )}
                  {para.style === 'emphasis' && (
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontStyle: 'italic',
                        fontSize: 'clamp(1.05rem, 2vw, 1.2rem)',
                        color: 'var(--text-primary)',
                        lineHeight: 1.8,
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {para.text}
                    </p>
                  )}
                  {para.style === 'body' && (
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
                        color: 'var(--text-body)',
                        lineHeight: 2.0,
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {para.text}
                    </p>
                  )}
                  {para.style === 'signature' && (
                    <p
                      style={{
                        fontFamily: 'var(--font-script)',
                        fontSize: 'clamp(1.3rem, 3vw, 1.7rem)',
                        color: 'var(--blush-500)',
                        lineHeight: 1.7,
                        whiteSpace: 'pre-line',
                        marginTop: '1.25rem',
                      }}
                    >
                      {para.text}
                    </p>
                  )}
                </motion.div>
              ))}

              {/* Blinking cursor while typewriting */}
              {phase === 'open' && visibleParagraphs < LETTER_PARAGRAPHS.length && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  style={{
                    display: 'inline-block',
                    width: '2px',
                    height: '1.1em',
                    background: 'var(--blush-400)',
                    verticalAlign: 'middle',
                    borderRadius: '1px',
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </PageTransition>
    </PageLayout>
  )
}
