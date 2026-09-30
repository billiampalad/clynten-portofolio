import React, { useEffect, useRef } from 'react'
import './CodeRain.css'

const CODE_CHARS = [
  'const', 'async', '0x1F', '=>', '0101', 'import', 'Promise', 'WebGL',
  'render()', 'return', '{...}', 'System.init()', '0x8A', '&&', 'null',
  'true', '4K', 'GPU', 'GLSL', 'await', '0x3B', 'Math.sin()', 'state'
]

export default function CodeRain({ opacity = 0.22 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const fontSize = 12
    const columns = Math.floor(width / 28)
    const drops = Array.from({ length: columns }, () => Math.random() * -100)
    const speeds = Array.from({ length: columns }, () => 0.6 + Math.random() * 0.8)

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    const draw = () => {
      // Create trailing fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
      ctx.fillRect(0, 0, width, height)

      ctx.font = `11px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]
        const x = i * 28
        const y = drops[i] * fontSize

        // Subtle glow colors (cyan / green tint)
        if (Math.random() > 0.85) {
          ctx.fillStyle = 'rgba(0, 255, 170, 0.9)' // Leading bright character
        } else {
          ctx.fillStyle = 'rgba(0, 255, 255, 0.35)' // Trailing tail
        }

        ctx.fillText(char, x, y)

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i] += speeds[i]
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    animationFrameId = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="code-rain-canvas"
      style={{ opacity }}
    />
  )
}
