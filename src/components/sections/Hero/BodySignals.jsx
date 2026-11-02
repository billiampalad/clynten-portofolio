import { memo } from 'react'
import { motion } from 'framer-motion'
import { SKILLS_CONFIG } from '@/content/skills'
import { useTextScramble } from '@/hooks/useTextScramble'

const POSITION_MAP = {
  // skil 1
  'webdev-wrapper': 'top-[7%] left-3 lg:left-10 xl:left-[calc(50%-550px)]',
  // skil 2
  'android-wrapper': 'top-[10%] left-[175px] lg:left-[250px] xl:left-[calc(50%-370px)]',
  // skil 3
  'cyber-wrapper': 'top-[28%] left-3 lg:left-15 xl:left-[calc(50%-550px)]',
  // skil 4
  'net-wrapper': 'top-[30%] left-[175px] lg:left-[270px] xl:left-[calc(50%-370px)]',
  // skil 5
  'db-wrapper': 'top-[50%] left-3 lg:left-20 xl:left-[calc(50%-550px)]',
  // skil 6
  'uiux-wrapper': 'top-[50%] left-[175px] lg:left-[290px] xl:left-[calc(50%-370px)]',
}

const HudRow = memo(function HudRow({ label, value, highlightColor = '', speed = 20 }) {
  const scrambledVal = useTextScramble(value, speed, false)

  return (
    <div className="flex items-center justify-between text-[7px] tracking-wider py-0.5 border-b border-white/[0.04] last:border-none whitespace-nowrap">
      <span className="text-zinc-500 uppercase">{label}</span>
      <span className={`font-semibold truncate max-w-[85px] ml-1 ${highlightColor || 'text-zinc-300'}`}>
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
    <div className="flex items-center justify-between pb-1 mb-1 border-b border-white/10 whitespace-nowrap">
      <div className="flex items-center gap-1 text-[8px] font-bold tracking-wider text-white">
        <span className={`text-[7px] ${squareColor}`}>■</span>
        <span className="truncate max-w-[100px]">{scrambledText}</span>
      </div>
      {tag && (
        <span className="text-[6.5px] tracking-widest font-mono px-1 py-0.2 rounded bg-white/5 border border-white/10 text-zinc-400">
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
      <div className={`relative w-[155px] sm:w-[165px] p-2 rounded-lg bg-zinc-950/95 backdrop-blur-sm border ${borderColor} shadow-lg`}>
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
