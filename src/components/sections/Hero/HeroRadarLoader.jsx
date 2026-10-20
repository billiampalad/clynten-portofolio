import { useMemo, useState, useEffect } from 'react'

const SLATS = [
  { id: '01', code: 'SYS_RECON' },
  { id: '02', code: 'RADAR_SYNC' },
  { id: '03', code: 'CBP_SIGNAL' },
  { id: '04', code: 'HUD_LOCK' },
  { id: '05', code: 'INITIALIZE' },
]

export default function HeroRadarLoader({ progress = 0, onComplete }) {
  const percentage = Math.min(100, Math.max(0, Math.round(progress)))
  const isComplete = percentage >= 100

  // Active theme color (Cyber Neon Red)
  const activeColorHex = '#f43f5e'

  // State to control the staggered shutter wipe transition
  const [isShutterOpen, setIsShutterOpen] = useState(false)

  // Trigger shutter opening after reaching 100%
  useEffect(() => {
    if (!isComplete) return

    // 1. Brief pause to show 'TARGET LOCKED' (450ms)
    const lockTimer = setTimeout(() => {
      setIsShutterOpen(true)
    }, 450)

    // 2. Wait for all 5 shutter slats to finish sliding up (450ms + 320ms stagger + 700ms duration = ~1470ms)
    const completeTimer = setTimeout(() => {
      if (onComplete) {
        onComplete()
      }
    }, 1500)

    return () => {
      clearTimeout(lockTimer)
      clearTimeout(completeTimer)
    }
  }, [isComplete, onComplete])

  // Disable scrolling & hide scrollbar while loader is active
  useEffect(() => {
    const originalHtmlOverflow = document.documentElement.style.overflow
    const originalBodyOverflow = document.body.style.overflow

    // Hide scrollbar and prevent scroll gestures during loader
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    const preventScroll = (e) => {
      e.preventDefault()
    }

    const preventKeyScroll = (e) => {
      if (['ArrowUp', 'ArrowDown', 'Space', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.code)) {
        e.preventDefault()
      }
    }

    window.addEventListener('wheel', preventScroll, { passive: false })
    window.addEventListener('touchmove', preventScroll, { passive: false })
    window.addEventListener('keydown', preventKeyScroll, { passive: false })

    window.scrollTo(0, 0)

    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow
      document.body.style.overflow = originalBodyOverflow
      window.removeEventListener('wheel', preventScroll)
      window.removeEventListener('touchmove', preventScroll)
      window.removeEventListener('keydown', preventKeyScroll)
    }
  }, [])

  // Dynamic telemetry status text based on scan progress
  const statusText = useMemo(() => {
    if (isShutterOpen) return 'DECRYPTING BIOMETRICS // OPENING SHUTTER...'
    if (percentage < 25) return 'CALIBRATING OPTICAL SENSORS...'
    if (percentage < 50) return 'SCANNING DEVELOPER FREQUENCY...'
    if (percentage < 75) return 'SYNCHRONIZING FRAME TELEMETRY...'
    if (percentage < 100) return 'TARGET DETECTED // DECRYPTING DATA...'
    return 'SIGNAL LOCKED // INITIALIZING HUD'
  }, [percentage, isShutterOpen])

  // Formatted percentage with leading zero (e.g., 007%, 048%, 100%)
  const formattedPercentage = String(percentage).padStart(3, '0')

  // 10 Segmented Cyber Blocks for visual telemetry
  const totalBlocks = 10
  const activeBlocks = Math.round((percentage / 100) * totalBlocks)

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-mono select-none pointer-events-auto">
      {/* ====================================================================
          LAYER 1: Staggered Cyber Shutter (Multi-Bar Curtain Wipe)
          5 vertical slats that slide up sequentially to reveal the hero canvas
          ==================================================================== */}
      <div className="absolute inset-0 flex pointer-events-none z-10">
        {SLATS.map((slat, idx) => (
          <div
            key={slat.id}
            className={`relative h-full flex-1 bg-[#0A0907] transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
              isShutterOpen ? '-translate-y-full' : 'translate-y-0'
            }`}
            style={{
              transitionDelay: `${idx * 80}ms`,
            }}
          >
            {/* Slat Top Glowing Red Laser Blade */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-transparent shadow-[0_0_12px_#f43f5e]" />

            {/* Slat Bottom Glowing Red Laser Blade */}
            <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-transparent shadow-[0_0_12px_#f43f5e]" />

            {/* Slat Tactical Micro Identifier */}
            <div className="absolute bottom-5 inset-x-0 flex flex-col items-center gap-0.5 text-[8px] sm:text-[9px] tracking-widest text-zinc-600 select-none">
              <span>// {slat.id}</span>
              <span className="hidden sm:inline-block text-[7px] text-zinc-600 font-semibold">
                {slat.code}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ====================================================================
          LAYER 2: Radar Scope & HUD Overlay
          Fades out smoothly when the shutter opens so attention moves to the canvas
          ==================================================================== */}
      <div
        className={`absolute inset-0 z-20 flex flex-col items-center justify-center text-white transition-all duration-300 ${
          isShutterOpen ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        {/* Background Ambient Radial Glow (Pure Neon Red) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(244,63,94,0.12) 0%, transparent 70%)',
          }}
        />

        {/* Main Radar Scope */}
        <div className="relative flex items-center justify-center w-72 h-72 sm:w-80 sm:h-80 max-w-[82vw] max-h-[82vw]">
          {/* Outer Rotating Compass Degree Ring - Neon Red */}
          <div className="absolute inset-0 rounded-full border border-dashed border-rose-500/35 animate-[spin_35s_linear_infinite]" />

          {/* Cardinal Azimuth Degrees in Neon Red */}
          <span className="absolute top-1 text-[8px] tracking-widest text-rose-400/80 font-bold">
            000°
          </span>
          <span className="absolute right-1 text-[8px] tracking-widest text-rose-400/80 font-bold">
            090°
          </span>
          <span className="absolute bottom-1 text-[8px] tracking-widest text-rose-400/80 font-bold">
            180°
          </span>
          <span className="absolute left-1 text-[8px] tracking-widest text-rose-400/80 font-bold">
            270°
          </span>

          {/* Middle Concentric Sonar Ring - Rose / Red */}
          <div className="absolute w-[68%] h-[68%] rounded-full border border-rose-500/25" />

          {/* Inner Concentric Sonar Ring - Rose / Red Dotted */}
          <div className="absolute w-[42%] h-[42%] rounded-full border border-rose-500/35 border-dotted" />

          {/* Crosshair Center Lines with Subtle Red Gradient */}
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-rose-500/30 to-transparent pointer-events-none" />
          <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-rose-500/30 to-transparent pointer-events-none" />

          {/* Sweeping Conical Radar Beam (Neon Red) */}
          <div
            className="absolute inset-0 rounded-full animate-[spin_2.8s_linear_infinite] pointer-events-none"
            style={{
              background: 'conic-gradient(from 0deg, transparent 0deg, transparent 280deg, rgba(244,63,94,0.06) 320deg, rgba(244,63,94,0.40) 360deg)',
            }}
          >
            {/* Laser Sweep Leading Ray with Active Red Glow */}
            <div
              className="absolute top-0 left-1/2 w-1/2 h-[1.5px]"
              style={{
                background: 'linear-gradient(to right, transparent, #f43f5e)',
                boxShadow: '0 0 10px #f43f5e',
              }}
            />
          </div>

          {/* Simulated Detected Signal Blip Targets (Neon Red) */}
          {/* 1. Red Signal Blip (Sector Alpha) */}
          <div className="absolute top-[26%] left-[70%] flex items-center gap-1 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e] animate-ping" />
            <span className="text-[7px] text-rose-400/80 font-mono tracking-widest hidden sm:inline">R-01</span>
          </div>

          {/* 2. Red Signal Blip (Sector Beta) */}
          <div className="absolute top-[72%] left-[32%] flex items-center gap-1 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e] animate-pulse" />
            <span className="text-[7px] text-rose-400/80 font-mono tracking-widest hidden sm:inline">R-02</span>
          </div>

          {/* 3. Red Signal Blip (Sector Gamma) */}
          <div className="absolute top-[36%] left-[24%] flex items-center gap-1 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e] animate-pulse" />
            <span className="text-[7px] text-rose-400/80 font-mono tracking-widest hidden sm:inline">R-03</span>
          </div>

          {/* Center Digital HUD Target Hub */}
          <div className="relative z-10 flex flex-col items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-black/90 backdrop-blur-md border border-rose-500/40 shadow-[0_0_30px_rgba(244,63,94,0.25)]">
            {/* Rotating Hub Trim Ring */}
            <div className="absolute inset-[-4px] rounded-full border border-dashed border-rose-500/30 animate-[spin_18s_linear_infinite]" />

            {/* Percentage Value */}
            <div className="flex items-baseline justify-center text-rose-400 drop-shadow-[0_0_12px_rgba(244,63,94,0.7)]">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {formattedPercentage}
              </span>
              <span className="text-xs sm:text-sm font-medium ml-0.5 opacity-80">
                %
              </span>
            </div>

            {/* Target Status Badge */}
            <span
              className={`mt-1 text-[8px] sm:text-[9px] tracking-widest font-bold uppercase ${
                isComplete
                  ? 'text-rose-300 drop-shadow-[0_0_8px_#f43f5e]'
                  : 'text-rose-400/90'
              }`}
            >
              {isComplete ? 'TARGET LOCKED' : 'SEARCHING FREQUENCY'}
            </span>
          </div>
        </div>

        {/* Bottom Telemetry Information & Micro Progress Bar */}
        <div className="mt-8 sm:mt-10 flex flex-col items-center gap-3 w-72 sm:w-84 max-w-[85vw] pointer-events-none">
          {/* Dynamic Status Text Line */}
          <div className="flex items-center gap-2 text-[10px] sm:text-xs tracking-widest text-zinc-300 text-center font-medium">
            <span className="font-bold animate-pulse text-rose-400">
              &gt;
            </span>
            <span className="truncate">{statusText}</span>
          </div>

          {/* Modern Sleek Neon Red Progress Bar */}
          <div className="w-full h-1.5 bg-zinc-900/90 border border-rose-500/25 rounded-full overflow-hidden p-[1px] shadow-[inset_0_0_6px_rgba(0,0,0,0.8)]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-red-500 shadow-[0_0_12px_#f43f5e] transition-all duration-200 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>

          {/* 10 Segmented Cyber Data Blocks in Neon Red */}
          <div className="flex items-center justify-between w-full gap-1 pt-1">
            {Array.from({ length: totalBlocks }).map((_, idx) => {
              const isBlockActive = idx < activeBlocks

              return (
                <div
                  key={idx}
                  className={`h-1 flex-1 rounded-[1px] transition-all duration-200 ${
                    isBlockActive ? 'bg-rose-500 shadow-[0_0_5px_#f43f5e]' : 'bg-zinc-800'
                  }`}
                />
              )
            })}
          </div>

          {/* Coordinates Metadata Row */}
          <div className="flex items-center justify-between w-full text-[8px] sm:text-[9px] tracking-widest text-zinc-500 pt-0.5">
            <span>LAT: 07°14'N // LON: 112°45'E</span>
            <span className="font-semibold text-rose-400/80">
              CBP-SIGNAL 99.4%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
