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

function HudHeader({ text, tag, squareClass, colorClass, speed = 18, isContinuous = false }) {
  const scrambledText = useTextScramble(text, speed, isContinuous)
  return (
    <div className="hud-card-header">
      <div className="hud-header-left">
        <span className={`hud-square-indicator ${squareClass}`}>■</span>
        <span className="hud-header-title">{scrambledText}</span>
      </div>
      <div className="hud-header-right">
        <span className={`hud-micro-bars ${colorClass}-bars`}>
          <span className="bar b1" />
          <span className="bar b2" />
          <span className="bar b3" />
        </span>
        {tag && <span className="hud-tag-badge">{tag}</span>}
      </div>
    </div>
  )
}

export default function BodySignals({ progress = 0 }) {
  // Idle state at scroll 0 (soft white color + continuous shuffle)
  const isScrollZero = progress < 0.04

  // Palette terbatas pada 3 warna cyber: Biru (Cyan), Hijau (Green), Merah (Red)
  const bioColor = isScrollZero ? 'white' : 'cyan'
  const sysColor = isScrollZero ? 'white' : 'green'
  const webColor = isScrollZero ? 'white' : 'red'
  const androidColor = isScrollZero ? 'white' : 'green'
  const cyberColor = isScrollZero ? 'white' : 'cyan'
  const netColor = isScrollZero ? 'white' : 'red'
  const dbColor = isScrollZero ? 'white' : 'cyan'
  const uiuxColor = isScrollZero ? 'white' : 'green'

  // Dynamic text stages based on scroll progress
  const isBiometricResolved = progress >= 0.06
  const isSysEngineResolved = progress >= 0.18
  const isWebDevResolved = progress >= 0.30
  const isAndroidResolved = progress >= 0.44
  const isCyberSecResolved = progress >= 0.58
  const isNetworkResolved = progress >= 0.70
  const isDatabaseResolved = progress >= 0.82
  const isUiUxResolved = progress >= 0.92

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

  const webHeader = isWebDevResolved
    ? 'SKILL_01 // WEB DEVELOPMENT'
    : 'SKILL_01 // STACK ANALYZE'
  const webStackId = isWebDevResolved ? 'FULL_STACK_ARCH' : 'PARSING_NODES'
  const webConfidence = isWebDevResolved ? '99.4%' : 'CALCULATING...'
  const webFrameworks = isWebDevResolved ? 'REACT / NEXT / LARAVEL' : 'FETCHING_MODULES'
  const webLatency = isWebDevResolved ? 'OPTIMIZED — 0.02ms' : 'LATENCY_CHECK'

  const androidHeader = isAndroidResolved
    ? 'SKILL_02 // ANDROID DEV'
    : 'SKILL_02 // MOBILE PIPELINE'
  const androidStackId = isAndroidResolved ? 'MOBILE_OS_NODE' : 'RESOLVING_SDK'
  const androidConfidence = isAndroidResolved ? '95.8%' : 'CALCULATING...'
  const androidFrameworks = isAndroidResolved ? 'KOTLIN / FLUTTER / SDK' : 'SCANNING_DEVICE'
  const androidLatency = isAndroidResolved ? 'OPTIMIZED — 0.05ms' : 'LATENCY_CHECK'

  const cyberHeader = isCyberSecResolved
    ? 'SKILL_03 // CYBER SECURITY'
    : 'SKILL_03 // THREAT AUDIT'
  const cyberStackId = isCyberSecResolved ? 'SEC_AUDIT_PRO' : 'CHECKING_VULN'
  const cyberConfidence = isCyberSecResolved ? '96.2%' : 'CALCULATING...'
  const cyberFrameworks = isCyberSecResolved ? 'KALI / UBUNTU / NMAP' : 'PROBING_PORTS'
  const cyberLatency = isCyberSecResolved ? 'SHIELD — 0.01ms' : 'DEFENSE_SYNC'

  const netHeader = isNetworkResolved
    ? 'SKILL_04 // NETWORK INFRA'
    : 'SKILL_04 // ROUTE SCAN'
  const netStackId = isNetworkResolved ? 'NET_TOPOLOGY_V2' : 'PROBING_SUBNET'
  const netConfidence = isNetworkResolved ? '94.7%' : 'CALCULATING...'
  const netFrameworks = isNetworkResolved ? 'MIKROTIK / CISCO / VPN' : 'RESOLVING_VLAN'
  const netLatency = isNetworkResolved ? 'LOW LATENCY — 0.03ms' : 'PING_GATEWAY'

  const dbHeader = isDatabaseResolved
    ? 'SKILL_05 // DATABASE MGMT'
    : 'SKILL_05 // DB QUERY SYNC'
  const dbStackId = isDatabaseResolved ? 'DATA_ENGINE_V3' : 'CONNECTING_NODES'
  const dbConfidence = isDatabaseResolved ? '96.8%' : 'CALCULATING...'
  const dbFrameworks = isDatabaseResolved ? 'POSTGRES / MYSQL / MONGO' : 'FETCHING_SCHEMA'
  const dbLatency = isDatabaseResolved ? 'OPTIMIZED — 0.03ms' : 'LATENCY_CHECK'

  const uiuxHeader = isUiUxResolved
    ? 'SKILL_06 // UI/UX DESIGN'
    : 'SKILL_06 // WIREFRAME SYNC'
  const uiuxStackId = isUiUxResolved ? 'DESIGN_SYSTEM_PRO' : 'GENERATING_FLOW'
  const uiuxConfidence = isUiUxResolved ? '95.0%' : 'CALCULATING...'
  const uiuxFrameworks = isUiUxResolved ? 'FIGMA / PROTOTYPE / HUD' : 'PARSING_CANVAS'
  const uiuxLatency = isUiUxResolved ? 'OPTIMIZED — 0.03ms' : 'RENDER_CHECK'

  return (
    <div className="face-signals-overlay">
      {/* 1. Biometric HUD Card (Warna Biru / Cyan) */}
      <div className="callout-card-wrapper face-wrapper">
        <div className={`signaliq-hud-card face-card theme-${bioColor}`}>
          <div className="hud-card-corner top-left" />
          <div className="hud-card-corner bottom-right" />

          <HudHeader
            text={bioHeader}
            tag="BIO"
            squareClass={`${bioColor}-square`}
            colorClass={bioColor}
            speed={18}
            isContinuous={isScrollZero}
          />

          <div className="hud-telemetry-body">
            <div className={`hud-vertical-line ${bioColor}-line`} />
            <div className="hud-data-rows">
              <HudRow label="TARGET ID" value={bioTargetId} speed={18} isContinuous={isScrollZero} />
              <HudRow label="CONFIDENCE" value={bioConfidence} highlightClass={`highlight-${bioColor}`} speed={22} isContinuous={isScrollZero} />
              <HudRow label="SCAN TYPE" value={bioScanType} speed={20} isContinuous={isScrollZero} />
              <HudRow label="SIGNAL" value={bioSignal} speed={18} isContinuous={isScrollZero} />
            </div>
          </div>

          <div className={`hud-card-beam ${bioColor}-beam`} />
        </div>
      </div>

      {/* 2. Sys-Engine HUD Card (Warna Hijau / Emerald) */}
      <div className="callout-card-wrapper core-wrapper">
        <div className={`signaliq-hud-card core-card theme-${sysColor}`}>
          <div className="hud-card-corner top-left" />
          <div className="hud-card-corner bottom-right" />

          <HudHeader
            text={sysHeader}
            tag="CORE"
            squareClass={`${sysColor}-square`}
            colorClass={sysColor}
            speed={18}
            isContinuous={isScrollZero}
          />

          <div className="hud-telemetry-body">
            <div className={`hud-vertical-line ${sysColor}-line`} />
            <div className="hud-data-rows">
              <HudRow label="SYS ID" value={sysId} speed={18} isContinuous={isScrollZero} />
              <HudRow label="STACK" value={sysStack} highlightClass={`highlight-${sysColor}`} speed={22} isContinuous={isScrollZero} />
              <HudRow label="SECURITY" value={sysSecurity} speed={20} isContinuous={isScrollZero} />
              <HudRow label="SIGNAL" value={sysSignal} speed={18} isContinuous={isScrollZero} />
            </div>
          </div>

          <div className={`hud-card-beam ${sysColor}-beam`} />
        </div>
      </div>

      {/* 3. Web Development HUD Card (Warna Merah / Cyber Red) */}
      <div className="callout-card-wrapper webdev-wrapper">
        <div className={`signaliq-hud-card webdev-card theme-${webColor}`}>
          <div className="hud-card-corner top-left" />
          <div className="hud-card-corner bottom-right" />

          <HudHeader
            text={webHeader}
            tag="SK_01"
            squareClass={`${webColor}-square`}
            colorClass={webColor}
            speed={18}
            isContinuous={isScrollZero}
          />

          <div className="hud-telemetry-body">
            <div className={`hud-vertical-line ${webColor}-line`} />
            <div className="hud-data-rows">
              <HudRow label="STACK ID" value={webStackId} speed={18} isContinuous={isScrollZero} />
              <HudRow label="CONFIDENCE" value={webConfidence} highlightClass={`highlight-${webColor}`} speed={22} isContinuous={isScrollZero} />
              <HudRow label="CORE TECH" value={webFrameworks} speed={20} isContinuous={isScrollZero} />
              <HudRow label="LATENCY" value={webLatency} speed={18} isContinuous={isScrollZero} />
            </div>
          </div>

          <div className={`hud-card-beam ${webColor}-beam`} />
        </div>
      </div>

      {/* 4. Android Development HUD Card (Warna Hijau / Green) */}
      <div className="callout-card-wrapper android-wrapper">
        <div className={`signaliq-hud-card android-card theme-${androidColor}`}>
          <div className="hud-card-corner top-left" />
          <div className="hud-card-corner bottom-right" />

          <HudHeader
            text={androidHeader}
            tag="SK_02"
            squareClass={`${androidColor}-square`}
            colorClass={androidColor}
            speed={18}
            isContinuous={isScrollZero}
          />

          <div className="hud-telemetry-body">
            <div className={`hud-vertical-line ${androidColor}-line`} />
            <div className="hud-data-rows">
              <HudRow label="STACK ID" value={androidStackId} speed={18} isContinuous={isScrollZero} />
              <HudRow label="CONFIDENCE" value={androidConfidence} highlightClass={`highlight-${androidColor}`} speed={22} isContinuous={isScrollZero} />
              <HudRow label="CORE TECH" value={androidFrameworks} speed={20} isContinuous={isScrollZero} />
              <HudRow label="LATENCY" value={androidLatency} speed={18} isContinuous={isScrollZero} />
            </div>
          </div>

          <div className={`hud-card-beam ${androidColor}-beam`} />
        </div>
      </div>

      {/* 5. Cyber Security HUD Card (Warna Biru / Cyan) */}
      <div className="callout-card-wrapper cyber-wrapper">
        <div className={`signaliq-hud-card cyber-card theme-${cyberColor}`}>
          <div className="hud-card-corner top-left" />
          <div className="hud-card-corner bottom-right" />

          <HudHeader
            text={cyberHeader}
            tag="SK_03"
            squareClass={`${cyberColor}-square`}
            colorClass={cyberColor}
            speed={18}
            isContinuous={isScrollZero}
          />

          <div className="hud-telemetry-body">
            <div className={`hud-vertical-line ${cyberColor}-line`} />
            <div className="hud-data-rows">
              <HudRow label="STACK ID" value={cyberStackId} speed={18} isContinuous={isScrollZero} />
              <HudRow label="CONFIDENCE" value={cyberConfidence} highlightClass={`highlight-${cyberColor}`} speed={22} isContinuous={isScrollZero} />
              <HudRow label="CORE TECH" value={cyberFrameworks} speed={20} isContinuous={isScrollZero} />
              <HudRow label="LATENCY" value={cyberLatency} speed={18} isContinuous={isScrollZero} />
            </div>
          </div>

          <div className={`hud-card-beam ${cyberColor}-beam`} />
        </div>
      </div>

      {/* 6. Network Administration HUD Card (Warna Merah / Cyber Red) */}
      <div className="callout-card-wrapper net-wrapper">
        <div className={`signaliq-hud-card net-card theme-${netColor}`}>
          <div className="hud-card-corner top-left" />
          <div className="hud-card-corner bottom-right" />

          <HudHeader
            text={netHeader}
            tag="SK_04"
            squareClass={`${netColor}-square`}
            colorClass={netColor}
            speed={18}
            isContinuous={isScrollZero}
          />

          <div className="hud-telemetry-body">
            <div className={`hud-vertical-line ${netColor}-line`} />
            <div className="hud-data-rows">
              <HudRow label="STACK ID" value={netStackId} speed={18} isContinuous={isScrollZero} />
              <HudRow label="CONFIDENCE" value={netConfidence} highlightClass={`highlight-${netColor}`} speed={22} isContinuous={isScrollZero} />
              <HudRow label="CORE TECH" value={netFrameworks} speed={20} isContinuous={isScrollZero} />
              <HudRow label="LATENCY" value={netLatency} speed={18} isContinuous={isScrollZero} />
            </div>
          </div>

          <div className={`hud-card-beam ${netColor}-beam`} />
        </div>
      </div>

      {/* 7. Database Management HUD Card (Warna Biru / Cyan) */}
      <div className="callout-card-wrapper db-wrapper">
        <div className={`signaliq-hud-card db-card theme-${dbColor}`}>
          <div className="hud-card-corner top-left" />
          <div className="hud-card-corner bottom-right" />

          <HudHeader
            text={dbHeader}
            tag="SK_05"
            squareClass={`${dbColor}-square`}
            colorClass={dbColor}
            speed={18}
            isContinuous={isScrollZero}
          />

          <div className="hud-telemetry-body">
            <div className={`hud-vertical-line ${dbColor}-line`} />
            <div className="hud-data-rows">
              <HudRow label="STACK ID" value={dbStackId} speed={18} isContinuous={isScrollZero} />
              <HudRow label="CONFIDENCE" value={dbConfidence} highlightClass={`highlight-${dbColor}`} speed={22} isContinuous={isScrollZero} />
              <HudRow label="CORE TECH" value={dbFrameworks} speed={20} isContinuous={isScrollZero} />
              <HudRow label="LATENCY" value={dbLatency} speed={18} isContinuous={isScrollZero} />
            </div>
          </div>

          <div className={`hud-card-beam ${dbColor}-beam`} />
        </div>
      </div>

      {/* 8. UI/UX Design HUD Card (Warna Hijau / Green) */}
      <div className="callout-card-wrapper uiux-wrapper">
        <div className={`signaliq-hud-card uiux-card theme-${uiuxColor}`}>
          <div className="hud-card-corner top-left" />
          <div className="hud-card-corner bottom-right" />

          <HudHeader
            text={uiuxHeader}
            tag="SK_06"
            squareClass={`${uiuxColor}-square`}
            colorClass={uiuxColor}
            speed={18}
            isContinuous={isScrollZero}
          />

          <div className="hud-telemetry-body">
            <div className={`hud-vertical-line ${uiuxColor}-line`} />
            <div className="hud-data-rows">
              <HudRow label="STACK ID" value={uiuxStackId} speed={18} isContinuous={isScrollZero} />
              <HudRow label="CONFIDENCE" value={uiuxConfidence} highlightClass={`highlight-${uiuxColor}`} speed={22} isContinuous={isScrollZero} />
              <HudRow label="CORE TECH" value={uiuxFrameworks} speed={20} isContinuous={isScrollZero} />
              <HudRow label="LATENCY" value={uiuxLatency} speed={18} isContinuous={isScrollZero} />
            </div>
          </div>

          <div className={`hud-card-beam ${uiuxColor}-beam`} />
        </div>
      </div>
    </div>
  )
}
