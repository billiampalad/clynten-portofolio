import { useMemo } from 'react'
import { developerSignals } from '@/content/developerSignals'
import { useTextScramble } from '@/hooks/useTextScramble'
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

  // Segmented 10-block progress bar calculation
  const totalBlocks = 10
  const filledBlocks = Math.round((percentage / 100) * totalBlocks)

  return (
    <div className={`developer-signal-container theme-${activeSignal.statusColor || 'green'}`}>
      {/* Sci-Fi Decorative Corner Brackets */}
      <span className="hud-corner-bracket top-left" />
      <span className="hud-corner-bracket top-right" />
      <span className="hud-corner-bracket bottom-left" />
      <span className="hud-corner-bracket bottom-right" />

      {/* Glowing Top Laser Beam */}
      <div className="signal-laser-beam" />

      {/* Top Telemetry Header */}
      <div className="signal-top-bar">
        <div className="signal-profile-counter">
          <div className="scanned-meta">
            <span className="scanned-label">PROFILE SCANNED</span>
            <div className="segmented-progress-meter" aria-hidden="true">
              {Array.from({ length: totalBlocks }).map((_, i) => (
                <span
                  key={i}
                  className={`meter-block ${i < filledBlocks ? 'filled' : ''}`}
                />
              ))}
            </div>
          </div>
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

        {/* Dynamic Skill Stack Badges */}
        {activeSignal.tags && (
          <div className="signal-skill-tags">
            {activeSignal.tags.map((tag, idx) => (
              <span key={idx} className="skill-tag-pill">
                <span className="pill-dot" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Diagnostics Matrix */}
      <div className="signal-bottom-telemetry">
        <div className="telemetry-item">
          <span className="t-key">FREQ</span>
          <span className="t-val">{activeSignal.metrics?.freq || '3.20 GHz'}</span>
        </div>
        <div className="telemetry-item">
          <span className="t-key">LATENCY</span>
          <span className="t-val">{activeSignal.metrics?.latency || '< 0.02 ms'}</span>
        </div>
        <div className="telemetry-item">
          <span className="t-key">ACCURACY</span>
          <span className="t-val">{activeSignal.metrics?.accuracy || '99.8%'}</span>
        </div>
        <div className="telemetry-item">
          <span className="t-key">ENCRYPT</span>
          <span className="t-val">AES-256</span>
        </div>
      </div>

      {/* Micro Status Bar */}
      <div className="signal-card-footer">
        <span className="footer-code">SYS_ID: CLYNTEN-DEV</span>
        <span className="footer-status">ONLINE // STREAM</span>
      </div>
    </div>
  )
}
