import React from 'react'
import './ScrollHeadline.css'

export default function ScrollHeadline({ progress = 0 }) {
  // Reveal Progress 1 (COMPLEX): Starts 100% covered at scroll 0, uncovers smoothly on scroll (0.04 -> 0.38)
  const reveal1 = Math.min(1, Math.max(0, (progress - 0.04) / 0.34))

  // Reveal Progress 2 (POWERFUL): Starts 100% covered at scroll 0, uncovers smoothly on scroll (0.42 -> 0.78)
  const reveal2 = Math.min(1, Math.max(0, (progress - 0.42) / 0.34))

  return (
    <div className="scroll-headline-container">
      <div className="headline-badge">
        <span className="badge-signal-dot" />
        <span className="badge-text">CORE DIRECTIVE</span>
      </div>

      <h1 className="scroll-headline-text">
        <span className="headline-word">DECODING </span>

        {/* Maroon-Black Cover Block 1: COMPLEX (Covered at Scroll 0, Uncovers on Scroll) */}
        <span
          className="headline-highlight-phrase highlight-red"
          style={{
            '--reveal': reveal1,
            '--laser-opacity': reveal1 > 0.01 && reveal1 < 0.99 ? 1 : 0,
          }}
        >
          <span className={`phrase-text ${reveal1 > 0 ? 'text-revealed' : 'text-covered'}`}>
            COMPLEX
          </span>
        </span>{' '}

        <span className="headline-word">SYSTEMS </span>
        <span className="headline-word">INTO </span>

        {/* Maroon-Black Cover Block 2: POWERFUL (Covered at Scroll 0, Uncovers on Scroll) */}
        <span
          className="headline-highlight-phrase highlight-red"
          style={{
            '--reveal': reveal2,
            '--laser-opacity': reveal2 > 0.01 && reveal2 < 0.99 ? 1 : 0,
          }}
        >
          <span className={`phrase-text ${reveal2 > 0 ? 'text-revealed' : 'text-covered'}`}>
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
