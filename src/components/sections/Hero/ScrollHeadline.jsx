import { useState } from 'react'
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

// Interactive 3D Fold Word Component (Rotates on cursor hover along X axis in 3D perspective)
function FoldWord({
  children,
  colorClass = 'text-cyan-400',
  glowColor = '#06b6d4',
  shutter = null,
  mr = 'mr-[0.25em]',
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <span
      className={`inline-block overflow-hidden align-baseline ${mr} [perspective:1000px] pointer-events-auto cursor-pointer select-none`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.span
        variants={wordVariants}
        className="relative inline-block px-1 [transform-style:preserve-3d]"
      >
        {/* Front Face: Pure White, Folds Upwards into 3D on Hover */}
        <motion.span
          animate={
            isHovered
              ? { y: '-100%', rotateX: -90, opacity: 0 }
              : { y: '0%', rotateX: 0, opacity: 1 }
          }
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block text-white font-black [transform-origin:50%_100%] [backface-visibility:hidden]"
        >
          {children}
        </motion.span>

        {/* 3D Folded Face: Cyber Color with Glow, Rolls into view from Bottom on Hover */}
        <motion.span
          initial={{ y: '100%', rotateX: 90, opacity: 0 }}
          animate={
            isHovered
              ? { y: '0%', rotateX: 0, opacity: 1 }
              : { y: '100%', rotateX: 90, opacity: 0 }
          }
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          style={{
            filter: `drop-shadow(0 0 12px ${glowColor})`,
          }}
          className={`absolute inset-0 inline-block font-black [transform-origin:50%_0%] [backface-visibility:hidden] ${colorClass}`}
        >
          {children}
        </motion.span>

        {/* Shutter Laser Block (Active during scroll) */}
        {shutter}
      </motion.span>
    </span>
  )
}

export default function ScrollHeadline({ progress = 0 }) {
  // Reveal Progress 1 (LEARNING): Uncovers smoothly on scroll (0.04 -> 0.28)
  const reveal1 = Math.min(1, Math.max(0, (progress - 0.04) / 0.24))

  // Reveal Progress 2 (BUILDING): Uncovers smoothly on scroll (0.30 -> 0.54)
  const reveal2 = Math.min(1, Math.max(0, (progress - 0.30) / 0.24))

  // Reveal Progress 3 (GROWING): Uncovers smoothly on scroll (0.56 -> 0.80)
  const reveal3 = Math.min(1, Math.max(0, (progress - 0.56) / 0.24))

  // Dynamic Scramble Decrypt Animation for Subtext
  const scrambledSubtext = useTextScramble(
    'TRANSFORMING VISION INTO HIGH-PERFORMANCE WEB ARCHITECTURE',
    22
  )

  return (
    <div className="absolute bottom-9 left-6 sm:left-12 z-24 w-[calc(100%-48px)] sm:w-[calc(100%-96px)] max-w-7xl pointer-events-none select-none font-sans">
      {/* Main Bold Headline with Staggered Kinetic Word Reveal and 3D Fold Cursor Interactions */}
      <motion.h1
        variants={headlineContainerVariants}
        initial="hidden"
        animate="visible"
        className="block text-[clamp(28px,3.8vw,64px)] font-black leading-[1.08] tracking-tighter text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]"
      >
        {/* Word: CONTINUOUSLY (3D Fold: Cyan / Blue) */}
        <FoldWord colorClass="text-cyan-400" glowColor="#06b6d4">
          CONTINUOUSLY
        </FoldWord>

        {/* Word: LEARNING, (3D Fold: Rose / Red with Shutter Laser Block) */}
        <FoldWord
          colorClass="text-rose-400"
          glowColor="#f43f5e"
          shutter={
            <>
              {/* Sliding Cover Block */}
              <span
                className="absolute inset-0 bg-[#830000] z-20 pointer-events-none will-change-transform"
                style={{
                  transform: `translateX(${reveal1 * 100}%)`,
                  opacity: reveal1 >= 1 ? 0 : 1,
                }}
              />
              {/* Laser Frontier Edge */}
              <span
                className="absolute top-0 bottom-0 w-[2.5px] bg-white rounded shadow-[0_0_8px_#ffffff,0_0_14px_#e11d48,0_0_24px_#881337] z-30 pointer-events-none transition-opacity duration-150"
                style={{
                  left: `calc(${reveal1 * 100}% - 2px)`,
                  opacity: reveal1 > 0.01 && reveal1 < 0.99 ? 1 : 0,
                }}
              />
            </>
          }
        >
          LEARNING,
        </FoldWord>

        {/* Word: BUILDING, (3D Fold: Cyan / Blue with Shutter Laser Block) */}
        <FoldWord
          colorClass="text-cyan-400"
          glowColor="#06b6d4"
          shutter={
            <>
              {/* Sliding Cover Block */}
              <span
                className="absolute inset-0 bg-[#830000] z-20 pointer-events-none will-change-transform"
                style={{
                  transform: `translateX(${reveal2 * 100}%)`,
                  opacity: reveal2 >= 1 ? 0 : 1,
                }}
              />
              {/* Laser Frontier Edge */}
              <span
                className="absolute top-0 bottom-0 w-[2.5px] bg-white rounded shadow-[0_0_8px_#ffffff,0_0_14px_#e11d48,0_0_24px_#881337] z-30 pointer-events-none transition-opacity duration-150"
                style={{
                  left: `calc(${reveal2 * 100}% - 2px)`,
                  opacity: reveal2 > 0.01 && reveal2 < 0.99 ? 1 : 0,
                }}
              />
            </>
          }
        >
          BUILDING,
        </FoldWord>

        {/* Guaranteed 100% Reliable Line Break for All Laptop/Desktop Screens */}
        <span className="block w-full h-0 pointer-events-none select-none" />

        {/* Word: AND (3D Fold: Rose / Red) */}
        <FoldWord colorClass="text-rose-400" glowColor="#f43f5e">
          AND
        </FoldWord>

        {/* Word: GROWING (3D Fold: Emerald / Green with Shutter Laser Block) */}
        <FoldWord
          colorClass="text-emerald-400"
          glowColor="#10b981"
          shutter={
            <>
              {/* Sliding Cover Block */}
              <span
                className="absolute inset-0 bg-[#830000] z-20 pointer-events-none will-change-transform"
                style={{
                  transform: `translateX(${reveal3 * 100}%)`,
                  opacity: reveal3 >= 1 ? 0 : 1,
                }}
              />
              {/* Laser Frontier Edge */}
              <span
                className="absolute top-0 bottom-0 w-[2.5px] bg-white rounded shadow-[0_0_8px_#ffffff,0_0_14px_#e11d48,0_0_24px_#881337] z-30 pointer-events-none transition-opacity duration-150"
                style={{
                  left: `calc(${reveal3 * 100}% - 2px)`,
                  opacity: reveal3 > 0.01 && reveal3 < 0.99 ? 1 : 0,
                }}
              />
            </>
          }
        >
          GROWING
        </FoldWord>

        {/* Word: THROUGH (3D Fold: Cyan / Blue) */}
        <FoldWord colorClass="text-cyan-400" glowColor="#06b6d4">
          THROUGH
        </FoldWord>

        {/* Word: TECHNOLOGY (3D Fold: Emerald / Green) */}
        <FoldWord colorClass="text-emerald-400" glowColor="#10b981" mr="">
          TECHNOLOGY
        </FoldWord>
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
