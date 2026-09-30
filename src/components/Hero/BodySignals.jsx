import React from 'react'
import './BodySignals.css'

const BODY_NODES = [
  {
    id: 'node-head',
    label: 'NEURAL OPTICAL HUD',
    code: '01',
    top: '24%',
    left: '50%',
    tagPos: 'top',
    revealStart: 0.1,
  },
  {
    id: 'node-shoulder-l',
    label: 'FULL STACK ECOSYSTEM',
    code: '02',
    top: '35%',
    left: '42%',
    tagPos: 'left',
    revealStart: 0.25,
  },
  {
    id: 'node-shoulder-r',
    label: 'WD4 COOPERATION SYS',
    code: '03',
    top: '36%',
    left: '58%',
    tagPos: 'right',
    revealStart: 0.4,
  },
  {
    id: 'node-chest',
    label: 'CORE // REACT + WEBGL',
    code: '04',
    top: '45%',
    left: '50%',
    tagPos: 'bottom',
    revealStart: 0.55,
  },
  {
    id: 'node-torso-l',
    label: 'GEOSPATIAL & GIS',
    code: '05',
    top: '55%',
    left: '44%',
    tagPos: 'left',
    revealStart: 0.7,
  },
  {
    id: 'node-torso-r',
    label: 'REST API // 4K PIPELINE',
    code: '06',
    top: '56%',
    left: '56%',
    tagPos: 'right',
    revealStart: 0.85,
  },
]

export default function BodySignals({ progress = 0 }) {
  return (
    <div className="body-signals-overlay">
      {BODY_NODES.map((node) => {
        const isActive = progress >= node.revealStart
        const opacity = isActive
          ? Math.min(1, 0.45 + (progress - node.revealStart) * 2)
          : 0.12

        return (
          <div
            key={node.id}
            className={`body-signal-node ${isActive ? 'node-active' : 'node-dimmed'}`}
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
            </div>

            {/* Compact Floating Cyber Badge */}
            <div className={`node-compact-badge pos-${node.tagPos}`}>
              <span className="badge-code">{node.code}</span>
              <span className="badge-name">{node.label}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
