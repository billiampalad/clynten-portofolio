import { memo } from 'react'
import { motion } from 'framer-motion'

// Memoized Static Sensor Metadata (Never re-renders on scroll)
const SensorInfo = memo(function SensorInfo() {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center gap-1.5 text-[9px] font-bold tracking-wider text-emerald-400">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#00ffaa] animate-pulse" />
        <span>OPTICAL SENSOR // ACTIVE</span>
      </div>
      <div className="flex items-center justify-between gap-3 text-zinc-400 text-[8px] tracking-wide">
        <span className="text-zinc-500">BANDWIDTH</span>
        <span className="font-semibold text-zinc-300">10.4 Gbps</span>
      </div>
      <div className="flex items-center justify-between gap-3 text-zinc-400 text-[8px] tracking-wide">
        <span className="text-zinc-500">RENDER PIPELINE</span>
        <span className="font-semibold text-zinc-300">4K ULTRA HD</span>
      </div>
    </div>
  )
})

// Dynamic Radar Gauge (Only renders the rotating needle & angle indicator)
const RadarGauge = memo(function RadarGauge({ rotation = 0 }) {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
      <svg className="w-12 h-12 overflow-visible" viewBox="0 0 80 80">
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
          style={{
            transformOrigin: '40px 40px',
            transform: `rotate(${rotation}deg)`,
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
      <div className="absolute -bottom-1 -right-1 text-[8px] font-bold text-cyan-400 bg-black/85 px-1 rounded border border-cyan-500/30 tabular-nums">
        {rotation}°
      </div>
    </div>
  )
})

// Isolated Scroll Prompt Widget (Unmounts when opacity reaches 0 to free resources)
const ScrollPrompt = memo(function ScrollPrompt({ progress = 0 }) {
  const opacity = Math.max(0, 1 - progress * 4)
  if (opacity <= 0) return null

  return (
    <div
      style={{ opacity }}
      className="absolute bottom-6 sm:bottom-9 right-6 sm:right-12 flex flex-col items-center gap-1.5 transition-opacity duration-100 will-change-[opacity]"
    >
      <div className="w-4 h-7 border border-emerald-400/50 rounded-full flex items-start justify-center p-1 bg-black/40 backdrop-blur-sm">
        <span className="w-1 h-2 bg-emerald-400 rounded-full shadow-[0_0_6px_#00ffaa] animate-bounce" />
      </div>
      <div className="flex items-center gap-1 text-[8px] sm:text-[9px] tracking-[2px] font-semibold text-zinc-400 uppercase">
        <span className="text-emerald-400">[</span>
        <span className="text-zinc-300">SCROLL TO EXPLORE TELEMETRY</span>
        <span className="text-emerald-400">]</span>
      </div>
    </div>
  )
})

function TelemetryWidgets({ progress = 0 }) {
  const radarRotation = Math.round(progress * 360)

  return (
    <div className="absolute inset-0 pointer-events-none z-20 font-mono select-none">
      {/* 1. Top Right Holographic Radar Widget */}
      <motion.div
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-12 right-6 sm:right-12 hidden md:flex items-center gap-3.5 px-3.5 py-2 rounded-xl bg-zinc-950/90 border border-white/10 backdrop-blur-md shadow-2xl"
      >
        <RadarGauge rotation={radarRotation} />
        <SensorInfo />
      </motion.div>

      {/* 2. Right Bottom Ambient Futuristic Scroll Prompt */}
      <ScrollPrompt progress={progress} />
    </div>
  )
}

export default memo(TelemetryWidgets)
