export default function SignalLine({ progress = 0 }) {
  const normalizedProgress = Math.min(1, Math.max(0, progress))
  const strokeOffset = 100 * (1 - normalizedProgress)

  return (
    <div className="w-full my-2 flex items-center justify-center opacity-85 select-none pointer-events-none">
      <svg
        className="w-full h-4 max-w-[280px]"
        viewBox="0 0 300 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background track line */}
        <path
          d="M0 12 H70 L80 4 L90 20 L100 8 L110 16 L120 12 H180 L190 2 L200 22 L210 12 H300"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Dynamic scanning progress line with neon drop shadow */}
        <path
          d="M0 12 H70 L80 4 L90 20 L100 8 L110 16 L120 12 H180 L190 2 L200 22 L210 12 H300"
          stroke="#00ffaa"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset={strokeOffset}
          className="drop-shadow-[0_0_6px_#00ffaa] transition-all duration-75 ease-linear"
        />
      </svg>
    </div>
  )
}
