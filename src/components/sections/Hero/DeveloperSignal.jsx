import { useMemo, useState, useEffect } from 'react'
import { developerSignals } from '@/content/developerSignals'
import { useTextScramble } from '@/hooks/useTextScramble'
import SignalLine from './SignalLine'

export default function DeveloperSignal({ progress = 0 }) {
  const [hasEntered, setHasEntered] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasEntered(true)
    }, 60)
    return () => clearTimeout(timer)
  }, [])

  const activeSignal = useMemo(() => {
    return (
      developerSignals.find(
        (s) => progress >= s.start && progress <= s.end
      ) || developerSignals[developerSignals.length - 1]
    )
  }, [progress])

  const percentage = Math.min(100, Math.max(0, Math.round(progress * 100)))

  // Digital Scramble Text for dynamic Signal titles and status
  const scrambledTitle = useTextScramble(activeSignal.title, 20)
  const scrambledLabel = useTextScramble(activeSignal.label, 30)

  // Segmented 10-block progress bar calculation
  const totalBlocks = 10
  const filledBlocks = Math.round((percentage / 100) * totalBlocks)

  // Color mapping for dynamic status badge
  const themeColor = activeSignal.statusColor || 'green'
  const isCyan = themeColor === 'cyan'
  const isYellow = themeColor === 'yellow' || themeColor === 'amber'
  const isPurple = themeColor === 'purple' || themeColor === 'violet'

  const badgeClasses = isCyan
    ? 'text-cyan-400 border-cyan-500/30 bg-cyan-950/40'
    : isYellow
    ? 'text-amber-400 border-amber-500/30 bg-amber-950/40'
    : isPurple
    ? 'text-purple-400 border-purple-500/30 bg-purple-950/40'
    : 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40'

  const dotClasses = isCyan
    ? 'bg-cyan-400 shadow-[0_0_6px_#00bfff]'
    : isYellow
    ? 'bg-amber-400 shadow-[0_0_6px_#fbbf24]'
    : isPurple
    ? 'bg-purple-400 shadow-[0_0_6px_#c084fc]'
    : 'bg-emerald-400 shadow-[0_0_6px_#00ffaa]'

  return (
    <div
      className={`absolute top-[45%] right-4 sm:right-10 md:right-12 z-25 font-mono select-none pointer-events-none w-[calc(100vw-32px)] sm:w-[450px] md:w-[470px] p-4 sm:p-5 rounded-xl bg-zinc-950/85 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.85),0_0_30px_rgba(0,255,170,0.06)] -translate-y-1/2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        hasEntered ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'
      }`}
    >
      {/* Sci-Fi Decorative Corner Brackets */}
      <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-emerald-400/80 rounded-tl-[4px]" />
      <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-emerald-400/80 rounded-tr-[4px]" />
      <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-emerald-400/80 rounded-bl-[4px]" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-emerald-400/80 rounded-br-[4px]" />

      {/* Dynamic Glowing Top Laser Beam */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_10px_#00ffaa] rounded-t-xl opacity-90" />

      {/* Top Telemetry Header */}
      <div className="flex items-center justify-between pb-2 border-b border-white/10 whitespace-nowrap">
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[9px] tracking-wider text-zinc-400 font-semibold uppercase">
            PROFILE SCANNED
          </span>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: totalBlocks }).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-[1px] transition-colors duration-150 ${
                  i < filledBlocks
                    ? 'bg-emerald-400 shadow-[0_0_4px_#00ffaa]'
                    : 'bg-zinc-800'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold text-emerald-400 font-mono">
            {percentage}%
          </span>
          <div className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[8px] font-bold tracking-widest uppercase border shrink-0 ${badgeClasses}`}>
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${dotClasses}`} />
            <span>{activeSignal.status}</span>
          </div>
        </div>
      </div>

      {/* Dynamic ECG Waveform Line */}
      <SignalLine progress={progress} />

      {/* Main Signal Display Card */}
      <div className="flex flex-col mt-1">
        <div className="flex items-center justify-between text-[9px] tracking-widest text-zinc-400 whitespace-nowrap">
          <span className="font-semibold text-emerald-400/90 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/25 shrink-0">
            PHASE // {activeSignal.phase}
          </span>
          <span className="text-zinc-500 font-medium truncate ml-2">
            {scrambledLabel}
          </span>
        </div>

        <div className="h-7 sm:h-8 flex items-center mt-1">
          <h2 className="text-base sm:text-lg md:text-xl font-black tracking-tight text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.25)] whitespace-nowrap truncate leading-none">
            {scrambledTitle}
          </h2>
        </div>
        <div className="h-5 flex items-center">
          <p className="text-[11px] sm:text-xs text-zinc-400 font-normal leading-normal whitespace-nowrap truncate">
            {activeSignal.subtitle}
          </p>
        </div>

        {/* Dynamic Skill Stack Badges - 2x2 Fixed Grid so size is completely locked */}
        {activeSignal.tags && (
          <div className="grid grid-cols-2 gap-1.5 mt-2.5">
            {activeSignal.tags.map((tag, idx) => (
              <span
                key={idx}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-medium bg-zinc-900/90 border border-white/10 text-zinc-300 shadow-sm whitespace-nowrap overflow-hidden"
              >
                <span className="w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                <span className="truncate">{tag}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Diagnostics Matrix */}
      <div className="grid grid-cols-4 gap-2 pt-3 mt-3 border-t border-white/10 text-center whitespace-nowrap">
        <div className="flex flex-col">
          <span className="text-[8px] tracking-wider text-zinc-500 uppercase">FREQ</span>
          <span className="text-[10px] font-bold text-emerald-300 truncate">
            {activeSignal.metrics?.freq || '3.20 GHz'}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[8px] tracking-wider text-zinc-500 uppercase">LATENCY</span>
          <span className="text-[10px] font-bold text-emerald-300 truncate">
            {activeSignal.metrics?.latency || '< 0.02 ms'}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[8px] tracking-wider text-zinc-500 uppercase">ACCURACY</span>
          <span className="text-[10px] font-bold text-emerald-300 truncate">
            {activeSignal.metrics?.accuracy || '99.8%'}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[8px] tracking-wider text-zinc-500 uppercase">ENCRYPT</span>
          <span className="text-[10px] font-bold text-emerald-300 truncate">
            AES-256
          </span>
        </div>
      </div>

      {/* Micro Status Bar */}
      <div className="flex items-center justify-between text-[8px] tracking-widest text-zinc-500 pt-2.5 whitespace-nowrap">
        <span>SYS_ID: CLYNTEN-DEV</span>
        <span className="text-emerald-400/80 font-semibold">ONLINE // STREAM</span>
      </div>
    </div>
  )
}
