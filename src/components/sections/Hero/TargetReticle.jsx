import { motion } from 'framer-motion'

export default function TargetReticle({ progress = 0 }) {
  const percentage = Math.min(100, Math.max(0, Math.round(progress * 100)))

  return (
    <div className="absolute inset-4 sm:inset-6 pointer-events-none z-15 font-mono select-none">
      {/* 4 Corner Tech HUD Brackets */}
      <motion.div
        initial={{ scale: 1.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-emerald-400"
      />
      <motion.div
        initial={{ scale: 1.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-white/25"
      />
      <motion.div
        initial={{ scale: 1.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.11, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-white/25"
      >
        {/* Spectrum Frequency Equalizer */}
        <div className="absolute bottom-0.5 left-7 flex items-end gap-[2.5px] h-3">
          {[
            { height: '40%', delay: 0.15 },
            { height: '75%', delay: 0.2 },
            { height: '55%', delay: 0.25 },
            { height: '90%', delay: 0.3 },
            { height: '60%', delay: 0.35 },
            { height: '35%', delay: 0.4 },
          ].map((bar, i) => (
            <motion.span
              key={i}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 0.35, delay: bar.delay, ease: 'easeOut' }}
              style={{ height: bar.height }}
              className="w-[2px] bg-emerald-400 rounded-[1px] shadow-[0_0_4px_#00ffaa] origin-bottom animate-pulse"
            />
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ scale: 1.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-emerald-400"
      />

      {/* Center Target Scanning Box */}
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, delay: 0.18, type: 'spring', damping: 20 }}
        className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 flex items-center gap-2"
      >
        <div className="flex items-center gap-2 bg-black/65 border border-emerald-500/30 backdrop-blur-md px-3.5 py-1 rounded-full shadow-[0_0_15px_rgba(0,255,170,0.12)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#00ffaa] animate-ping" />
          <span className="text-[10px] sm:text-xs tracking-widest font-bold text-emerald-400 uppercase">
            {progress < 0.85 ? 'TARGET ACQUIRING' : 'TARGET LOCKED // CBP'}
          </span>
          <span className="text-[10px] sm:text-xs font-mono font-bold text-zinc-300 ml-1">
            {percentage}%
          </span>
        </div>
      </motion.div>
    </div>
  )
}
