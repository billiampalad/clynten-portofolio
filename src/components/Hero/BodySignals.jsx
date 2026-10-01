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
      {/* 1. Biometric Target Positioned on Head/Face */}
      <div
        className={`callout-anchor-group face-group ${isFaceActive ? 'active' : 'dimmed'}`}
        style={{ top: '22%', left: '50%' }}
      >
        {/* Anchor Reticle Point on Head */}
        <div className="anchor-dot-center">
          <span className="anchor-crosshair-h" />
          <span className="anchor-crosshair-v" />
          <span className="anchor-dot red-dot" />
          <span className="anchor-ping red-ping" />
        </div>

        {/* SVG Line: Starts at anchor (0,0), angles down-right and connects to Biometric Card */}
        <svg className="connector-svg face-svg" viewBox="0 0 160 70">
          <path
            d="M 0 0 L 35 0 L 75 42 L 155 42"
            fill="none"
            stroke="#ff3355"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            style={{ filter: 'drop-shadow(0 0 8px rgba(255, 51, 85, 0.8))' }}
          />
          <circle cx="155" cy="42" r="2.5" fill="#ff3355" />
        </svg>

        {/* SignalIQ / HUD Telemetry Card (Biometric Scan) */}
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

      {/* 2. Core Architecture Target on Neck / Torso */}
      <div
        className={`callout-anchor-group core-group ${isCoreActive ? 'active' : 'dimmed'}`}
        style={{ top: '64%', left: '49%' }}
      >
        {/* Exact Anchor Point on Neck / Core */}
        <div className="anchor-dot-center-core">
          <span className="anchor-crosshair-h cyan-h" />
          <span className="anchor-crosshair-v cyan-v" />
          <span className="anchor-dot cyan-dot" />
          <span className="anchor-ping cyan-ping" />
        </div>

        {/* SVG Line: Starts at neck anchor and angles up-left to card */}
        <svg className="connector-svg core-svg" viewBox="0 0 170 70">
          <path
            d="M 165 48 L 120 12 L 2 12"
            fill="none"
            stroke="#00f0ff"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            style={{ filter: 'drop-shadow(0 0 8px rgba(0, 240, 255, 0.8))' }}
          />
          <circle cx="2" cy="12" r="2.5" fill="#00f0ff" />
        </svg>

        {/* SignalIQ / HUD Telemetry Card (Sys-Engine) */}
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
