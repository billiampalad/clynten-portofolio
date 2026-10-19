import { motion } from 'framer-motion'

export default function SignalLine({ progress = 0, color = '#00ffaa' }) {
  const normalizedProgress = Math.min(1, Math.max(0, progress))
  const strokeOffset = 100 * (1 - normalizedProgress)

  return (
    <div className="w-full my-0.5 flex items-center justify-center opacity-85 select-none pointer-events-none">
      <svg
        className="w-full h-4 max-w-full"
        viewBox="0 0 300 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background track line */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
          d="M0 12 H70 L80 4 L90 20 L100 8 L110 16 L120 12 H180 L190 2 L200 22 L210 12 H300"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Dynamic scanning progress line with neon drop shadow */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
          d="M0 12 H70 L80 4 L90 20 L100 8 L110 16 L120 12 H180 L190 2 L200 22 L210 12 H300"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset={strokeOffset}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          className="transition-colors duration-300 ease-linear"
        />
      </svg>
    </div>
  )
}
