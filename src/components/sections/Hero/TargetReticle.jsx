import { memo } from 'react'
import { motion } from 'framer-motion'

function TargetReticle() {
  return (
    <div className="absolute inset-4 sm:inset-6 [@media(min-width:1440px)]:inset-x-[clamp(24px,1.67vw,32px)] [@media(min-width:1440px)]:inset-y-[clamp(26px,2.96vh,32px)] pointer-events-none z-15 font-mono select-none">
      {/* 4 Corner Tech HUD Brackets */}
      <motion.div
        initial={{ scale: 1.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 w-5 h-5 [@media(min-width:1440px)]:w-[clamp(21px,1.46vw,28px)] [@media(min-width:1440px)]:h-[clamp(21px,1.46vw,28px)] border-t-2 border-l-2 border-emerald-400"
      />
      <motion.div
        initial={{ scale: 1.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 right-0 w-5 h-5 [@media(min-width:1440px)]:w-[clamp(21px,1.46vw,28px)] [@media(min-width:1440px)]:h-[clamp(21px,1.46vw,28px)] border-t-2 border-r-2 border-white/25"
      />
      <motion.div
        initial={{ scale: 1.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.11, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 w-5 h-5 [@media(min-width:1440px)]:w-[clamp(21px,1.46vw,28px)] [@media(min-width:1440px)]:h-[clamp(21px,1.46vw,28px)] border-b-2 border-l-2 border-white/25"
      >
        {/* Spectrum Frequency Equalizer */}
        <div className="absolute bottom-0.5 left-7 [@media(min-width:1440px)]:left-[clamp(27px,1.88vw,36px)] flex items-end gap-[2.5px] [@media(min-width:1440px)]:gap-[clamp(3px,0.21vw,4px)] h-3 [@media(min-width:1440px)]:h-[clamp(18px,2.22vh,24px)]">
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
              className="w-[2px] [@media(min-width:1440px)]:w-[clamp(3px,0.21vw,4px)] bg-emerald-400 rounded-[1px] shadow-[0_0_4px_#00ffaa] [@media(min-width:1440px)]:shadow-[0_0_10px_#00ffaa] origin-bottom animate-pulse"
            />
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ scale: 1.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 right-0 w-5 h-5 [@media(min-width:1440px)]:w-[clamp(21px,1.46vw,28px)] [@media(min-width:1440px)]:h-[clamp(21px,1.46vw,28px)] border-b-2 border-r-2 border-emerald-400"
      />
    </div>
  )
}

export default memo(TargetReticle)
