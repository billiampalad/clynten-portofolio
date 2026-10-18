import { useMemo } from 'react'
import './HeroRadarLoader.css'

export default function HeroRadarLoader({ progress = 0 }) {
  const percentage = Math.min(100, Math.max(0, Math.round(progress)))
  const isComplete = percentage >= 100

  // Dynamic telemetry status text based on scan progress
  const statusText = useMemo(() => {
    if (percentage < 25) return 'CALIBRATING OPTICAL SENSORS...'
    if (percentage < 50) return 'SCANNING DEVELOPER FREQUENCY...'
    if (percentage < 75) return 'SYNCHRONIZING FRAME TELEMETRY...'
    if (percentage < 100) return 'TARGET DETECTED // DECRYPTING DATA...'
    return 'SIGNAL LOCKED // INITIALIZING SIGNAL'
  }, [percentage])

  // Formatted percentage with leading zero (e.g., 007%, 048%, 100%)
  const formattedPercentage = String(percentage).padStart(3, '0')

  return (
    <div className={`hero-radar-overlay ${isComplete ? 'is-complete' : ''}`}>
      {/* 4 Corner Tech HUD Brackets */}
      <div className="radar-corner top-left" />
      <div className="radar-corner top-right" />
      <div className="radar-corner bottom-left" />
      <div className="radar-corner bottom-right" />

      {/* Top Telemetry Header */}
      <div className="radar-hud-header">
        <span className="radar-badge-tag">
          <span className="radar-live-dot" />
          RECON // BIO-RADAR V2.4
        </span>
        <span className="radar-freq-tag">FREQ: 142.80 MHz</span>
      </div>

      {/* Main Radar Scope */}
      <div className="radar-scope-wrapper">
        <div className="radar-scope">
          {/* Compass Azimuth Degree Ring */}
          <div className="radar-ring-compass">
            <span className="cardinal-mark north">000°</span>
            <span className="cardinal-mark east">090°</span>
            <span className="cardinal-mark south">180°</span>
            <span className="cardinal-mark west">270°</span>
          </div>

          {/* Concentric Sonar Rings */}
          <div className="radar-ring ring-outer" />
          <div className="radar-ring ring-mid" />
          <div className="radar-ring ring-inner" />

          {/* Crosshair Axes */}
          <div className="radar-axis axis-horizontal" />
          <div className="radar-axis axis-vertical" />

          {/* Sweeping Conical Radar Beam */}
          <div className="radar-sweep-beam" />

          {/* Simulated Signal Blip Targets */}
          <div className="radar-blip blip-1" />
          <div className="radar-blip blip-2" />
          <div className="radar-blip blip-3" />

          {/* Center Digital Percentage Readout */}
          <div className="radar-center-hub">
            <div className="radar-percent-display">
              <span className="radar-percent-num">{formattedPercentage}</span>
              <span className="radar-percent-symbol">%</span>
            </div>
            <div className="radar-target-status">
              {isComplete ? 'TARGET LOCKED' : 'SEARCHING'}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Information & Progress Bar */}
      <div className="radar-hud-footer">
        <div className="radar-status-line">
          <span className="radar-prompt-symbol">&gt;</span>
          <span className="radar-status-msg">{statusText}</span>
        </div>

        {/* Minimalist Micro Bar */}
        <div className="radar-bar-track">
          <div
            className="radar-bar-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="radar-meta-row">
          <span>LAT: 07°14'N // LON: 112°45'E</span>
          <span>SYS_SIGNAL: CBP-99</span>
        </div>
      </div>
    </div>
  )
}
