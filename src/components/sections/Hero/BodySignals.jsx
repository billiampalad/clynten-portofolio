import { SKILLS_CONFIG } from '@/content/skills'
import { useTextScramble } from '@/hooks/useTextScramble'
import './BodySignals.css'

function HudRow({ label, value, highlightClass = '', speed = 20, isContinuous = false }) {
  const scrambledLabel = useTextScramble(label, speed, isContinuous)
  const scrambledVal = useTextScramble(value, speed, isContinuous)

  return (
    <div className="hud-row">
      <span className="hud-key">{scrambledLabel}</span>
      <span className={`hud-val ${highlightClass}`}>{scrambledVal}</span>
    </div>
  )
}

function HudHeader({ text, tag, squareClass, colorClass, speed = 18, isContinuous = false }) {
  const scrambledText = useTextScramble(text, speed, isContinuous)

  return (
    <div className="hud-card-header">
      <div className="hud-header-left">
        <span className={`hud-square-indicator ${squareClass}`}>■</span>
        <span className="hud-header-title">{scrambledText}</span>
      </div>
      <div className="hud-header-right">
        <span className={`hud-micro-bars ${colorClass}-bars`}>
          <span className="bar b1" />
          <span className="bar b2" />
          <span className="bar b3" />
        </span>
        {tag && <span className="hud-tag-badge">{tag}</span>}
      </div>
    </div>
  )
}

function SkillCard({ skill, progress, isScrollZero }) {
  const isResolved = progress >= skill.threshold
  const data = isResolved ? skill.resolved : skill.unresolved
  const color = isScrollZero ? 'white' : skill.activeColor

  return (
    <div className={`callout-card-wrapper ${skill.wrapperClass}`}>
      <div className={`signaliq-hud-card ${skill.cardClass} theme-${color}`}>
        <div className="hud-card-corner top-left" />
        <div className="hud-card-corner bottom-right" />

        <HudHeader
          text={data.header}
          tag={skill.tag}
          squareClass={`${color}-square`}
          colorClass={color}
          speed={18}
          isContinuous={isScrollZero}
        />

        <div className="hud-telemetry-body">
          <div className={`hud-vertical-line ${color}-line`} />
          <div className="hud-data-rows">
            <HudRow
              label="STACK ID"
              value={data.stackId}
              speed={18}
              isContinuous={isScrollZero}
            />
            <HudRow
              label="CONFIDENCE"
              value={data.confidence}
              highlightClass={`highlight-${color}`}
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

        <div className={`hud-card-beam ${color}-beam`} />
      </div>
    </div>
  )
}

export default function BodySignals({ progress = 0 }) {
  const isScrollZero = progress < 0.04
  const fadeOpacity = Math.max(0, Math.min(1, 1 - progress / 0.18))

  return (
    <div
      className="face-signals-overlay"
      style={{ '--fade-opacity': fadeOpacity.toFixed(3) }}
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