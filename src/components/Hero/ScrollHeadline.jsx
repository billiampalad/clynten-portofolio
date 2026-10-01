import React from 'react'
import './ScrollHeadline.css'

export default function ScrollHeadline({ progress = 0 }) {
  // Highlight Cover Block 1 (COMPLEX): Wipes/covers smoothly on scroll (progress 0.04 -> 0.38)
  const cover1 = Math.min(1, Math.max(0, (progress - 0.04) / 0.34))

  // Highlight Cover Block 2 (POWERFUL): Wipes/covers smoothly on scroll (progress 0.42 -> 0.78)
  const cover2 = Math.min(1, Math.max(0, (progress - 0.42) / 0.34))

  return (
    <div className="scroll-headline-container">
      <div className="headline-badge">
        <span className="badge-signal-dot" />
        <span className="badge-text">CORE DIRECTIVE</span>
      </div>

      <h1 className="scroll-headline-text">
        <span className="headline-word">DECODING </span>

        {/* Dynamic Highlight Cover Block 1: COMPLEX */}
        <span
          className="headline-highlight-phrase highlight-blue"
          style={{
            '--cover': cover1,
            '--laser-opacity': cover1 > 0.01 && cover1 < 0.99 ? 1 : 0,
          }}
        >
          <span className={`phrase-text ${cover1 > 0.02 ? 'phrase-covered' : ''}`}>
            COMPLEX
          </span>
        </span>{' '}

        <span className="headline-word">SYSTEMS </span>
        <span className="headline-word">INTO </span>

        {/* Dynamic Highlight Cover Block 2: POWERFUL */}
        <span
          className="headline-highlight-phrase highlight-blue"
          style={{
            '--cover': cover2,
            '--laser-opacity': cover2 > 0.01 && cover2 < 0.99 ? 1 : 0,
          }}
        >
          <span className={`phrase-text ${cover2 > 0.02 ? 'phrase-covered' : ''}`}>
            POWERFUL
          </span>
        </span>{' '}

        <span className="headline-word">DIGITAL </span>
        <span className="headline-word">REALITIES.</span>
      </h1>

      <div className="headline-subtext">
        <span className="subtext-line" />
        <span className="subtext-content">
          TRANSFORMING VISION INTO HIGH-PERFORMANCE WEB ARCHITECTURE
        </span>
      </div>
    </div>
  )
}
