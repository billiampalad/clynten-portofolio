import { memo } from 'react'
import { motion } from 'framer-motion'
import { SKILLS_CONFIG } from '@/content/skills'
import { useTextScramble } from '@/hooks/useTextScramble'

const POSITION_MAP = {
  // skil 1 (Web Development)
  'webdev-wrapper':
    'top-[5%] left-[clamp(31px,3.06vw,44px)] [@media(min-width:1440px)]:top-[6%] [@media(min-width:1440px)]:left-[clamp(36px,2.5vw,48px)]',
  // skil 2 (Android Development)
  'android-wrapper':
    'top-[6.5%] left-[clamp(222px,21.68vw,312px)] [@media(min-width:1440px)]:top-[9%] [@media(min-width:1440px)]:left-[clamp(273px,18.96vw,364px)]',
  // skil 3 (Cyber Security)
  'cyber-wrapper':
    'top-[19%] left-[clamp(31px,3.06vw,44px)] [@media(min-width:1440px)]:top-[26%] [@media(min-width:1440px)]:left-[clamp(36px,2.5vw,48px)]',
  // skil 4 (Cloud & Networking)
  'net-wrapper':
    'top-[20.5%] left-[clamp(222px,21.68vw,312px)] [@media(min-width:1440px)]:top-[29%] [@media(min-width:1440px)]:left-[clamp(273px,18.96vw,364px)]',
  // skil 5 (Database Architecture)
  'db-wrapper':
    'top-[33%] left-[clamp(31px,3.06vw,44px)] [@media(min-width:1440px)]:top-[46%] [@media(min-width:1440px)]:left-[clamp(36px,2.5vw,48px)]',
  // skil 6 (UI/UX Engineering)
  'uiux-wrapper':
    'top-[34.5%] left-[clamp(222px,21.68vw,312px)] [@media(min-width:1440px)]:top-[49%] [@media(min-width:1440px)]:left-[clamp(273px,18.96vw,364px)]',
}

const HudRow = memo(function HudRow({ label, value, highlightColor = '', speed = 20 }) {
  const scrambledVal = useTextScramble(value, speed, false)

  return (
    <div className="flex items-center justify-between text-[clamp(7px,0.66vw,9.5px)] [@media(min-width:1440px)]:text-[clamp(8.5px,0.55vw,10.5px)] tracking-wider py-[clamp(1.5px,0.22vh,2px)] [@media(min-width:1440px)]:py-[clamp(3.5px,0.56vh,6px)] border-b border-white/[0.04] last:border-none whitespace-nowrap">
      <span className="text-zinc-500 uppercase shrink-0 [@media(min-width:1440px)]:tracking-[clamp(0.5px,0.05vw,1px)]">{label}</span>
      <span className={`font-semibold truncate max-w-[clamp(110px,10.77vw,155px)] [@media(min-width:1440px)]:max-w-[clamp(125px,8.85vw,170px)] ml-1 shrink-0 ${highlightColor || 'text-zinc-300'}`}>
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
    <div className="flex items-center justify-between pb-[clamp(3px,0.44vh,4px)] mb-[clamp(3px,0.44vh,4px)] [@media(min-width:1440px)]:pb-[clamp(5px,0.74vh,8px)] [@media(min-width:1440px)]:mb-[clamp(5px,0.74vh,8px)] border-b border-white/10 whitespace-nowrap">
      <div className="flex items-center gap-[clamp(5px,0.42vw,6px)] [@media(min-width:1440px)]:gap-[clamp(6px,0.42vw,8px)] text-[clamp(8.5px,0.83vw,12px)] [@media(min-width:1440px)]:text-[clamp(10px,0.68vw,13px)] font-bold tracking-wider text-white whitespace-nowrap">
        <span className={`text-[clamp(7px,0.69vw,10px)] [@media(min-width:1440px)]:text-[clamp(8.5px,0.57vw,11px)] ${squareColor}`}>■</span>
        <span className="truncate max-w-[clamp(115px,11.46vw,165px)] [@media(min-width:1440px)]:max-w-[clamp(130px,9.11vw,175px)]">{scrambledText}</span>
      </div>
      {tag && (
        <span className="text-[clamp(6.5px,0.62vw,9px)] [@media(min-width:1440px)]:text-[clamp(8px,0.52vw,10px)] tracking-widest font-mono px-[clamp(4px,0.42vw,6px)] py-[clamp(1px,0.22vh,2px)] [@media(min-width:1440px)]:px-[clamp(4px,0.31vw,6px)] [@media(min-width:1440px)]:py-[clamp(1px,0.19vh,2px)] rounded bg-white/5 border border-white/10 text-zinc-400 shrink-0">
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
      <div className={`relative w-[clamp(185px,18.07vw,260px)] [@media(min-width:1440px)]:w-[clamp(215px,14.9vw,286px)] px-[clamp(9px,0.83vw,12px)] py-[clamp(8px,1.11vh,12px)] [@media(min-width:1440px)]:px-[clamp(14px,0.94vw,18px)] [@media(min-width:1440px)]:py-[clamp(12px,1.67vh,18px)] rounded-xl [@media(min-width:1440px)]:rounded-[clamp(12px,0.83vw,16px)] bg-zinc-950/95 backdrop-blur-sm border ${borderColor} shadow-lg`}>
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
