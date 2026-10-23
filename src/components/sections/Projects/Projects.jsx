import { useState, useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/animations/gsap'
import { PROJECTS_DATA } from '@/content/projects'

const CIRCUMFERENCE = 219.91 // 2 * PI * 35

export default function Projects() {
  const sectionRef = useRef(null)
  const pinWrapperRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
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
      end: '+=350%',
      pin: pinWrapper,
      pinSpacing: true,
      scrub: 0.8,
      anticipatePin: 0,
      refreshPriority: -1,
      onUpdate: (self) => {
        const progress = Math.max(0, Math.min(1, self.progress))
        setScrollProgress(progress)

        // Calculate active project index based on scroll range
        const total = PROJECTS_DATA.length
        const step = Math.min(Math.floor(progress * total), total - 1)
        setCurrentIndex(step)
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

  // Close drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsDrawerOpen(false)
      }
    }

    if (isDrawerOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
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
  const strokeDashoffset = CIRCUMFERENCE - scrollProgress * CIRCUMFERENCE

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`relative w-full scroll-mt-16 ${isLight ? 'bg-[#f8fafc] text-slate-900' : 'bg-[#0A0907] text-slate-100'} transition-colors duration-500`}
    >
      {/* Pinned 100vh Fullscreen Viewport Stage */}
      <div
        ref={pinWrapperRef}
        className="relative w-full h-screen min-h-screen overflow-hidden flex flex-col justify-between pt-20 pb-6 px-6 sm:pt-24 sm:pb-8 sm:px-10 md:pt-24 md:pb-10 md:px-14 select-none box-border"
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

          {/* Adaptive Contrast Overlay: Dark/Light Mode */}
          <div
            className={`absolute inset-0 transition-colors duration-700 ease-out ${isLight
              ? 'bg-[#f8fafc]/45 backdrop-brightness-95'
              : 'bg-[#0A0907]/35 backdrop-brightness-95'
              }`}
          />

          {/* Radial Vignette: keeps center stage clear and focused */}
          <div
            className={`absolute inset-0 transition-all duration-700 ${isLight
              ? 'bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(248,250,252,0.65)_92%)]'
              : 'bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(10,9,7,0.50)_92%)]'
              }`}
          />
        </div>

        {/* Top Header Row */}
        <div className="relative z-10 w-full flex items-center justify-between">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${isLight ? 'bg-slate-900/5 border-slate-900/10' : 'bg-white/5 border-white/10'
              } border backdrop-blur-md transition-colors`}
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span
              className={`font-mono text-[10px] sm:text-xs font-bold tracking-widest ${isLight ? 'text-slate-700' : 'text-slate-300'
                } uppercase transition-colors`}
            >
              WORK // 0{currentIndex + 1} OF 0{PROJECTS_DATA.length}
            </span>
          </div>

          <div
            className={`font-mono text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'
              } tracking-wider hidden sm:block transition-colors`}
          >
            {currentProject.client}
          </div>
        </div>

        {/* Main 3-Column Stage (Left Display Title, Center Workstation Mockup, Right Narrative) */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-10 my-auto py-2">
          {/* Left Column: Big Display Title (Matching CODENARTS reference) */}
          <div className="w-full md:w-1/4 flex flex-col items-start justify-center text-left">
            <span className="font-mono text-xs font-bold text-red-500 tracking-widest uppercase mb-2">
              {currentProject.code}
            </span>
            <h2
              className={`font-mono font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter ${isLight ? 'text-slate-950' : 'text-white'
                } uppercase leading-none transition-all duration-500`}
            >
              {currentProject.shortTitle}
            </h2>
            <p
              className={`font-mono text-xs sm:text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'
                } mt-3 max-w-xs font-medium transition-colors`}
            >
              {currentProject.category}
            </p>
          </div>

          {/* Center Column: 3D Vertical Cover Flow Stage (Top Prev, Center Active, Bottom Next) */}
          <div className="w-full md:w-2/4 flex flex-col items-center justify-center relative [perspective:1200px]">
            {/* 1. TOP PREVIOUS PROJECT IMAGE (Only rendered when currentIndex > 0) */}
            <div className="h-12 sm:h-16 w-full flex items-end justify-center pointer-events-none select-none z-10">
              {prevProject ? (
                <div className="relative transform -rotate-x-12 scale-75 opacity-90 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <img
                    src={prevProject.image}
                    alt=""
                    className="w-32 sm:w-44 md:w-52 h-auto object-contain rounded-md shadow-2xl filter brightness-90"
                    draggable={false}
                  />
                  {/* Subtle edge depth gradient maintaining clarity */}
                  <div
                    className={`pointer-events-none absolute inset-0 rounded-md bg-gradient-to-t from-transparent via-transparent ${isLight ? 'to-[#f8fafc]/30' : 'to-[#0A0907]/20'
                      }`}
                  />
                </div>
              ) : null}
            </div>

            {/* 2. CENTER ACTIVE PROJECT IMAGE (Hero focus, full size, clickable to open case study drawer) */}
            <div
              key={currentProject.id}
              onClick={() => handleOpenDrawer(currentProject)}
              className="relative z-20 w-full max-w-[540px] lg:max-w-[620px] aspect-[16/10] overflow-hidden rounded-xl shadow-2xl shadow-black/80 cursor-pointer group transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform hover:scale-[1.02] border border-white/10"
              title={`Click to inspect ${currentProject.title}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleOpenDrawer(currentProject)
                }
              }}
            >
              <img
                src={currentProject.image}
                alt={currentProject.title}
                className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:brightness-105"
                draggable={false}
              />
            </div>

            {/* 3. BOTTOM NEXT PROJECT IMAGE (Upcoming teaser, non-clickable, no frame, no text) */}
            <div className="h-12 sm:h-16 w-full flex items-start justify-center pointer-events-none select-none z-10">
              {nextProject ? (
                <div className="relative transform rotate-x-12 scale-75 opacity-90 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <img
                    src={nextProject.image}
                    alt=""
                    className="w-32 sm:w-44 md:w-52 h-auto object-contain rounded-md shadow-2xl filter brightness-90"
                    draggable={false}
                  />
                  {/* Subtle edge depth gradient maintaining clarity */}
                  <div
                    className={`pointer-events-none absolute inset-0 rounded-md bg-gradient-to-b from-transparent via-transparent ${isLight ? 'to-[#f8fafc]/30' : 'to-[#0A0907]/20'
                      }`}
                  />
                </div>
              ) : null}
            </div>
          </div>

          {/* Right Column: Narrative Summary & Circular Step Progress */}
          <div className="w-full md:w-1/4 flex flex-col md:items-end justify-between text-left md:text-right gap-6">
            <div className="flex flex-col md:items-end">
              <p
                className={`text-xs sm:text-sm md:text-[13.5px] ${isLight ? 'text-slate-700' : 'text-slate-300'
                  } font-sans leading-relaxed tracking-normal max-w-xs transition-all duration-500`}
              >
                {currentProject.summary}
              </p>

              <button
                type="button"
                onClick={() => handleOpenDrawer(currentProject)}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/20 hover:bg-red-600 border border-red-500/40 hover:border-red-500 text-red-500 hover:text-white font-mono text-xs font-bold transition-all duration-300 cursor-pointer shadow-lg shadow-red-500/10"
              >
                <span>EXPLORE CASE STUDY</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>

            {/* Circular Step Indicator (Matching Meer Mohsin Reference) */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mt-2">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 86 86">
                <circle
                  className={`${isLight ? 'stroke-slate-900/15' : 'stroke-white/15'}`}
                  strokeWidth="2.5"
                  fill="transparent"
                  cx="43"
                  cy="43"
                  r="35"
                />
                <circle
                  className={`${isLight ? 'stroke-slate-900' : 'stroke-white'} transition-all duration-300 ease-out`}
                  strokeWidth="2.5"
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
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className={`font-mono italic font-bold text-2xl sm:text-3xl ${isLight ? 'text-slate-950' : 'text-white'
                    } tracking-tight transition-colors`}
                >
                  0{currentIndex + 1}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Ticker Bar */}
        <div
          className={`relative z-10 w-full flex items-center justify-between pt-3 border-t ${isLight ? 'border-slate-900/10 text-slate-500' : 'border-white/10 text-slate-500'
            } font-mono text-[10px] sm:text-xs transition-colors`}
        >
          <span className="hidden sm:inline">SCROLL DOWN TO ADVANCE NEXT SYSTEM</span>
          <span className={`${isLight ? 'text-slate-700' : 'text-slate-400'} font-bold uppercase transition-colors`}>
            {currentProject.tech.slice(0, 4).join(' • ')}
          </span>
          <span>{currentProject.period}</span>
        </div>
      </div>

      {/* Case Study Off-Canvas Drawer Modal */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-md z-[100] transition-opacity duration-400 ${isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={handleCloseDrawer}
        aria-hidden="true"
      />

      <aside
        className={`fixed top-0 right-0 w-full max-w-2xl h-full ${isLight
          ? 'bg-white text-slate-900 border-l border-slate-200 shadow-2xl'
          : 'bg-[#0d0c10] text-slate-100 border-l border-white/15'
          } p-6 sm:p-10 z-[101] overflow-y-auto transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        aria-label="Project Case Study"
        aria-modal="true"
        role="dialog"
      >
        {selectedProject && (
          <div className="flex flex-col gap-6 font-sans">
            <div
              className={`flex items-center justify-between pb-4 border-b ${isLight ? 'border-slate-200' : 'border-white/10'
                }`}
            >
              <span className="font-mono text-xs font-bold text-red-500 bg-red-500/10 border border-red-500/30 px-3 py-1 rounded-md">
                {selectedProject.code}
              </span>
              <button
                type="button"
                onClick={handleCloseDrawer}
                className={`px-3 py-1.5 rounded-lg ${isLight
                  ? 'bg-slate-100 hover:bg-red-600 hover:text-white border border-slate-200 text-slate-700'
                  : 'bg-white/5 hover:bg-red-600 hover:text-white border border-white/15 text-slate-300'
                  } font-mono text-xs font-bold transition-all`}
              >
                ✕ CLOSE
              </button>
            </div>

            <div>
              <h3
                className={`font-mono font-black text-2xl sm:text-3xl ${isLight ? 'text-slate-900' : 'text-white'
                  } tracking-tight mb-1`}
              >
                {selectedProject.title}
              </h3>
              <p
                className={`font-mono text-xs sm:text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'
                  }`}
              >
                {selectedProject.subtitle}
              </p>
            </div>

            {/* Overview */}
            <div
              className={`p-4 rounded-xl ${isLight ? 'bg-slate-100/70 border-slate-200/80' : 'bg-white/[0.03] border-white/5'
                } border`}
            >
              <span className="block font-mono text-xs font-bold text-red-500 tracking-wider uppercase mb-2">
                // SYSTEM OVERVIEW
              </span>
              <p className={`text-sm ${isLight ? 'text-slate-700' : 'text-slate-300'} leading-relaxed`}>
                {selectedProject.caseStudy.overview}
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-3">
              {selectedProject.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg ${isLight ? 'bg-slate-100/70 border-slate-200/80' : 'bg-white/[0.03] border-white/5'
                    } border text-center`}
                >
                  <span
                    className={`block font-mono text-lg font-black ${isLight ? 'text-slate-900' : 'text-white'
                      }`}
                  >
                    {m.val}
                  </span>
                  <span
                    className={`font-mono text-[9px] ${isLight ? 'text-slate-500' : 'text-slate-400'
                      } uppercase tracking-wider`}
                  >
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Challenges */}
            <div>
              <span className="block font-mono text-xs font-bold text-red-500 tracking-wider uppercase mb-3">
                // ARCHITECTURAL CHALLENGES
              </span>
              <ul className="flex flex-col gap-2">
                {selectedProject.caseStudy.challenges.map((ch, idx) => (
                  <li key={idx} className={`flex items-start gap-2.5 text-sm ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    <span className="text-red-500 font-bold font-mono">▸</span>
                    <span>{ch}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <span className="block font-mono text-xs font-bold text-red-500 tracking-wider uppercase mb-3">
                // ENGINEERED SOLUTIONS
              </span>
              <ul className="flex flex-col gap-2">
                {selectedProject.caseStudy.solutions.map((sol, idx) => (
                  <li key={idx} className={`flex items-start gap-2.5 text-sm ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    <span className="text-emerald-500 font-bold font-mono">✓</span>
                    <span>{sol}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables */}
            <div>
              <span className="block font-mono text-xs font-bold text-red-500 tracking-wider uppercase mb-3">
                // SYSTEM DELIVERABLES
              </span>
              <ul className="flex flex-col gap-2">
                {selectedProject.caseStudy.deliverables.map((del, idx) => (
                  <li key={idx} className={`flex items-start gap-2.5 text-sm ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    <span className="text-red-500 font-bold font-mono">■</span>
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div>
              <span className="block font-mono text-xs font-bold text-red-500 tracking-wider uppercase mb-3">
                // TECHNOLOGY STACK
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech.map((t) => (
                  <span
                    key={t}
                    className={`px-3 py-1 rounded-md ${isLight
                      ? 'bg-slate-100 border-slate-200 text-slate-800'
                      : 'bg-white/[0.05] border-white/10 text-slate-300'
                      } border font-mono text-xs font-semibold`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </aside>
    </section>
  )
}
