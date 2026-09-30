import React from 'react'
import { rawDataStreams } from '../../data/developerSignals'
import './DataStream.css'

export default function DataStream({ progress = 0 }) {
  return (
    <div className="data-stream-container">
      <div className="data-stream-header">
        <span className="data-pulse-dot" />
        <span className="data-stream-title">LIVE TELEMETRY STREAM</span>
      </div>

      <div className="data-stream-list">
        {rawDataStreams.map((item, index) => {
          let text = item.raw
          let stateClass = 'raw'

          if (progress > 0.65) {
            text = item.final
            stateClass = 'final'
          } else if (progress > 0.25) {
            text = item.resolved
            stateClass = 'resolved'
          }

          return (
            <div key={index} className={`data-stream-row ${stateClass}`}>
              <span className="data-idx">0{index + 1}</span>
              <span className="data-text">{text}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
