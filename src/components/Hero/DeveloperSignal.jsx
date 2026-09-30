import React, { useMemo } from 'react'
import { developerSignals } from '../../data/developerSignals'
import SignalLine from './SignalLine'
import './DeveloperSignal.css'

export default function DeveloperSignal({ progress = 0 }) {
  // Find current active signal based on scroll progress
  const activeSignal = useMemo(() => {
    return (
      developerSignals.find(
        (s) => progress >= s.start && progress <= s.end
      ) || developerSignals[developerSignals.length - 1]
    )
  }, [progress])

  const percentage = Math.min(100, Math.max(0, Math.round(progress * 100)))

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
          <span className="signal-category-label">{activeSignal.label}</span>
        </div>

        <h2 className="signal-main-title">{activeSignal.title}</h2>
        <p className="signal-subtitle">{activeSignal.subtitle}</p>
      </div>
    </div>
  )
}
