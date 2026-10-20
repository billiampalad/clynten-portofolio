import { useMemo, useState, useEffect } from 'react'

const SLATS = [
  { id: '01', code: 'SYS_RECON', borderClass: 'border-rose-500/20', textClass: 'text-rose-400/50' },
  { id: '02', code: 'RADAR_SYNC', borderClass: 'border-rose-500/20', textClass: 'text-rose-400/50' },
  { id: '03', code: 'CBP_SIGNAL', borderClass: 'border-cyan-500/20', textClass: 'text-cyan-400/50' },
  { id: '04', code: 'HUD_LOCK', borderClass: 'border-emerald-500/20', textClass: 'text-emerald-400/50' },
  { id: '05', code: 'INITIALIZE', borderClass: 'border-emerald-500/20', textClass: 'text-emerald-400/50' },
]

export default function HeroRadarLoader({ progress = 0, onComplete }) {
  const percentage = Math.min(100, Math.max(0, Math.round(progress)))
  const isComplete = percentage >= 100

  // Dynamic Tri-Color Spectrum based on progress:
  // 0% -> 34%: Merah (Rose / Red)
  // 35% -> 69%: Biru (Cyan / Electric Blue)
  // 70% -> 100%: Hijau (Emerald / Cyber Green)
  const isRed = percentage < 35
  const isBlue = percentage >= 35 && percentage < 70
  const isGreen = percentage >= 70

  const activeColorHex = isRed ? '#f43f5e' : isBlue ? '#06b6d4' : '#10b981'

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

  // Dynamic telemetry status text based on scan progress
  const statusText = useMemo(() => {
    if (isShutterOpen) return 'DECRYPTING BIOMETRICS // OPENING SHUTTER...'
    if (percentage < 25) return 'CALIBRATING OPTICAL SENSORS [RED SPECTRUM]...'
    if (percentage < 50) return 'SCANNING DEVELOPER FREQUENCY [BLUE SPECTRUM]...'
    if (percentage < 75) return 'SYNCHRONIZING FRAME TELEMETRY [GREEN SPECTRUM]...'
    if (percentage < 100) return 'TARGET DETECTED // DECRYPTING DATA...'
    return 'SIGNAL LOCKED // INITIALIZING HUD'
  }, [percentage, isShutterOpen])

  // Formatted percentage with leading zero (e.g., 007%, 048%, 100%)
  const formattedPercentage = String(percentage).padStart(3, '0')

  // 10 Segmented Cyber Blocks for visual telemetry
  const totalBlocks = 10
  const activeBlocks = Math.round((percentage / 100) * totalBlocks)

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-mono select-none pointer-events-none">
      {/* ====================================================================
          LAYER 1: Staggered Cyber Shutter (Multi-Bar Curtain Wipe)
          5 vertical slats that slide up sequentially to reveal the hero canvas
          ==================================================================== */}
      <div className="absolute inset-0 flex pointer-events-none z-10">
        {SLATS.map((slat, idx) => (
          <div
            key={slat.id}
            className={`relative h-full flex-1 bg-[#0A0907] border-r ${slat.borderClass} transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
              isShutterOpen ? '-translate-y-full' : 'translate-y-0'
            }`}
            style={{
              transitionDelay: `${idx * 80}ms`,
            }}
          >
            {/* Background Subtle Tech Grid within each slat */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] opacity-35" />

            {/* Slat Bottom Glowing Tri-Color Laser Blade */}
            <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-rose-500 via-cyan-400 to-emerald-400 shadow-[0_0_12px_rgba(6,182,212,0.8)]" />

            {/* Slat Tactical Micro Identifier */}
            <div className={`absolute bottom-5 inset-x-0 flex flex-col items-center gap-0.5 text-[8px] sm:text-[9px] tracking-widest ${slat.textClass} select-none`}>
              <span>// {slat.id}</span>
              <span className="hidden sm:inline-block text-[7px] text-zinc-500 font-semibold">
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
        {/* Background Ambient Radial Glow adapting to active spectrum */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-700"
          style={{
            background: isRed
              ? 'radial-gradient(circle at center, rgba(244,63,94,0.09) 0%, transparent 70%)'
              : isBlue
              ? 'radial-gradient(circle at center, rgba(6,182,212,0.09) 0%, transparent 70%)'
              : 'radial-gradient(circle at center, rgba(16,185,129,0.09) 0%, transparent 70%)',
          }}
        />

        {/* Top Header Telemetry with Tri-Color Status */}
        <div className="absolute top-7 left-8 right-8 sm:left-14 sm:right-14 flex items-center justify-between text-[10px] sm:text-xs tracking-widest text-zinc-400 pointer-events-none">
          <div
            className={`flex items-center gap-2.5 px-3 py-1 rounded-full border backdrop-blur-md transition-all duration-300 ${
              isRed
                ? 'bg-rose-950/40 border-rose-500/35 text-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.18)]'
                : isBlue
                ? 'bg-cyan-950/40 border-cyan-500/35 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.18)]'
                : 'bg-emerald-950/40 border-emerald-500/35 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.18)]'
            }`}
          >
            {/* Tri-Color RGB Channel Lights */}
            <div className="flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isRed ? 'bg-rose-500 shadow-[0_0_8px_#f43f5e] animate-pulse' : 'bg-rose-500/30'
                }`}
              />
              <span
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isBlue ? 'bg-cyan-400 shadow-[0_0_8px_#06b6d4] animate-pulse' : 'bg-cyan-400/30'
                }`}
              />
              <span
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isGreen ? 'bg-emerald-400 shadow-[0_0_8px_#10b981] animate-pulse' : 'bg-emerald-400/30'
                }`}
              />
            </div>
            <span className="font-semibold tracking-wider">TRI-BAND RADAR // V2.4</span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-zinc-500 tracking-wider text-[9px]">
            <span className={`transition-colors duration-300 ${isRed ? 'text-rose-400 font-bold' : ''}`}>
              CH-01: RED
            </span>
            <span>•</span>
            <span className={`transition-colors duration-300 ${isBlue ? 'text-cyan-400 font-bold' : ''}`}>
              CH-02: BLUE
            </span>
            <span>•</span>
            <span className={`transition-colors duration-300 ${isGreen ? 'text-emerald-400 font-bold' : ''}`}>
              CH-03: GREEN
            </span>
          </div>
        </div>

        {/* Main Radar Scope */}
        <div className="relative flex items-center justify-center w-72 h-72 sm:w-80 sm:h-80 max-w-[82vw] max-h-[82vw]">
          {/* Outer Rotating Compass Degree Ring - Cyan / Electric Blue */}
          <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/35 animate-[spin_35s_linear_infinite]" />

          {/* Cardinal Azimuth Degrees in Cyan */}
          <span className="absolute top-1 text-[8px] tracking-widest text-cyan-400/70 font-bold">
            000°
          </span>
          <span className="absolute right-1 text-[8px] tracking-widest text-cyan-400/70 font-bold">
            090°
          </span>
          <span className="absolute bottom-1 text-[8px] tracking-widest text-cyan-400/70 font-bold">
            180°
          </span>
          <span className="absolute left-1 text-[8px] tracking-widest text-cyan-400/70 font-bold">
            270°
          </span>

          {/* Middle Concentric Sonar Ring - Rose / Red */}
          <div className="absolute w-[68%] h-[68%] rounded-full border border-rose-500/25" />

          {/* Inner Concentric Sonar Ring - Emerald / Green */}
          <div className="absolute w-[42%] h-[42%] rounded-full border border-emerald-400/35 border-dotted" />

          {/* Crosshair Center Lines with Subtle Gradient */}
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent pointer-events-none" />
          <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-emerald-400/30 to-transparent pointer-events-none" />

          {/* Sweeping Conical Radar Beam */}
          <div
            className="absolute inset-0 rounded-full animate-[spin_2.8s_linear_infinite] pointer-events-none transition-all duration-500"
            style={{
              background: isRed
                ? 'conic-gradient(from 0deg, transparent 0deg, transparent 280deg, rgba(244,63,94,0.06) 320deg, rgba(244,63,94,0.38) 360deg)'
                : isBlue
                ? 'conic-gradient(from 0deg, transparent 0deg, transparent 280deg, rgba(6,182,212,0.06) 320deg, rgba(6,182,212,0.38) 360deg)'
                : 'conic-gradient(from 0deg, transparent 0deg, transparent 280deg, rgba(16,185,129,0.06) 320deg, rgba(16,185,129,0.38) 360deg)',
            }}
          >
            {/* Laser Sweep Leading Ray with Active Glow */}
            <div
              className="absolute top-0 left-1/2 w-1/2 h-[1.5px] transition-all duration-300"
              style={{
                background: `linear-gradient(to right, transparent, ${activeColorHex})`,
                boxShadow: `0 0 10px ${activeColorHex}`,
              }}
            />
          </div>

          {/* Simulated Detected Signal Blip Targets (Merah, Biru, Hijau) */}
          {/* 1. Red Signal Blip (Sector Alpha) */}
          <div className="absolute top-[26%] left-[70%] flex items-center gap-1 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e] animate-ping" />
            <span className="text-[7px] text-rose-400/80 font-mono tracking-widest hidden sm:inline">R-01</span>
          </div>

          {/* 2. Blue Signal Blip (Sector Beta) */}
          <div className="absolute top-[72%] left-[32%] flex items-center gap-1 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4] animate-pulse" />
            <span className="text-[7px] text-cyan-400/80 font-mono tracking-widest hidden sm:inline">B-02</span>
          </div>

          {/* 3. Green Signal Blip (Sector Gamma) */}
          <div className="absolute top-[36%] left-[24%] flex items-center gap-1 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-pulse" />
            <span className="text-[7px] text-emerald-400/80 font-mono tracking-widest hidden sm:inline">G-03</span>
          </div>

          {/* Center Digital HUD Target Hub */}
          <div
            className={`relative z-10 flex flex-col items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-black/90 backdrop-blur-md transition-all duration-300 border ${
              isRed
                ? 'border-rose-500/40 shadow-[0_0_30px_rgba(244,63,94,0.22)]'
                : isBlue
                ? 'border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.22)]'
                : 'border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.22)]'
            }`}
          >
            {/* Rotating Hub Trim Ring */}
            <div
              className={`absolute inset-[-4px] rounded-full border border-dashed animate-[spin_18s_linear_infinite] transition-colors duration-300 ${
                isRed ? 'border-rose-500/30' : isBlue ? 'border-cyan-400/30' : 'border-emerald-400/30'
              }`}
            />

            {/* Percentage Value */}
            <div
              className={`flex items-baseline justify-center transition-colors duration-300 ${
                isRed
                  ? 'text-rose-400 drop-shadow-[0_0_12px_rgba(244,63,94,0.7)]'
                  : isBlue
                  ? 'text-cyan-400 drop-shadow-[0_0_12px_rgba(6,182,212,0.7)]'
                  : 'text-emerald-300 drop-shadow-[0_0_12px_rgba(16,185,129,0.7)]'
              }`}
            >
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {formattedPercentage}
              </span>
              <span className="text-xs sm:text-sm font-medium ml-0.5 opacity-80">
                %
              </span>
            </div>

            {/* Target Status Badge */}
            <span
              className={`mt-1 text-[8px] sm:text-[9px] tracking-widest font-bold uppercase transition-all duration-300 ${
                isComplete
                  ? 'text-emerald-300 drop-shadow-[0_0_8px_#10b981]'
                  : isRed
                  ? 'text-rose-400/90'
                  : isBlue
                  ? 'text-cyan-400/90'
                  : 'text-emerald-400/90'
              }`}
            >
              {isComplete ? 'TARGET LOCKED' : isRed ? 'SEARCHING // RED' : isBlue ? 'TRACKING // BLUE' : 'LOCKING // GREEN'}
            </span>
          </div>
        </div>

        {/* Bottom Telemetry Information & Micro Progress Bar */}
        <div className="mt-8 sm:mt-10 flex flex-col items-center gap-3 w-72 sm:w-84 max-w-[85vw] pointer-events-none">
          {/* Dynamic Status Text Line */}
          <div className="flex items-center gap-2 text-[10px] sm:text-xs tracking-widest text-zinc-300 text-center font-medium">
            <span
              className={`font-bold animate-pulse transition-colors duration-300 ${
                isRed ? 'text-rose-400' : isBlue ? 'text-cyan-400' : 'text-emerald-400'
              }`}
            >
              &gt;
            </span>
            <span className="truncate">{statusText}</span>
          </div>

          {/* Modern Sleek Neon Tri-Color Progress Bar (Merah -> Biru -> Hijau) */}
          <div className="w-full h-1.5 bg-zinc-900/90 border border-white/15 rounded-full overflow-hidden p-[1px] shadow-[inset_0_0_6px_rgba(0,0,0,0.8)]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-rose-500 via-cyan-400 to-emerald-400 shadow-[0_0_12px_rgba(6,182,212,0.6)] transition-all duration-200 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>

          {/* 10 Segmented Cyber Data Blocks with Red (0-2), Blue (3-5), Green (6-9) Spectrum */}
          <div className="flex items-center justify-between w-full gap-1 pt-1">
            {Array.from({ length: totalBlocks }).map((_, idx) => {
              const isBlockActive = idx < activeBlocks
              const blockColorClass =
                idx < 3
                  ? 'bg-rose-500 shadow-[0_0_5px_#f43f5e]'
                  : idx < 6
                  ? 'bg-cyan-400 shadow-[0_0_5px_#06b6d4]'
                  : 'bg-emerald-400 shadow-[0_0_5px_#10b981]'

              return (
                <div
                  key={idx}
                  className={`h-1 flex-1 rounded-[1px] transition-all duration-200 ${
                    isBlockActive ? blockColorClass : 'bg-zinc-800'
                  }`}
                />
              )
            })}
          </div>

          {/* Coordinates Metadata Row */}
          <div className="flex items-center justify-between w-full text-[8px] sm:text-[9px] tracking-widest text-zinc-500 pt-0.5">
            <span>LAT: 07°14'N // LON: 112°45'E</span>
            <span
              className={`font-semibold transition-colors duration-300 ${
                isRed ? 'text-rose-400/80' : isBlue ? 'text-cyan-400/80' : 'text-emerald-400/80'
              }`}
            >
              CBP-SIGNAL 99.4%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
