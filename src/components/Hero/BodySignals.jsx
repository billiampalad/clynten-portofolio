import React from 'react'
import './BodySignals.css'

export default function BodySignals({ progress = 0 }) {
  const isFaceActive = progress >= 0.05
  const isCoreActive = progress >= 0.25

  // Smooth opacity curve for hero scrub
  const fadeOpacity = Math.max(0, Math.min(1, 1 - progress / 0.28))

  return (
    <div
      className="face-signals-overlay"
      style={{ '--fade-opacity': fadeOpacity.toFixed(3) }}
    >
      {/* 1. Biometric HUD Card (Upper Right Area) */}
      <div
        className={`callout-card-wrapper face-wrapper ${isFaceActive ? 'active' : 'dimmed'}`}
      >
        <div className="signaliq-hud-card face-card theme-red">
          {/* HUD Top Corner Accents */}
          <div className="hud-corner top-left" />
          <div className="hud-corner top-right" />
          
          {/* Header Row: Solid Square + Monospace Label */}
          <div className="hud-card-header">
            <span className="hud-square-indicator red-square">■</span>
            <span className="hud-header-title">BIOMETRIC // HIGH CONFIDENCE</span>
          </div>

          {/* Telemetry Data Grid with Left Vertical Bar */}
          <div className="hud-telemetry-body">
            <div className="hud-vertical-line red-line" />
            <div className="hud-data-rows">
              <div className="hud-row">
                <span className="hud-key">TARGET ID</span>
                <span className="hud-val">CLYNTEN_DEV_001</span>
              </div>
              <div className="hud-row">
                <span className="hud-key">CONFIDENCE</span>
                <span className="hud-val highlight-red">99.8%</span>
              </div>
              <div className="hud-row">
                <span className="hud-key">SCAN TYPE</span>
                <span className="hud-val">NEURAL / OPTICAL</span>
              </div>
              <div className="hud-row">
                <span className="hud-key">SIGNAL</span>
                <span className="hud-val">LOCKED — VERIFIED</span>
              </div>
            </div>
          </div>

          {/* Bottom HUD Bracket */}
          <div className="hud-bottom-bracket red-bracket" />
        </div>
      </div>

      {/* 2. Sys-Engine HUD Card (Left Mid Area) */}
      <div
        className={`callout-card-wrapper core-wrapper ${isCoreActive ? 'active' : 'dimmed'}`}
      >
        <div className="signaliq-hud-card core-card theme-cyan">
          {/* HUD Top Corner Accents */}
          <div className="hud-corner top-left" />
          <div className="hud-corner top-right" />

          {/* Header Row: Solid Square + Monospace Label */}
          <div className="hud-card-header">
            <span className="hud-square-indicator cyan-square">■</span>
            <span className="hud-header-title">SYS_ENGINE // CORE ARCH</span>
          </div>

          {/* Telemetry Data Grid with Left Vertical Bar */}
          <div className="hud-telemetry-body">
            <div className="hud-vertical-line cyan-line" />
            <div className="hud-data-rows">
              <div className="hud-row">
                <span className="hud-key">SYS ID</span>
                <span className="hud-val">ENGINE_V4_PRO</span>
              </div>
              <div className="hud-row">
                <span className="hud-key">STACK</span>
                <span className="hud-val highlight-cyan">MULTI-STACK DEV</span>
              </div>
              <div className="hud-row">
                <span className="hud-key">SECURITY</span>
                <span className="hud-val">ENCRYPTED // ACTIVE</span>
              </div>
              <div className="hud-row">
                <span className="hud-key">SIGNAL</span>
                <span className="hud-val">OPTIMAL — 0.04ms</span>
              </div>
            </div>
          </div>

          {/* Bottom HUD Bracket */}
          <div className="hud-bottom-bracket cyan-bracket" />
        </div>
      </div>
    </div>
  )
}
