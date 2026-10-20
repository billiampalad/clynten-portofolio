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

  // Dynamic color theme mapped to scroll progress:
  // Scroll 0.00 -> 0.33: Merah (Rose / Red)
  // Scroll 0.33 -> 0.67: Biru (Cyan / Electric Blue)
  // Scroll 0.67 -> 1.00: Hijau (Emerald / Cyber Green)
  const isRed = progress < 0.33
  const isBlue = progress >= 0.33 && progress < 0.67
  const themeColor = isRed ? 'red' : isBlue ? 'blue' : 'green'

  const beamHex = isRed ? '#f43f5e' : isBlue ? '#06b6d4' : '#10b981'

  const cardBorderClass = isRed
    ? 'border-rose-500/35 shadow-[0_20px_50px_-10px_rgba(244,63,94,0.18)]'
    : isBlue
    ? 'border-cyan-500/35 shadow-[0_20px_50px_-10px_rgba(6,182,212,0.18)]'
    : 'border-emerald-500/35 shadow-[0_20px_50px_-10px_rgba(16,185,129,0.18)]'

  const badgeClasses = isRed
    ? 'text-rose-400 border-rose-500/35 bg-rose-950/40'
    : isBlue
    ? 'text-cyan-400 border-cyan-500/35 bg-cyan-950/40'
    : 'text-emerald-400 border-emerald-500/35 bg-emerald-950/40'

  const dotClasses = isRed
    ? 'bg-rose-400 shadow-[0_0_6px_#f43f5e]'
    : isBlue
    ? 'bg-cyan-400 shadow-[0_0_6px_#06b6d4]'
    : 'bg-emerald-400 shadow-[0_0_6px_#10b981]'

  const blockActiveClass = isRed
    ? 'bg-rose-500 shadow-[0_0_5px_#f43f5e]'
    : isBlue
    ? 'bg-cyan-400 shadow-[0_0_5px_#06b6d4]'
    : 'bg-emerald-400 shadow-[0_0_5px_#10b981]'

  const percentTextClass = isRed
    ? 'text-rose-400'
    : isBlue
    ? 'text-cyan-400'
    : 'text-emerald-400'

  const phasePillClass = isRed
    ? 'text-rose-400/90 bg-rose-950/40 border-rose-500/30'
    : isBlue
    ? 'text-cyan-400/90 bg-cyan-950/40 border-cyan-500/30'
    : 'text-emerald-400/90 bg-emerald-950/40 border-emerald-500/30'

  const tagDotClass = isRed
    ? 'bg-rose-400 shadow-[0_0_4px_#f43f5e]'
    : isBlue
    ? 'bg-cyan-400 shadow-[0_0_4px_#06b6d4]'
    : 'bg-emerald-400 shadow-[0_0_4px_#10b981]'

  const metricValueClass = isRed
    ? 'text-rose-300'
    : isBlue
    ? 'text-cyan-300'
    : 'text-emerald-300'

  const statusTextClass = isRed
    ? 'text-rose-400/80'
    : isBlue
    ? 'text-cyan-400/80'
    : 'text-emerald-400/80'

  return (
    <div className="absolute top-[45%] right-4 sm:right-8 md:right-10 -translate-y-1/2 z-25 pointer-events-none">
      <motion.div
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className={`relative font-mono select-none w-[calc(100vw-32px)] sm:w-[336px] md:w-[350px] p-3.5 sm:p-4 rounded-2xl bg-zinc-950/90 backdrop-blur-2xl border ${cardBorderClass} transition-[border-color,box-shadow] duration-500`}
      >
      {/* Animated Glowing Light Beam Running Around Card Border Perimeter */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl overflow-visible z-20">
        <defs>
          <linearGradient id={`card-beam-${themeColor}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={beamHex} stopOpacity="1" />
            <stop offset="65%" stopColor={beamHex} stopOpacity="0.3" />
            <stop offset="100%" stopColor={beamHex} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="16"
          fill="none"
          stroke={`url(#card-beam-${themeColor})`}
          strokeWidth="2.5"
          pathLength="100"
          strokeDasharray="22 78"
          animate={{ strokeDashoffset: [0, -100] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            filter: `drop-shadow(0 0 6px ${beamHex}) drop-shadow(0 0 12px ${beamHex})`,
          }}
        />
      </svg>

      {/* Top Telemetry Header */}
      <div className="flex items-center justify-between pb-1.5 border-b border-white/10 whitespace-nowrap relative z-10">
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[8.5px] sm:text-[9.5px] tracking-wider text-zinc-400 font-semibold uppercase">
            PROFILE SCANNED
          </span>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: totalBlocks }).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1 rounded-[1px] transition-colors duration-200 ${
                  i < filledBlocks ? blockActiveClass : 'bg-zinc-800'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-[12px] sm:text-[13px] font-bold font-mono transition-colors duration-300 ${percentTextClass}`}>
            {percentage}%
          </span>
          <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[8px] font-bold tracking-widest uppercase border shrink-0 transition-colors duration-300 ${badgeClasses}`}>
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${dotClasses}`} />
            <span>{activeSignal.status}</span>
          </div>
        </div>
      </div>

      {/* Dynamic ECG Waveform Line */}
      <div className="my-1 relative z-10">
        <SignalLine progress={progress} color={beamHex} />
      </div>

      {/* Main Signal Display Card */}
      <div className="flex flex-col mt-0.5 relative z-10">
        <div className="flex items-center justify-between text-[8.5px] sm:text-[9px] tracking-widest text-zinc-400 whitespace-nowrap">
          <span className={`font-semibold px-1.5 py-0.5 rounded border shrink-0 transition-colors duration-300 ${phasePillClass}`}>
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
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-300 ${tagDotClass}`} />
                <span className="truncate">{tag}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Diagnostics Matrix */}
      <div className="grid grid-cols-4 gap-1.5 pt-2 mt-2 border-t border-white/10 text-center whitespace-nowrap relative z-10">
        <div className="flex flex-col">
          <span className="text-[7.5px] tracking-wider text-zinc-500 uppercase">FREQ</span>
          <span className={`text-[9.5px] sm:text-[10px] font-bold truncate transition-colors duration-300 ${metricValueClass}`}>
            {activeSignal.metrics?.freq || '3.20 GHz'}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[7.5px] tracking-wider text-zinc-500 uppercase">LATENCY</span>
          <span className={`text-[9.5px] sm:text-[10px] font-bold truncate transition-colors duration-300 ${metricValueClass}`}>
            {activeSignal.metrics?.latency || '< 0.02 ms'}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[7.5px] tracking-wider text-zinc-500 uppercase">ACCURACY</span>
          <span className={`text-[9.5px] sm:text-[10px] font-bold truncate transition-colors duration-300 ${metricValueClass}`}>
            {activeSignal.metrics?.accuracy || '99.8%'}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[7.5px] tracking-wider text-zinc-500 uppercase">ENCRYPT</span>
          <span className={`text-[9.5px] sm:text-[10px] font-bold truncate transition-colors duration-300 ${metricValueClass}`}>
            AES-256
          </span>
        </div>
      </div>

      {/* Micro Status Bar */}
      <div className="flex items-center justify-between text-[8px] sm:text-[8.5px] tracking-widest text-zinc-500 pt-2 whitespace-nowrap relative z-10">
        <span>SYS_ID: CLYNTEN-DEV</span>
        <span className={`font-semibold transition-colors duration-300 ${statusTextClass}`}>
          ONLINE // STREAM
        </span>
      </div>
    </motion.div>
  </div>
  )
}
