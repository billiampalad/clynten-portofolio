import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap, ScrollTrigger } from '@/lib/animations/gsap'
import { PROJECTS_DATA } from '@/content/projects'
import TechIcon from '@/components/sections/Skills/TechIcon'

const CIRCUMFERENCE = 219.91 // 2 * PI * 35

// Kinetic Staggered Character Reveal for Project Title
function SplitTextReveal({ text, className = '' }) {
  const letters = text.split('')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.03,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.012,
        staggerDirection: -1,
      },
    },
  }

  const charVariants = {
    hidden: {
      y: '105%',
      opacity: 0,
      rotateX: -40,
    },
    visible: {
      y: '0%',
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.42,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      y: '-105%',
      opacity: 0,
      rotateX: 40,
      transition: {
        duration: 0.28,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`inline-flex flex-nowrap whitespace-nowrap overflow-hidden [perspective:600px] ${className}`}
    >
      {letters.map((char, i) => (
        <span key={i} className="inline-block overflow-hidden py-0.5 shrink-0 whitespace-nowrap">
          <motion.span
            variants={charVariants}
            className="inline-block will-change-[transform,opacity]"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

// Kinetic Staggered Word Reveal for Paragraphs & Descriptions
function SplitWordsReveal({ text, className = '' }) {
  const words = text.split(' ')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.016,
        delayChildren: 0.02,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.008,
        staggerDirection: -1,
      },
    },
  }

  const wordVariants = {
    hidden: {
      y: '105%',
      opacity: 0,
      rotateX: -30,
      filter: 'blur(3px)',
    },
    visible: {
      y: '0%',
      opacity: 1,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      y: '-105%',
      opacity: 0,
      rotateX: 30,
      filter: 'blur(3px)',
      transition: {
        duration: 0.25,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`inline-flex flex-wrap [perspective:600px] ${className}`}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            variants={wordVariants}
            className="inline-block will-change-[transform,opacity]"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

// Framer Motion 3D Physics Spring for Tilted Coverflow (matching reference)
const COVERFLOW_SPRING = {
  type: 'spring',
  stiffness: 240,
  damping: 30,
}

// Modal Drawer Motion Variants
const drawerBackdropVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
}

const drawerPanelVariants = {
  hidden: {
    x: '-100%',
    boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
  },
  visible: {
    x: '0%',
    boxShadow: '20px 0 50px rgba(0, 0, 0, 0.45)',
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    x: '-100%',
    boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
    transition: {
      duration: 0.35,
      ease: [0.7, 0, 0.84, 0],
    },
  },
}

const drawerContentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.12,
    },
  },
}

const drawerItemVariants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(3px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function Projects() {
  const sectionRef = useRef(null)
  const pinWrapperRef = useRef(null)
  const circleRef = useRef(null)
  const rotatingIconRef0 = useRef(null)
  const rotatingIconRef1 = useRef(null)
  const rotatingIconRef2 = useRef(null)
  const rotatingIconRef3 = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [scrollDirection, setScrollDirection] = useState(1)
  const prevIndexRef = useRef(0)
  const hasScrolledPastStartRef = useRef(true)
  const [hasScrolledPastStart, setHasScrolledPastStart] = useState(true)
  const hasReachedEndRef = useRef(false)
  const [hasReachedEnd, setHasReachedEnd] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isLight, setIsLight] = useState(() => {
    if (typeof document !== 'undefined') {
      return (
        document.documentElement.getAttribute('data-theme') === 'light' ||
        document.documentElement.classList.contains('light-theme')
      )
    }
    return false
  })

  // Listen to data-theme / class changes on document.documentElement
  useEffect(() => {
    const checkTheme = () => {
      const isLightMode =
        document.documentElement.getAttribute('data-theme') === 'light' ||
        document.documentElement.classList.contains('light-theme')
      setIsLight(isLightMode)
    }

    checkTheme()
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    })

    return () => observer.disconnect()
  }, [])

  // GSAP ScrollTrigger Pinned Showcase Timeline with Damped Scrub & Zero Render Flooding
  useEffect(() => {
    const section = sectionRef.current
    const pinWrapper = pinWrapperRef.current
    if (!section || !pinWrapper) return

    const trigger = ScrollTrigger.create({
      id: 'projects-trigger',
      trigger: section,
      start: 'top top',
      end: '+=380%',
      pin: pinWrapper,
      pinSpacing: true,
      scrub: 0.8,
      anticipatePin: 0,
      refreshPriority: -1,
      onUpdate: (self) => {
        const progress = Math.max(0, Math.min(1, self.progress))

        // 1. Toggle background reveal only once when crossing 0.02 threshold
        const hasStarted = progress > 0.02
        if (hasStarted !== hasScrolledPastStartRef.current) {
          hasScrolledPastStartRef.current = hasStarted
          setHasScrolledPastStart(hasStarted)
        }

        // 2. Calculate active project step
        const total = PROJECTS_DATA.length
        const scaled = progress * total
        const step = Math.min(Math.floor(scaled), total - 1)

        // 3. Update current index & direction ONLY when project step changes (avoids 120Hz React re-renders)
        if (step !== prevIndexRef.current) {
          const dir = step > prevIndexRef.current ? 1 : -1
          setScrollDirection(dir)
          prevIndexRef.current = step
          setCurrentIndex(step)
        }

        // 4. Update circular stroke & rotating plus icon directly via DOM ref without component re-render
        const cycle = scaled - step
        const currentCycle = Math.min(1, Math.max(0, cycle / 0.85))
        if (circleRef.current) {
          const dashoffset = CIRCUMFERENCE - currentCycle * CIRCUMFERENCE
          circleRef.current.style.strokeDashoffset = `${dashoffset}`
        }
        const rotDeg = `rotate(${Math.round(currentCycle * 360)}deg)`
        if (rotatingIconRef0.current) {
          rotatingIconRef0.current.style.transform = rotDeg
        }
        if (rotatingIconRef1.current) {
          rotatingIconRef1.current.style.transform = rotDeg
        }
        if (rotatingIconRef2.current) {
          rotatingIconRef2.current.style.transform = rotDeg
        }
        if (rotatingIconRef3.current) {
          rotatingIconRef3.current.style.transform = rotDeg
        }

        // 5. Revert background to default when final project reaches 100% and user scrolls further
        const isLastProject = step === total - 1
        const reachedEnd = (isLastProject && cycle >= 0.88) || self.progress >= 0.99
        if (reachedEnd !== hasReachedEndRef.current) {
          hasReachedEndRef.current = reachedEnd
          setHasReachedEnd(reachedEnd)
        }
      },
      onLeave: () => {
        if (!hasReachedEndRef.current) {
          hasReachedEndRef.current = true
          setHasReachedEnd(true)
        }
      },
      onEnterBack: () => {
        // onUpdate will accurately evaluate based on current scroll position
      },
    })

    // Recalculate accurately once surrounding sections have mounted
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 250)

    return () => {
      clearTimeout(refreshTimer)
      trigger.kill()
    }
  }, [])

  // Close drawer on ESC key and freeze main page scroll while drawer is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsDrawerOpen(false)
      }
    }

    if (isDrawerOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      // Stop LocomotiveScroll / Lenis so background does not scroll
      if (window.__lenis && typeof window.__lenis.stop === 'function') {
        window.__lenis.stop()
      } else if (window.__locomotiveScroll && typeof window.__locomotiveScroll.stop === 'function') {
        window.__locomotiveScroll.stop()
      }
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      // Resume LocomotiveScroll / Lenis
      if (window.__lenis && typeof window.__lenis.start === 'function') {
        window.__lenis.start()
      } else if (window.__locomotiveScroll && typeof window.__locomotiveScroll.start === 'function') {
        window.__locomotiveScroll.start()
      }
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      if (window.__lenis && typeof window.__lenis.start === 'function') {
        window.__lenis.start()
      } else if (window.__locomotiveScroll && typeof window.__locomotiveScroll.start === 'function') {
        window.__locomotiveScroll.start()
      }
    }
  }, [isDrawerOpen])

  const handleOpenDrawer = (project) => {
    setSelectedProject(project)
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
  }

  const currentProject = PROJECTS_DATA[currentIndex] || PROJECTS_DATA[0]
  const prevProject = currentIndex > 0 ? PROJECTS_DATA[currentIndex - 1] : null
  const nextProject = currentIndex < PROJECTS_DATA.length - 1 ? PROJECTS_DATA[currentIndex + 1] : null

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`relative w-full ${isLight ? 'bg-[#f8fafc] text-slate-900' : 'bg-[#0A0907] text-slate-100'} transition-colors duration-500`}
    >
      {/* Pinned Viewport Stage (Fills full viewport cleanly) */}
      <div
        ref={pinWrapperRef}
        className="relative w-full h-screen min-h-screen overflow-hidden flex flex-col justify-between pt-[60px] pb-4 px-4 sm:pt-[64px] sm:pb-5 sm:px-6 md:pt-[68px] md:pb-6 md:px-8 select-none box-border"
      >
        {/* Dynamic Project Image Background with Smooth Crossfade & Cinematic Blur */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
          {PROJECTS_DATA.map((project, idx) => {
            const isActive = idx === currentIndex
            // Pada Project 01 (idx === 0): saat scroll 0, background polos.
            // Saat mulai scroll (hasScrolledPastStart === true), gambar Project 01 bertransisi fade-in secara halus!
            // Untuk Project berikutnya (idx > 0): opacity penuh saat aktif.
            // Saat project terakhir mencapai 100% dan scroll berlanjut (hasReachedEnd === true),
            // background bertransisi kembali ke default (polos tanpa gambar background)!
            const isVisible = isActive && (idx > 0 || hasScrolledPastStart) && !hasReachedEnd

            return (
              <div
                key={project.id}
                className={`absolute inset-0 transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform] ${isVisible ? 'opacity-100 scale-105' : 'opacity-0 scale-115'
                  }`}
              >
                <img
                  src={project.image}
                  alt=""
                  className={`w-full h-full object-cover object-center filter blur-[6px] sm:blur-[8px] md:blur-[10px] transform-gpu ${isLight
                    ? 'brightness-[1.0] contrast-[1.04] saturate-[1.1]'
                    : 'brightness-[0.88] contrast-[1.08] saturate-[1.2]'
                    }`}
                  draggable={false}
                />

                {/* Ambient Project Accent Color Glow */}
                <div
                  className={`absolute inset-0 transition-opacity duration-1000 ${isLight ? 'opacity-20' : 'opacity-30'
                    }`}
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${project.themeColor || 'rgba(244,63,94,0.3)'}, transparent 75%)`,
                  }}
                />
              </div>
            )
          })}

          {/* Adaptive Contrast Overlay: Dark/Light Mode (Fade in only on scroll past start, fade out at end) */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${hasScrolledPastStart && !hasReachedEnd ? 'opacity-100' : 'opacity-0'
              } ${isLight
                ? 'bg-[#f8fafc]/45 backdrop-brightness-95'
                : 'bg-[#0A0907]/35 backdrop-brightness-95'
              }`}
          />

          {/* Radial Vignette: keeps center stage clear and focused (Fade in only on scroll past start, fade out at end) */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${hasScrolledPastStart && !hasReachedEnd ? 'opacity-100' : 'opacity-0'
              } ${isLight
                ? 'bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(248,250,252,0.65)_92%)]'
                : 'bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(10,9,7,0.50)_92%)]'
              }`}
          />
        </div>

        {/* Top Header Row (Pass under 50px navbar, cleanly visible) */}
        <div className="relative z-10 w-full flex items-center justify-between mt-0">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${isLight ? 'bg-slate-900/5 border-slate-900/10' : 'bg-white/5 border-white/10'
              } border backdrop-blur-md transition-colors`}
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span
              className={`font-mono text-[10px] sm:text-xs font-bold tracking-widest ${isLight ? 'text-slate-700' : 'text-slate-300'
                } uppercase transition-colors`}
            >
              Projects
            </span>
          </div>

          <div className="hidden sm:block h-5 overflow-hidden flex items-center">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={currentProject.id}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={`font-mono text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'
                  } tracking-wider transition-colors`}
              >
                {currentProject.client}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Main 3-Column Stage (Left Display Title, Center Workstation Mockup, Right Narrative) */}
        <div className="relative z-10 w-full max-w-6xl mx-auto flex-1 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12 -translate-y-1 sm:-translate-y-2 md:-translate-y-3 mb-auto py-1">
          {/* Left Column: Big Display Title (Matching CODENARTS reference) */}
          <div className="w-full md:w-[260px] lg:w-[280px] flex flex-col items-start justify-center text-left relative z-30 shrink-0">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={currentProject.id}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col items-start w-max max-w-none"
              >
                {/* 1. Technical Code Badge with Reveal */}
                <div className="overflow-hidden py-0.5 mb-2">
                  <motion.div
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="font-mono text-xs font-bold text-red-500 tracking-[0.2em] uppercase">
                      {currentProject.code}
                    </span>
                  </motion.div>
                </div>

                {/* 2. Main Title - Simple Smooth Slide Reveal */}
                <div className="overflow-hidden py-1 w-max max-w-none">
                  <motion.h2
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className={`font-mono font-black text-base sm:text-lg md:text-xl lg:text-2xl tracking-tight whitespace-nowrap flex-nowrap relative z-30 pointer-events-none select-none ${isLight ? 'text-slate-950' : 'text-white'
                      } uppercase leading-none`}
                  >
                    {currentProject.shortTitle}
                  </motion.h2>
                </div>

                {/* 3. Category Subtitle with Kinetic Character Stagger Reveal */}
                <div className="overflow-hidden py-0.5 mt-2.5 w-max max-w-none">
                  <p
                    className={`font-mono text-xs sm:text-sm whitespace-nowrap flex-nowrap relative z-30 pointer-events-none select-none ${isLight ? 'text-slate-600' : 'text-slate-300'
                      } font-medium`}
                  >
                    <SplitTextReveal text={currentProject.category} className="whitespace-nowrap flex-nowrap" />
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Center Column: 3D Vertical Cover Flow Stage (Framer Motion Continuous Physics) */}
          <div className="w-full md:w-auto flex flex-col items-center justify-center relative [perspective:1400px] select-none py-4 sm:py-6 shrink-0">
            <div className="relative w-[320px] sm:w-[380px] md:w-[440px] lg:w-[480px] xl:w-[500px] aspect-[16/10] flex items-center justify-center [transform-style:preserve-3d]">
              {PROJECTS_DATA.map((project, index) => {
                const offset = index - currentIndex
                const isFocus = offset === 0
                const isTop = offset === -1
                const isBottom = offset === 1

                // Posisi, skala, dan rotasi 3D sesuai screenshot (kartu atas & bawah tampil utuh mengambang)
                let translateY = '0%'
                let rotateX = 0
                let scale = 1
                let zIndex = 20
                let opacity = 1
                let brightness = 1
                let borderRadius = 8

                if (isFocus) {
                  // Kartu Tengah (Hero Utama - diperkecil dan border radius sama 8px)
                  translateY = '0%'
                  rotateX = 0
                  scale = 1
                  zIndex = 30
                  opacity = 1
                  brightness = 1
                  borderRadius = 8
                } else if (isTop) {
                  // Thumbnail Atas (Diperkecil lebih ramping dengan gap seimbang & sedikit transparan)
                  translateY = '-69%'
                  rotateX = -8
                  scale = 0.28
                  zIndex = 20
                  opacity = 0.55
                  brightness = 0.92
                  borderRadius = 8
                } else if (isBottom) {
                  // Thumbnail Bawah (Diperkecil lebih ramping dengan gap seimbang & sedikit transparan)
                  translateY = '69%'
                  rotateX = 8
                  scale = 0.28
                  zIndex = 20
                  opacity = 0.55
                  brightness = 0.92
                  borderRadius = 8
                } else {
                  // Kartu di luar layar
                  translateY = offset > 0 ? '135%' : '-135%'
                  rotateX = offset > 0 ? 15 : -15
                  scale = 0.2
                  zIndex = 0
                  opacity = 0
                  brightness = 0.7
                  borderRadius = 8
                }

                return (
                  <motion.div
                    key={project.id}
                    className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none"
                    style={{
                      transformStyle: 'preserve-3d',
                      transformOrigin: 'center center',
                      zIndex,
                    }}
                    animate={{
                      y: translateY,
                      rotateX,
                      scale,
                      opacity,
                      borderRadius,
                      filter: `brightness(${brightness})`,
                    }}
                    transition={COVERFLOW_SPRING}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center"
                      draggable={false}
                    />
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Right Column: Narrative Summary & Circular Step Progress */}
          <div className="w-full md:w-[260px] lg:w-[280px] flex flex-col md:items-end justify-between text-left gap-4 shrink-0">
            <div className="flex flex-col items-start text-left w-full max-w-xs min-h-[90px]">
              <AnimatePresence mode="popLayout" initial={false}>
                <div
                  key={currentProject.id}
                  className={`text-xs sm:text-sm md:text-[13.5px] ${isLight ? 'text-slate-700' : 'text-slate-300'
                    } font-sans leading-normal tracking-normal text-left`}
                >
                  <SplitWordsReveal text={currentProject.summary} />
                </div>
              </AnimatePresence>

              <button
                type="button"
                onClick={() => handleOpenDrawer(currentProject)}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/20 hover:bg-red-600 border border-red-500/40 hover:border-red-500 text-red-500 hover:text-white font-mono text-xs font-bold transition-all duration-300 cursor-pointer shadow-lg shadow-red-500/10 group/btn"
              >
                <span>EXPLORE CASE STUDY</span>
                <span className="transform transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden="true">→</span>
              </button>
            </div>

            {/* Circular Step Indicator (Matching Meer Mohsin Reference) */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mt-2">
              <svg className="w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 86 86">
                <circle
                  ref={circleRef}
                  className={`${isLight ? 'stroke-slate-900' : 'stroke-white'} transition-colors duration-500`}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="transparent"
                  cx="43"
                  cy="43"
                  r="35"
                  style={{
                    strokeDasharray: CIRCUMFERENCE,
                    strokeDashoffset: CIRCUMFERENCE,
                  }}
                />
              </svg>
              {/* Step Counter Display (Static without motion) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <span
                  className={`font-mono font-normal text-2xl sm:text-3xl leading-none ${isLight ? 'text-slate-950' : 'text-white'
                    } tracking-tight transition-colors text-center inline-block`}
                >
                  0{currentIndex + 1}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Ticker Bar */}
        <div
          className={`relative z-10 w-full flex items-center justify-between pt-2 translate-y-1 sm:translate-y-2 ${isLight ? 'text-black' : 'text-white'
            } font-mono text-[10px] sm:text-xs transition-colors`}
        >
          {/* Leftmost + Accent (Desktop) */}
          <div className="hidden sm:flex h-6 items-center shrink-0">
            <span
              ref={rotatingIconRef0}
              className="inline-flex items-center justify-center text-red-500 select-none origin-center will-change-transform"
              aria-hidden="true"
            >
              <svg viewBox="0 0 12 12" className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-current stroke-[2.2]">
                <line x1="6" y1="1" x2="6" y2="11" />
                <line x1="1" y1="6" x2="11" y2="6" />
              </svg>
            </span>
          </div>

          {/* Segment 1: tension (Centered between Leftmost + and Divider 1 +) */}
          <div className="hidden sm:flex flex-1 h-6 items-center justify-center px-2">
            <span className="whitespace-nowrap leading-none flex items-center uppercase tracking-widest font-bold">
              tension
            </span>
          </div>

          {/* Dynamic Rotating + Divider 1 (Desktop: between Left & Center) */}
          <div className="hidden sm:flex h-6 items-center justify-center shrink-0">
            <span
              ref={rotatingIconRef1}
              className="inline-flex items-center justify-center text-red-500 select-none origin-center will-change-transform"
              aria-hidden="true"
            >
              <svg viewBox="0 0 12 12" className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-current stroke-[2.2]">
                <line x1="6" y1="1" x2="6" y2="11" />
                <line x1="1" y1="6" x2="11" y2="6" />
              </svg>
            </span>
          </div>

          {/* Segment 2: immersion (Centered between Divider 1 + and Divider 2 +) */}
          <div className="flex-1 h-6 overflow-hidden flex items-center justify-center px-2">
            <span className={`${isLight ? 'text-black' : 'text-white'} font-bold uppercase tracking-widest transition-colors whitespace-nowrap inline-flex items-center leading-none`}>
              immersion
            </span>
          </div>

          {/* Dynamic Rotating + Divider 2 (between Center & Right) */}
          <div className="flex h-6 items-center justify-center shrink-0">
            <span
              ref={rotatingIconRef2}
              className="inline-flex items-center justify-center text-red-500 select-none origin-center will-change-transform"
              aria-hidden="true"
            >
              <svg viewBox="0 0 12 12" className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-current stroke-[2.2]">
                <line x1="6" y1="1" x2="6" y2="11" />
                <line x1="1" y1="6" x2="11" y2="6" />
              </svg>
            </span>
          </div>

          {/* Segment 3: impact (Centered between Divider 2 + and Rightmost +) */}
          <div className="flex-1 h-6 overflow-hidden flex items-center justify-center px-2">
            <span className={`${isLight ? 'text-black' : 'text-white'} font-bold uppercase tracking-widest transition-colors whitespace-nowrap inline-flex items-center leading-none`}>
              impact
            </span>
          </div>

          {/* Rightmost + Accent */}
          <div className="flex h-6 items-center shrink-0">
            <span
              ref={rotatingIconRef3}
              className="inline-flex items-center justify-center text-red-500 select-none origin-center will-change-transform"
              aria-hidden="true"
            >
              <svg viewBox="0 0 12 12" className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-current stroke-[2.2]">
                <line x1="6" y1="1" x2="6" y2="11" />
                <line x1="1" y1="6" x2="11" y2="6" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      {/* Case Study Off-Canvas Drawer Modal */}
      <AnimatePresence>
        {isDrawerOpen && selectedProject && (
          <>
            {/* Modal Backdrop - Lighter transparent overlay to keep background projects clearly visible */}
            <motion.div
              key="case-study-backdrop"
              variants={drawerBackdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/20 z-[1100]"
              onClick={handleCloseDrawer}
              aria-hidden="true"
            />

            {/* Modal Drawer Aside Panel - Ultra-transparent Glassmorphism with Smooth Blur */}
            <motion.aside
              key="case-study-panel"
              variants={drawerPanelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              style={{
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
              }}
              className={`fixed top-0 left-0 w-full max-w-lg h-full ${isLight
                ? 'bg-white/30 text-slate-900 border-r border-slate-200/60 shadow-2xl'
                : 'bg-[#0a090d]/25 text-slate-100 border-r border-white/10 shadow-2xl'
                } p-6 sm:p-8 z-[1101] overflow-y-auto overscroll-contain`}
              aria-label="Project Case Study"
              aria-modal="true"
              role="dialog"
            >
              <motion.div
                variants={drawerContentVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-6 font-sans"
              >
                {/* 1. Top Bar: Code Badge, GitHub Link & Close Button */}
                <motion.div
                  variants={drawerItemVariants}
                  className={`flex items-center justify-between pb-4 border-b ${isLight ? 'border-slate-200' : 'border-white/10'
                    }`}
                >
                  <span className="font-mono text-xs font-bold text-red-500 bg-red-500/10 border border-red-500/30 px-3 py-1 rounded-md">
                    {selectedProject.code}
                  </span>

                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${isLight
                        ? 'bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 hover:text-black shadow-sm'
                        : 'bg-white/5 hover:bg-white/15 border border-white/15 text-slate-200 hover:text-white'
                        }`}
                      title="View GitHub Repository"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                      <span>GITHUB</span>
                      <svg className="w-3 h-3 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={handleCloseDrawer}
                    className={`px-3 py-1.5 rounded-lg ${isLight
                      ? 'bg-slate-100 hover:bg-red-600 hover:text-white border border-slate-200 text-slate-700'
                      : 'bg-white/5 hover:bg-red-600 hover:text-white border border-white/15 text-slate-300'
                      } font-mono text-xs font-bold transition-all cursor-pointer`}
                  >
                    ✕ CLOSE
                  </button>
                </motion.div>

                {/* Project Preview Image & Date */}
                {selectedProject.image && (
                  <motion.div variants={drawerItemVariants} className="flex flex-col gap-2.5">
                    <div className={`w-full rounded-xl overflow-hidden border ${isLight ? 'border-slate-200/80 shadow-md' : 'border-white/10 shadow-lg'
                      }`}>
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full aspect-[16/10] object-cover"
                      />
                    </div>
                    {(selectedProject.date || selectedProject.period) && (
                      <div className="flex items-center gap-2 font-mono text-xs text-red-500 font-semibold tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        <span>{selectedProject.date || selectedProject.period}</span>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 2. Title & Subtitle */}
                <motion.div variants={drawerItemVariants}>
                  <h3
                    className={`font-mono font-black text-2xl sm:text-3xl ${isLight ? 'text-slate-900' : 'text-white'
                      } tracking-tight mb-1`}
                  >
                    {selectedProject.title}
                  </h3>
                  <p
                    className={`mt-2.5 font-mono text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'
                      }`}
                  >
                    {selectedProject.subtitle}
                  </p>
                </motion.div>

                {/* 3. Technology Badges */}
                <motion.div variants={drawerItemVariants}>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tech.map((t) => (
                      <motion.span
                        key={t}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.15 }}
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md ${isLight
                          ? 'bg-slate-100/90 border-slate-200 text-slate-700 hover:bg-slate-200/70'
                          : 'bg-white/[0.04] border-white/10 text-slate-300 hover:bg-white/[0.08]'
                          } border font-mono text-[11px] font-medium transition-colors`}
                      >
                        <TechIcon
                          name={t}
                          className="w-3.5 h-3.5 inline-flex items-center justify-center shrink-0 [&>svg]:w-full [&>svg]:h-full"
                        />
                        <span>{t}</span>
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* 4. Project Gallery (Distinct Visual Page Section) */}
                {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                  <motion.div
                    variants={drawerItemVariants}
                    className="mt-10 flex flex-col gap-4"
                  >
                    <div className="flex flex-col gap-1.5">
                      <h3
                        className={`font-mono font-black text-2xl sm:text-3xl md:text-4xl tracking-tight uppercase leading-none ${isLight ? 'text-slate-950' : 'text-white'
                          }`}
                      >
                        GALLERY
                      </h3>
                    </div>

                    <div className="flex flex-col gap-4 mt-2">
                      {selectedProject.gallery.map((imgUrl, gIdx) => (
                        <div
                          key={gIdx}
                          className={`group relative w-full overflow-hidden rounded-xl border ${isLight
                            ? 'border-slate-200/80 bg-slate-100/50 shadow-sm'
                            : 'border-white/10 bg-white/[0.02] shadow-md'
                            } transition-all duration-300`}
                        >
                          <div className="w-full aspect-[16/10] overflow-hidden">
                            <img
                              src={imgUrl}
                              alt={`${selectedProject.title} gallery preview ${gIdx + 1}`}
                              className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                              loading="lazy"
                              draggable={false}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 5. Key Contributions */}
                {selectedProject.contributions && selectedProject.contributions.length > 0 && (
                  <motion.div
                    variants={drawerItemVariants}
                    className="mt-10 flex flex-col gap-3"
                  >
                    <span
                      className={`font-mono text-xs font-bold tracking-wider uppercase ${isLight ? 'text-slate-500' : 'text-zinc-400'
                        }`}
                    >
                      CONTRIBUTION
                    </span>

                    <ul className="flex flex-col gap-2.5 sm:gap-3 mt-1">
                      {selectedProject.contributions.map((item, cIdx) => (
                        <li
                          key={cIdx}
                          className={`flex items-center gap-3 text-sm sm:text-base font-semibold ${isLight ? 'text-slate-900' : 'text-white'
                            } tracking-tight`}
                        >
                          <svg
                            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isLight ? 'text-slate-500' : 'text-zinc-300'
                              }`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                          >
                            <path d="M12 4v16M4 12h16" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
