import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { PageLayout } from '../components/layout/PageLayout'
import { PageTransition } from '../components/transitions/PageTransition'
import { MOY_PHOTOS, MOY_FINAL_IMAGE } from '../config/content'

gsap.registerPlugin(ScrollTrigger)

// Predefined rotations — alternating left / right, varying amounts
const ROTATIONS = [-2.1, 3.0, -1.6, 2.7, 1.9, -2.5, 2.2, -1.4]

// ─── Letter content ───────────────────────────────────────────────────────────
const LETTER_PARAS: Array<{ type: 'body' | 'accent' | 'large'; text: string }> = [
  { type: 'body',   text: "If you're here by now — this is the part that feels the most like me." },
  { type: 'body',   text: "I kept all of this." },
  { type: 'body',   text: "Not because I didn't understand how things changed — but rather I couldn't bring myself to erase something that once meant everything to me. Even if you ever felt like these should fade away, I just couldn't see them like that." },
  { type: 'accent', text: "Because when I look at them, I don't just see memories." },
  { type: 'large',  text: "I see you." },
  { type: 'body',   text: "In the way you smiled in those pictures, in the way your words felt when I first read them, in the little things you gave me without even realizing how much they would mean later — all of it still feels warm to me. Still feels close." },
  { type: 'body',   text: "These were never things I wanted to hide away or forget. They became the parts I quietly go back to — the places that hold onto something I can't really explain. Something I missed badly for quite a long time." },
  { type: 'body',   text: "I didn't keep them for anyone else." },
  { type: 'body',   text: "I kept them because my heart didn't know how to let something this real just disappear into thin air. What I felt for you, dear — it wasn't small. It wasn't something I could switch off just because time moved forward." },
  { type: 'body',   text: "You became someone I loved in the simplest, purest way I knew — not perfect, not always easy, but real and rooted and full of meaning." },
  { type: 'body',   text: "And even now, in my own quiet world, you're still there — as someone I'm holding onto tightly, with that 1% hope left — but as someone who belongs to a part of me that I don't want to lose. A place where everything about you still feels gentle. Still feels good. Still feels like something worth keeping." },
  { type: 'accent', text: "Maybe that's what love does sometimes — it doesn't always stay the same, but it doesn't disappear either. It just finds a softer place to live within your heart. 💜" },
  { type: 'large',  text: "And in mine, you do." },
]

// ─── Polaroid component ───────────────────────────────────────────────────────
function PolaroidCard({ src, caption, index }: { src: string; caption: string; index: number }) {
  const rotation = ROTATIONS[index % ROTATIONS.length]
  const [imgError, setImgError] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const setup = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 50, rotate: rotation + (index % 2 === 0 ? -7 : 7) },
          {
            opacity: 1,
            y: 0,
            rotate: rotation,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
      return () => ctx.revert()
    }, 300)
    return () => clearTimeout(setup)
  }, [rotation, index])

  return (
    <div
      ref={cardRef}
      style={{
        background: '#ffffff',
        padding: '10px 10px 52px',
        boxShadow:
          '0 10px 36px rgba(0,0,0,0.10),' +
          '0 3px 10px rgba(0,0,0,0.06),' +
          'inset 0 1px 0 rgba(255,255,255,0.8)',
        opacity: 0,
        position: 'relative',
        zIndex: 1,
        cursor: 'default',
        marginTop: index % 2 === 1 ? '2.2rem' : 0,
      }}
      onMouseEnter={(e) => {
        gsap.to(e.currentTarget, {
          rotate: 0,
          scale: 1.05,
          y: -12,
          duration: 0.35,
          ease: 'power2.out',
        })
        e.currentTarget.style.boxShadow =
          '0 28px 70px rgba(0,0,0,0.16), 0 8px 24px rgba(0,0,0,0.08)'
        e.currentTarget.style.zIndex = '10'
      }}
      onMouseLeave={(e) => {
        gsap.to(e.currentTarget, {
          rotate: rotation,
          scale: 1,
          y: 0,
          duration: 0.45,
          ease: 'power2.inOut',
        })
        e.currentTarget.style.boxShadow =
          '0 10px 36px rgba(0,0,0,0.10), 0 3px 10px rgba(0,0,0,0.06)'
        e.currentTarget.style.zIndex = '1'
      }}
    >
      {/* Photo area */}
      <div
        style={{
          aspectRatio: '3/4',
          background: 'linear-gradient(135deg, var(--lav-100), var(--blush-100))',
          overflow: 'hidden',
        }}
      >
        {imgError ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
            }}
          >
            <span style={{ fontSize: '1.8rem', opacity: 0.3 }}>🖼</span>
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--text-faint)',
              }}
            >
              photo coming soon
            </span>
          </div>
        ) : (
          <img
            src={`/assets/photos/${src}`}
            alt={caption || 'a memory'}
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        )}
      </div>

      {/* Caption — inside the polaroid white strip */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '52px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 10px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-script)',
            fontSize: caption ? '0.95rem' : '0',
            color: '#4a3060',
            margin: 0,
            textAlign: 'center',
            lineHeight: 1.3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '100%',
          }}
        >
          {caption}
        </p>
      </div>
    </div>
  )
}

