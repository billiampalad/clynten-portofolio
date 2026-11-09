import { useState, useRef, useEffect, useImperativeHandle, forwardRef, memo } from 'react'
import { motion } from 'framer-motion'
import { developerSignals } from '@/content/developerSignals'
import { useTextScramble } from '@/hooks/useTextScramble'
import SignalLine from './SignalLine'

// Memoized Main Signal Details (Only re-renders on phase transition, NOT on continuous scroll)
const SignalDetails = memo(function SignalDetails({
  activeSignal,
  themeColor,
  scrambledTitle,
  scrambledLabel,
}) {
  const isRed = themeColor === 'red'
  const isBlue = themeColor === 'blue'

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
    <>
      {/* Main Signal Display Card */}
      <div className="flex flex-col mt-0.5 relative z-10">
        <div className="flex items-center justify-between text-[8.5px] sm:text-[9px] lg:text-[clamp(9.5px,1.3vh,11px)] [@media(min-width:1440px)]:text-[clamp(10.5px,0.7vw,13.5px)] tracking-widest text-zinc-400 whitespace-nowrap">
          <span className={`font-semibold px-1.5 py-0.5 lg:px-[clamp(6px,0.8vw,8px)] lg:py-[clamp(2px,0.4vh,4px)] [@media(min-width:1440px)]:px-[clamp(9px,0.63vw,12px)] [@media(min-width:1440px)]:py-[clamp(4px,0.56vh,6px)] rounded border shrink-0 transition-colors duration-300 ${phasePillClass}`}>
            PHASE // {activeSignal.phase}
          </span>
          <span className="text-zinc-500 font-medium truncate ml-2 text-[9px] sm:text-[9.5px] lg:text-[clamp(9.5px,1.3vh,11.5px)] [@media(min-width:1440px)]:text-[clamp(11px,0.73vw,14px)]">
            {scrambledLabel}
          </span>
        </div>

        <h2 className="text-sm sm:text-[15px] lg:text-[clamp(15px,2.2vh,18.5px)] [@media(min-width:1440px)]:text-[clamp(18px,1.25vw,24px)] font-black tracking-tight text-white mt-1.5 lg:mt-[clamp(4px,0.7vh,8px)] [@media(min-width:1440px)]:mt-[clamp(8px,1.11vh,12px)] drop-shadow-[0_0_12px_rgba(255,255,255,0.25)] whitespace-nowrap truncate leading-tight">
          {scrambledTitle}
        </h2>
        <p className="text-[9.5px] sm:text-[10px] lg:text-[clamp(10px,1.35vh,12px)] [@media(min-width:1440px)]:text-[clamp(11.5px,0.78vw,15px)] text-zinc-400 font-normal leading-normal whitespace-nowrap truncate mt-0.5 lg:mt-[clamp(2px,0.35vh,4px)] [@media(min-width:1440px)]:mt-[clamp(4px,0.56vh,6px)]">
          {activeSignal.subtitle}
        </p>

        {/* Dynamic Skill Stack Badges - 2x2 Grid */}
        {activeSignal.tags && (
          <div className="grid grid-cols-2 gap-1.5 lg:gap-[clamp(5px,0.8vh,9px)] [@media(min-width:1440px)]:gap-[clamp(10px,0.73vw,14px)] mt-2 lg:mt-[clamp(6px,1vh,11px)] [@media(min-width:1440px)]:mt-[clamp(12px,1.48vh,16px)]">
            {activeSignal.tags.map((tag, idx) => (
              <span
                key={idx}
                className="flex items-center gap-1.5 lg:gap-[clamp(5px,0.7vh,8px)] [@media(min-width:1440px)]:gap-[clamp(9px,0.63vw,12px)] px-2 py-1 lg:px-[clamp(8px,1vw,12px)] lg:py-[clamp(3px,0.5vh,6px)] [@media(min-width:1440px)]:px-[clamp(12px,0.83vw,16px)] [@media(min-width:1440px)]:py-[clamp(7px,0.93vh,10px)] rounded-md [@media(min-width:1440px)]:rounded-lg text-[8.5px] sm:text-[9px] lg:text-[clamp(9px,1.25vh,11px)] [@media(min-width:1440px)]:text-[clamp(10.5px,0.7vw,13.5px)] font-medium bg-zinc-900/90 border border-white/10 text-zinc-300 shadow-sm whitespace-nowrap overflow-hidden"
              >
                <span className={`w-1.5 h-1.5 lg:w-[clamp(6px,0.9vh,8px)] lg:h-[clamp(6px,0.9vh,8px)] [@media(min-width:1440px)]:w-[clamp(9px,0.63vw,12px)] [@media(min-width:1440px)]:h-[clamp(9px,0.63vw,12px)] rounded-full shrink-0 transition-colors duration-300 ${tagDotClass}`} />
                <span className="truncate">{tag}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Diagnostics Matrix */}
      <div className="grid grid-cols-4 gap-1.5 lg:gap-[clamp(5px,0.8vh,9px)] [@media(min-width:1440px)]:gap-[clamp(8px,0.63vw,12px)] pt-2 lg:pt-[clamp(6px,1vh,11px)] [@media(min-width:1440px)]:pt-[clamp(11px,1.48vh,16px)] mt-2 lg:mt-[clamp(6px,1vh,11px)] [@media(min-width:1440px)]:mt-[clamp(11px,1.48vh,16px)] border-t border-white/10 text-center whitespace-nowrap relative z-10">
        <div className="flex flex-col">
          <span className="text-[7.5px] lg:text-[clamp(7.5px,1.1vh,9px)] [@media(min-width:1440px)]:text-[clamp(9px,0.6vw,11.5px)] tracking-wider text-zinc-500 uppercase">FREQ</span>
          <span className={`text-[9.5px] sm:text-[10px] lg:text-[clamp(10px,1.45vh,12.5px)] [@media(min-width:1440px)]:text-[clamp(12px,0.81vw,15.5px)] font-bold truncate transition-colors duration-300 ${metricValueClass}`}>
            {activeSignal.metrics?.freq || '3.20 GHz'}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[7.5px] lg:text-[clamp(7.5px,1.1vh,9px)] [@media(min-width:1440px)]:text-[clamp(9px,0.6vw,11.5px)] tracking-wider text-zinc-500 uppercase">LATENCY</span>
          <span className={`text-[9.5px] sm:text-[10px] lg:text-[clamp(10px,1.45vh,12.5px)] [@media(min-width:1440px)]:text-[clamp(12px,0.81vw,15.5px)] font-bold truncate transition-colors duration-300 ${metricValueClass}`}>
            {activeSignal.metrics?.latency || '< 0.02 ms'}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[7.5px] lg:text-[clamp(7.5px,1.1vh,9px)] [@media(min-width:1440px)]:text-[clamp(9px,0.6vw,11.5px)] tracking-wider text-zinc-500 uppercase">ACCURACY</span>
          <span className={`text-[9.5px] sm:text-[10px] lg:text-[clamp(10px,1.45vh,12.5px)] [@media(min-width:1440px)]:text-[clamp(12px,0.81vw,15.5px)] font-bold truncate transition-colors duration-300 ${metricValueClass}`}>
            {activeSignal.metrics?.accuracy || '99.8%'}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[7.5px] lg:text-[clamp(7.5px,1.1vh,9px)] [@media(min-width:1440px)]:text-[clamp(9px,0.6vw,11.5px)] tracking-wider text-zinc-500 uppercase">ENCRYPT</span>
          <span className={`text-[9.5px] sm:text-[10px] lg:text-[clamp(10px,1.45vh,12.5px)] [@media(min-width:1440px)]:text-[clamp(12px,0.81vw,15.5px)] font-bold truncate transition-colors duration-300 ${metricValueClass}`}>
            AES-256
          </span>
        </div>
      </div>

      {/* Micro Status Bar */}
      <div className="flex items-center justify-between text-[8px] sm:text-[8.5px] lg:text-[clamp(8px,1.2vh,10px)] [@media(min-width:1440px)]:text-[clamp(9.5px,0.65vw,12.5px)] tracking-widest text-zinc-500 pt-2 lg:pt-[clamp(4px,0.8vh,10px)] [@media(min-width:1440px)]:pt-[clamp(11px,1.48vh,16px)] whitespace-nowrap relative z-10">
        <span>SYS_ID: CLYNTEN-DEV</span>
        <span className={`font-semibold transition-colors duration-300 ${statusTextClass}`}>
          ONLINE // STREAM
        </span>
      </div>
    </>
  )
})

const blockActiveClasses = {
  red: 'bg-rose-500 shadow-[0_0_5px_#f43f5e]',
  blue: 'bg-cyan-400 shadow-[0_0_5px_#06b6d4]',
  green: 'bg-emerald-400 shadow-[0_0_5px_#10b981]',
}

const percentTextClasses = {
  red: 'text-rose-400',
  blue: 'text-cyan-400',
  green: 'text-emerald-400',
}

const cardBorderClasses = {
  red: 'border-rose-500/35 shadow-[0_20px_50px_-10px_rgba(244,63,94,0.18)]',
  blue: 'border-cyan-500/35 shadow-[0_20px_50px_-10px_rgba(6,182,212,0.18)]',
  green: 'border-emerald-500/35 shadow-[0_20px_50px_-10px_rgba(16,185,129,0.18)]',
}

const badgeClassesMap = {
  red: 'text-rose-400 border-rose-500/35 bg-rose-950/40',
  blue: 'text-cyan-400 border-cyan-500/35 bg-cyan-950/40',
  green: 'text-emerald-400 border-emerald-500/35 bg-emerald-950/40',
}

const dotClassesMap = {
  red: 'bg-rose-400 shadow-[0_0_6px_#f43f5e]',
  blue: 'bg-cyan-400 shadow-[0_0_6px_#06b6d4]',
  green: 'bg-emerald-400 shadow-[0_0_6px_#10b981]',
}

const beamHexMap = {
  red: '#f43f5e',
  blue: '#06b6d4',
  green: '#10b981',
}

const TOTAL_BLOCKS = 10
const BASE_BLOCK_CLASS =
  'h-1.5 w-1 lg:h-2 lg:w-1.5 [@media(min-width:1440px)]:h-[clamp(9px,1.11vh,12px)] [@media(min-width:1440px)]:w-[clamp(6px,0.42vw,8px)] rounded-[1px] transition-colors duration-150'

const DeveloperSignal = forwardRef(function DeveloperSignal({ progress = 0 }, ref) {
  const getPhaseIndex = (prog) => {
    const idx = developerSignals.findIndex((s) => prog >= s.start && prog <= s.end)
    return idx >= 0 ? idx : developerSignals.length - 1
  }

  const getThemeColor = (prog) => {
    if (prog < 0.33) return 'red'
    if (prog < 0.67) return 'blue'
    return 'green'
  }

  const [signalState, setSignalState] = useState(() => ({
    phaseIndex: getPhaseIndex(progress),
    themeColor: getThemeColor(progress),
  }))

  const activeSignal = developerSignals[signalState.phaseIndex]
  const themeColor = signalState.themeColor

  // Scramble text triggers ONLY on phase milestone changes
  const scrambledTitle = useTextScramble(activeSignal.title, 20)
  const scrambledLabel = useTextScramble(activeSignal.label, 30)

  // Direct DOM Refs for 60fps/120fps fluid zero-latency updates
  const percentRef = useRef(null)
  const blocksRef = useRef([])
  const signalLineRef = useRef(null)

  const currentPhaseIndexRef = useRef(signalState.phaseIndex)
  const currentThemeColorRef = useRef(signalState.themeColor)
  const lastFilledBlocksRef = useRef(-1)
  const lastPctRef = useRef(-1)

  const applyProgress = (prog) => {
    const pct = Math.min(100, Math.max(0, Math.round(prog * 100)))

    // 1. Update Percentage Text (Imperative DOM)
    if (percentRef.current && lastPctRef.current !== pct) {
      percentRef.current.textContent = `${pct}%`
      lastPctRef.current = pct
    }

    // 2. Update 10-Segmented Progress Blocks (Imperative DOM)
    const filled = Math.round((pct / 100) * TOTAL_BLOCKS)
    if (lastFilledBlocksRef.current !== filled) {
      lastFilledBlocksRef.current = filled
      const activeClass = blockActiveClasses[currentThemeColorRef.current]
      for (let i = 0; i < TOTAL_BLOCKS; i++) {
        const block = blocksRef.current[i]
        if (block) {
          if (i < filled) {
            block.className = `${BASE_BLOCK_CLASS} ${activeClass}`
          } else {
            block.className = `${BASE_BLOCK_CLASS} bg-zinc-800`
          }
        }
      }
    }

    // 3. Update ECG Line SVG Path
    signalLineRef.current?.update(prog)

    // 4. Milestone Phase Transition Check (React state only fires when crossing major boundaries)
    const newPhase = getPhaseIndex(prog)
    const newTheme = getThemeColor(prog)

    if (
      newPhase !== currentPhaseIndexRef.current ||
      newTheme !== currentThemeColorRef.current
    ) {
      currentPhaseIndexRef.current = newPhase
      currentThemeColorRef.current = newTheme
      setSignalState({
        phaseIndex: newPhase,
        themeColor: newTheme,
      })
      signalLineRef.current?.setColor(beamHexMap[newTheme])

      // Instantly update active block colors for new theme without size change
      const activeClass = blockActiveClasses[newTheme]
      for (let i = 0; i < lastFilledBlocksRef.current; i++) {
        const block = blocksRef.current[i]
        if (block) {
          block.className = `${BASE_BLOCK_CLASS} ${activeClass}`
        }
      }
    }
  }

  useImperativeHandle(ref, () => ({
    update: (prog) => {
      applyProgress(prog)
    },
  }))

  useEffect(() => {
    applyProgress(progress)
  }, [])

  const initialPct = Math.min(100, Math.max(0, Math.round(progress * 100)))
  const initialFilled = Math.round((initialPct / 100) * TOTAL_BLOCKS)
  const beamHex = beamHexMap[themeColor]

  return (
    <div className="absolute top-[45%] right-4 sm:right-8 md:right-10 lg:right-[clamp(28px,2.5vw,36px)] [@media(min-width:1440px)]:right-[clamp(36px,2.5vw,48px)] -translate-y-1/2 z-25 pointer-events-none">
      <motion.div
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`relative font-mono select-none w-[calc(100vw-32px)] sm:w-[336px] md:w-[350px] lg:w-[clamp(320px,min(31vw,46vh),430px)] [@media(min-width:1440px)]:w-[clamp(435px,30.21vw,580px)] p-3.5 sm:p-4 lg:p-[clamp(12px,1.9vh,22px)] [@media(min-width:1440px)]:px-[clamp(24px,1.67vw,32px)] [@media(min-width:1440px)]:py-[clamp(24px,2.96vh,32px)] rounded-2xl bg-zinc-950/95 border ${cardBorderClasses[themeColor]} shadow-2xl [contain:paint] transition-colors duration-200`}
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
          {/* Outer Halo Glow Stroke */}
          <motion.rect
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            rx="16"
            fill="none"
            stroke={`url(#card-beam-${themeColor})`}
            strokeWidth="5"
            opacity="0.35"
            pathLength="100"
            strokeDasharray="22 78"
            animate={{ strokeDashoffset: [0, -100] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          {/* Core Sharp Stroke */}
          <motion.rect
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            rx="16"
            fill="none"
            stroke={`url(#card-beam-${themeColor})`}
            strokeWidth="2"
            pathLength="100"
            strokeDasharray="22 78"
            animate={{ strokeDashoffset: [0, -100] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </svg>

        {/* Top Telemetry Header */}
        <div className="flex items-center justify-between pb-1.5 lg:pb-[clamp(5px,0.9vh,9px)] [@media(min-width:1440px)]:pb-[clamp(10px,1.3vh,14px)] border-b border-white/10 whitespace-nowrap relative z-10">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[8.5px] sm:text-[9.5px] lg:text-[clamp(9.5px,1.35vh,11px)] [@media(min-width:1440px)]:text-[clamp(11px,0.73vw,14px)] tracking-wider text-zinc-400 font-semibold uppercase">
              PROFILE SCANNED
            </span>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: TOTAL_BLOCKS }).map((_, i) => (
                <span
                  key={i}
                  ref={(el) => (blocksRef.current[i] = el)}
                  className={`${BASE_BLOCK_CLASS} ${
                    i < initialFilled ? blockActiveClasses[themeColor] : 'bg-zinc-800'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span
              ref={percentRef}
              className={`text-[12px] sm:text-[13px] lg:text-[clamp(13px,1.8vh,15.5px)] [@media(min-width:1440px)]:text-[clamp(15px,1.04vw,20px)] font-bold font-mono transition-colors duration-300 ${percentTextClasses[themeColor]}`}
            >
              {initialPct}%
            </span>
            <div className={`flex items-center gap-1.5 lg:gap-2 [@media(min-width:1440px)]:gap-[clamp(7.5px,0.52vw,10px)] px-2 py-0.5 lg:px-2.5 lg:py-1 [@media(min-width:1440px)]:px-[clamp(10px,0.73vw,14px)] [@media(min-width:1440px)]:py-[clamp(4.5px,0.56vh,6px)] rounded-full text-[8px] lg:text-[clamp(8px,1.2vh,9.5px)] [@media(min-width:1440px)]:text-[clamp(9.5px,0.65vw,12.5px)] font-bold tracking-widest uppercase border shrink-0 transition-colors duration-300 ${badgeClassesMap[themeColor]}`}>
              <span className={`w-1.5 h-1.5 lg:w-[clamp(6px,0.9vh,8px)] lg:h-[clamp(6px,0.9vh,8px)] [@media(min-width:1440px)]:w-[clamp(9px,0.63vw,12px)] [@media(min-width:1440px)]:h-[clamp(9px,0.63vw,12px)] rounded-full animate-pulse ${dotClassesMap[themeColor]}`} />
              <span>{activeSignal.status}</span>
            </div>
          </div>
        </div>

        {/* Dynamic ECG Waveform Line (Zero Framer Motion overhead on scroll) */}
        <div className="my-1 lg:my-[clamp(2px,0.5vh,4px)] [@media(min-width:1440px)]:my-[clamp(3px,0.46vh,5px)] relative z-10">
          <SignalLine ref={signalLineRef} progress={progress} color={beamHex} />
        </div>

        {/* Memoized Main Signal Details */}
        <SignalDetails
          activeSignal={activeSignal}
          themeColor={themeColor}
          scrambledTitle={scrambledTitle}
          scrambledLabel={scrambledLabel}
        />
      </motion.div>
    </div>
  )
})

export default memo(DeveloperSignal)
