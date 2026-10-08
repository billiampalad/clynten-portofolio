import './TargetReticle.css'

export default function TargetReticle({ progress = 0 }) {
  const percentage = Math.min(100, Math.max(0, Math.round(progress * 100)))

  return (
    <div className="target-reticle-container">
      {/* 4 Corner Tech Brackets */}
      <div className="corner-bracket top-left" />
      <div className="corner-bracket top-right" />
      <div className="corner-bracket bottom-left">
        <div className="spectrum-bars">
          <span className="s-bar" style={{ height: '40%' }} />
          <span className="s-bar" style={{ height: '75%' }} />
          <span className="s-bar" style={{ height: '55%' }} />
          <span className="s-bar" style={{ height: '90%' }} />
          <span className="s-bar" style={{ height: '60%' }} />
          <span className="s-bar" style={{ height: '35%' }} />
        </div>
      </div>
      <div className="corner-bracket bottom-right" />

      {/* Center Target Scanning Box */}
      <div className="center-target-box">
        <div className="target-id-badge">
          <span className="target-dot" />
          <span className="target-label">
            {progress < 0.85 ? 'TARGET ACQUIRING' : 'TARGET LOCKED // CBP'}
          </span>
          <span className="target-val">{percentage}%</span>
        </div>
      </div>
    </div>
  )
}
