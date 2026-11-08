import { memo, forwardRef, useImperativeHandle, useRef, useEffect } from 'react'

const SignalLine = memo(
  forwardRef(function SignalLine({ progress = 0, color = '#00ffaa' }, ref) {
    const haloPathRef = useRef(null)
    const sharpPathRef = useRef(null)

    const applyProgress = (prog) => {
      const normalized = Math.min(1, Math.max(0, prog))
      const offset = (100 - normalized * 100).toFixed(2)
      if (haloPathRef.current) {
        haloPathRef.current.style.strokeDashoffset = offset
      }
      if (sharpPathRef.current) {
        sharpPathRef.current.style.strokeDashoffset = offset
        sharpPathRef.current.style.opacity = normalized > 0.005 ? '1' : '0'
      }
    }

    useImperativeHandle(ref, () => ({
      update: (prog) => {
        applyProgress(prog)
      },
      setColor: (newColor) => {
        if (haloPathRef.current) haloPathRef.current.style.stroke = newColor
        if (sharpPathRef.current) sharpPathRef.current.style.stroke = newColor
      },
    }))

    useEffect(() => {
      applyProgress(progress)
    }, [])

    return (
      <div className="w-full my-0.5 lg:my-1 flex items-center justify-center opacity-90 select-none pointer-events-none">
        <svg
          className="w-full h-3.5 lg:h-5.5 [@media(min-width:1440px)]:h-7 max-w-full overflow-visible"
          viewBox="0 0 300 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background track line (gray guide path) */}
          <path
            d="M0 12 H70 L80 4 L90 20 L100 8 L110 16 L120 12 H180 L190 2 L200 22 L210 12 H300"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Outer Halo Glow Stroke (Pure GPU composited, 0 raster filter overhead) */}
          <path
            ref={haloPathRef}
            d="M0 12 H70 L80 4 L90 20 L100 8 L110 16 L120 12 H180 L190 2 L200 22 L210 12 H300"
            stroke={color}
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.35"
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset="100"
            style={{ willChange: 'stroke-dashoffset' }}
            className="transition-colors duration-300 ease-linear"
          />

          {/* Core Sharp Stroke */}
          <path
            ref={sharpPathRef}
            d="M0 12 H70 L80 4 L90 20 L100 8 L110 16 L120 12 H180 L190 2 L200 22 L210 12 H300"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset="100"
            style={{ willChange: 'stroke-dashoffset, opacity' }}
            className="transition-colors duration-300 ease-linear"
          />
        </svg>
      </div>
    )
  })
)

export default SignalLine
