import { memo } from 'react'
import { motion } from 'framer-motion'
import { SKILLS_CONFIG } from '@/content/skills'
import { useTextScramble } from '@/hooks/useTextScramble'

const POSITION_MAP = {
  // skil 1 (Web Development)
  'webdev-wrapper':
    'top-[6%] left-[clamp(16px,1.52vw,22px)] [@media(min-width:1440px)]:left-10 [@media(min-width:1600px)]:left-12',
  // skil 2 (Android Development)
  'android-wrapper':
    'top-[9%] left-[clamp(240px,22.58vw,325px)] [@media(min-width:1440px)]:left-[350px] [@media(min-width:1600px)]:left-[364px]',
  // skil 3 (Cyber Security)
  'cyber-wrapper':
    'top-[26%] left-[clamp(20px,1.8vw,26px)] [@media(min-width:1440px)]:left-10 [@media(min-width:1600px)]:left-12',
  // skil 4 (Cloud & Networking)
  'net-wrapper':
    'top-[29%] left-[clamp(250px,23.35vw,336px)] [@media(min-width:1440px)]:left-[350px] [@media(min-width:1600px)]:left-[364px]',
  // skil 5 (Database Architecture)
  'db-wrapper':
    'top-[46%] left-[clamp(24px,2.08vw,30px)] [@media(min-width:1440px)]:left-10 [@media(min-width:1600px)]:left-12',
  // skil 6 (UI/UX Engineering)
  'uiux-wrapper':
    'top-[49%] left-[clamp(260px,24.18vw,348px)] [@media(min-width:1440px)]:left-[350px] [@media(min-width:1600px)]:left-[364px]',
}

const HudRow = memo(function HudRow({ label, value, highlightColor = '', speed = 20 }) {
  const scrambledVal = useTextScramble(value, speed, false)

  return (
    <div className="flex items-center justify-between text-[9.5px] [@media(min-width:1440px)]:text-[10.5px] tracking-wider py-1 [@media(min-width:1440px)]:py-1.5 border-b border-white/[0.04] last:border-none whitespace-nowrap">
      <span className="text-zinc-500 uppercase shrink-0 [@media(min-width:1440px)]:tracking-[1px]">{label}</span>
      <span className={`font-semibold truncate max-w-[170px] [@media(min-width:1440px)]:max-w-[170px] ml-1 shrink-0 ${highlightColor || 'text-zinc-300'}`}>
        {scrambledVal}
      </span>
    </div>
  )
})

const HudHeader = memo(function HudHeader({ text, tag, color, speed = 18 }) {
  const scrambledText = useTextScramble(text, speed, false)

  const squareColor =
    color === 'red'
      ? 'text-rose-400'
      : color === 'cyan'
        ? 'text-cyan-400'
        : 'text-emerald-400'

  return (
    <div className="flex items-center justify-between pb-1.5 [@media(min-width:1440px)]:pb-2 mb-1.5 [@media(min-width:1440px)]:mb-2 border-b border-white/10 whitespace-nowrap">
      <div className="flex items-center gap-1.5 [@media(min-width:1440px)]:gap-2 text-[11px] [@media(min-width:1440px)]:text-[13px] font-bold tracking-wider text-white whitespace-nowrap">
        <span className={`text-[9.5px] [@media(min-width:1440px)]:text-[11px] ${squareColor}`}>■</span>
        <span className="truncate max-w-[185px] [@media(min-width:1440px)]:max-w-[175px]">{scrambledText}</span>
      </div>
      {tag && (
        <span className="text-[8.5px] [@media(min-width:1440px)]:text-[10px] tracking-widest font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400 shrink-0">
          {tag}
        </span>
      )}
    </div>
  )
})

const SkillCard = memo(function SkillCard({ skill, index, isResolved }) {
  const data = isResolved ? skill.resolved : skill.unresolved
  const color = skill.activeColor

  const positionClass = POSITION_MAP[skill.wrapperClass] || 'top-[10%] left-[10%]'

  const borderColor =
    color === 'red'
      ? 'border-rose-500/30 shadow-[0_0_12px_rgba(244,63,94,0.08)]'
      : color === 'cyan'
        ? 'border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.08)]'
        : 'border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.08)]'

  const highlightClass =
    color === 'red'
      ? 'text-rose-400'
      : color === 'cyan'
        ? 'text-cyan-400'
        : 'text-emerald-400'

  return (
    <motion.div
      initial={{ scale: 0.88, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.45 + index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`absolute ${positionClass} pointer-events-none select-none z-10`}
    >
      <div className={`relative w-[clamp(210px,19.45vw,280px)] [@media(min-width:1440px)]:w-[286px] p-3.5 [@media(min-width:1440px)]:p-[18px] rounded-xl [@media(min-width:1440px)]:rounded-2xl bg-zinc-950/95 backdrop-blur-sm border ${borderColor} shadow-lg`}>
        <HudHeader
          text={data.header}
          tag={skill.tag}
          color={color}
          speed={18}
        />

        <div className="flex flex-col">
          <HudRow
            label="STACK ID"
            value={data.stackId}
            speed={18}
          />
          <HudRow
            label="CONFIDENCE"
            value={data.confidence}
            highlightColor={highlightClass}
            speed={22}
          />
          <HudRow
            label="CORE TECH"
            value={data.frameworks}
            speed={20}
          />
          <HudRow
            label="LATENCY"
            value={data.latency}
            speed={18}
          />
        </div>
      </div>
    </motion.div>
  )
})

function BodySignals({ progress = 0 }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-18 font-mono select-none hidden lg:block">
      {SKILLS_CONFIG.map((skill, index) => {
        const isResolved = progress >= skill.threshold
        return (
          <SkillCard
            key={skill.id}
            skill={skill}
            index={index}
            isResolved={isResolved}
          />
        )
      })}
    </div>
  )
}

export default memo(BodySignals)
