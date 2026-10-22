import { useState, useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/animations/gsap'
import { PROJECTS_DATA } from '@/content/projects'

const CIRCUMFERENCE = 219.91 // 2 * PI * 35

export default function Projects() {
  const pinWrapperRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isLightMode, setIsLightMode] = useState(() => {
    if (typeof document !== 'undefined') {
      return (
        document.documentElement.getAttribute('data-theme') === 'light' ||
        document.documentElement.classList.contains('light-theme')
      )
    }
    return false
  })

  // Observe theme changes (dark/light toggle)
  useEffect(() => {
    if (typeof document === 'undefined') return
    const checkTheme = () => {
      const isLight =
        document.documentElement.getAttribute('data-theme') === 'light' ||
        document.documentElement.classList.contains('light-theme')
      setIsLightMode(isLight)
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
    const pinWrapper = pinWrapperRef.current
    if (!pinWrapper) return

    const trigger = ScrollTrigger.create({
      trigger: pinWrapper,
      start: 'top top',
      end: '+=350%',
      pin: true,
      scrub: 0.8,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = Math.max(0, Math.min(1, self.progress))
        setScrollProgress(progress)
        setHasScrolled(progress > 0.001)

        // Calculate active project index based on scroll range
        const total = PROJECTS_DATA.length
        const step = Math.min(Math.floor(progress * total), total - 1)
        setCurrentIndex(step)
      },
    })

    return () => {
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

  const isEffectActive = currentIndex > 0 || hasScrolled || scrollProgress > 0.001

  return (
    <section
      id="projects"
      className={`relative w-full transition-colors duration-700 ${
        isLightMode ? 'text-[#0f172a]' : 'text-[#f1f5f9]'
      }`}
      style={{
        background: isLightMode ? 'var(--nav-bg, #f8fafc)' : 'var(--nav-bg, #0A0907)',
      }}
    >
      {/* Pinned 100vh Fullscreen Viewport Stage */}
      <div
        ref={pinWrapperRef}
        className="relative w-full h-screen min-h-screen overflow-hidden flex flex-col justify-between p-6 sm:p-10 md:p-14 select-none box-border"
      >
        {/* =========================================================================
            DYNAMIC BLURRED PROJECT BACKGROUND LAYERS (GPU-Accelerated Crossfade)
            - At Scroll 0 on Project 01: Clean theme background 100% identical to Skills.jsx
            - Once scroll starts (isEffectActive): Project image, ambient glow, and tint smoothly fade in
            - On subsequent projects: Smooth crossfades to current project image
            ========================================================================= */}
        <div
          className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 transition-opacity duration-700 ease-out ${
            isEffectActive ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        >
          {PROJECTS_DATA.map((project, idx) => {
            const isActive = idx === currentIndex

            return (
              <div
                key={project.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-out will-change-[opacity] ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={project.image}
                  alt=""
                  className={`w-full h-full object-cover object-center scale-105 filter blur-[6px] ${
                    isLightMode ? 'brightness-105 opacity-95' : 'brightness-100 opacity-100'
                  } contrast-[1.08] transition-transform duration-1000 ease-out`}
                  draggable={false}
                />
              </div>
            )
          })}

          {/* Contrast Tint Overlay: Lightweight tint so project image details are crisp and clear */}
          <div
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              isLightMode
                ? 'bg-gradient-to-b from-[#f8fafc]/50 via-[#f8fafc]/25 to-[#f8fafc]/55'
                : 'bg-gradient-to-b from-[#0A0907]/35 via-[#0A0907]/15 to-[#0A0907]/45'
            }`}
          />

          {/* Dynamic Ambient Neon Glow matched to active project */}
          <div
            className={`absolute inset-0 transition-all duration-1000 ease-out bg-gradient-to-tr ${currentProject.ambientGlow} blur-3xl ${
              isLightMode ? 'opacity-15' : 'opacity-20'
            }`}
          />
        </div>

        {/* Top Header Row */}
        <div className="relative z-10 w-full flex items-center justify-between">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md transition-colors duration-300 ${
              isLightMode ? 'bg-black/5 border border-black/10' : 'bg-white/5 border border-white/10'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span
              className={`font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase ${
                isLightMode ? 'text-slate-700' : 'text-slate-300'
              }`}
            >
              WORK // 0{currentIndex + 1} OF 0{PROJECTS_DATA.length}
            </span>
          </div>

          <div
            className={`font-mono text-xs tracking-wider hidden sm:block ${
              isLightMode ? 'text-slate-600' : 'text-slate-400'
            }`}
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
              className={`font-mono font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter uppercase leading-none transition-all duration-500 ${
                isLightMode ? 'text-slate-900 drop-shadow-sm' : 'text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]'
              }`}
            >
              {currentProject.shortTitle}
            </h2>
            <p
              className={`font-mono text-xs sm:text-sm mt-3 max-w-xs font-medium ${
                isLightMode ? 'text-slate-600' : 'text-slate-400'
              }`}
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
                  {/* Subtle edge depth gradient maintaining ~90% clarity */}
                  <div className="pointer-events-none absolute inset-0 rounded-md bg-gradient-to-t from-transparent via-transparent to-[#0A0907]/20" />
                </div>
              ) : null}
            </div>

            {/* 2. CENTER ACTIVE PROJECT IMAGE (Hero focus, full size, clickable to open case study drawer) */}
            <div
              key={currentProject.id}
              onClick={() => handleOpenDrawer(currentProject)}
              className="relative z-20 w-full max-w-[540px] lg:max-w-[620px] aspect-[16/10] overflow-hidden rounded-xl shadow-2xl shadow-black/95 cursor-pointer group transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform hover:scale-[1.02]"
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
                  {/* Subtle edge depth gradient maintaining ~90% clarity */}
                  <div className="pointer-events-none absolute inset-0 rounded-md bg-gradient-to-b from-transparent via-transparent to-[#0A0907]/20" />
                </div>
              ) : null}
            </div>
          </div>

          {/* Right Column: Narrative Summary & Circular Step Progress */}
          <div className="w-full md:w-1/4 flex flex-col md:items-end justify-between text-left md:text-right gap-6">
            <div className="flex flex-col md:items-end">
              <p
                className={`text-xs sm:text-sm md:text-[13.5px] font-sans leading-relaxed tracking-normal max-w-xs transition-all duration-500 ${
                  isLightMode ? 'text-slate-700' : 'text-slate-300'
                }`}
              >
                {currentProject.summary}
              </p>

              <button
                type="button"
                onClick={() => handleOpenDrawer(currentProject)}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/20 hover:bg-red-600 border border-red-500/40 hover:border-red-500 text-red-400 hover:text-white font-mono text-xs font-bold transition-all duration-300 cursor-pointer"
              >
                <span>EXPLORE CASE STUDY</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>

            {/* Circular Step Indicator (Matching Meer Mohsin Reference) */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mt-2">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 86 86">
                <circle
                  stroke={isLightMode ? 'rgba(15, 23, 42, 0.12)' : 'rgba(255, 255, 255, 0.15)'}
                  strokeWidth="2.5"
                  fill="transparent"
                  cx="43"
                  cy="43"
                  r="35"
                />
                <circle
                  stroke={isLightMode ? '#0f172a' : '#ffffff'}
                  className="transition-all duration-300 ease-out"
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
                  className={`font-mono italic font-bold text-2xl sm:text-3xl tracking-tight ${
                    isLightMode ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  0{currentIndex + 1}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Ticker Bar */}
        <div
          className={`relative z-10 w-full flex items-center justify-between pt-3 border-t font-mono text-[10px] sm:text-xs ${
            isLightMode ? 'border-slate-900/10 text-slate-500' : 'border-white/10 text-slate-500'
          }`}
        >
          <span className="hidden sm:inline">SCROLL DOWN TO ADVANCE NEXT SYSTEM</span>
          <span className={`${isLightMode ? 'text-slate-700' : 'text-slate-400'} font-bold uppercase`}>
            {currentProject.tech.slice(0, 4).join(' • ')}
          </span>
          <span>{currentProject.period}</span>
        </div>
      </div>

      {/* Case Study Off-Canvas Drawer Modal */}
      <div
        className={`fixed inset-0 bg-black/85 backdrop-blur-md z-[100] transition-opacity duration-400 ${
          isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleCloseDrawer}
        aria-hidden="true"
      />

      <aside
        className={`fixed top-0 right-0 w-full max-w-2xl h-full bg-[#0d0c10] border-l border-white/15 p-6 sm:p-10 z-[101] overflow-y-auto transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Project Case Study"
        aria-modal="true"
        role="dialog"
      >
        {selectedProject && (
          <div className="flex flex-col gap-6 font-sans">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="font-mono text-xs font-bold text-red-500 bg-red-500/10 border border-red-500/30 px-3 py-1 rounded-md">
                {selectedProject.code}
              </span>
              <button
                type="button"
                onClick={handleCloseDrawer}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-red-600 hover:text-white border border-white/15 text-slate-300 font-mono text-xs font-bold transition-all"
              >
                ✕ CLOSE
              </button>
            </div>

            <div>
              <h3 className="font-mono font-black text-2xl sm:text-3xl text-white tracking-tight mb-1">
                {selectedProject.title}
              </h3>
              <p className="font-mono text-xs sm:text-sm text-slate-400">
                {selectedProject.subtitle}
              </p>
            </div>

            {/* Overview */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="block font-mono text-xs font-bold text-red-400 tracking-wider uppercase mb-2">
                // SYSTEM OVERVIEW
              </span>
              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedProject.caseStudy.overview}
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-3">
              {selectedProject.metrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-white/[0.03] border border-white/5 text-center">
                  <span className="block font-mono text-lg font-black text-white">{m.val}</span>
                  <span className="font-mono text-[9px] text-slate-400 uppercase tracking-wider">{m.label}</span>
                </div>
              ))}
            </div>

            {/* Challenges */}
            <div>
              <span className="block font-mono text-xs font-bold text-red-400 tracking-wider uppercase mb-3">
                // ARCHITECTURAL CHALLENGES
              </span>
              <ul className="flex flex-col gap-2">
                {selectedProject.caseStudy.challenges.map((ch, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <span className="text-red-500 font-bold font-mono">▸</span>
                    <span>{ch}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <span className="block font-mono text-xs font-bold text-red-400 tracking-wider uppercase mb-3">
                // ENGINEERED SOLUTIONS
              </span>
              <ul className="flex flex-col gap-2">
                {selectedProject.caseStudy.solutions.map((sol, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <span className="text-emerald-400 font-bold font-mono">✓</span>
                    <span>{sol}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables */}
            <div>
              <span className="block font-mono text-xs font-bold text-red-400 tracking-wider uppercase mb-3">
                // SYSTEM DELIVERABLES
              </span>
              <ul className="flex flex-col gap-2">
                {selectedProject.caseStudy.deliverables.map((del, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <span className="text-red-500 font-bold font-mono">■</span>
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div>
              <span className="block font-mono text-xs font-bold text-red-400 tracking-wider uppercase mb-3">
                // TECHNOLOGY STACK
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-md bg-white/[0.05] border border-white/10 font-mono text-xs text-slate-300 font-semibold"
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
