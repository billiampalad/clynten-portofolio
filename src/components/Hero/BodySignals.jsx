import React from 'react'
import './BodySignals.css'

export default function BodySignals({ progress = 0 }) {
  const isFaceActive = progress >= 0.1
  const isCoreActive = progress >= 0.35

  return (
    <div className="face-signals-overlay">
      {/* 1. Face / Optical Biometric Target with Angled Leader Line to Right (Lowered away from top radar) */}
      <div className={`cyber-callout-wrapper face-callout ${isFaceActive ? 'active' : 'dimmed'}`}>
        {/* Single Single Target Anchor on Face (No duplicate dots!) */}
        <div className="callout-anchor-point" style={{ top: '24%', left: '50%' }}>
          <span className="anchor-dot" />
          <span className="anchor-ping" />
        </div>

        {/* Clean Angled Pointer Line without duplicate circle dots */}
        <svg className="callout-line-svg" viewBox="0 0 140 40">
          <path
            d="M 2 10 L 40 25 L 138 25"
            fill="none"
            stroke="#00ffaa"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            style={{ filter: 'drop-shadow(0 0 6px rgba(0, 255, 170, 0.6))' }}
          />
        </svg>

        {/* Floating Callout Card positioned comfortably at 25% height */}
        <div className="callout-floating-card face-card">
          <div className="card-top-row">
            <span className="card-code">BIOMETRIC // 01</span>
            <span className="card-status">OPTICAL LOCKED</span>
          </div>
          <div className="card-main-title">NEURAL DEVELOPER SCAN</div>
          <div className="card-sub-info">FACIAL RECOGNITION: 99.8% CONFIDENCE</div>
        </div>
      </div>

      {/* 2. Core Architecture Callout Pointer to Left */}
      <div className={`cyber-callout-wrapper core-callout ${isCoreActive ? 'active' : 'dimmed'}`}>
        {/* Single Target Anchor on chest */}
        <div className="callout-anchor-point" style={{ top: '44%', left: '48%' }}>
          <span className="anchor-dot" />
          <span className="anchor-ping" />
        </div>

        {/* Clean Angled Pointer Line without duplicate circle dots */}
        <svg className="callout-line-svg core-line" viewBox="0 0 140 40">
          <path
            d="M 138 10 L 100 25 L 2 25"
            fill="none"
            stroke="#00ffff"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            style={{ filter: 'drop-shadow(0 0 6px rgba(0, 255, 255, 0.6))' }}
          />
        </svg>

        {/* Floating Card on the Left */}
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
