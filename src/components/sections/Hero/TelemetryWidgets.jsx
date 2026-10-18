export default function TelemetryWidgets({ progress = 0 }) {
  const radarRotation = Math.round(progress * 360)
  // Smooth fade-out on scroll (1 at scroll 0, 0 by progress 0.18)
  const fadeOpacity = Math.max(0, Math.min(1, 1 - progress / 0.18))

  return (
    <div
      className="absolute inset-0 pointer-events-none z-20 font-mono select-none transition-opacity duration-200"
      style={{ opacity: fadeOpacity }}
    >
      {/* 1. Top Right Holographic Radar Widget */}
      <div className="absolute top-5 right-6 sm:right-12 hidden md:flex items-center gap-3.5 px-3.5 py-2 rounded-xl bg-zinc-950/75 border border-white/10 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        <div className="relative w-12 h-12 flex items-center justify-center">
          <svg className="w-12 h-12" viewBox="0 0 80 80">
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
            {/* Rotating radar ray */}
            <line
              x1="40"
              y1="40"
              x2="40"
              y2="4"
              stroke="#00ffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{
                transformOrigin: '40px 40px',
                transform: `rotate(${radarRotation}deg)`,
                filter: 'drop-shadow(0 0 6px #00ffff)',
              }}
            />
          </svg>
          <div className="absolute -bottom-1 -right-1 text-[8px] font-bold text-cyan-400 bg-black/85 px-1 rounded border border-cyan-500/30">
            {radarRotation}°
          </div>
        </div>

        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5 text-[9px] font-bold tracking-wider text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#00ffaa] animate-ping" />
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
      </div>

      {/* 2. Center Bottom Ambient Futuristic Scroll Prompt */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 transition-opacity duration-300"
        style={{ opacity: Math.max(0, 1 - progress * 4) }}
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
    </div>
  )
}
