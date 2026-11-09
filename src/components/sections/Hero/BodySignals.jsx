import { memo } from 'react'
import { motion } from 'framer-motion'
import { SKILLS_CONFIG } from '@/content/skills'
import { useTextScramble } from '@/hooks/useTextScramble'

const POSITION_MAP = {
  // skil 1 (Web Development)
  'webdev-wrapper':
    'top-[6%] left-[clamp(24px,2.5vw,36px)] [@media(min-width:1440px)]:top-[6%] [@media(min-width:1440px)]:left-[clamp(40px,2.5vw,48px)]',
  // skil 2 (Android Development)
  'android-wrapper':
    'top-[9%] left-[clamp(200px,min(19vw,27vh),280px)] [@media(min-width:1440px)]:top-[9%] [@media(min-width:1440px)]:left-[clamp(280px,18.96vw,364px)]',
  // skil 3 (Cyber Security)
  'cyber-wrapper':
    'top-[25%] left-[clamp(26px,2.78vw,40px)] [@media(min-width:1440px)]:top-[26%] [@media(min-width:1440px)]:left-[clamp(40px,2.5vw,48px)]',
  // skil 4 (Cloud & Networking)
  'net-wrapper':
    'top-[28%] left-[clamp(206px,min(19.6vw,28vh),290px)] [@media(min-width:1440px)]:top-[29%] [@media(min-width:1440px)]:left-[clamp(280px,18.96vw,364px)]',
  // skil 5 (Database Architecture)
  'db-wrapper':
    'top-[44%] left-[clamp(28px,3.05vw,44px)] [@media(min-width:1440px)]:top-[46%] [@media(min-width:1440px)]:left-[clamp(40px,2.5vw,48px)]',
  // skil 6 (UI/UX Engineering)
  'uiux-wrapper':
    'top-[47%] left-[clamp(212px,min(20.2vw,29vh),300px)] [@media(min-width:1440px)]:top-[49%] [@media(min-width:1440px)]:left-[clamp(280px,18.96vw,364px)]',
}

const HudRow = memo(function HudRow({ label, value, highlightColor = '', speed = 20 }) {
  const scrambledVal = useTextScramble(value, speed, false)

  return (
    <div className="flex items-center justify-between text-[clamp(7px,0.95vh,8.5px)] [@media(min-width:1440px)]:text-[clamp(9px,0.97vh,10.5px)] tracking-wider py-[clamp(1px,0.2vh,2px)] [@media(min-width:1440px)]:py-[clamp(3px,0.55vh,6px)] border-b border-white/[0.04] last:border-none whitespace-nowrap">
      <span className="text-zinc-500 uppercase shrink-0 [@media(min-width:1440px)]:tracking-[1px]">{label}</span>
      <span className={`font-semibold truncate max-w-[clamp(85px,min(9vw,13.5vh),130px)] [@media(min-width:1440px)]:max-w-[170px] ml-1 shrink-0 ${highlightColor || 'text-zinc-300'}`}>
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
    <div className="flex items-center justify-between pb-[clamp(2px,0.35vh,4px)] mb-[clamp(2px,0.45vh,5px)] [@media(min-width:1440px)]:pb-[clamp(6px,0.74vh,8px)] [@media(min-width:1440px)]:mb-[clamp(6px,0.74vh,8px)] border-b border-white/10 whitespace-nowrap">
      <div className="flex items-center gap-[clamp(4px,0.5vh,6px)] [@media(min-width:1440px)]:gap-2 text-[clamp(8.5px,1.15vh,10px)] [@media(min-width:1440px)]:text-[clamp(11.5px,1.2vh,13px)] font-bold tracking-wider text-white whitespace-nowrap">
        <span className={`text-[clamp(7.5px,0.95vh,8.5px)] [@media(min-width:1440px)]:text-[clamp(9.5px,1.02vh,11px)] ${squareColor}`}>■</span>
        <span className="truncate max-w-[clamp(100px,min(10.5vw,16vh),145px)] [@media(min-width:1440px)]:max-w-[175px]">{scrambledText}</span>
      </div>
      {tag && (
        <span className="text-[clamp(6.5px,0.85vh,7.5px)] [@media(min-width:1440px)]:text-[clamp(8.5px,0.92vh,10px)] tracking-widest font-mono px-[clamp(3px,0.3vw,4px)] py-[clamp(0.5px,0.1vh,1px)] [@media(min-width:1440px)]:px-1.5 [@media(min-width:1440px)]:py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400 shrink-0">
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
      <div className={`relative w-[clamp(165px,min(16.2vw,24.5vh),225px)] [@media(min-width:1440px)]:w-[clamp(215px,min(14.9vw,26.5vh),286px)] p-[clamp(6px,min(0.8vw,1.1vh),10px)] [@media(min-width:1440px)]:p-[clamp(14px,1.66vh,18px)] rounded-xl [@media(min-width:1440px)]:rounded-2xl bg-zinc-950/95 backdrop-blur-sm border ${borderColor} shadow-lg`}>
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
