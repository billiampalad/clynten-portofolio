import React from 'react'
import './BodySignals.css'

const BODY_NODES = [
  {
    id: 'node-head',
    label: 'OPTICAL HUD // SYSTEM REVEAL',
    code: 'NEURAL_01',
    status: 'LOCKED',
    top: '22%',
    left: '52%',
    lineDir: 'right',
    revealStart: 0.1,
  },
  {
    id: 'node-chest',
    label: 'CORE ARCHITECTURE // REACT & WEBGL',
    code: 'CORE_ENGINE',
    status: 'ACTIVE',
    top: '42%',
    left: '48%',
    lineDir: 'left',
    revealStart: 0.2,
  },
  {
    id: 'node-shoulder-l',
    label: 'FULL STACK ECOSYSTEM // NODE + SQL',
    code: 'SYS_STACK',
    status: 'VERIFIED',
    top: '36%',
    left: '36%',
    lineDir: 'left',
    revealStart: 0.35,
  },
  {
    id: 'node-shoulder-r',
    label: 'WD4 PROJECT // COOPERATION SYSTEM',
    code: 'WD4_SYS',
    status: 'DETECTED',
    top: '38%',
    left: '64%',
    lineDir: 'right',
    revealStart: 0.45,
  },
  {
    id: 'node-torso-l',
    label: 'GEOSPATIAL & GIS ANALYTICS',
    code: 'GEO_ENGINE',
    status: 'ONLINE',
    top: '56%',
    left: '38%',
    lineDir: 'left',
    revealStart: 0.55,
  },
  {
    id: 'node-torso-r',
    label: 'HIGH-PERFORMANCE REST & GRAPHQL',
    code: 'API_CLUSTER',
    status: 'STREAMING',
    top: '58%',
    left: '62%',
    lineDir: 'right',
    revealStart: 0.65,
  },
  {
    id: 'node-lower-l',
    label: 'ANDROID & CROSS-PLATFORM DEV',
    code: 'MOBILE_SYS',
    status: 'COMPILED',
    top: '72%',
    left: '34%',
    lineDir: 'left',
    revealStart: 0.75,
  },
  {
    id: 'node-lower-r',
    label: 'GPU PIPELINE // 4K 60FPS OPTIMIZED',
    code: 'GPU_RENDER',
    status: 'CALIBRATED',
    top: '74%',
    left: '66%',
    lineDir: 'right',
    revealStart: 0.85,
  },
]

export default function BodySignals({ progress = 0 }) {
  return (
    <div className="body-signals-overlay">
      {BODY_NODES.map((node) => {
        const isActive = progress >= node.revealStart
        const opacity = isActive
          ? Math.min(1, 0.4 + (progress - node.revealStart) * 2)
          : 0.15

        return (
          <div
            key={node.id}
            className={`body-signal-node ${isActive ? 'node-active' : 'node-dimmed'} ${node.lineDir}`}
            style={{
              top: node.top,
              left: node.left,
              opacity,
            }}
          >
            {/* Target Reticle Anchor Dot */}
            <div className="node-anchor-target">
              <span className="node-center-dot" />
              <span className="node-ring-pulse" />
              <span className="node-cross-x" />
            </div>

            {/* Connecting Cyber Leader Line */}
            <div className={`node-leader-line ${node.lineDir}`} />

            {/* Floating Telemetry Callout Box */}
            <div className={`node-callout-card ${node.lineDir}`}>
              <div className="callout-header">
                <span className="callout-code">{node.code}</span>
                <span className="callout-status">{node.status}</span>
              </div>
              <div className="callout-label">{node.label}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
