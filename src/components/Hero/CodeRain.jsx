import React, { useEffect, useRef } from 'react'
import './CodeRain.css'

const SNIPPETS = [
  'const { signal } = useSystem()',
  'await renderFrame(4K_UHD)',
  '0x7F8B9A20 // MEM_ALLOC',
  'WebGL2.createShader(GL_VERTEX)',
  'sys.telemetry.ping(0.04ms)',
  'matrix4x4.identity().rotateY()',
  'interface DeveloperProfile { ... }',
  'Promise.all([GPU_DECODE, GSAP])',
  '01000011 01001100 01011001',
  'function buildDigitalReality()',
  'export const WD4_SYSTEM = true',
  'vec4 color = texture2D(uSampler)',
  '0xDEADBEEF // STACK_TRACE',
  'requestAnimationFrame(loop)',
  'ctx.imageSmoothingQuality = "high"',
  'new Float32Array(bufferSize)',
  'GIS.coordinate(01.482, 103.851)',
  'sys.kernel.verifyIdentity()'
]

export default function CodeRain({ opacity = 0.25 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let lastTime = performance.now()

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = window.innerWidth
    let height = window.innerHeight

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)

    // Generate smooth continuous particle streams
    const columnCount = Math.floor(width / 70)
    const streams = Array.from({ length: columnCount }, (_, i) => ({
      x: i * 70 + (Math.random() * 20 - 10),
      y: Math.random() * -height * 1.5,
      speed: 45 + Math.random() * 55, // pixels per second (smooth continuous velocity)
      text: SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)],
      length: 8 + Math.floor(Math.random() * 12),
      alpha: 0.2 + Math.random() * 0.4,
      fontSize: 10 + Math.floor(Math.random() * 3),
    }))

    const render = (time) => {
      const dt = Math.min(0.1, (time - lastTime) / 1000)
      lastTime = time

      // Soft clear with smooth persistence
      ctx.clearRect(0, 0, width, height)

      streams.forEach((stream) => {
        stream.y += stream.speed * dt

        ctx.font = `${stream.fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`

        // Draw character chain with smooth fading tail
        const chars = stream.text.split('')
        for (let j = 0; j < chars.length; j++) {
          const charY = stream.y - j * 16
          if (charY < -20 || charY > height + 20) continue

          const isHead = j === 0
          const tailFade = Math.max(0, 1 - j / stream.length)

          if (isHead) {
            ctx.fillStyle = '#ffffff'
            ctx.shadowColor = '#00ffaa'
            ctx.shadowBlur = 10
          } else {
            ctx.fillStyle = `rgba(0, 255, 170, ${tailFade * stream.alpha})`
            ctx.shadowBlur = 0
          }

          ctx.fillText(chars[j % chars.length], stream.x, charY)
        }

        ctx.shadowBlur = 0

        // Reset to top when passed bottom
        if (stream.y - stream.length * 16 > height) {
          stream.y = -40 - Math.random() * 100
          stream.text = SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)]
          stream.speed = 45 + Math.random() * 55
        }
      })

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', resize)
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
