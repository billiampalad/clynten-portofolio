import { motion } from 'framer-motion'
import { useTextScramble } from '@/hooks/useTextScramble'

const headlineContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.065,
      delayChildren: 0.28,
    },
  },
}

const wordVariants = {
  hidden: {
    y: '105%',
    opacity: 0,
    filter: 'blur(4px)',
  },
  visible: {
    y: '0%',
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function ScrollHeadline({ progress = 0 }) {
  // Reveal Progress 1 (COMPLEX): Starts 100% covered at scroll 0, uncovers smoothly on scroll (0.04 -> 0.38)
  const reveal1 = Math.min(1, Math.max(0, (progress - 0.04) / 0.34))

  // Reveal Progress 2 (POWERFUL): Starts 100% covered at scroll 0, uncovers smoothly on scroll (0.42 -> 0.78)
  const reveal2 = Math.min(1, Math.max(0, (progress - 0.42) / 0.34))

  // Dynamic Scramble Decrypt Animation for Subtext
  const scrambledSubtext = useTextScramble(
    'TRANSFORMING VISION INTO HIGH-PERFORMANCE WEB ARCHITECTURE',
    22
  )

  return (
    <div className="absolute bottom-9 left-6 sm:left-12 z-24 w-[calc(100%-48px)] sm:w-[calc(100%-96px)] max-w-7xl pointer-events-none select-none font-sans">
      {/* Main Bold Headline with Staggered Kinetic Word Reveal */}
      <motion.h1
        variants={headlineContainerVariants}
        initial="hidden"
        animate="visible"
        className="block text-[clamp(28px,3.8vw,64px)] font-black leading-[1.08] tracking-tighter text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]"
      >
        {/* Word: DECODING */}
        <span className="inline-block overflow-hidden align-baseline mr-[0.25em]">
          <motion.span variants={wordVariants} className="inline-block">
            DECODING
          </motion.span>
        </span>

        {/* Word: COMPLEX (with Shutter Laser Block - Shared True Baseline) */}
        <span className="inline-block overflow-hidden align-baseline mr-[0.25em]">
          <motion.span variants={wordVariants} className="relative inline-block px-1">
            <span className="relative z-10 text-white font-black">
              COMPLEX
            </span>
            {/* Sliding Cover Block */}
            <span
              className="absolute inset-0 bg-[#830000] z-20 pointer-events-none will-change-transform"
              style={{ transform: `translateX(${reveal1 * 100}%)` }}
            />
            {/* Laser Frontier Edge */}
            <span
              className="absolute top-0 bottom-0 w-[2.5px] bg-white rounded shadow-[0_0_8px_#ffffff,0_0_14px_#e11d48,0_0_24px_#881337] z-30 pointer-events-none transition-opacity duration-150"
              style={{
                left: `calc(${reveal1 * 100}% - 2px)`,
                opacity: reveal1 > 0.01 && reveal1 < 0.99 ? 1 : 0,
              }}
            />
          </motion.span>
        </span>

        {/* Word: SYSTEMS */}
        <span className="inline-block overflow-hidden align-baseline mr-[0.25em]">
          <motion.span variants={wordVariants} className="inline-block">
            SYSTEMS
          </motion.span>
        </span>

        {/* Guaranteed 100% Reliable Line Break for All Laptop/Desktop Screens */}
        <span className="block w-full h-0 pointer-events-none select-none" />

        {/* Word: INTO */}
        <span className="inline-block overflow-hidden align-baseline mr-[0.25em]">
          <motion.span variants={wordVariants} className="inline-block">
            INTO
          </motion.span>
        </span>

        {/* Word: POWERFUL (with Shutter Laser Block - Shared True Baseline) */}
        <span className="inline-block overflow-hidden align-baseline mr-[0.25em]">
          <motion.span variants={wordVariants} className="relative inline-block px-1">
            <span className="relative z-10 text-white font-black">
              POWERFUL
            </span>
            {/* Sliding Cover Block */}
            <span
              className="absolute inset-0 bg-[#830000] z-20 pointer-events-none will-change-transform"
              style={{ transform: `translateX(${reveal2 * 100}%)` }}
            />
            {/* Laser Frontier Edge */}
            <span
              className="absolute top-0 bottom-0 w-[2.5px] bg-white rounded shadow-[0_0_8px_#ffffff,0_0_14px_#e11d48,0_0_24px_#881337] z-30 pointer-events-none transition-opacity duration-150"
              style={{
                left: `calc(${reveal2 * 100}% - 2px)`,
                opacity: reveal2 > 0.01 && reveal2 < 0.99 ? 1 : 0,
              }}
            />
          </motion.span>
        </span>

        {/* Word: DIGITAL */}
        <span className="inline-block overflow-hidden align-baseline mr-[0.25em]">
          <motion.span variants={wordVariants} className="inline-block">
            DIGITAL
          </motion.span>
        </span>

        {/* Word: REALITIES. */}
        <span className="inline-block overflow-hidden align-baseline">
          <motion.span variants={wordVariants} className="inline-block">
            REALITIES.
          </motion.span>
        </span>
      </motion.h1>

      {/* 3. High-Tech Subtext with Laser Indicator Line & Text Decrypt */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-3 mt-3 font-mono text-[9px] sm:text-[11px] tracking-[1.5px] text-zinc-400"
      >
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.55, delay: 0.75, ease: 'easeOut' }}
          style={{ transformOrigin: 'left' }}
          className="w-8 sm:w-12 h-[1px] bg-emerald-400/60 shadow-[0_0_6px_#00ffaa]"
        />
        <span className="text-zinc-300 font-medium">
          {scrambledSubtext}
          <span className="animate-pulse text-emerald-400 font-bold ml-1">_</span>
        </span>
      </motion.div>
    </div>
  )
}