// ─── Final standalone image ───────────────────────────────────────────────────
function FinalImage({ src, caption }: { src: string; caption: string }) {
  const [imgError, setImgError] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const glowRef = useRef<HTMLDivElement>(null)

  // After reveal: gentle pulse on the glow ring
  useEffect(() => {
    if (!revealed || !glowRef.current) return
    const tl = gsap.timeline({ repeat: -1, yoyo: true })
    tl.to(glowRef.current, { opacity: 0.7, scale: 1.06, duration: 2.2, ease: 'power1.inOut' })
    return () => { tl.kill() }
  }, [revealed])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.12, filter: 'blur(22px)' }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      onAnimationComplete={() => setRevealed(true)}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '5rem',
        marginTop: '1rem',
      }}
    >
      {/* Ambient glow ring behind the image */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '110%',
          aspectRatio: '1/1',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at center, rgba(196,176,240,0.45) 0%, rgba(228,181,192,0.22) 45%, transparent 72%)',
          filter: 'blur(28px)',
          opacity: 0.45,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Image frame — gradient border via box-shadow trick */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          borderRadius: '22px',
          padding: '3px',
          background: 'linear-gradient(135deg, rgba(196,176,240,0.7), rgba(228,181,192,0.5), rgba(196,176,240,0.6))',
          boxShadow:
            '0 24px 70px rgba(139,111,212,0.22),' +
            '0 6px 24px rgba(0,0,0,0.07)',
          maxWidth: '420px',
          width: '100%',
        }}
      >
        <div
          style={{
            borderRadius: '20px',
            overflow: 'hidden',
            aspectRatio: '3/4',
            background: 'linear-gradient(135deg, var(--lav-100), var(--blush-100))',
          }}
        >
          {imgError ? (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}
            >
              <span style={{ fontSize: '2rem', opacity: 0.25 }}>🖼</span>
              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--text-faint)',
                }}
              >
                photo coming soon
              </span>
            </div>
          ) : (
            <img
              src={`/assets/photos/${src}`}
              alt="a memory"
              loading="lazy"
              decoding="async"
              onError={() => setImgError(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          )}
        </div>
      </div>

      {/* Caption — fades in after the image is fully revealed */}
      {revealed && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-script)',
            fontSize: '1.2rem',
            color: 'var(--blush-500)',
            marginTop: '1.5rem',
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          {caption}
        </motion.p>
      )}
    </motion.div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export function MemoriesOfYouPage() {
  const { setCurrentPage } = useAppStore()

  useEffect(() => {
    setCurrentPage('memories-of-you')
  }, [setCurrentPage])

  return (
    <PageLayout>
      <PageTransition variant="fade">
        <div
          style={{
            maxWidth: '720px',
            margin: '0 auto',
            padding: '7rem 2rem 7rem',
          }}
        >

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>for you, always</p>
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontStyle: 'italic',
                fontSize: 'clamp(2.4rem, 6vw, 4rem)',
                color: 'var(--text-primary)',
                marginBottom: '0.25rem',
              }}
            >
              Memories of You 🤍
            </h1>
            <div className="deco-rule" />
          </motion.div>

          {/* ── Letter ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              background: 'rgba(255, 252, 246, 0.92)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(196,176,240,0.20)',
              borderLeft: '3px solid var(--blush-300)',
              borderRadius: '20px',
              padding: 'clamp(1.5rem, 4vw, 2.5rem)',
              marginBottom: '5rem',
              boxShadow:
                '0 8px 40px rgba(139,111,212,0.07),' +
                '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            {/* Letter title */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{
                fontFamily: 'var(--font-script)',
                fontSize: '1.6rem',
                color: 'var(--blush-500)',
                marginBottom: '1.75rem',
                lineHeight: 1.3,
              }}
            >
              Memories of you 🖼️
            </motion.p>

            {/* Body paragraphs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {LETTER_PARAS.map((para, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i < 3 ? i * 0.08 : 0 }}
                >
                  {para.type === 'body' && (
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
                        lineHeight: 2,
                        color: 'var(--text-body)',
                        margin: 0,
                      }}
                    >
                      {para.text}
                    </p>
                  )}
                  {para.type === 'accent' && (
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontStyle: 'italic',
                        fontSize: 'clamp(1rem, 1.9vw, 1.15rem)',
                        lineHeight: 1.9,
                        color: 'var(--lav-700)',
                        margin: 0,
                        paddingLeft: '1rem',
                        borderLeft: '2px solid var(--lav-300)',
                      }}
                    >
                      {para.text}
                    </p>
                  )}
                  {para.type === 'large' && (
                    <p
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontStyle: 'italic',
                        fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
                        color: 'var(--text-primary)',
                        margin: '0.5rem 0',
                        textAlign: 'center',
                      }}
                    >
                      {para.text}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontStyle: 'italic',
                  fontSize: '1rem',
                  color: 'var(--text-muted)',
                  margin: 0,
                }}
              >
                As always, your well wisher,
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-script)',
                  fontSize: '2rem',
                  color: 'var(--blush-500)',
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                Ichu 🍀
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontStyle: 'italic',
                  fontSize: '0.9rem',
                  color: 'var(--text-muted)',
                  margin: 0,
                  lineHeight: 1.8,
                }}
              >
                Aka yours — Akhilsu; donkey; chekkan; mandan; pottan; kozhi and many more 🥹...
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  color: 'var(--text-muted)',
                  margin: '0.75rem 0 0',
                  lineHeight: 1.9,
                }}
              >
                Until next time!!! Not sure when, but I still believe in the magic ✨ of the universe bringing two people closer when their hearts are connected, no matter how far it is...
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontStyle: 'italic',
                  fontSize: '0.95rem',
                  color: 'var(--text-muted)',
                  margin: 0,
                }}
              >
                Finallyyyy.....
              </p>

              {/* B.Y.E */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ marginTop: '0.5rem' }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontStyle: 'italic',
                    fontSize: '1.5rem',
                    color: 'var(--lav-500)',
                    margin: 0,
                    letterSpacing: '0.12em',
                  }}
                >
                  B.Y.E
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    color: 'var(--text-faint)',
                    margin: '0.2rem 0 0',
                    letterSpacing: '0.06em',
                  }}
                >
                  ( Be. Yourself. Everytime ) 💎
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── Photo gallery heading ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>a little collection</p>
            <div className="deco-rule" />
          </motion.div>

          {/* ── Polaroid grid ── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1.5rem 2rem',
              marginBottom: '5rem',
            }}
          >
            {MOY_PHOTOS.map((photo, i) => (
              <PolaroidCard
                key={i}
                src={photo.src}
                caption={photo.caption}
                index={i}
              />
            ))}
          </div>

          {/* ── Final standalone image ── */}
          <FinalImage src={MOY_FINAL_IMAGE.src} caption={MOY_FINAL_IMAGE.caption} />

          {/* ── Closing quote ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: 'center', paddingBottom: '2rem' }}
          >
            <div className="deco-rule" style={{ marginBottom: '2rem' }} />
            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontStyle: 'italic',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                color: 'var(--text-muted)',
                lineHeight: 1.75,
                maxWidth: '540px',
                margin: '0 auto 1.5rem',
              }}
            >
              "Some things don't end. They just become the warmest room in your heart — the one you return to on the days the world feels too loud."
            </p>
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{ fontSize: '1.4rem' }}
            >
              💜
            </motion.span>
          </motion.div>

        </div>
      </PageTransition>
    </PageLayout>
  )
}
