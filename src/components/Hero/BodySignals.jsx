import React from 'react'
import './BodySignals.css'

export default function BodySignals({ progress = 0 }) {
  const isFaceActive = progress >= 0.1
  const isCoreActive = progress >= 0.35
  const isStackActive = progress >= 0.65

  return (
    <div className="face-signals-overlay">
      {/* 1. Face / Optical Biometric Target with Angled Leader Line to Top-Right */}
      <div className={`cyber-callout-wrapper face-callout ${isFaceActive ? 'active' : 'dimmed'}`}>
        {/* Target Anchor on Face (No card over face!) */}
        <div className="callout-anchor-point" style={{ top: '24%', left: '50%' }}>
          <span className="anchor-dot" />
          <span className="anchor-ping" />
          <span className="anchor-crosshair" />
        </div>

        {/* Angled SVG Cyber Pointer Line from Face to Floating Badge */}
        <svg className="callout-line-svg" viewBox="0 0 160 80">
          <path
            d="M 10 70 L 60 20 L 155 20"
            fill="none"
            stroke="#00ffaa"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            style={{ filter: 'drop-shadow(0 0 6px rgba(0, 255, 170, 0.6))' }}
          />
          <circle cx="10" cy="70" r="3" fill="#00ffaa" />
          <circle cx="155" cy="20" r="3" fill="#00ffaa" />
        </svg>

        {/* Floating Callout Card Placed Outside The Face Area */}
        <div className="callout-floating-card face-card">
          <div className="card-top-row">
            <span className="card-code">BIOMETRIC // 01</span>
            <span className="card-status">OPTICAL LOCKED</span>
          </div>
          <div className="card-main-title">NEURAL DEVELOPER SCAN</div>
          <div className="card-sub-info">FACIAL RECOGNITION: 99.8% CONFIDENCE</div>
        </div>
      </div>

      {/* 2. Left Core Architecture Callout Pointer (Angled away from chest to Left) */}
      <div className={`cyber-callout-wrapper core-callout ${isCoreActive ? 'active' : 'dimmed'}`}>
        {/* Anchor point on chest */}
        <div className="callout-anchor-point" style={{ top: '44%', left: '48%' }}>
          <span className="anchor-dot" />
          <span className="anchor-ping" />
        </div>

        {/* Angled SVG Pointer Line from chest to Left */}
        <svg className="callout-line-svg core-line" viewBox="0 0 160 80">
          <path
            d="M 150 70 L 100 20 L 5 20"
            fill="none"
            stroke="#00ffff"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            style={{ filter: 'drop-shadow(0 0 6px rgba(0, 255, 255, 0.6))' }}
          />
          <circle cx="150" cy="70" r="3" fill="#00ffff" />
          <circle cx="5" cy="20" r="3" fill="#00ffff" />
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
