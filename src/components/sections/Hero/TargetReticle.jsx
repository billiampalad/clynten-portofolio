export default function TargetReticle({ progress = 0 }) {
  const percentage = Math.min(100, Math.max(0, Math.round(progress * 100)))

  return (
    <div className="absolute inset-4 sm:inset-6 pointer-events-none z-15 font-mono select-none">
      {/* 4 Corner Tech HUD Brackets */}
      <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-emerald-400" />
      <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-white/25" />
      <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-white/25">
        {/* Spectrum Frequency Equalizer */}
        <div className="absolute bottom-0.5 left-7 flex items-end gap-[2.5px] h-3">
          <span className="w-[2px] h-[40%] bg-emerald-400 rounded-[1px] shadow-[0_0_4px_#00ffaa] animate-pulse" />
          <span className="w-[2px] h-[75%] bg-emerald-400 rounded-[1px] shadow-[0_0_4px_#00ffaa] animate-pulse" />
          <span className="w-[2px] h-[55%] bg-emerald-400 rounded-[1px] shadow-[0_0_4px_#00ffaa] animate-pulse" />
          <span className="w-[2px] h-[90%] bg-emerald-400 rounded-[1px] shadow-[0_0_4px_#00ffaa] animate-pulse" />
          <span className="w-[2px] h-[60%] bg-emerald-400 rounded-[1px] shadow-[0_0_4px_#00ffaa] animate-pulse" />
          <span className="w-[2px] h-[35%] bg-emerald-400 rounded-[1px] shadow-[0_0_4px_#00ffaa] animate-pulse" />
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-emerald-400" />

      {/* Center Target Scanning Box */}
      <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <div className="flex items-center gap-2 bg-black/65 border border-emerald-500/30 backdrop-blur-md px-3.5 py-1 rounded-full shadow-[0_0_15px_rgba(0,255,170,0.12)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#00ffaa] animate-ping" />
          <span className="text-[10px] sm:text-xs tracking-widest font-bold text-emerald-400 uppercase">
            {progress < 0.85 ? 'TARGET ACQUIRING' : 'TARGET LOCKED // CBP'}
          </span>
          <span className="text-[10px] sm:text-xs font-mono font-bold text-zinc-300 ml-1">
            {percentage}%
          </span>
        </div>
      </div>
    </div>
  )
}
