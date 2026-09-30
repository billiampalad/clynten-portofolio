import React from 'react'

export default function SignalLine({ progress = 0 }) {
  const normalizedProgress = Math.min(1, Math.max(0, progress))
  const strokeOffset = 100 * (1 - normalizedProgress)

  return (
    <div className="signal-line-wrapper">
      <svg
        className="signal-line-svg"
        viewBox="0 0 300 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background track line */}
        <path
          d="M0 12 H70 L80 4 L90 20 L100 8 L110 16 L120 12 H180 L190 2 L200 22 L210 12 H300"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Dynamic scanning progress line */}
        <path
          d="M0 12 H70 L80 4 L90 20 L100 8 L110 16 L120 12 H180 L190 2 L200 22 L210 12 H300"
          stroke="#00ffaa"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset={strokeOffset}
          style={{
            filter: 'drop-shadow(0 0 6px #00ffaa)',
            transition: 'stroke-dashoffset 0.05s linear',
          }}
        />
      </svg>
    </div>
  )
}
