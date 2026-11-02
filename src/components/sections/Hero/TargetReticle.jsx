import { memo } from 'react'
import { motion } from 'framer-motion'

function TargetReticle() {
  return (
    <div className="absolute inset-4 sm:inset-6 md:max-lg:inset-x-[clamp(15px,1.95vw,20px)] md:max-lg:inset-y-[clamp(15px,1.95vh,20px)] lg:inset-x-[clamp(17px,1.67vw,24px)] lg:inset-y-[clamp(18px,2.67vh,24px)] [@media(min-width:1440px)]:inset-x-[clamp(24px,1.67vw,32px)] [@media(min-width:1440px)]:inset-y-[clamp(26px,2.96vh,32px)] pointer-events-none z-15 font-mono select-none">
      {/* 4 Corner Tech HUD Brackets */}
      <motion.div
        initial={{ scale: 1.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 w-[clamp(14px,2.6vw,20px)] h-[clamp(14px,2.6vw,20px)] md:max-lg:w-[clamp(13px,min(1.66vw,1.85vh),17px)] md:max-lg:h-[clamp(13px,min(1.66vw,1.85vh),17px)] lg:w-[clamp(14px,1.39vw,20px)] lg:h-[clamp(14px,1.39vw,20px)] [@media(min-width:1440px)]:w-[clamp(21px,1.46vw,28px)] [@media(min-width:1440px)]:h-[clamp(21px,1.46vw,28px)] border-t-2 border-l-2 border-emerald-400"
      />
      <motion.div
        initial={{ scale: 1.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 right-0 w-[clamp(14px,2.6vw,20px)] h-[clamp(14px,2.6vw,20px)] md:max-lg:w-[clamp(13px,min(1.66vw,1.85vh),17px)] md:max-lg:h-[clamp(13px,min(1.66vw,1.85vh),17px)] lg:w-[clamp(14px,1.39vw,20px)] lg:h-[clamp(14px,1.39vw,20px)] [@media(min-width:1440px)]:w-[clamp(21px,1.46vw,28px)] [@media(min-width:1440px)]:h-[clamp(21px,1.46vw,28px)] border-t-2 border-r-2 border-white/25"
      />
      <motion.div
        initial={{ scale: 1.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.11, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 w-[clamp(14px,2.6vw,20px)] h-[clamp(14px,2.6vw,20px)] md:max-lg:w-[clamp(13px,min(1.66vw,1.85vh),17px)] md:max-lg:h-[clamp(13px,min(1.66vw,1.85vh),17px)] lg:w-[clamp(14px,1.39vw,20px)] lg:h-[clamp(14px,1.39vw,20px)] [@media(min-width:1440px)]:w-[clamp(21px,1.46vw,28px)] [@media(min-width:1440px)]:h-[clamp(21px,1.46vw,28px)] border-b-2 border-l-2 border-white/25"
      >
        {/* Spectrum Frequency Equalizer */}
        <div className="absolute bottom-0.5 md:max-lg:bottom-[clamp(1.5px,0.2vh,2.5px)] lg:bottom-[clamp(1.5px,0.22vh,2px)] [@media(min-width:1440px)]:bottom-[clamp(1px,0.19vh,2px)] left-[clamp(20px,3.6vw,28px)] md:max-lg:left-[clamp(22px,2.74vw,28px)] lg:left-[clamp(20px,1.95vw,28px)] [@media(min-width:1440px)]:left-[clamp(27px,1.88vw,36px)] flex items-end gap-[clamp(1.5px,0.26vw,2.5px)] md:max-lg:gap-[clamp(2px,0.25vw,3px)] lg:gap-[clamp(1.8px,0.17vw,2.5px)] [@media(min-width:1440px)]:gap-[clamp(3px,0.21vw,4px)] h-[clamp(8px,min(2vw,1.3dvh),12px)] md:max-lg:h-[clamp(12px,1.56vh,16px)] lg:h-[clamp(9px,1.33vh,12px)] [@media(min-width:1440px)]:h-[clamp(18px,2.22vh,24px)]">
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
              className="w-[clamp(1.5px,0.26vw,2px)] md:max-lg:w-[clamp(2px,0.24vw,2.5px)] lg:w-[clamp(1.5px,0.14vw,2px)] [@media(min-width:1440px)]:w-[clamp(3px,0.21vw,4px)] bg-emerald-400 rounded-[1px] shadow-[0_0_4px_#00ffaa] [@media(min-width:1440px)]:shadow-[0_0_10px_#00ffaa] origin-bottom animate-pulse"
            />
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ scale: 1.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 right-0 w-[clamp(14px,2.6vw,20px)] h-[clamp(14px,2.6vw,20px)] md:max-lg:w-[clamp(13px,min(1.66vw,1.85vh),17px)] md:max-lg:h-[clamp(13px,min(1.66vw,1.85vh),17px)] lg:w-[clamp(14px,1.39vw,20px)] lg:h-[clamp(14px,1.39vw,20px)] [@media(min-width:1440px)]:w-[clamp(21px,1.46vw,28px)] [@media(min-width:1440px)]:h-[clamp(21px,1.46vw,28px)] border-b-2 border-r-2 border-emerald-400"
      />
    </div>
  )
}

export default memo(TargetReticle)
