import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
  variant?: 'dissolve' | 'filmcut' | 'fade'
}

const variants = {
  dissolve: {
    initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit:    { opacity: 0, y: -16, filter: 'blur(6px)' },
  },
  filmcut: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit:    { opacity: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit:    { opacity: 0 },
  },
}

export function PageTransition({ children, variant = 'dissolve' }: PageTransitionProps) {
  const v = variants[variant]
  return (
    <motion.div
      initial={v.initial}
      animate={v.animate}
      exit={v.exit}
      transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ width: '100%', minHeight: '100vh' }}
    >
      {children}
    </motion.div>
  )
}
