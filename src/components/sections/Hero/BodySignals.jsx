import { memo } from 'react'
import { motion } from 'framer-motion'
import { SKILLS_CONFIG } from '@/content/skills'
import { useTextScramble } from '@/hooks/useTextScramble'

const POSITION_MAP = {
  // skil 1 (Web Development)
  'webdev-wrapper':
    'top-[clamp(44px,min(11vw,6.5dvh),62px)] left-[clamp(8px,min(2.5vw,1.5vh),16px)] right-auto md:max-lg:top-[clamp(16px,2.2vh,32px)] md:max-lg:left-[clamp(16px,2vw,28px)] md:max-lg:right-auto lg:top-[4%] lg:left-[clamp(31px,3.06vw,44px)] lg:right-auto [@media(min-width:1440px)]:top-[6%] [@media(min-width:1440px)]:left-[clamp(36px,2.5vw,48px)]',
  // skil 2 (Android Development)
  'android-wrapper':
    'top-[clamp(44px,min(11vw,6.5dvh),62px)] right-[clamp(8px,min(2.5vw,1.5vh),16px)] left-auto md:max-lg:top-[clamp(16px,2.2vh,32px)] md:max-lg:left-auto md:max-lg:right-[clamp(16px,2vw,28px)] lg:top-[6.5%] lg:left-[clamp(210px,20.57vw,296px)] lg:right-auto [@media(min-width:1440px)]:top-[9%] [@media(min-width:1440px)]:left-[clamp(273px,18.96vw,364px)]',
  // skil 3 (Cyber Security)
  'cyber-wrapper':
    'top-[clamp(130px,min(30vw,18.5dvh),174px)] left-[clamp(8px,min(2.5vw,1.5vh),16px)] right-auto md:max-lg:top-[clamp(110px,17vh,205px)] md:max-lg:left-[clamp(16px,2vw,28px)] md:max-lg:right-auto lg:top-[22.5%] lg:left-[clamp(31px,3.06vw,44px)] lg:right-auto [@media(min-width:1440px)]:top-[26%] [@media(min-width:1440px)]:left-[clamp(36px,2.5vw,48px)]',
  // skil 4 (Cloud & Networking)
  'net-wrapper':
    'top-[clamp(130px,min(30vw,18.5dvh),174px)] right-[clamp(8px,min(2.5vw,1.5vh),16px)] left-auto md:max-lg:top-[clamp(110px,17vh,205px)] md:max-lg:left-auto md:max-lg:right-[clamp(16px,2vw,28px)] lg:top-[25%] lg:left-[clamp(210px,20.57vw,296px)] lg:right-auto [@media(min-width:1440px)]:top-[29%] [@media(min-width:1440px)]:left-[clamp(273px,18.96vw,364px)]',
  // skil 5 (Database Architecture)
  'db-wrapper':
    'top-[clamp(216px,min(49vw,30.5dvh),286px)] left-[clamp(8px,min(2.5vw,1.5vh),16px)] right-auto md:max-lg:top-[clamp(205px,32vh,385px)] md:max-lg:left-[clamp(16px,2vw,28px)] md:max-lg:right-auto lg:top-[41%] lg:left-[clamp(31px,3.06vw,44px)] lg:right-auto [@media(min-width:1440px)]:top-[46%] [@media(min-width:1440px)]:left-[clamp(36px,2.5vw,48px)]',
  // skil 6 (UI/UX Engineering)
  'uiux-wrapper':
    'top-[clamp(216px,min(49vw,30.5dvh),286px)] right-[clamp(8px,min(2.5vw,1.5vh),16px)] left-auto md:max-lg:top-[clamp(205px,32vh,385px)] md:max-lg:left-auto md:max-lg:right-[clamp(16px,2vw,28px)] lg:top-[43.5%] lg:left-[clamp(210px,20.57vw,296px)] lg:right-auto [@media(min-width:1440px)]:top-[49%] [@media(min-width:1440px)]:left-[clamp(273px,18.96vw,364px)]',
}

