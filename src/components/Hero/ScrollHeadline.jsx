import React, { useMemo } from 'react'
import './ScrollHeadline.css'

const WORDS = [
  "DECODING",
  "COMPLEX",
  "SYSTEMS",
  "INTO",
  "POWERFUL",
  "DIGITAL",
  "REALITIES."
]

export default function ScrollHeadline({ progress = 0 }) {
  // Map progress (0 to 1) across the word count
  const totalWords = WORDS.length

  return (
    <div className="scroll-headline-container">
      <div className="headline-badge">
        <span className="badge-signal-dot" />
        <span className="badge-text">CORE DIRECTIVE</span>
      </div>

      <h1 className="scroll-headline-text">
        {WORDS.map((word, index) => {
          // Progress threshold for this specific word
          const wordThreshold = (index + 0.5) / totalWords
          const isActive = progress >= wordThreshold * 0.9
          const glowIntensity = Math.max(
            0,
            1 - Math.abs(progress - wordThreshold) * 3
          )

          return (
            <span
              key={index}
              className={`headline-word ${isActive ? 'word-active' : 'word-inactive'}`}
              style={{
                '--glow-opacity': glowIntensity,
              }}
            >
              {word}{' '}
            </span>
          )
        })}
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
