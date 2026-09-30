import React from 'react'
import './BodySignals.css'

export default function BodySignals({ progress = 0 }) {
  const isFaceActive = progress >= 0.1
  const isCoreActive = progress >= 0.35

  return (
    <div className="face-signals-overlay">
      {/* 1. Face Biometric Target: Line starts at EXACT center (0,0) and connects to card */}
      <div
        className={`callout-anchor-group face-group ${isFaceActive ? 'active' : 'dimmed'}`}
        style={{ top: '22%', left: '50%' }}
      >
        {/* Exact Anchor Point on Face */}
        <div className="anchor-dot-center">
          <span className="anchor-dot" />
          <span className="anchor-ping" />
        </div>

        {/* SVG Line: Starts exactly at (0, 0), angles up-right to (40, -25), extends to (120, -25) */}
        <svg className="connector-svg face-svg" viewBox="0 0 130 50">
          <path
            d="M 0 35 L 35 10 L 128 10"
            fill="none"
            stroke="#00ffaa"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            style={{ filter: 'drop-shadow(0 0 6px rgba(0, 255, 170, 0.7))' }}
          />
        </svg>

        {/* Floating Callout Card securely elevated (avoiding Profile Scanned below) */}
        <div className="callout-floating-card face-card">
          <div className="card-top-row">
            <span className="card-code">BIOMETRIC // 01</span>
            <span className="card-status">OPTICAL LOCKED</span>
          </div>
          <div className="card-main-title">NEURAL DEVELOPER SCAN</div>
          <div className="card-sub-info">FACIAL RECOGNITION: 99.8% CONFIDENCE</div>
        </div>
      </div>

      {/* 2. Core Architecture Target on Chest: Line starts at EXACT center (0,0) and connects to left card */}
      <div
        className={`callout-anchor-group core-group ${isCoreActive ? 'active' : 'dimmed'}`}
        style={{ top: '40%', left: '48%' }}
      >
        {/* Exact Anchor Point on Chest */}
        <div className="anchor-dot-center">
          <span className="anchor-dot" />
          <span className="anchor-ping" />
        </div>

        {/* SVG Line: Starts at anchor and angles up-left to card */}
        <svg className="connector-svg core-svg" viewBox="0 0 130 50">
          <path
            d="M 130 35 L 95 10 L 2 10"
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
