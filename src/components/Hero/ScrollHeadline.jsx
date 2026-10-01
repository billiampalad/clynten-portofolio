import React from 'react'
import './ScrollHeadline.css'

export default function ScrollHeadline() {
  return (
    <div className="scroll-headline-container">
      <div className="headline-badge">
        <span className="badge-signal-dot" />
        <span className="badge-text">CORE DIRECTIVE</span>
      </div>

      <h1 className="scroll-headline-text">
        <span className="headline-word">DECODING </span>

        {/* Static Highlight Pill 1: COMPLEX */}
        <span className="headline-highlight-phrase highlight-blue">
          <span className="phrase-text">COMPLEX</span>
        </span>{' '}

        <span className="headline-word">SYSTEMS </span>
        <span className="headline-word">INTO </span>

        {/* Static Highlight Pill 2: POWERFUL */}
        <span className="headline-highlight-phrase highlight-blue">
          <span className="phrase-text">POWERFUL</span>
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
