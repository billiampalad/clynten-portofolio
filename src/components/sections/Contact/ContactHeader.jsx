import { memo } from 'react'
import { motion } from 'framer-motion'
import { CONTACT_METADATA } from './contactData'

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

function ContactHeader({ isLight }) {
  return (
    <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
      {/* Category Monospace Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-[0.2em] uppercase text-red-500 bg-red-500/10 border border-red-500/20 mb-4 select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        <span>{CONTACT_METADATA.badge}</span>
      </div>

      {/* Main Title */}
      <h2
        className={`font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 ${
          isLight ? 'text-slate-950' : 'text-white'
        }`}
      >
        {CONTACT_METADATA.title}
      </h2>

      {/* Narrative Description (matching reference image concept) */}
      <p
        className={`text-sm sm:text-base md:text-[15px] font-normal leading-relaxed max-w-2xl mx-auto ${
          isLight ? 'text-slate-600' : 'text-zinc-400'
        }`}
      >
        {CONTACT_METADATA.description}
      </p>
    </motion.div>
  )
}

export default memo(ContactHeader)
