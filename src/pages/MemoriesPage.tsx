import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { PageLayout } from '../components/layout/PageLayout'
import { PageTransition } from '../components/transitions/PageTransition'
import { PhotoLightbox } from '../components/ui/PhotoLightbox'
import { MEMORIES } from '../config/content'

gsap.registerPlugin(ScrollTrigger)

interface MemoryCardProps {
  period: string
  title: string
  description: string
  caption: string
  index: number
  isLeft: boolean
  onPhotoClick: (src: string, alt: string) => void
}

function MemoryCard({ period, title, description, caption, index, isLeft, onPhotoClick }: MemoryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const [imgError, setImgError] = useState(false)
  const imgSrc = `/assets/photos/${caption}`

  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = (e.clientX - rect.left) / rect.width - 0.5
    const cy = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: cy * 8, y: cx * -8 })
  }

  useEffect(() => {
    const setup = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, x: isLeft ? -60 : 60, y: 20 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
        if (dotRef.current) {
          gsap.fromTo(
            dotRef.current,
            { scale: 0 },
            {
              scale: 1,
              duration: 0.5,
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: cardRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
              delay: 0.2,
            }
          )
        }
        ScrollTrigger.refresh()
      })
      return () => ctx.revert()
    }, 450)
    return () => clearTimeout(setup)
  }, [isLeft])

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 40px 1fr',
        alignItems: 'start',
        gap: 0,
        marginBottom: '3rem',
      }}
    >
      {/* Left card slot */}
      <div style={{ padding: '0 2rem 0 0', display: 'flex', justifyContent: 'flex-end' }}>
        {isLeft && (
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            style={{
              maxWidth: '380px',
              width: '100%',
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(24px) saturate(150%)',
              WebkitBackdropFilter: 'blur(24px) saturate(150%)',
              border: '1px solid rgba(255,255,255,0.75)',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.95),' +
                '0 0 0 1px rgba(196,176,240,0.20),' +
                '0 8px 32px rgba(139,111,212,0.10),' +
                '0 2px 8px rgba(0,0,0,0.04)',
              transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: 'transform 0.15s ease',
              opacity: 0,
            }}
          >
            <CardInner
              period={period}
              title={title}
              description={description}
              imgSrc={imgSrc}
              imgError={imgError}
              setImgError={setImgError}
              onPhotoClick={onPhotoClick}
              index={index}
            />
          </div>
        )}
      </div>

      {/* Center dot */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '2rem' }}>
        <div
          ref={isLeft ? dotRef : undefined}
          style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: 'var(--lav-500)',
            boxShadow: '0 0 12px rgba(139,111,212,0.5)',
            zIndex: 2,
            flexShrink: 0,
          }}
        />
      </div>

      {/* Right card slot */}
      <div style={{ padding: '0 0 0 2rem' }}>
        {!isLeft && (
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            style={{
              maxWidth: '380px',
              width: '100%',
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(24px) saturate(150%)',
              WebkitBackdropFilter: 'blur(24px) saturate(150%)',
              border: '1px solid rgba(255,255,255,0.75)',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.95),' +
                '0 0 0 1px rgba(196,176,240,0.20),' +
                '0 8px 32px rgba(139,111,212,0.10),' +
                '0 2px 8px rgba(0,0,0,0.04)',
              transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: 'transform 0.15s ease',
              opacity: 0,
            }}
          >
            <CardInner
              period={period}
              title={title}
              description={description}
              imgSrc={imgSrc}
              imgError={imgError}
              setImgError={setImgError}
              onPhotoClick={onPhotoClick}
              index={index}
            />
          </div>
        )}
      </div>
    </div>
  )
}

function CardInner({
  period,
  title,
  description,
  imgSrc,
  imgError,
  setImgError,
  onPhotoClick,
  index,
}: {
  period: string
  title: string
  description: string
  imgSrc: string
  imgError: boolean
  setImgError: (v: boolean) => void
  onPhotoClick: (src: string, alt: string) => void
  index: number
}) {
  return (
    <>
      {/* Photo */}
      <div
        style={{
          aspectRatio: [5, 6, 8].includes(index) ? '4/3' : '3/4',
          background: 'linear-gradient(135deg, var(--lav-100), var(--blush-100))',
          cursor: imgError ? 'default' : 'pointer',
          position: 'relative',
          overflow: 'hidden',
        }}
        onClick={() => !imgError && onPhotoClick(imgSrc, title)}
      >
        {imgError ? (
          <div
            style={{
              position: 'absolute',
              inset: 0,
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
            src={imgSrc}
            alt={title}
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        )}
      </div>

      {/* Text */}
      <div style={{ padding: '1.25rem' }}>
        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--lav-400)',
            marginBottom: '0.4rem',
          }}
        >
          {period}
        </p>
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontStyle: 'italic',
            fontSize: '1.3rem',
            color: 'var(--text-primary)',
            marginBottom: description ? '0.6rem' : 0,
          }}
        >
          {title}
        </h3>
        {description && (
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.92rem',
              color: 'var(--text-muted)',
              lineHeight: 1.75,
              fontStyle: 'italic',
            }}
          >
            {description}
          </p>
        )}
      </div>
    </>
  )
}

export function MemoriesPage() {
  const { setCurrentPage } = useAppStore()
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  useEffect(() => {
    setCurrentPage('memories')
  }, [setCurrentPage])

  return (
    <PageLayout>
      <PageTransition variant="filmcut">
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '7rem 2rem 5rem',
            position: 'relative',
          }}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>what we built, moment by moment</p>
            <h1 className="section-heading">Our Story</h1>
            <div className="deco-rule" />
          </motion.div>

          {/* Timeline vertical line */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '14rem',
              bottom: '3rem',
              width: '1px',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(to bottom, transparent, var(--lav-300) 5%, var(--lav-300) 95%, transparent)',
              zIndex: 1,
            }}
          />

          {/* Memory cards */}
          {MEMORIES.map((memory, i) => (
            <MemoryCard
              key={i}
              period={memory.period}
              title={memory.title}
              description={memory.description}
              caption={memory.caption}
              index={i}
              isLeft={i % 2 === 0}
              onPhotoClick={(src, alt) => setLightbox({ src, alt })}
            />
          ))}
        </div>
      </PageTransition>

      {lightbox && (
        <PhotoLightbox
          src={lightbox.src}
          alt={lightbox.alt}
          isOpen={!!lightbox}
          onClose={() => setLightbox(null)}
        />
      )}
    </PageLayout>
  )
}
