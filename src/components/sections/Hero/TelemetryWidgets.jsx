import { memo, useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import { motion } from 'framer-motion'
import HeroAudioPlayer from './HeroAudioPlayer'

// Memoized Static Sensor Metadata (Never re-renders on scroll)
const SensorInfo = memo(function SensorInfo() {
  return (
    <div className="flex flex-col gap-0.5 md:max-lg:gap-[clamp(1.5px,0.4vh,3px)] lg:gap-[clamp(2px,0.6vh,6px)] [@media(min-width:1440px)]:gap-[clamp(5px,0.74vh,8px)]">
      <div className="flex items-center gap-1.5 md:max-lg:gap-[clamp(5px,0.6vw,7px)] lg:gap-2 [@media(min-width:1440px)]:gap-[clamp(7.5px,0.52vw,10px)] text-[9px] md:max-lg:text-[clamp(9.5px,1.2vh,11px)] lg:text-[clamp(9.5px,1.35vh,11.5px)] [@media(min-width:1440px)]:text-[clamp(11px,0.73vw,14px)] font-bold tracking-wider text-emerald-400 whitespace-nowrap">
        <span className="w-1.5 h-1.5 md:max-lg:w-[clamp(5.5px,0.7vh,7px)] md:max-lg:h-[clamp(5.5px,0.7vh,7px)] lg:w-[clamp(6px,0.9vh,8px)] lg:h-[clamp(6px,0.9vh,8px)] [@media(min-width:1440px)]:w-[clamp(7.5px,0.52vw,10px)] [@media(min-width:1440px)]:h-[clamp(7.5px,0.52vw,10px)] rounded-full bg-emerald-400 shadow-[0_0_6px_#00ffaa] animate-pulse shrink-0" />
        <span>OPTICAL SENSOR // ACTIVE</span>
      </div>
      <div className="flex items-center justify-between gap-3 md:max-lg:gap-[clamp(10px,1.2vw,14px)] lg:gap-4 [@media(min-width:1440px)]:gap-[clamp(20px,1.46vw,28px)] text-zinc-400 text-[8px] md:max-lg:text-[clamp(8px,1.05vh,9.5px)] lg:text-[clamp(8px,1.15vh,10px)] [@media(min-width:1440px)]:text-[clamp(9.5px,0.63vw,12px)] tracking-wide whitespace-nowrap">
        <span className="text-zinc-500 md:max-lg:tracking-[0.7px] lg:tracking-[0.8px] [@media(min-width:1440px)]:tracking-[clamp(0.8px,0.06vw,1.2px)]">BANDWIDTH</span>
        <span className="font-semibold text-zinc-300 md:max-lg:text-[clamp(8.5px,1.15vh,10.5px)] lg:text-[clamp(8.5px,1.25vh,10.5px)] [@media(min-width:1440px)]:text-[clamp(10px,0.68vw,13px)]">10.4 Gbps</span>
      </div>
      <div className="flex items-center justify-between gap-3 md:max-lg:gap-[clamp(10px,1.2vw,14px)] lg:gap-4 [@media(min-width:1440px)]:gap-[clamp(20px,1.46vw,28px)] text-zinc-400 text-[8px] md:max-lg:text-[clamp(8px,1.05vh,9.5px)] lg:text-[clamp(8px,1.15vh,10px)] [@media(min-width:1440px)]:text-[clamp(9.5px,0.63vw,12px)] tracking-wide whitespace-nowrap">
        <span className="text-zinc-500 md:max-lg:tracking-[0.7px] lg:tracking-[0.8px] [@media(min-width:1440px)]:tracking-[clamp(0.8px,0.06vw,1.2px)]">RENDER PIPELINE</span>
        <span className="font-semibold text-zinc-300 md:max-lg:text-[clamp(8.5px,1.15vh,10.5px)] lg:text-[clamp(8.5px,1.25vh,10.5px)] [@media(min-width:1440px)]:text-[clamp(10px,0.68vw,13px)]">4K ULTRA HD</span>
      </div>
    </div>
  )
})

// Dynamic Radar Gauge (Direct GPU Transform, Zero React Re-render)
const RadarGauge = memo(function RadarGauge({ needleRef, degreeRef, initialRotation = 0 }) {
  return (
    <div className="relative w-12 h-12 md:max-lg:w-[clamp(36px,4.5vh,44px)] md:max-lg:h-[clamp(36px,4.5vh,44px)] lg:w-[clamp(38px,5.8vh,54px)] lg:h-[clamp(38px,5.8vh,54px)] [@media(min-width:1440px)]:w-[clamp(57px,3.96vw,76px)] [@media(min-width:1440px)]:h-[clamp(57px,3.96vw,76px)] flex items-center justify-center shrink-0">
      <svg className="w-12 h-12 md:max-lg:w-[clamp(36px,4.5vh,44px)] md:max-lg:h-[clamp(36px,4.5vh,44px)] lg:w-[clamp(38px,5.8vh,54px)] lg:h-[clamp(38px,5.8vh,54px)] [@media(min-width:1440px)]:w-[clamp(57px,3.96vw,76px)] [@media(min-width:1440px)]:h-[clamp(57px,3.96vw,76px)] overflow-visible" viewBox="0 0 80 80">
        {/* Outer dotted track */}
        <circle
          cx="40"
          cy="40"
          r="36"
          fill="none"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        {/* Inner target circle */}
        <circle
          cx="40"
          cy="40"
          r="22"
          fill="none"
          stroke="rgba(0, 255, 170, 0.25)"
          strokeWidth="1"
        />
        {/* Center dot */}
        <circle cx="40" cy="40" r="2.5" fill="#00ffaa" />

        {/* Rotating radar ray synchronized directly with scroll progress & native laser glow */}
        <g
          ref={needleRef}
          style={{
            transformOrigin: '40px 40px',
            transform: `rotate(${initialRotation}deg)`,
            willChange: 'transform',
          }}
        >
          {/* Outer Glow Halo Ray */}
          <line
            x1="40"
            y1="40"
            x2="40"
            y2="4"
            stroke="#00ffff"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.35"
          />
          {/* Core Crisp Ray */}
          <line
            x1="40"
            y1="40"
            x2="40"
            y2="4"
            stroke="#00ffff"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
      </svg>
      <div
        ref={degreeRef}
        className="absolute -bottom-1 -right-1 text-[8px] lg:text-[9.5px] [@media(min-width:1440px)]:text-[clamp(9px,0.57vw,11px)] font-bold text-cyan-400 bg-black/90 px-1 lg:px-1.5 [@media(min-width:1440px)]:px-[clamp(6px,0.42vw,8px)] [@media(min-width:1440px)]:py-[clamp(1px,0.19vh,2px)] rounded border border-cyan-500/30 tabular-nums"
      >
        {initialRotation}°
      </div>
    </div>
  )
})

// Isolated Scroll Prompt Widget (Direct opacity control via Ref)
const ScrollPrompt = memo(function ScrollPrompt({ promptRef }) {
  return (
    <div
      ref={promptRef}
      className="absolute bottom-6 sm:bottom-9 md:max-lg:absolute md:max-lg:top-full md:max-lg:bottom-auto md:max-lg:left-1/2 md:max-lg:-translate-x-1/2 md:max-lg:right-auto md:max-lg:mt-[clamp(10px,1.3vh,14px)] lg:bottom-[clamp(44px,3.8vw,56px)] [@media(min-width:1440px)]:bottom-[clamp(80px,8.89vh,96px)] right-6 sm:right-12 lg:right-[clamp(28px,2.5vw,36px)] lg:left-auto lg:translate-x-0 [@media(min-width:1440px)]:right-[clamp(36px,2.5vw,48px)] flex flex-col items-center gap-1.5 md:max-lg:gap-[clamp(8px,1.07vh,12px)] lg:gap-2.5 [@media(min-width:1440px)]:gap-[clamp(9px,1.11vh,12px)] transition-opacity duration-100 will-change-[opacity]"
    >
      <div className="w-4 h-7 md:max-lg:w-[clamp(20px,2.35vw,26px)] md:max-lg:h-[clamp(34px,3.91vh,42px)] lg:w-5 lg:h-9 [@media(min-width:1440px)]:w-[clamp(18px,1.25vw,24px)] [@media(min-width:1440px)]:h-[clamp(35px,3.89vh,42px)] border border-emerald-400/50 md:max-lg:border-[1.5px] rounded-full flex items-start justify-center p-1 md:max-lg:p-[clamp(4px,0.45vw,5.5px)] lg:p-1.2 [@media(min-width:1440px)]:p-[clamp(4.5px,0.31vw,6px)] bg-black/50">
        <span className="w-1 h-2 md:max-lg:w-[clamp(5px,0.59vw,7px)] md:max-lg:h-[clamp(9px,1.07vh,12px)] lg:w-1.5 lg:h-2.5 [@media(min-width:1440px)]:w-[clamp(6px,0.42vw,8px)] [@media(min-width:1440px)]:h-[clamp(11.5px,1.3vh,14px)] bg-emerald-400 rounded-full shadow-[0_0_6px_#00ffaa] animate-bounce" />
      </div>
      <div className="flex items-center gap-1 md:max-lg:gap-[clamp(4px,0.49vw,6px)] text-[8px] sm:text-[9px] md:max-lg:text-[clamp(10.5px,1.27vh,13px)] lg:text-[10.5px] [@media(min-width:1440px)]:text-[clamp(9.5px,0.63vw,12px)] tracking-[2px] md:max-lg:tracking-[clamp(2px,0.24vw,3px)] lg:tracking-[2.8px] [@media(min-width:1440px)]:tracking-[clamp(2.5px,0.18vw,3.5px)] font-semibold text-zinc-400 uppercase whitespace-nowrap">
        <span className="text-emerald-400">[</span>
        <span className="text-zinc-300">SCROLL TO EXPLORE TELEMETRY</span>
        <span className="text-emerald-400">]</span>
      </div>
    </div>
  )
})

const TelemetryWidgets = forwardRef(function TelemetryWidgets({ progress = 0 }, ref) {
  const needleRef = useRef(null)
  const degreeRef = useRef(null)
  const promptRef = useRef(null)

  const applyProgress = (prog) => {
    const deg = Math.round(prog * 360)
    if (needleRef.current) {
      needleRef.current.style.transform = `rotate(${deg}deg)`
    }
    if (degreeRef.current) {
      degreeRef.current.textContent = `${deg}°`
    }
    if (promptRef.current) {
      const opacity = Math.max(0, 1 - prog * 4)
      promptRef.current.style.opacity = opacity.toFixed(2)
      promptRef.current.style.visibility = opacity <= 0 ? 'hidden' : 'visible'
      promptRef.current.style.pointerEvents = opacity <= 0 ? 'none' : 'auto'
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

  return (
    <div className="absolute inset-0 pointer-events-none z-20 font-mono select-none">
      {/* Right Cluster: Optical Sensor (Above), Audio Player (Middle), Scroll Prompt (Bottom) */}
      <div className="contents md:max-lg:absolute md:max-lg:bottom-[clamp(236px,29.5vh,286px)] md:max-lg:right-[clamp(16px,1.95vw,24px)] md:max-lg:left-auto md:max-lg:top-auto md:max-lg:flex md:max-lg:flex-col md:max-lg:items-center md:max-lg:justify-end md:max-lg:gap-[clamp(10px,1.3vh,14px)] md:max-lg:pointer-events-none md:max-lg:z-25">
        {/* 1. Holographic Radar Optical Sensor Widget */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-12 lg:top-[clamp(36px,5.5vh,60px)] [@media(min-width:1440px)]:top-[clamp(80px,8.89vh,96px)] right-6 sm:right-12 lg:right-[clamp(28px,2.5vw,36px)] [@media(min-width:1440px)]:right-[clamp(36px,2.5vw,48px)] hidden md:flex md:max-lg:static md:max-lg:pointer-events-auto items-center gap-3.5 md:max-lg:gap-[clamp(10px,1.2vw,14px)] lg:gap-[clamp(10px,1.5vh,16px)] [@media(min-width:1440px)]:gap-[clamp(18px,1.25vw,24px)] px-3.5 py-2 md:max-lg:px-[clamp(11px,1.37vw,15px)] md:max-lg:py-[clamp(7px,0.9vh,10px)] lg:px-[clamp(12px,1.3vw,18px)] lg:py-[clamp(6px,1.1vh,12px)] [@media(min-width:1440px)]:px-[clamp(18px,1.25vw,24px)] [@media(min-width:1440px)]:py-[clamp(12px,1.48vh,16px)] rounded-xl [@media(min-width:1440px)]:rounded-[clamp(12px,0.83vw,16px)] bg-zinc-950/95 border border-white/10 shadow-2xl [contain:paint]"
        >
          <RadarGauge
            needleRef={needleRef}
            degreeRef={degreeRef}
            initialRotation={Math.round(progress * 360)}
          />
          <SensorInfo />
        </motion.div>

        {/* 2. Audio Player ('BGM // MUTED') */}
        <HeroAudioPlayer />

        {/* 3. Ambient Futuristic Scroll Prompt */}
        <ScrollPrompt promptRef={promptRef} />
      </div>
    </div>
  )
})

export default memo(TelemetryWidgets)
