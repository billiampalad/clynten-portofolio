import './TelemetryWidgets.css'

export default function TelemetryWidgets({ progress = 0 }) {
  const radarRotation = Math.round(progress * 360)
  // Smooth fade-out on scroll (1 at scroll 0, 0 by progress 0.18)
  const fadeOpacity = Math.max(0, Math.min(1, 1 - progress / 0.18))

  return (
    <div
      className="telemetry-widgets-wrapper"
      style={{ '--fade-opacity': fadeOpacity.toFixed(3) }}
    >
      {/* 1. Top Right Holographic Radar Widget */}
      <div className="top-right-radar-card">
        <div className="radar-circle-wrapper">
          <svg className="radar-svg" viewBox="0 0 80 80">
            {/* Outer dotted track */}
            <circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            {/* Inner target circle */}
            <circle
              cx="40"
              cy="40"
              r="22"
              fill="none"
              stroke="rgba(0, 255, 170, 0.25)"
              strokeWidth="1"
            />
            {/* Center dot */}
            <circle cx="40" cy="40" r="2.5" fill="#00ffaa" />
            {/* Rotating radar ray */}
            <line
              x1="40"
              y1="40"
              x2="40"
              y2="4"
              stroke="#00ffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{
                transformOrigin: '40px 40px',
                transform: `rotate(${radarRotation}deg)`,
                filter: 'drop-shadow(0 0 6px #00ffff)',
              }}
            />
          </svg>
          <div className="radar-angle-badge">{radarRotation}°</div>
        </div>

        <div className="radar-info">
          <div className="info-badge">
            <span className="info-dot" />
            <span>OPTICAL SENSOR // ACTIVE</span>
          </div>
          <div className="info-stat">
            <span className="stat-label">BANDWIDTH</span>
            <span className="stat-val">10.4 Gbps</span>
          </div>
          <div className="info-stat">
            <span className="stat-label">RENDER PIPELINE</span>
            <span className="stat-val">4K ULTRA HD</span>
          </div>
        </div>
      </div>

      {/* 3. Center Bottom Ambient Futuristic Scroll Prompt */}
      <div className="center-scroll-hint" style={{ opacity: Math.max(0, 1 - progress * 4) }}>
        <div className="cyber-mouse-pill">
          <span className="mouse-wheel-laser" />
        </div>
        <div className="hint-label-wrapper">
          <span className="hint-bracket">[</span>
          <span className="hint-text">SCROLL TO EXPLORE TELEMETRY</span>
          <span className="hint-bracket">]</span>
        </div>
        <div className="hint-chevrons">
          <span className="chevron-bar c1" />
          <span className="chevron-bar c2" />
        </div>
      </div>
    </div>
  )
}
