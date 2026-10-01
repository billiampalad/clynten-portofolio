import React from 'react'
import { useTextScramble } from '../../hooks/useTextScramble'
import './BodySignals.css'

function HudRow({ label, value, highlightClass = '', speed = 20, isContinuous = false }) {
  const scrambledVal = useTextScramble(value, speed, isContinuous)
  return (
    <div className="hud-row">
      <span className="hud-key">{label}</span>
      <span className={`hud-val ${highlightClass}`}>{scrambledVal}</span>
    </div>
  )
}

function HudHeader({ text, squareClass, speed = 18, isContinuous = false }) {
  const scrambledText = useTextScramble(text, speed, isContinuous)
  return (
    <div className="hud-card-header">
      <span className={`hud-square-indicator ${squareClass}`}>■</span>
      <span className="hud-header-title">{scrambledText}</span>
    </div>
  )
}

export default function BodySignals({ progress = 0 }) {
  // Continuous real-time scrambling when idle / scroll is at 0 (SignalIQ style)
  const isIdleBiometric = progress < 0.05
  const isIdleSysEngine = progress < 0.25

  // Dynamic stages based on scroll progress
  const isBiometricResolved = progress >= 0.08
  const isSysEngineResolved = progress >= 0.35

  const bioHeader = isBiometricResolved
    ? 'BIOMETRIC // HIGH CONFIDENCE'
    : 'BIOMETRIC // SCANNING...'
  const bioTargetId = isBiometricResolved ? 'CLYNTEN_DEV_001' : 'DEV_TARGET_INIT'
  const bioConfidence = isBiometricResolved ? '99.8%' : 'CALCULATING...'
  const bioScanType = isBiometricResolved ? 'NEURAL / OPTICAL' : 'FACIAL_DETECT'
  const bioSignal = isBiometricResolved ? 'LOCKED — VERIFIED' : 'ACQUIRING_DATA'

  const sysHeader = isSysEngineResolved
    ? 'SYS_ENGINE // CORE ARCH'
    : 'SYS_ENGINE // DIAGNOSTIC...'
  const sysId = isSysEngineResolved ? 'ENGINE_V4_PRO' : 'INIT_CORE_NODE'
  const sysStack = isSysEngineResolved ? 'MULTI-STACK DEV' : 'LOADING_MODULES'
  const sysSecurity = isSysEngineResolved ? 'ENCRYPTED // ACTIVE' : 'HANDSHAKE_PENDING'
  const sysSignal = isSysEngineResolved ? 'OPTIMAL — 0.04ms' : 'SYNC_CHANNEL'

  return (
    <div className="face-signals-overlay">
      {/* 1. Biometric HUD Card (Upper Right Area) */}
      <div className="callout-card-wrapper face-wrapper">
        <div className="signaliq-hud-card face-card theme-red">
          {/* Header Row: Solid Square + Scrambled Text Title */}
          <HudHeader
            text={bioHeader}
            squareClass="red-square"
            speed={18}
            isContinuous={isIdleBiometric}
          />

          {/* Telemetry Data Grid with Left Vertical Bar & Scrambled Values */}
          <div className="hud-telemetry-body">
            <div className="hud-vertical-line red-line" />
            <div className="hud-data-rows">
              <HudRow label="TARGET ID" value={bioTargetId} speed={18} isContinuous={isIdleBiometric} />
              <HudRow label="CONFIDENCE" value={bioConfidence} highlightClass="highlight-red" speed={22} isContinuous={isIdleBiometric} />
              <HudRow label="SCAN TYPE" value={bioScanType} speed={20} isContinuous={isIdleBiometric} />
              <HudRow label="SIGNAL" value={bioSignal} speed={18} isContinuous={isIdleBiometric} />
            </div>
          </div>

          {/* Bottom HUD Bracket */}
          <div className="hud-bottom-bracket red-bracket" />
        </div>
      </div>

      {/* 2. Sys-Engine HUD Card (Left Mid Area) */}
      <div className="callout-card-wrapper core-wrapper">
        <div className="signaliq-hud-card core-card theme-cyan">
          {/* Header Row: Solid Square + Scrambled Text Title */}
          <HudHeader
            text={sysHeader}
            squareClass="cyan-square"
            speed={18}
            isContinuous={isIdleSysEngine}
          />

          {/* Telemetry Data Grid with Left Vertical Bar & Scrambled Values */}
          <div className="hud-telemetry-body">
            <div className="hud-vertical-line cyan-line" />
            <div className="hud-data-rows">
              <HudRow label="SYS ID" value={sysId} speed={18} isContinuous={isIdleSysEngine} />
              <HudRow label="STACK" value={sysStack} highlightClass="highlight-cyan" speed={22} isContinuous={isIdleSysEngine} />
              <HudRow label="SECURITY" value={sysSecurity} speed={20} isContinuous={isIdleSysEngine} />
              <HudRow label="SIGNAL" value={sysSignal} speed={18} isContinuous={isIdleSysEngine} />
            </div>
          </div>

          {/* Bottom HUD Bracket */}
          <div className="hud-bottom-bracket cyan-bracket" />
        </div>
      </div>
    </div>
  )
}
