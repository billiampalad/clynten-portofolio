import { useState, useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/animations/gsap'
import { PROJECTS_DATA } from '@/content/projects'

const CIRCUMFERENCE = 219.91 // 2 * PI * 35

export default function Projects() {
  const pinWrapperRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

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
  const nextProject = PROJECTS_DATA[(currentIndex + 1) % PROJECTS_DATA.length]
  const strokeDashoffset = CIRCUMFERENCE - scrollProgress * CIRCUMFERENCE

  return (
    <section id="projects" className="relative w-full bg-[#0A0907] text-slate-100">
      {/* Pinned 100vh Fullscreen Viewport Stage */}
      <div
        ref={pinWrapperRef}
        className="relative w-full h-screen min-h-screen overflow-hidden flex flex-col justify-between p-6 sm:p-10 md:p-14 select-none box-border"
      >
        {/* Dynamic Ambient Background Glow matched to active project */}
        <div
          className={`absolute inset-0 pointer-events-none transition-all duration-1000 ease-out bg-gradient-to-tr ${currentProject.ambientGlow} blur-3xl opacity-45`}
          aria-hidden="true"
        />

        {/* Cyberpunk Blueprint Subtitle Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
          aria-hidden="true"
        />

        {/* Top Header Row */}
        <div className="relative z-10 w-full flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono text-[10px] sm:text-xs font-bold tracking-widest text-slate-300 uppercase">
              WORK // 0{currentIndex + 1} OF 0{PROJECTS_DATA.length}
            </span>
          </div>

          <div className="font-mono text-xs text-slate-400 tracking-wider hidden sm:block">
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
            <h2 className="font-mono font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter text-white uppercase leading-none transition-all duration-500">
              {currentProject.shortTitle}
            </h2>
            <p className="font-mono text-xs sm:text-sm text-slate-400 mt-3 max-w-xs font-medium">
              {currentProject.category}
            </p>
          </div>

          {/* Center Column: The Central Device Monitor Stage */}
          <div className="w-full md:w-2/4 flex flex-col items-center justify-center">
            {/* Monitor Screen Frame */}
            <div
              onClick={() => handleOpenDrawer(currentProject)}
              className="relative w-full max-w-[580px] lg:max-w-[640px] aspect-[16/10] bg-[#121115] border border-white/20 rounded-2xl shadow-2xl shadow-black/95 p-3 sm:p-4 backdrop-blur-xl overflow-hidden cursor-pointer group hover:border-red-500/50 transition-all duration-500 transform hover:-translate-y-1"
            >
              {/* Glossy Screen Sheen Reflection */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent z-20" />

              {/* Monitor Window Header Dots */}
              <div className="relative z-10 flex items-center justify-between pb-2 border-b border-white/10 mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <span className="font-mono text-[9px] sm:text-[10px] text-slate-400 tracking-widest uppercase">
                  {currentProject.screenMockup.statusText}
                </span>
                <span className="w-2.5" />
              </div>

              {/* High-Impact Screen Content Simulation */}
              <div className="relative z-10 w-full h-[calc(100%-32px)] flex flex-col justify-between p-2 sm:p-4 rounded-xl bg-black/60 border border-white/5 overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] sm:text-xs font-bold text-red-400 tracking-wider">
                    {currentProject.screenMockup.headline}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-white/10 text-slate-200">
                    {currentProject.status}
                  </span>
                </div>

                {/* Central Futuristic Radar Visual Component */}
                <div className="my-auto flex flex-col items-center justify-center py-2 sm:py-4">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-red-500/30 flex items-center justify-center animate-[spin_15s_linear_infinite]">
                    <div className="w-16 h-16 rounded-full border border-dashed border-red-400/50 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-red-500/40 shadow-[0_0_16px_#ef4444] animate-ping" />
                    </div>
                  </div>
                  <p className="font-mono text-[11px] sm:text-xs text-slate-300 mt-3 text-center font-semibold">
                    {currentProject.screenMockup.subline}
                  </p>
                </div>

                {/* Bottom Screen Bar: Key Metric */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10 font-mono text-[10px] sm:text-xs">
                  <span className="text-slate-400">{currentProject.screenMockup.statLabel}</span>
                  <span className="font-bold text-white tracking-wider">{currentProject.screenMockup.statVal}</span>
                </div>

                {/* Hover Click Inspector Badge */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="px-4 py-2 rounded-full bg-red-600 text-white font-mono text-xs font-bold tracking-wider shadow-lg shadow-red-600/50 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    INSPECT ARCHITECTURE ↗
                  </span>
                </div>
              </div>
            </div>

            {/* Monitor Stand Base */}
            <div className="w-20 sm:w-28 h-5 sm:h-6 bg-gradient-to-b from-zinc-600 via-zinc-800 to-zinc-950 rounded-b-md shadow-lg border-t border-white/10" />
            <div className="w-32 sm:w-44 h-2 bg-zinc-800 rounded-full border border-white/10 shadow-md" />

            {/* Bottom Next-Project Image (Plain image, no text, no frame, non-clickable) */}
            <div className="mt-4 sm:mt-6 flex items-center justify-center pointer-events-none select-none">
              <img
                src={nextProject.image}
                alt=""
                className="w-36 sm:w-48 md:w-56 h-auto object-contain rounded-md opacity-80 shadow-2xl transition-all duration-700 ease-out"
                draggable={false}
              />
            </div>
          </div>

          {/* Right Column: Narrative Summary & Circular Step Progress */}
          <div className="w-full md:w-1/4 flex flex-col md:items-end justify-between text-left md:text-right gap-6">
            <div className="flex flex-col md:items-end">
              <p className="text-xs sm:text-sm md:text-[13.5px] text-slate-300 font-sans leading-relaxed tracking-normal max-w-xs transition-all duration-500">
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
                  className="stroke-white/15"
                  strokeWidth="2.5"
                  fill="transparent"
                  cx="43"
                  cy="43"
                  r="35"
                />
                <circle
                  className="stroke-white transition-all duration-300 ease-out"
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
                <span className="font-mono italic font-bold text-2xl sm:text-3xl text-white tracking-tight">
                  0{currentIndex + 1}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Ticker Bar */}
        <div className="relative z-10 w-full flex items-center justify-between pt-3 border-t border-white/10 font-mono text-[10px] sm:text-xs text-slate-500">
          <span className="hidden sm:inline">SCROLL DOWN TO ADVANCE NEXT SYSTEM</span>
          <span className="text-slate-400 font-bold uppercase">{currentProject.tech.slice(0, 4).join(' • ')}</span>
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