const HudRow = memo(function HudRow({ label, value, highlightColor = '', speed = 20 }) {
  const scrambledVal = useTextScramble(value, speed, false)

  return (
    <div className="flex items-center justify-between text-[clamp(6px,min(1.6vw,0.85vh),8px)] md:max-lg:text-[clamp(6.5px,min(0.8vw,0.85vh),8.5px)] lg:text-[clamp(6.5px,0.62vw,9px)] [@media(min-width:1440px)]:text-[clamp(8.5px,0.55vw,10.5px)] tracking-wider py-[clamp(1.5px,0.25vh,2.5px)] md:max-lg:py-[clamp(1.5px,0.25vh,2.5px)] lg:py-[clamp(2.5px,0.39vh,3.5px)] [@media(min-width:1440px)]:py-[clamp(3.5px,0.56vh,6px)] border-b border-white/[0.04] last:border-none whitespace-nowrap">
      <span className="text-zinc-500 uppercase shrink-0 tracking-[clamp(0.3px,0.06vw,0.6px)] md:max-lg:tracking-[clamp(0.4px,0.06vw,0.7px)] [@media(min-width:1440px)]:tracking-[clamp(0.5px,0.05vw,1px)]">{label}</span>
      <span className={`font-semibold truncate max-w-[clamp(70px,min(20vw,12vh),100px)] md:max-lg:max-w-[clamp(76px,10vw,115px)] lg:max-w-[clamp(95px,9.66vw,139px)] [@media(min-width:1440px)]:max-w-[clamp(125px,8.85vw,170px)] ml-1 shrink-0 ${highlightColor || 'text-zinc-300'}`}>
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
    <div className="flex items-center justify-between pb-[clamp(3px,min(0.8vw,0.5vh),4.5px)] mb-[clamp(3px,min(0.8vw,0.5vh),4.5px)] md:max-lg:pb-[clamp(2px,0.35vh,3.5px)] md:max-lg:mb-[clamp(2px,0.35vh,3.5px)] lg:pb-[clamp(4px,0.61vh,5.5px)] lg:mb-[clamp(4px,0.61vh,5.5px)] [@media(min-width:1440px)]:pb-[clamp(5px,0.74vh,8px)] [@media(min-width:1440px)]:mb-[clamp(5px,0.74vh,8px)] border-b border-white/10 whitespace-nowrap">
      <div className="flex items-center gap-[clamp(3.5px,min(1vw,0.5vh),5px)] md:max-lg:gap-[clamp(4px,0.5vw,6px)] lg:gap-[clamp(4.5px,0.4vw,6px)] [@media(min-width:1440px)]:gap-[clamp(6px,0.42vw,8px)] text-[clamp(7.5px,min(2.1vw,1.1vh),10px)] md:max-lg:text-[clamp(7.5px,min(0.95vw,1vh),10px)] lg:text-[clamp(8px,0.78vw,11.5px)] [@media(min-width:1440px)]:text-[clamp(10px,0.68vw,13px)] font-bold tracking-wider text-white whitespace-nowrap">
        <span className={`text-[clamp(6px,min(1.5vw,0.8vh),8px)] md:max-lg:text-[clamp(6px,min(0.75vw,0.8vh),8px)] lg:text-[clamp(6.5px,0.64vw,9px)] [@media(min-width:1440px)]:text-[clamp(8.5px,0.57vw,11px)] ${squareColor}`}>■</span>
        <span className="truncate max-w-[clamp(75px,min(22vw,12vh),105px)] md:max-lg:max-w-[clamp(85px,11vw,120px)] lg:max-w-[clamp(100px,10.15vw,146px)] [@media(min-width:1440px)]:max-w-[clamp(130px,9.11vw,175px)]">{scrambledText}</span>
      </div>
      {tag && (
        <span className="text-[clamp(5.5px,min(1.4vw,0.7vh),7.5px)] md:max-lg:text-[clamp(5.5px,min(0.7vw,0.75vh),7.5px)] lg:text-[clamp(6px,0.56vw,8px)] [@media(min-width:1440px)]:text-[clamp(8px,0.52vw,10px)] tracking-widest font-mono px-[clamp(2.5px,0.6vw,4px)] py-[clamp(0.5px,0.1vh,1px)] md:max-lg:px-[clamp(3px,0.4vw,4.5px)] md:max-lg:py-[clamp(0.5px,0.15vh,1px)] lg:px-[clamp(3.5px,0.35vw,5px)] lg:py-[clamp(0.5px,0.15vh,1.5px)] rounded md:max-lg:rounded-[2px] bg-white/5 border border-white/10 text-zinc-400 shrink-0">
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
      <div className={`relative w-[clamp(136px,min(41vw,21vh),185px)] md:max-lg:w-[clamp(138px,min(18vw,20vh),192px)] lg:w-[clamp(166px,16.26vw,234px)] [@media(min-width:1440px)]:w-[clamp(215px,14.9vw,286px)] px-[clamp(6px,min(1.6vw,0.9vh),9px)] py-[clamp(6px,min(1.4vw,1vh),10px)] md:max-lg:px-[clamp(7px,0.9vw,11px)] md:max-lg:py-[clamp(6px,0.9vh,10px)] lg:px-[clamp(8px,0.76vw,11px)] lg:py-[clamp(11px,1.67vh,15px)] [@media(min-width:1440px)]:px-[clamp(14px,0.94vw,18px)] [@media(min-width:1440px)]:py-[clamp(12px,1.67vh,18px)] rounded-xl md:max-lg:rounded-[clamp(6px,0.8vw,10px)] [@media(min-width:1440px)]:rounded-[clamp(12px,0.83vw,16px)] bg-zinc-950/95 backdrop-blur-sm border ${borderColor} shadow-lg [contain:paint]`}>
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
    <div className="absolute inset-0 pointer-events-none z-18 font-mono select-none block">
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
