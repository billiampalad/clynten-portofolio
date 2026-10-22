import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap, ScrollTrigger } from '@/lib/animations/gsap'
import { PROJECTS_DATA } from '@/content/projects'

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
      className={`inline-flex flex-wrap overflow-hidden [perspective:600px] ${className}`}
    >
      {letters.map((char, i) => (
        <span key={i} className="inline-block overflow-hidden py-0.5">
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
  const [currentIndex, setCurrentIndex] = useState(0)
  const [scrollDirection, setScrollDirection] = useState(1)
  const prevIndexRef = useRef(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [circleProgress, setCircleProgress] = useState(0)
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

  // GSAP ScrollTrigger Pinned Showcase Timeline
  useEffect(() => {
    const section = sectionRef.current
    const pinWrapper = pinWrapperRef.current
    if (!section || !pinWrapper) return

    const trigger = ScrollTrigger.create({
      id: 'projects-trigger',
      trigger: section,
      start: 'top top',
      end: '+=300%',
      pin: pinWrapper,
      pinSpacing: true,
      scrub: true,
      anticipatePin: 0,
      refreshPriority: -1,
      onUpdate: (self) => {
        const progress = Math.max(0, Math.min(1, self.progress))
        setScrollProgress(progress)

        // Calculate active project index and circle fill progress across all projects equally
        const total = PROJECTS_DATA.length
        const scaled = progress * total
        const step = Math.min(Math.floor(scaled), total - 1)
        
        if (step !== prevIndexRef.current) {
          const dir = step > prevIndexRef.current ? 1 : -1
          setScrollDirection(dir)
          prevIndexRef.current = step
        } else if (self.direction) {
          setScrollDirection(self.direction)
        }
        setCurrentIndex(step)

        // Circle reaches 100% reliably at 85% of each step and holds full before advancing
        const cycle = scaled - step
        const currentCycle = Math.min(1, Math.max(0, cycle / 0.85))
        setCircleProgress(currentCycle)
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
  const strokeDashoffset = CIRCUMFERENCE - circleProgress * CIRCUMFERENCE

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`relative w-full ${isLight ? 'bg-[#f8fafc] text-slate-900' : 'bg-[#0A0907] text-slate-100'} transition-colors duration-500`}
    >
      {/* Pinned Viewport Stage (Fills full viewport cleanly) */}
      <div
        ref={pinWrapperRef}
        className="relative w-full h-screen min-h-screen overflow-hidden flex flex-col justify-between pt-6 pb-6 px-6 sm:pt-8 sm:pb-6 sm:px-10 md:pt-8 md:pb-8 md:px-14 select-none box-border"
      >
        {/* Dynamic Project Image Background with Smooth Crossfade & Cinematic Blur */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
          {PROJECTS_DATA.map((project, idx) => {
            const isActive = idx === currentIndex
            // Pada Project 01 (idx === 0): saat scroll 0 (scrollProgress <= 0.02), background polos/gelap/terang.
            // Saat mulai scroll (scrollProgress > 0.02), gambar Project 01 bertransisi fade-in secara halus!
            // Untuk Project berikutnya (idx > 0): opacity penuh saat aktif.
            const isVisible = isActive && (idx > 0 || scrollProgress > 0.02)

            return (
              <div
                key={project.id}
                className={`absolute inset-0 transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform] ${isVisible ? 'opacity-100 scale-105' : 'opacity-0 scale-115'
                  }`}
              >
                <img
                  src={project.image}
                  alt=""
                  className={`w-full h-full object-cover object-center filter blur-[2px] sm:blur-[3px] md:blur-[4px] transition-all duration-800 ${isLight
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

          {/* Adaptive Contrast Overlay: Dark/Light Mode (Fade in only on scroll > 0.02) */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${scrollProgress > 0.02 ? 'opacity-100' : 'opacity-0'
              } ${isLight
                ? 'bg-[#f8fafc]/45 backdrop-brightness-95'
                : 'bg-[#0A0907]/35 backdrop-brightness-95'
              }`}
          />

          {/* Radial Vignette: keeps center stage clear and focused (Fade in only on scroll > 0.02) */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${scrollProgress > 0.02 ? 'opacity-100' : 'opacity-0'
              } ${isLight
                ? 'bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(248,250,252,0.65)_92%)]'
                : 'bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(10,9,7,0.50)_92%)]'
              }`}
          />
        </div>

        {/* Top Header Row */}
        <div className="relative z-10 w-full flex items-center justify-between mt-8 sm:mt-10">
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
        <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-10 mt-3 sm:mt-4 mb-auto py-2">
          {/* Left Column: Big Display Title (Matching CODENARTS reference) */}
          <div className="w-full md:w-1/4 flex flex-col items-start justify-center text-left relative z-30">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={currentProject.id}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col items-start"
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
                <div className="overflow-hidden py-1">
                  <motion.h2
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className={`font-mono font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight whitespace-nowrap relative z-30 pointer-events-none ${isLight ? 'text-slate-950' : 'text-white'
                      } uppercase leading-none`}
                  >
                    {currentProject.shortTitle}
                  </motion.h2>
                </div>

                {/* 3. Category Subtitle with Kinetic Character Stagger Reveal */}
                <div className="overflow-hidden py-0.5 mt-3">
                  <p
                    className={`font-mono text-xs sm:text-sm whitespace-nowrap relative z-30 pointer-events-none ${isLight ? 'text-slate-600' : 'text-slate-300'
                      } font-medium`}
                  >
                    <SplitTextReveal text={currentProject.category} />
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Center Column: 3D Vertical Cover Flow Stage (Framer Motion Continuous Physics) */}
          <div className="w-full md:w-2/4 flex flex-col items-center justify-center relative [perspective:1400px] select-none py-6 sm:py-10">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[450px] aspect-[16/10] flex items-center justify-center [transform-style:preserve-3d]">
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
                  // Thumbnail Atas (Diperkecil lebih ramping dengan gap seimbang)
                  translateY = '-69%'
                  rotateX = -8
                  scale = 0.28
                  zIndex = 20
                  opacity = 0.95
                  brightness = 0.92
                  borderRadius = 8
                } else if (isBottom) {
                  // Thumbnail Bawah (Diperkecil lebih ramping dengan gap seimbang)
                  translateY = '69%'
                  rotateX = 8
                  scale = 0.28
                  zIndex = 20
                  opacity = 0.95
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
                    className={`absolute inset-0 w-full h-full overflow-hidden shadow-2xl pointer-events-none select-none ${
                      isFocus
                        ? 'shadow-black/90'
                        : 'shadow-black/60'
                    }`}
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
          <div className="w-full md:w-1/4 flex flex-col md:items-end justify-between text-left gap-6">
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
                  className={`${isLight ? 'stroke-slate-900' : 'stroke-white'} transition-colors duration-500`}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="transparent"
                  cx="43"
                  cy="43"
                  r="35"
                  style={{
                    strokeDasharray: CIRCUMFERENCE,
                    strokeDashoffset,
                  }}
                />
              </svg>
              {/* Odometer Rolling Counter Display */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <div className="h-8 sm:h-10 overflow-hidden flex items-center justify-center">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={currentIndex}
                      initial={{ y: '100%', opacity: 0, filter: 'blur(3px)' }}
                      animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                      exit={{ y: '-100%', opacity: 0, filter: 'blur(3px)' }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className={`font-mono font-normal text-2xl sm:text-3xl leading-none ${isLight ? 'text-slate-950' : 'text-white'
                        } tracking-tight transition-colors text-center inline-block`}
                    >
                      0{currentIndex + 1}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Ticker Bar */}
        <div
          className={`relative z-10 w-full flex items-center justify-between pt-4 translate-y-3 sm:translate-y-4 md:translate-y-5 ${isLight ? 'text-black' : 'text-white'
            } font-mono text-[10px] sm:text-xs transition-colors`}
        >
          {/* Left Status Message */}
          <span className="hidden sm:inline whitespace-nowrap">
            {currentIndex === PROJECTS_DATA.length - 1
              ? 'FINAL SYSTEM ARCHIVE // END OF SHOWCASE'
              : 'SCROLL DOWN TO ADVANCE NEXT SYSTEM'}
          </span>

          {/* Dynamic Rotating + Divider (Desktop: between Left & Center) */}
          <div className="hidden sm:flex flex-1 items-center justify-center px-4">
            <span
              className="inline-flex items-center justify-center text-red-500 select-none origin-center will-change-transform"
              style={{ transform: `rotate(${Math.round(circleProgress * 360)}deg)` }}
              aria-hidden="true"
            >
              <svg viewBox="0 0 12 12" className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-current stroke-[2.2]">
                <line x1="6" y1="1" x2="6" y2="11" />
                <line x1="1" y1="6" x2="11" y2="6" />
              </svg>
            </span>
          </div>

          {/* Center Tech Stack */}
          <div className="h-5 overflow-hidden flex items-center">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={currentProject.id}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={`${isLight ? 'text-black' : 'text-white'} font-bold uppercase transition-colors whitespace-nowrap inline-block`}
              >
                {currentProject.tech.slice(0, 4).join(' • ')}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Dynamic Rotating + Divider (between Center & Right) */}
          <div className="flex flex-1 items-center justify-center px-4">
            <span
              className="inline-flex items-center justify-center text-red-500 select-none origin-center will-change-transform"
              style={{ transform: `rotate(${Math.round(circleProgress * 360)}deg)` }}
              aria-hidden="true"
            >
              <svg viewBox="0 0 12 12" className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-current stroke-[2.2]">
                <line x1="6" y1="1" x2="6" y2="11" />
                <line x1="1" y1="6" x2="11" y2="6" />
              </svg>
            </span>
          </div>

          {/* Right Period */}
          <div className="h-5 overflow-hidden flex items-center justify-end">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={currentProject.id}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-100%', opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="whitespace-nowrap inline-block"
              >
                {currentProject.period}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Case Study Off-Canvas Drawer Modal */}
      <AnimatePresence>
        {isDrawerOpen && selectedProject && (
          <>
            {/* Modal Backdrop - Pure dark overlay without blur to keep background projects slightly visible and sharp */}
            <motion.div
              key="case-study-backdrop"
              variants={drawerBackdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/45 z-[1100]"
              onClick={handleCloseDrawer}
              aria-hidden="true"
            />

            {/* Modal Drawer Aside Panel - Glassmorphism Transparent Blur on Left */}
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
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
              }}
              className={`fixed top-0 left-0 w-full max-w-lg h-full ${
                isLight
                  ? 'bg-white/55 text-slate-900 border-r border-slate-200/80 shadow-2xl'
                  : 'bg-[#0a090d]/50 text-slate-100 border-r border-white/15 shadow-2xl'
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
                {/* 1. Top Bar: Code Badge & Close Button */}
                <motion.div
                  variants={drawerItemVariants}
                  className={`flex items-center justify-between pb-4 border-b ${
                    isLight ? 'border-slate-200' : 'border-white/10'
                  }`}
                >
                  <span className="font-mono text-xs font-bold text-red-500 bg-red-500/10 border border-red-500/30 px-3 py-1 rounded-md">
                    {selectedProject.code}
                  </span>
                  <button
                    type="button"
                    onClick={handleCloseDrawer}
                    className={`px-3 py-1.5 rounded-lg ${
                      isLight
                        ? 'bg-slate-100 hover:bg-red-600 hover:text-white border border-slate-200 text-slate-700'
                        : 'bg-white/5 hover:bg-red-600 hover:text-white border border-white/15 text-slate-300'
                    } font-mono text-xs font-bold transition-all cursor-pointer`}
                  >
                    ✕ CLOSE
                  </button>
                </motion.div>

                {/* 2. Title & Subtitle */}
                <motion.div variants={drawerItemVariants}>
                  <h3
                    className={`font-mono font-black text-2xl sm:text-3xl ${
                      isLight ? 'text-slate-900' : 'text-white'
                    } tracking-tight mb-1`}
                  >
                    {selectedProject.title}
                  </h3>
                  <p
                    className={`font-mono text-xs sm:text-sm ${
                      isLight ? 'text-slate-600' : 'text-slate-400'
                    }`}
                  >
                    {selectedProject.subtitle}
                  </p>
                </motion.div>

                {/* 3. System Overview */}
                <motion.div
                  variants={drawerItemVariants}
                  className={`p-4 rounded-xl ${
                    isLight ? 'bg-slate-100/70 border-slate-200/80' : 'bg-white/[0.03] border-white/5'
                  } border`}
                >
                  <span className="block font-mono text-xs font-bold text-red-500 tracking-wider uppercase mb-2">
                    // SYSTEM OVERVIEW
                  </span>
                  <p className={`text-sm ${isLight ? 'text-slate-700' : 'text-slate-300'} leading-relaxed`}>
                    {selectedProject.caseStudy.overview}
                  </p>
                </motion.div>

                {/* 4. Metrics Grid */}
                <motion.div variants={drawerItemVariants} className="grid grid-cols-3 gap-3">
                  {selectedProject.metrics.map((m, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.2 }}
                      className={`p-3 rounded-lg ${
                        isLight ? 'bg-slate-100/70 border-slate-200/80' : 'bg-white/[0.03] border-white/5'
                      } border text-center`}
                    >
                      <span
                        className={`block font-mono text-lg font-black ${
                          isLight ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        {m.val}
                      </span>
                      <span
                        className={`font-mono text-[9px] ${
                          isLight ? 'text-slate-500' : 'text-slate-400'
                        } uppercase tracking-wider`}
                      >
                        {m.label}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* 5. Architectural Challenges */}
                <motion.div variants={drawerItemVariants}>
                  <span className="block font-mono text-xs font-bold text-red-500 tracking-wider uppercase mb-3">
                    // ARCHITECTURAL CHALLENGES
                  </span>
                  <ul className="flex flex-col gap-2">
                    {selectedProject.caseStudy.challenges.map((ch, idx) => (
                      <li
                        key={idx}
                        className={`flex items-start gap-2.5 text-sm ${
                          isLight ? 'text-slate-700' : 'text-slate-300'
                        }`}
                      >
                        <span className="text-red-500 font-bold font-mono">▸</span>
                        <span>{ch}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* 6. Engineered Solutions */}
                <motion.div variants={drawerItemVariants}>
                  <span className="block font-mono text-xs font-bold text-red-500 tracking-wider uppercase mb-3">
                    // ENGINEERED SOLUTIONS
                  </span>
                  <ul className="flex flex-col gap-2">
                    {selectedProject.caseStudy.solutions.map((sol, idx) => (
                      <li
                        key={idx}
                        className={`flex items-start gap-2.5 text-sm ${
                          isLight ? 'text-slate-700' : 'text-slate-300'
                        }`}
                      >
                        <span className="text-emerald-500 font-bold font-mono">✓</span>
                        <span>{sol}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* 7. System Deliverables */}
                <motion.div variants={drawerItemVariants}>
                  <span className="block font-mono text-xs font-bold text-red-500 tracking-wider uppercase mb-3">
                    // SYSTEM DELIVERABLES
                  </span>
                  <ul className="flex flex-col gap-2">
                    {selectedProject.caseStudy.deliverables.map((del, idx) => (
                      <li
                        key={idx}
                        className={`flex items-start gap-2.5 text-sm ${
                          isLight ? 'text-slate-700' : 'text-slate-300'
                        }`}
                      >
                        <span className="text-red-500 font-bold font-mono">■</span>
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* 8. Technology Stack */}
                <motion.div variants={drawerItemVariants}>
                  <span className="block font-mono text-xs font-bold text-red-500 tracking-wider uppercase mb-3">
                    // TECHNOLOGY STACK
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <motion.span
                        key={t}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.15 }}
                        className={`px-3 py-1 rounded-md ${
                          isLight
                            ? 'bg-slate-100 border-slate-200 text-slate-800'
                            : 'bg-white/[0.05] border-white/10 text-slate-300'
                        } border font-mono text-xs font-semibold`}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
