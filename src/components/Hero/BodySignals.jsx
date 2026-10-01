import React from 'react'
import { useTextScramble } from '../../hooks/useTextScramble'
import './BodySignals.css'

function HudRow({ label, value, highlightClass = '', speed = 20, isContinuous = false }) {
  const scrambledLabel = useTextScramble(label, speed, isContinuous)
  const scrambledVal = useTextScramble(value, speed, isContinuous)
  return (
    <div className="hud-row">
      <span className="hud-key">{scrambledLabel}</span>
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
  // Idle state at scroll 0 (soft white color + continuous shuffle)
  const isScrollZero = progress < 0.04

  // Card Biometric = Biru / Cyan, Card Sys-Engine = Hijau / Green
  const bioColor = isScrollZero ? 'white' : 'cyan'
  const sysColor = isScrollZero ? 'white' : 'green'

  // Dynamic text stages based on scroll progress
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
      {/* 1. Biometric HUD Card (Warna Biru / Cyan) */}
      <div className="callout-card-wrapper face-wrapper">
        <div className={`signaliq-hud-card face-card theme-${bioColor}`}>
          {/* Header Row: Solid Square + Scrambled Text Title */}
          <HudHeader
            text={bioHeader}
            squareClass={`${bioColor}-square`}
            speed={18}
            isContinuous={isScrollZero}
          />

          {/* Telemetry Data Grid with Left Vertical Bar & Scrambled Values */}
          <div className="hud-telemetry-body">
            <div className={`hud-vertical-line ${bioColor}-line`} />
            <div className="hud-data-rows">
              <HudRow label="TARGET ID" value={bioTargetId} speed={18} isContinuous={isScrollZero} />
              <HudRow label="CONFIDENCE" value={bioConfidence} highlightClass={`highlight-${bioColor}`} speed={22} isContinuous={isScrollZero} />
              <HudRow label="SCAN TYPE" value={bioScanType} speed={20} isContinuous={isScrollZero} />
              <HudRow label="SIGNAL" value={bioSignal} speed={18} isContinuous={isScrollZero} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Sys-Engine HUD Card (Warna Hijau / Emerald) */}
      <div className="callout-card-wrapper core-wrapper">
        <div className={`signaliq-hud-card core-card theme-${sysColor}`}>
          {/* Header Row: Solid Square + Scrambled Text Title */}
          <HudHeader
            text={sysHeader}
            squareClass={`${sysColor}-square`}
            speed={18}
            isContinuous={isScrollZero}
          />

          {/* Telemetry Data Grid with Left Vertical Bar & Scrambled Values */}
          <div className="hud-telemetry-body">
            <div className={`hud-vertical-line ${sysColor}-line`} />
            <div className="hud-data-rows">
              <HudRow label="SYS ID" value={sysId} speed={18} isContinuous={isScrollZero} />
              <HudRow label="STACK" value={sysStack} highlightClass={`highlight-${sysColor}`} speed={22} isContinuous={isScrollZero} />
              <HudRow label="SECURITY" value={sysSecurity} speed={20} isContinuous={isScrollZero} />
              <HudRow label="SIGNAL" value={sysSignal} speed={18} isContinuous={isScrollZero} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
