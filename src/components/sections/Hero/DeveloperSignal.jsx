import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { developerSignals } from '@/content/developerSignals'
import { useTextScramble } from '@/hooks/useTextScramble'
import SignalLine from './SignalLine'

export default function DeveloperSignal({ progress = 0 }) {
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
    <motion.div
      initial={{ x: 60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-[45%] right-4 sm:right-8 md:right-10 z-25 font-mono select-none pointer-events-none w-[calc(100vw-32px)] sm:w-[336px] md:w-[350px] p-3.5 sm:p-4 rounded-2xl bg-zinc-950/85 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.85)] -translate-y-1/2"
    >
      {/* Top Telemetry Header */}
      <div className="flex items-center justify-between pb-1.5 border-b border-white/10 whitespace-nowrap">
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[8.5px] sm:text-[9.5px] tracking-wider text-zinc-400 font-semibold uppercase">
            PROFILE SCANNED
          </span>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: totalBlocks }).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1 rounded-[1px] transition-colors duration-150 ${
                  i < filledBlocks
                    ? 'bg-emerald-400 shadow-[0_0_5px_#00ffaa]'
                    : 'bg-zinc-800'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[12px] sm:text-[13px] font-bold text-emerald-400 font-mono">
            {percentage}%
          </span>
          <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[8px] font-bold tracking-widest uppercase border shrink-0 ${badgeClasses}`}>
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${dotClasses}`} />
            <span>{activeSignal.status}</span>
          </div>
        </div>
      </div>

      {/* Dynamic ECG Waveform Line */}
      <div className="my-1">
        <SignalLine progress={progress} />
      </div>

      {/* Main Signal Display Card */}
      <div className="flex flex-col mt-0.5">
        <div className="flex items-center justify-between text-[8.5px] sm:text-[9px] tracking-widest text-zinc-400 whitespace-nowrap">
          <span className="font-semibold text-emerald-400/90 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-500/25 shrink-0">
            PHASE // {activeSignal.phase}
          </span>
          <span className="text-zinc-500 font-medium truncate ml-2 text-[9px] sm:text-[9.5px]">
            {scrambledLabel}
          </span>
        </div>

        <h2 className="text-sm sm:text-[15px] font-black tracking-tight text-white mt-1.5 drop-shadow-[0_0_12px_rgba(255,255,255,0.25)] whitespace-nowrap truncate leading-tight">
          {scrambledTitle}
        </h2>
        <p className="text-[9.5px] sm:text-[10px] text-zinc-400 font-normal leading-normal whitespace-nowrap truncate mt-0.5">
          {activeSignal.subtitle}
        </p>

        {/* Dynamic Skill Stack Badges - 2x2 Grid */}
        {activeSignal.tags && (
          <div className="grid grid-cols-2 gap-1.5 mt-2">
            {activeSignal.tags.map((tag, idx) => (
              <span
                key={idx}
                className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[8.5px] sm:text-[9px] font-medium bg-zinc-900/90 border border-white/10 text-zinc-300 shadow-sm whitespace-nowrap overflow-hidden"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span className="truncate">{tag}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Diagnostics Matrix */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.65 }}
        className="grid grid-cols-4 gap-1.5 pt-2 mt-2 border-t border-white/10 text-center whitespace-nowrap"
      >
        <div className="flex flex-col">
          <span className="text-[7.5px] tracking-wider text-zinc-500 uppercase">FREQ</span>
          <span className="text-[9.5px] sm:text-[10px] font-bold text-emerald-300 truncate">
            {activeSignal.metrics?.freq || '3.20 GHz'}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[7.5px] tracking-wider text-zinc-500 uppercase">LATENCY</span>
          <span className="text-[9.5px] sm:text-[10px] font-bold text-emerald-300 truncate">
            {activeSignal.metrics?.latency || '< 0.02 ms'}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[7.5px] tracking-wider text-zinc-500 uppercase">ACCURACY</span>
          <span className="text-[9.5px] sm:text-[10px] font-bold text-emerald-300 truncate">
            {activeSignal.metrics?.accuracy || '99.8%'}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[7.5px] tracking-wider text-zinc-500 uppercase">ENCRYPT</span>
          <span className="text-[9.5px] sm:text-[10px] font-bold text-emerald-300 truncate">
            AES-256
          </span>
        </div>
      </motion.div>

      {/* Micro Status Bar */}
      <div className="flex items-center justify-between text-[8px] sm:text-[8.5px] tracking-widest text-zinc-500 pt-2 whitespace-nowrap">
        <span>SYS_ID: CLYNTEN-DEV</span>
        <span className="text-emerald-400/80 font-semibold">ONLINE // STREAM</span>
      </div>
    </motion.div>
  )
}
