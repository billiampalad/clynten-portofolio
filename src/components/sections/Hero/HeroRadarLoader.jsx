import { useMemo } from 'react'

export default function HeroRadarLoader({ progress = 0 }) {
  const percentage = Math.min(100, Math.max(0, Math.round(progress)))
  const isComplete = percentage >= 100

  // Dynamic telemetry status text based on scan progress
  const statusText = useMemo(() => {
    if (percentage < 25) return 'CALIBRATING OPTICAL SENSORS...'
    if (percentage < 50) return 'SCANNING DEVELOPER FREQUENCY...'
    if (percentage < 75) return 'SYNCHRONIZING FRAME TELEMETRY...'
    if (percentage < 100) return 'TARGET DETECTED // DECRYPTING DATA...'
    return 'SIGNAL LOCKED // INITIALIZING SIGNAL'
  }, [percentage])

  // Formatted percentage with leading zero (e.g., 007%, 048%, 100%)
  const formattedPercentage = String(percentage).padStart(3, '0')

  // 10 Segmented Cyber Blocks for visual telemetry
  const totalBlocks = 10
  const activeBlocks = Math.round((percentage / 100) * totalBlocks)

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center font-mono select-none overflow-hidden bg-[#0A0907] text-white transition-all duration-500 ${
        isComplete ? 'scale-[1.02] brightness-110' : ''
      }`}
    >
      {/* Background Subtle Tech Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:36px_36px] opacity-40 pointer-events-none" />

      {/* Background Ambient Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,170,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* 4 Corner Tech HUD Brackets */}
      <div className="absolute top-5 left-5 w-7 h-7 border-t-2 border-l-2 border-emerald-400/80 pointer-events-none">
        <span className="absolute -top-3 left-0 text-[8px] tracking-widest text-emerald-400/50">
          [SYS_INIT]
        </span>
      </div>
      <div className="absolute top-5 right-5 w-7 h-7 border-t-2 border-r-2 border-emerald-400/80 pointer-events-none">
        <span className="absolute -top-3 right-0 text-[8px] tracking-widest text-emerald-400/50">
          [FREQ_LIVE]
        </span>
      </div>
      <div className="absolute bottom-5 left-5 w-7 h-7 border-b-2 border-l-2 border-emerald-400/80 pointer-events-none">
        <span className="absolute -bottom-3 left-0 text-[8px] tracking-widest text-emerald-400/50">
          [07°14'N]
        </span>
      </div>
      <div className="absolute bottom-5 right-5 w-7 h-7 border-b-2 border-r-2 border-emerald-400/80 pointer-events-none">
        <span className="absolute -bottom-3 right-0 text-[8px] tracking-widest text-emerald-400/50">
          [112°45'E]
        </span>
      </div>

      {/* Top Header Telemetry */}
      <div className="absolute top-7 left-8 right-8 sm:left-14 sm:right-14 flex items-center justify-between text-[10px] sm:text-xs tracking-widest text-zinc-400 pointer-events-none">
        <div className="flex items-center gap-2.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 shadow-[0_0_12px_rgba(0,255,170,0.15)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="font-semibold tracking-wider">BIO-RADAR V2.4</span>
        </div>
        <span className="hidden sm:inline-block text-zinc-500 tracking-wider">
          CH: 142.80 MHz // ENCRYPTED
        </span>
      </div>

      {/* Main Radar Scope */}
      <div className="relative flex items-center justify-center w-72 h-72 sm:w-80 sm:h-80 max-w-[82vw] max-h-[82vw]">
        {/* Outer Rotating Compass Degree Ring */}
        <div className="absolute inset-0 rounded-full border border-dashed border-emerald-400/30 animate-[spin_35s_linear_infinite]" />

        {/* Cardinal Azimuth Degrees */}
        <span className="absolute top-1 text-[8px] tracking-widest text-emerald-400/60 font-bold">
          000°
        </span>
        <span className="absolute right-1 text-[8px] tracking-widest text-emerald-400/60 font-bold">
          090°
        </span>
        <span className="absolute bottom-1 text-[8px] tracking-widest text-emerald-400/60 font-bold">
          180°
        </span>
        <span className="absolute left-1 text-[8px] tracking-widest text-emerald-400/60 font-bold">
          270°
        </span>

        {/* Middle Concentric Sonar Ring */}
        <div className="absolute w-[68%] h-[68%] rounded-full border border-emerald-400/20" />

        {/* Inner Concentric Sonar Ring */}
        <div className="absolute w-[42%] h-[42%] rounded-full border border-emerald-400/30 border-dotted" />

        {/* Crosshair Center Lines */}
        <div className="absolute w-full h-[1px] bg-emerald-400/20 pointer-events-none" />
        <div className="absolute h-full w-[1px] bg-emerald-400/20 pointer-events-none" />

        {/* Sweeping Conical Radar Beam */}
        <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_280deg,rgba(0,255,170,0.06)_320deg,rgba(0,255,170,0.38)_360deg)] animate-[spin_2.8s_linear_infinite] pointer-events-none">
          {/* Laser Sweep Leading Ray */}
          <div className="absolute top-0 left-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent to-emerald-300 shadow-[0_0_8px_#00ffaa]" />
        </div>

        {/* Simulated Detected Signal Blip Dots */}
        <div className="absolute top-[26%] left-[68%] w-1.5 h-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_#00ffaa] animate-ping opacity-80" />
        <div className="absolute top-[72%] left-[34%] w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00bfff] animate-pulse opacity-90" />
        <div className="absolute top-[38%] left-[26%] w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#00ffaa] animate-pulse opacity-75" />

        {/* Center Digital HUD Target Hub */}
        <div className="relative z-10 flex flex-col items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-black/85 border border-emerald-400/40 backdrop-blur-md shadow-[0_0_30px_rgba(0,255,170,0.18)]">
          {/* Percentage Value */}
          <div className="flex items-baseline justify-center text-emerald-300 drop-shadow-[0_0_12px_rgba(0,255,170,0.65)]">
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {formattedPercentage}
            </span>
            <span className="text-xs sm:text-sm font-medium text-emerald-400 ml-0.5">
              %
            </span>
          </div>

          {/* Target Status Badge */}
          <span
            className={`mt-1 text-[8px] sm:text-[9px] tracking-widest font-bold uppercase transition-all duration-300 ${
              isComplete
                ? 'text-emerald-300 drop-shadow-[0_0_8px_#00ffaa]'
                : 'text-zinc-400'
            }`}
          >
            {isComplete ? 'TARGET LOCKED' : 'SEARCHING'}
          </span>
        </div>
      </div>

      {/* Bottom Telemetry Information & Micro Progress Bar */}
      <div className="mt-8 sm:mt-10 flex flex-col items-center gap-3 w-72 sm:w-84 max-w-[85vw] pointer-events-none">
        {/* Dynamic Status Text Line */}
        <div className="flex items-center gap-2 text-[10px] sm:text-xs tracking-widest text-zinc-300 text-center font-medium">
          <span className="text-emerald-400 font-bold animate-pulse">&gt;</span>
          <span className="truncate">{statusText}</span>
        </div>

        {/* Modern Sleek Neon Progress Bar */}
        <div className="w-full h-1.5 bg-zinc-900/90 border border-emerald-500/30 rounded-full overflow-hidden p-[1px] shadow-[inset_0_0_6px_rgba(0,0,0,0.8)]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-emerald-300 shadow-[0_0_10px_#00ffaa] transition-all duration-200 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* 10 Segmented Cyber Data Blocks */}
        <div className="flex items-center justify-between w-full gap-1 pt-1">
          {Array.from({ length: totalBlocks }).map((_, idx) => (
            <div
              key={idx}
              className={`h-1 flex-1 rounded-[1px] transition-colors duration-200 ${
                idx < activeBlocks
                  ? 'bg-emerald-400 shadow-[0_0_4px_#00ffaa]'
                  : 'bg-zinc-800'
              }`}
            />
          ))}
        </div>

        {/* Coordinates Metadata Row */}
        <div className="flex items-center justify-between w-full text-[8px] sm:text-[9px] tracking-widest text-zinc-500 pt-0.5">
          <span>LAT: 07°14'N // LON: 112°45'E</span>
          <span className="text-emerald-400/70 font-semibold">CBP-SIGNAL 99.4%</span>
        </div>
      </div>
    </div>
  )
}
