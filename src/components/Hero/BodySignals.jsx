import React from 'react'
import './BodySignals.css'

export default function BodySignals({ progress = 0 }) {
  const isFaceActive = progress >= 0.1
  const isCoreActive = progress >= 0.35

  // Smooth fade-out on scroll (1 at scroll 0, 0 by progress 0.18)
  const fadeOpacity = Math.max(0, Math.min(1, 1 - progress / 0.18))

  return (
    <div
      className="face-signals-overlay"
      style={{ '--fade-opacity': fadeOpacity.toFixed(3) }}
    >
      {/* 1. Biometric Target Positioned Above Hair/Head */}
      <div
        className={`callout-anchor-group face-group ${isFaceActive ? 'active' : 'dimmed'}`}
        style={{ top: '20%', left: '50%' }}
      >
        {/* Anchor Point above hair */}
        <div className="anchor-dot-center">
          <span className="anchor-dot" />
          <span className="anchor-ping" />
        </div>

        {/* SVG Line: Starts at anchor (0,0), angles down-right and connects to Biometric Card */}
        <svg className="connector-svg face-svg" viewBox="0 0 130 60">
          <path
            d="M 0 0 L 30 0 L 65 38 L 128 38"
            fill="none"
            stroke="#00ffaa"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            style={{ filter: 'drop-shadow(0 0 6px rgba(0, 255, 170, 0.7))' }}
          />
        </svg>

        {/* Floating Callout Card connected directly to the line */}
        <div className="callout-floating-card face-card">
          <div className="card-top-row">
            <span className="card-code">BIOMETRIC // 01</span>
            <span className="card-status">OPTICAL LOCKED</span>
          </div>
          <div className="card-main-title">NEURAL DEVELOPER SCAN</div>
          <div className="card-sub-info">FACIAL RECOGNITION: 99.8% CONFIDENCE</div>
        </div>
      </div>

      {/* 2. Core Architecture Target on Neck: Line starts at EXACT center (0,0) and connects to left card */}
      <div
        className={`callout-anchor-group core-group ${isCoreActive ? 'active' : 'dimmed'}`}
        style={{ top: '65%', left: '49%' }}
      >
        {/* Exact Anchor Point on Neck */}
        <div className="anchor-dot-center-core">
          <span className="anchor-dot cyan-dot" />
          <span className="anchor-ping cyan-ping" />
        </div>

        {/* SVG Line: Starts at neck anchor (140, 40) and angles up-left to card */}
        <svg className="connector-svg core-svg" viewBox="0 0 140 50">
          <path
            d="M 140 40 L 95 10 L 2 10"
            fill="none"
            stroke="#00ffff"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            style={{ filter: 'drop-shadow(0 0 6px rgba(0, 255, 255, 0.7))' }}
          />
        </svg>

        {/* Floating Card on Left */}
        <div className="callout-floating-card core-card">
          <div className="card-top-row">
            <span className="card-code">SYS_ENGINE // 02</span>
            <span className="card-status cyan">VERIFIED</span>
          </div>
          <div className="card-main-title">CORE ARCHITECTURE</div>
          <div className="card-sub-info">REACT // THREE.JS // FULL STACK</div>
        </div>
      </div>
    </div>
  )
}
