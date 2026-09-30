import React from 'react'
import './ScrollHeadline.css'

export default function ScrollHeadline({ progress = 0 }) {
  // Phrase 1 (COMPLEX): Uncovers smoothly from progress 0.05 to 0.42
  const reveal1 = Math.min(1, Math.max(0, (progress - 0.05) / 0.37))
  // Phrase 2 (POWERFUL): Uncovers smoothly from progress 0.45 to 0.88
  const reveal2 = Math.min(1, Math.max(0, (progress - 0.45) / 0.43))

  const isDecodingActive = progress >= 0.04
  const isSystemsIntoActive = progress >= 0.40
  const isDigitalRealitiesActive = progress >= 0.82

  return (
    <div className="scroll-headline-container">
      <div className="headline-badge">
        <span className="badge-signal-dot" />
        <span className="badge-text">CORE DIRECTIVE</span>
      </div>

      <h1 className="scroll-headline-text">
        <span
          className={`headline-word ${isDecodingActive ? 'word-active' : 'word-inactive'}`}
        >
          DECODING{' '}
        </span>

        {/* Highlight Cover Block 1: COMPLEX */}
        <span
          className="headline-highlight-phrase highlight-blue"
          style={{ '--reveal': reveal1 }}
        >
          <span className={`phrase-text ${reveal1 > 0 ? 'text-revealed' : 'text-covered'}`}>
            COMPLEX
          </span>
        </span>{' '}

        <span
          className={`headline-word ${isSystemsIntoActive ? 'word-active' : 'word-inactive'}`}
        >
          SYSTEMS INTO{' '}
        </span>

        {/* Highlight Cover Block 2: POWERFUL */}
        <span
          className="headline-highlight-phrase highlight-blue"
          style={{ '--reveal': reveal2 }}
        >
          <span className={`phrase-text ${reveal2 > 0 ? 'text-revealed' : 'text-covered'}`}>
            POWERFUL
          </span>
        </span>{' '}

        <span
          className={`headline-word ${isDigitalRealitiesActive ? 'word-active' : 'word-inactive'}`}
        >
          DIGITAL REALITIES.
        </span>
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
