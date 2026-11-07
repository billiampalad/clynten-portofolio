import { useState, useEffect, useRef, useImperativeHandle, forwardRef, memo } from 'react'
import { motion } from 'framer-motion'
import { useTextScramble } from '@/hooks/useTextScramble'

// Container staggered reveal on mount
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

// 100% GPU-composited word reveal without CPU software blur rasterization
const wordVariants = {
  hidden: {
    y: '105%',
    opacity: 0,
  },
  visible: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

// GPU-Accelerated Shutter Cover Block with Laser Frontier Edge
const ShutterBlock = memo(function ShutterBlock({ blockRef, laserRef }) {
  return (
    <div
      ref={blockRef}
      className="absolute inset-0 pointer-events-none z-20 overflow-visible will-change-transform"
      style={{
        transform: 'translate3d(0%, 0, 0)',
        opacity: 1,
      }}
    >
      {/* Sliding Maroon Cover Block */}
      <span className="absolute inset-0 bg-[#830000]" />

      {/* Laser Frontier Edge (Affixed directly to the leading edge of the sliding block via GPU) */}
      <span
        ref={laserRef}
        className="absolute top-0 bottom-0 left-0 w-[2.5px] -translate-x-full bg-white rounded shadow-[0_0_8px_#ffffff,0_0_14px_#e11d48,0_0_24px_#881337] pointer-events-none opacity-0 transition-opacity duration-150"
      />
    </div>
  )
})

// Interactive 3D Fold Word Component (Active only when scroll reaches 80% / blocks finished)
const FoldWord = memo(function FoldWord({
  children,
  colorClass = 'text-cyan-400',
  glowColor = '#06b6d4',
  shutter = null,
  mr = 'mr-[0.25em]',
  isUnlocked = false,
}) {
  const [isHovered, setIsHovered] = useState(false)
  const shouldFold = isUnlocked && isHovered

  return (
    <span
      className={`inline-block overflow-hidden align-baseline ${mr} [perspective:1000px] select-none ${
        isUnlocked
          ? 'pointer-events-auto cursor-pointer'
          : 'pointer-events-none cursor-default'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.span
        variants={wordVariants}
        className="relative inline-block px-1 [transform-style:preserve-3d] will-change-transform"
      >
        {/* Front Face: Pure White, Folds Upwards into 3D on Hover (when unlocked) */}
        <motion.span
          animate={
            shouldFold
              ? { y: '-100%', rotateX: -90, opacity: 0 }
              : { y: '0%', rotateX: 0, opacity: 1 }
          }
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block text-white font-black [transform-origin:50%_100%] [backface-visibility:hidden]"
        >
          {children}
        </motion.span>

        {/* 3D Folded Face: Cyber Color with Glow, Rolls into view from Bottom on Hover (when unlocked) */}
        <motion.span
          initial={{ y: '100%', rotateX: 90, opacity: 0 }}
          animate={
            shouldFold
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
})

// Isolated Subtext Component: Decoupled to eliminate 40Hz re-render storm from TextScramble loop
const SubtextBanner = memo(function SubtextBanner() {
  const scrambledSubtext = useTextScramble(
    'TRANSFORMING VISION INTO HIGH-PERFORMANCE WEB ARCHITECTURE',
    22
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-3 mt-3 [@media(min-width:1440px)]:mt-4 font-mono text-[9px] sm:text-[11px] [@media(min-width:1440px)]:text-[12px] tracking-[1.5px] [@media(min-width:1440px)]:tracking-[2px] text-zinc-400"
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
  )
})

const ScrollHeadline = memo(
  forwardRef(function ScrollHeadline({ progress = 0 }, ref) {
    // Direct DOM Refs for 60fps-120fps GPU Shutter Interpolation
    const shutterBlock1Ref = useRef(null)
    const shutterLaser1Ref = useRef(null)
    const shutterBlock2Ref = useRef(null)
    const shutterLaser2Ref = useRef(null)
    const shutterBlock3Ref = useRef(null)
    const shutterLaser3Ref = useRef(null)

    const [isUnlocked, setIsUnlocked] = useState(false)
    const isUnlockedRef = useRef(false)

    // Direct synchronous frame-accurate update method called directly by GSAP onUpdate
    const applyProgress = (prog) => {
      // Reveal Progress 1 (LEARNING): 0.04 -> 0.28
      const r1 = Math.min(1, Math.max(0, (prog - 0.04) / 0.24))
      if (shutterBlock1Ref.current) {
        shutterBlock1Ref.current.style.transform = `translate3d(${r1 * 100}%, 0, 0)`
        shutterBlock1Ref.current.style.opacity = r1 >= 1 ? '0' : '1'
      }
      if (shutterLaser1Ref.current) {
        shutterLaser1Ref.current.style.opacity = r1 > 0.01 && r1 < 1 ? '1' : '0'
      }

      // Reveal Progress 2 (BUILDING): 0.30 -> 0.54
      const r2 = Math.min(1, Math.max(0, (prog - 0.30) / 0.24))
      if (shutterBlock2Ref.current) {
        shutterBlock2Ref.current.style.transform = `translate3d(${r2 * 100}%, 0, 0)`
        shutterBlock2Ref.current.style.opacity = r2 >= 1 ? '0' : '1'
      }
      if (shutterLaser2Ref.current) {
        shutterLaser2Ref.current.style.opacity = r2 > 0.01 && r2 < 1 ? '1' : '0'
      }

      // Reveal Progress 3 (GROWING): 0.56 -> 0.80
      const r3 = Math.min(1, Math.max(0, (prog - 0.56) / 0.24))
      if (shutterBlock3Ref.current) {
        shutterBlock3Ref.current.style.transform = `translate3d(${r3 * 100}%, 0, 0)`
        shutterBlock3Ref.current.style.opacity = r3 >= 1 ? '0' : '1'
      }
      if (shutterLaser3Ref.current) {
        shutterLaser3Ref.current.style.opacity = r3 > 0.01 && r3 < 1 ? '1' : '0'
      }

      // Toggle unlock threshold only once when crossing 0.80 boundary
      const unlocked = prog >= 0.8 || r3 >= 1
      if (unlocked !== isUnlockedRef.current) {
        isUnlockedRef.current = unlocked
        setIsUnlocked(unlocked)
      }
    }

    useImperativeHandle(ref, () => ({
      update: (prog) => {
        applyProgress(prog)
      },
    }))

    // Initialize initial state on mount
    useEffect(() => {
      applyProgress(progress)
    }, [])

    return (
      <div className="absolute bottom-9 [@media(min-width:1440px)]:bottom-12 left-6 sm:left-12 [@media(min-width:1440px)]:left-16 z-24 w-[calc(100%-48px)] sm:w-[calc(100%-96px)] max-w-7xl [@media(min-width:1440px)]:max-w-[1440px] pointer-events-none select-none font-sans [contain:layout_style]">
        {/* Main Bold Headline with Staggered Kinetic Word Reveal and 3D Fold Cursor Interactions */}
        <motion.h1
          variants={headlineContainerVariants}
          initial="hidden"
          animate="visible"
          className="block text-[clamp(28px,3.8vw,64px)] [@media(min-width:1440px)]:text-[clamp(56px,4vw,74px)] font-black leading-[1.08] [@media(min-width:1440px)]:leading-[1.04] tracking-tighter text-white [text-shadow:0_4px_24px_rgba(0,0,0,0.95)]"
        >
          {/* Word: CONTINUOUSLY (3D Fold: Cyan / Blue) */}
          <FoldWord
            isUnlocked={isUnlocked}
            colorClass="text-cyan-400"
            glowColor="#06b6d4"
          >
            CONTINUOUSLY
          </FoldWord>

          {/* Word: LEARNING, (3D Fold: Rose / Red with Shutter Laser Block) */}
          <FoldWord
            isUnlocked={isUnlocked}
            colorClass="text-rose-400"
            glowColor="#f43f5e"
            shutter={
              <ShutterBlock
                blockRef={shutterBlock1Ref}
                laserRef={shutterLaser1Ref}
              />
            }
          >
            LEARNING,
          </FoldWord>

          {/* Word: BUILDING, (3D Fold: Cyan / Blue with Shutter Laser Block) */}
          <FoldWord
            isUnlocked={isUnlocked}
            colorClass="text-cyan-400"
            glowColor="#06b6d4"
            shutter={
              <ShutterBlock
                blockRef={shutterBlock2Ref}
                laserRef={shutterLaser2Ref}
              />
            }
          >
            BUILDING,
          </FoldWord>

          {/* Guaranteed 100% Reliable Line Break for All Laptop/Desktop Screens */}
          <span className="block w-full h-0 pointer-events-none select-none" />

          {/* Word: AND (3D Fold: Rose / Red) */}
          <FoldWord
            isUnlocked={isUnlocked}
            colorClass="text-rose-400"
            glowColor="#f43f5e"
          >
            AND
          </FoldWord>

          {/* Word: GROWING (3D Fold: Emerald / Green with Shutter Laser Block) */}
          <FoldWord
            isUnlocked={isUnlocked}
            colorClass="text-emerald-400"
            glowColor="#10b981"
            shutter={
              <ShutterBlock
                blockRef={shutterBlock3Ref}
                laserRef={shutterLaser3Ref}
              />
            }
          >
            GROWING
          </FoldWord>

          {/* Word: THROUGH (3D Fold: Cyan / Blue) */}
          <FoldWord
            isUnlocked={isUnlocked}
            colorClass="text-cyan-400"
            glowColor="#06b6d4"
          >
            THROUGH
          </FoldWord>

          {/* Word: TECHNOLOGY (3D Fold: Emerald / Green) */}
          <FoldWord
            isUnlocked={isUnlocked}
            colorClass="text-emerald-400"
            glowColor="#10b981"
            mr=""
          >
            TECHNOLOGY
          </FoldWord>
        </motion.h1>

        {/* 3. High-Tech Subtext with Laser Indicator Line & Text Decrypt (Isolated) */}
        <SubtextBanner />
      </div>
    )
  })
)

export default ScrollHeadline
