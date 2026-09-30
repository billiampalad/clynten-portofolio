import React, { useMemo } from 'react'
import { developerSignals } from '../../data/developerSignals'
import { useTextScramble } from '../../hooks/useTextScramble'
import SignalLine from './SignalLine'
import './DeveloperSignal.css'

export default function DeveloperSignal({ progress = 0 }) {
  const activeSignal = useMemo(() => {
    return (
      developerSignals.find(
        (s) => progress >= s.start && progress <= s.end
      ) || developerSignals[developerSignals.length - 1]
    )
  }, [progress])

  const percentage = Math.min(100, Math.max(0, Math.round(progress * 100)))

  // Digital Scramble Text for dynamic Signal titles and status
  const scrambledTitle = useTextScramble(activeSignal.title, 20)
  const scrambledLabel = useTextScramble(activeSignal.label, 30)

  return (
    <div className="developer-signal-container">
      {/* Top Telemetry Header */}
      <div className="signal-top-bar">
        <div className="signal-profile-counter">
          <span className="scanned-label">PROFILE SCANNED</span>
          <span className="scanned-percentage">
            {String(percentage).padStart(3, '0')}%
          </span>
        </div>

        <div className={`signal-status-badge ${activeSignal.statusColor}`}>
          <span className="status-dot" />
          <span className="status-text">{activeSignal.status}</span>
        </div>
      </div>

      {/* Dynamic ECG Waveform Line */}
      <SignalLine progress={progress} />

      {/* Main Signal Display Card */}
      <div className="signal-content-card">
        <div className="signal-header">
          <span className="signal-phase-tag">PHASE // {activeSignal.phase}</span>
          <span className="signal-category-label">{scrambledLabel}</span>
        </div>

        <h2 className="signal-main-title">{scrambledTitle}</h2>
        <p className="signal-subtitle">{activeSignal.subtitle}</p>
      </div>

      {/* Bottom Circular Telemetry & Channel Info */}
      <div className="signal-bottom-telemetry">
        <div className="telemetry-item">
          <span className="t-key">FREQ</span>
          <span className="t-val">2.48 GHz</span>
        </div>
        <div className="telemetry-item">
          <span className="t-key">LATENCY</span>
          <span className="t-val">0.04 ms</span>
        </div>
        <div className="telemetry-item">
          <span className="t-key">CONFIDENCE</span>
          <span className="t-val">{Math.min(99.9, 60 + percentage * 0.4).toFixed(1)}%</span>
        </div>
      </div>
    </div>
  )
}
