export default function ScrollHeadline({ progress = 0 }) {
  // Reveal Progress 1 (COMPLEX): Starts 100% covered at scroll 0, uncovers smoothly on scroll (0.04 -> 0.38)
  const reveal1 = Math.min(1, Math.max(0, (progress - 0.04) / 0.34))

  // Reveal Progress 2 (POWERFUL): Starts 100% covered at scroll 0, uncovers smoothly on scroll (0.42 -> 0.78)
  const reveal2 = Math.min(1, Math.max(0, (progress - 0.42) / 0.34))

  return (
    <div className="absolute bottom-9 left-6 sm:left-12 z-24 w-[calc(100%-48px)] sm:w-[calc(100%-96px)] max-w-6xl pointer-events-none select-none font-sans">
      {/* HUD Directive Badge */}
      <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-[2px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-full mb-2.5 backdrop-blur-md shadow-[0_0_14px_rgba(0,255,170,0.15)]">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#00ffaa] animate-pulse" />
        <span className="font-semibold uppercase">CORE DIRECTIVE</span>
      </div>

      {/* Main Bold Cinematic Headline */}
      <h1 className="text-[clamp(32px,4.5vw,70px)] font-black leading-[1.02] tracking-tighter text-white inline drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
        <span>DECODING </span>

        {/* Shutter Laser Reveal Block 1: COMPLEX */}
        <span className="relative inline-block px-2 mx-0.5 align-baseline overflow-visible [clip-path:inset(-8px_0_-8px_0)]">
          <span className="relative z-10 text-white font-black">
            COMPLEX
          </span>
          {/* Sliding Cover Block */}
          <span
            className="absolute -inset-y-1 -inset-x-1.5 bg-[#830000] z-20 pointer-events-none will-change-transform"
            style={{ transform: `translateX(${reveal1 * 100}%)` }}
          />
          {/* Laser Frontier Edge */}
          <span
            className="absolute -top-1.5 -bottom-1.5 w-[2.5px] bg-white rounded shadow-[0_0_8px_#ffffff,0_0_14px_#e11d48,0_0_24px_#881337] z-30 pointer-events-none transition-opacity duration-150"
            style={{
              left: `calc(${reveal1 * 100}% - 2px)`,
              opacity: reveal1 > 0.01 && reveal1 < 0.99 ? 1 : 0,
            }}
          />
        </span>{' '}

        <span>SYSTEMS </span>
        <span>INTO </span>

        {/* Shutter Laser Reveal Block 2: POWERFUL */}
        <span className="relative inline-block px-2 mx-0.5 align-baseline overflow-visible [clip-path:inset(-8px_0_-8px_0)]">
          <span className="relative z-10 text-white font-black">
            POWERFUL
          </span>
          {/* Sliding Cover Block */}
          <span
            className="absolute -inset-y-1 -inset-x-1.5 bg-[#830000] z-20 pointer-events-none will-change-transform"
            style={{ transform: `translateX(${reveal2 * 100}%)` }}
          />
          {/* Laser Frontier Edge */}
          <span
            className="absolute -top-1.5 -bottom-1.5 w-[2.5px] bg-white rounded shadow-[0_0_8px_#ffffff,0_0_14px_#e11d48,0_0_24px_#881337] z-30 pointer-events-none transition-opacity duration-150"
            style={{
              left: `calc(${reveal2 * 100}% - 2px)`,
              opacity: reveal2 > 0.01 && reveal2 < 0.99 ? 1 : 0,
            }}
          />
        </span>{' '}

        <span>DIGITAL </span>
        <span>REALITIES.</span>
      </h1>

      {/* High-Tech Subtext with Laser Indicator Line */}
      <div className="flex items-center gap-3 mt-3 font-mono text-[9px] sm:text-[11px] tracking-[1.5px] text-zinc-400">
        <span className="w-8 sm:w-12 h-[1px] bg-emerald-400/60 shadow-[0_0_6px_#00ffaa]" />
        <span className="text-zinc-300 font-medium">
          TRANSFORMING VISION INTO HIGH-PERFORMANCE WEB ARCHITECTURE
        </span>
      </div>
    </div>
  )
}
