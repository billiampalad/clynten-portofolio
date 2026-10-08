import { rawDataStreams } from '../../data/developerSignals'
import { useTextScramble } from '../../hooks/useTextScramble'
import './DataStream.css'

function DataRow({ item, index, progress }) {
  let targetText = item.raw
  let stateClass = 'raw'

  if (progress > 0.65) {
    targetText = item.final
    stateClass = 'final'
  } else if (progress > 0.25) {
    targetText = item.resolved
    stateClass = 'resolved'
  }

  const scrambledText = useTextScramble(targetText, 25)

  return (
    <div className={`data-stream-row ${stateClass}`}>
      <span className="data-idx">0{index + 1}</span>
      <span className="data-text">{scrambledText}</span>
    </div>
  )
}

export default function DataStream({ progress = 0 }) {
  // Smooth fade-out on scroll (1 at scroll 0, 0 by progress 0.18)
  const fadeOpacity = Math.max(0, Math.min(1, 1 - progress / 0.18))

  return (
    <div
      className="data-stream-container"
      style={{ '--fade-opacity': fadeOpacity.toFixed(3) }}
    >
      <div className="data-stream-header">
        <span className="data-pulse-dot" />
        <span className="data-stream-title">LIVE TELEMETRY STREAM</span>
      </div>

      <div className="data-stream-list">
        {rawDataStreams.map((item, index) => (
          <DataRow
            key={index}
            item={item}
            index={index}
            progress={progress}
          />
        ))}
      </div>
    </div>
  )
}
