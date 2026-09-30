import React from 'react'
import './ScrollHeadline.css'

export default function ScrollHeadline({ progress = 0 }) {
  // Phrase 1 (COMPLEX SYSTEMS): Uncovers from progress 0.08 to 0.42
  const reveal1 = Math.min(1, Math.max(0, (progress - 0.08) / 0.34))
  // Phrase 2 (DIGITAL REALITIES): Uncovers from progress 0.48 to 0.88
  const reveal2 = Math.min(1, Math.max(0, (progress - 0.48) / 0.40))

  const isDecodingActive = progress >= 0.05
  const isIntoPowerfulActive = progress >= 0.42

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

        {/* Highlight Cover Block 1: COMPLEX SYSTEMS */}
        <span
          className="headline-highlight-phrase highlight-blue"
          style={{ '--reveal': reveal1 }}
        >
          <span className={`phrase-text ${reveal1 > 0 ? 'text-revealed' : 'text-covered'}`}>
            COMPLEX SYSTEMS
          </span>
        </span>{' '}

        <span
          className={`headline-word ${isIntoPowerfulActive ? 'word-active' : 'word-inactive'}`}
        >
          INTO POWERFUL{' '}
        </span>

        {/* Highlight Cover Block 2: DIGITAL REALITIES */}
        <span
          className="headline-highlight-phrase highlight-blue"
          style={{ '--reveal': reveal2 }}
        >
          <span className={`phrase-text ${reveal2 > 0 ? 'text-revealed' : 'text-covered'}`}>
            DIGITAL REALITIES.
          </span>
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
