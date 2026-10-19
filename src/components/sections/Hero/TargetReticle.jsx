import { motion } from 'framer-motion'

export default function TargetReticle() {
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
    </div>
  )
}
