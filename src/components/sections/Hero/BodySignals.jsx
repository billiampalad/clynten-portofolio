import { memo } from 'react'
import { motion } from 'framer-motion'
import { SKILLS_CONFIG } from '@/content/skills'
import { useTextScramble } from '@/hooks/useTextScramble'

const POSITION_MAP = {
  // skil 1 (Web Development)
  'webdev-wrapper': 'top-[7%] [@media(min-width:1440px)]:top-[6%] left-3 lg:left-10 xl:left-[calc(50%-550px)] [@media(min-width:1440px)]:left-12 [@media(min-width:1600px)]:left-14',
  // skil 2 (Android Development)
  'android-wrapper': 'top-[10%] [@media(min-width:1440px)]:top-[9%] left-[175px] lg:left-[250px] xl:left-[calc(50%-370px)] [@media(min-width:1440px)]:left-[332px] [@media(min-width:1600px)]:left-[346px]',
  // skil 3 (Cyber Security)
  'cyber-wrapper': 'top-[28%] [@media(min-width:1440px)]:top-[26%] left-3 lg:left-15 xl:left-[calc(50%-550px)] [@media(min-width:1440px)]:left-12 [@media(min-width:1600px)]:left-14',
  // skil 4 (Cloud & Networking)
  'net-wrapper': 'top-[30%] [@media(min-width:1440px)]:top-[29%] left-[175px] lg:left-[270px] xl:left-[calc(50%-370px)] [@media(min-width:1440px)]:left-[332px] [@media(min-width:1600px)]:left-[346px]',
  // skil 5 (Database Architecture)
  'db-wrapper': 'top-[50%] [@media(min-width:1440px)]:top-[46%] left-3 lg:left-20 xl:left-[calc(50%-550px)] [@media(min-width:1440px)]:left-12 [@media(min-width:1600px)]:left-14',
  // skil 6 (UI/UX Engineering)
  'uiux-wrapper': 'top-[50%] [@media(min-width:1440px)]:top-[49%] left-[175px] lg:left-[290px] xl:left-[calc(50%-370px)] [@media(min-width:1440px)]:left-[332px] [@media(min-width:1600px)]:left-[346px]',
}

const HudRow = memo(function HudRow({ label, value, highlightColor = '', speed = 20 }) {
  const scrambledVal = useTextScramble(value, speed, false)

  return (
    <div className="flex items-center justify-between text-[7px] [@media(min-width:1440px)]:text-[9.5px] tracking-wider py-0.5 [@media(min-width:1440px)]:py-1.5 border-b border-white/[0.04] last:border-none whitespace-nowrap">
      <span className="text-zinc-500 uppercase [@media(min-width:1440px)]:tracking-[1px]">{label}</span>
      <span className={`font-semibold truncate max-w-[85px] [@media(min-width:1440px)]:max-w-[155px] ml-1 ${highlightColor || 'text-zinc-300'}`}>
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
    <div className="flex items-center justify-between pb-1 [@media(min-width:1440px)]:pb-2 mb-1 [@media(min-width:1440px)]:mb-2 border-b border-white/10 whitespace-nowrap">
      <div className="flex items-center gap-1 [@media(min-width:1440px)]:gap-2 text-[8px] [@media(min-width:1440px)]:text-[12px] font-bold tracking-wider text-white">
        <span className={`text-[7px] [@media(min-width:1440px)]:text-[10px] ${squareColor}`}>■</span>
        <span className="truncate max-w-[100px] [@media(min-width:1440px)]:max-w-[160px]">{scrambledText}</span>
      </div>
      {tag && (
        <span className="text-[6.5px] [@media(min-width:1440px)]:text-[9px] tracking-widest font-mono px-1 py-0.2 [@media(min-width:1440px)]:px-2 [@media(min-width:1440px)]:py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400">
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
      <div className={`relative w-[155px] sm:w-[165px] [@media(min-width:1440px)]:w-[260px] p-2 [@media(min-width:1440px)]:p-4 rounded-lg [@media(min-width:1440px)]:rounded-xl bg-zinc-950/95 backdrop-blur-sm border ${borderColor} shadow-lg`}>
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
