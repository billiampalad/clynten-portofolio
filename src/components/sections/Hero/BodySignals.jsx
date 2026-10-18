import { SKILLS_CONFIG } from '@/content/skills'
import { useTextScramble } from '@/hooks/useTextScramble'

const POSITION_MAP = {
  'webdev-wrapper': 'top-[6%] left-[calc(50%-330px)]',
  'android-wrapper': 'top-[15%] left-[calc(50%-550px)]',
  'cyber-wrapper': 'top-[15%] left-[calc(50%+150px)]',
  'net-wrapper': 'top-[24%] left-[calc(50%-130px)]',
  'db-wrapper': 'top-[27%] left-[calc(50%-520px)]',
  'uiux-wrapper': 'top-[36%] left-[calc(50%-460px)]',
}

function HudRow({ label, value, highlightColor = '', speed = 20, isContinuous = false }) {
  const scrambledLabel = useTextScramble(label, speed, isContinuous)
  const scrambledVal = useTextScramble(value, speed, isContinuous)

  return (
    <div className="flex items-center justify-between text-[8px] tracking-wider py-0.5 border-b border-white/[0.04] last:border-none">
      <span className="text-zinc-500 uppercase">{scrambledLabel}</span>
      <span className={`font-semibold truncate max-w-[120px] ${highlightColor || 'text-zinc-300'}`}>
        {scrambledVal}
      </span>
    </div>
  )
}

function HudHeader({ text, tag, color, speed = 18, isContinuous = false }) {
  const scrambledText = useTextScramble(text, speed, isContinuous)

  const squareColor =
    color === 'red'
      ? 'text-rose-400'
      : color === 'cyan'
      ? 'text-cyan-400'
      : 'text-emerald-400'

  return (
    <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/10">
      <div className="flex items-center gap-1.5 text-[9px] font-bold tracking-wider text-white">
        <span className={`text-[8px] ${squareColor}`}>■</span>
        <span className="truncate max-w-[140px]">{scrambledText}</span>
      </div>
      {tag && (
        <span className="text-[7px] tracking-widest font-mono px-1.5 py-0.2 rounded bg-white/5 border border-white/10 text-zinc-400">
          {tag}
        </span>
      )}
    </div>
  )
}

function SkillCard({ skill, progress, isScrollZero }) {
  const isResolved = progress >= skill.threshold
  const data = isResolved ? skill.resolved : skill.unresolved
  const color = skill.activeColor

  const positionClass = POSITION_MAP[skill.wrapperClass] || 'top-[10%] left-[10%]'

  const borderColor =
    color === 'red'
      ? 'border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.08)]'
      : color === 'cyan'
      ? 'border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.08)]'
      : 'border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.08)]'

  const highlightClass =
    color === 'red'
      ? 'text-rose-400'
      : color === 'cyan'
      ? 'text-cyan-400'
      : 'text-emerald-400'

  const beamGradient =
    color === 'red'
      ? 'from-transparent via-rose-500 to-transparent'
      : color === 'cyan'
      ? 'from-transparent via-cyan-400 to-transparent'
      : 'from-transparent via-emerald-400 to-transparent'

  return (
    <div className={`absolute ${positionClass} pointer-events-none select-none z-10`}>
      <div className={`relative w-[210px] p-2.5 rounded-lg bg-zinc-950/85 backdrop-blur-xl border ${borderColor} shadow-2xl`}>
        {/* Top glowing laser line */}
        <div className={`absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r ${beamGradient} rounded-t-lg opacity-80`} />

        {/* Corner HUD ticks */}
        <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30 rounded-tl-[2px]" />
        <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30 rounded-br-[2px]" />

        <HudHeader
          text={data.header}
          tag={skill.tag}
          color={color}
          speed={18}
          isContinuous={isScrollZero}
        />

        <div className="flex flex-col">
          <HudRow
            label="STACK ID"
            value={data.stackId}
            speed={18}
            isContinuous={isScrollZero}
          />
          <HudRow
            label="CONFIDENCE"
            value={data.confidence}
            highlightColor={highlightClass}
            speed={22}
            isContinuous={isScrollZero}
          />
          <HudRow
            label="CORE TECH"
            value={data.frameworks}
            speed={20}
            isContinuous={isScrollZero}
          />
          <HudRow
            label="LATENCY"
            value={data.latency}
            speed={18}
            isContinuous={isScrollZero}
          />
        </div>
      </div>
    </div>
  )
}

export default function BodySignals({ progress = 0 }) {
  const isScrollZero = progress < 0.04
  const fadeOpacity = Math.max(0, Math.min(1, 1 - progress / 0.18))

  return (
    <div
      className="absolute inset-0 pointer-events-none z-18 font-mono select-none transition-opacity duration-200 hidden lg:block"
      style={{ opacity: fadeOpacity }}
    >
      {SKILLS_CONFIG.map((skill) => (
        <SkillCard
          key={skill.id}
          skill={skill}
          progress={progress}
          isScrollZero={isScrollZero}
        />
      ))}
    </div>
  )
}