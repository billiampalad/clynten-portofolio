import React from 'react'
import './TelemetryWidgets.css'

const PHASES = [
  { id: '01', name: 'SYS_SCAN', range: [0, 0.28] },
  { id: '02', name: 'PROJECT_DETECTION', range: [0.28, 0.58] },
  { id: '03', name: 'MULTI_DOMAIN', range: [0.58, 0.82] },
  { id: '04', name: 'IDENTITY_VERIFIED', range: [0.82, 1.0] },
]

export default function TelemetryWidgets({ progress = 0 }) {
  const radarRotation = Math.round(progress * 360)

  return (
    <div className="telemetry-widgets-wrapper">
      {/* 1. Left Vertical Scanning Milestone Tracker */}
      <div className="vertical-phase-tracker">
        <div className="tracker-line-track">
          <div
            className="tracker-line-fill"
            style={{ height: `${progress * 100}%` }}
          />
        </div>
        <div className="tracker-steps">
          {PHASES.map((phase, i) => {
            const isCompleted = progress >= phase.range[0]
            const isCurrent = progress >= phase.range[0] && progress <= phase.range[1]

            return (
              <div
                key={i}
                className={`tracker-step ${isCurrent ? 'step-current' : ''} ${isCompleted ? 'step-completed' : ''}`}
              >
                <div className="step-node">
                  <span className="node-inner" />
                </div>
                <div className="step-label">
                  <span className="step-num">{phase.id}</span>
                  <span className="step-name">{phase.name}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 2. Top Right Holographic Radar Widget */}
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

      {/* 3. Center Bottom Ambient Scroll Prompt */}
      <div className="center-scroll-hint" style={{ opacity: Math.max(0, 1 - progress * 3) }}>
        <span className="hint-text">SCROLL TO ANALYZE PROFILE</span>
        <div className="hint-arrow">↓</div>
      </div>
    </div>
  )
}
