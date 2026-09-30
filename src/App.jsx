import { useEffect, useRef, useState, useCallback } from 'react'
import './App.css'

const TOTAL_FRAMES = 145
const START_FRAME_INDEX = 11

const getFrameUrl = (index) => {
  const frameNum = String(START_FRAME_INDEX + index).padStart(3, '0')
  return `/gif/ezgif-frame-${frameNum}.jpg`
}

function App() {
  const canvasRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)
  const imagesRef = useRef([])
  const animationFrameId = useRef(null)
  const currentProgressRef = useRef(0)
  const targetProgressRef = useRef(0)
  const lastRenderedIndexRef = useRef(0)

  // High-fidelity rendering on canvas
  const renderFrame = useCallback((index) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const img = imagesRef.current[index]
    if (!img || !img.complete || img.naturalWidth === 0) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2) // Cap at 2 for performance & sharpness
    const width = window.innerWidth
    const height = window.innerHeight

    const targetCanvasWidth = Math.round(width * dpr)
    const targetCanvasHeight = Math.round(height * dpr)

    if (canvas.width !== targetCanvasWidth || canvas.height !== targetCanvasHeight) {
      canvas.width = targetCanvasWidth
      canvas.height = targetCanvasHeight
    }

    // Set maximum image smoothing quality
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    ctx.save()
    ctx.scale(dpr, dpr)

    // Full-screen cover calculation
    const imgRatio = img.naturalWidth / img.naturalHeight
    const screenRatio = width / height

    let drawWidth, drawHeight, offsetX, offsetY

    if (screenRatio > imgRatio) {
      // Fit width, crop top/bottom
      drawWidth = width
      drawHeight = width / imgRatio
      offsetX = 0
      offsetY = (height - drawHeight) / 2
    } else {
      // Fit height, crop sides
      drawHeight = height
      drawWidth = height * imgRatio
      offsetX = (width - drawWidth) / 2
      offsetY = 0
    }

    // Round pixel values to avoid subpixel blurriness
    ctx.drawImage(
      img,
      Math.round(offsetX),
      Math.round(offsetY),
      Math.round(drawWidth),
      Math.round(drawHeight)
    )

    ctx.restore()
    lastRenderedIndexRef.current = index
  }, [])

  // Preload all 4K frames
  useEffect(() => {
    let loadedCount = 0
    const images = []

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = getFrameUrl(i)
      img.onload = () => {
        loadedCount++
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100))
        if (loadedCount === 1) {
          renderFrame(0)
        }
        if (loadedCount === TOTAL_FRAMES) {
          setLoading(false)
        }
      }
      images.push(img)
    }

    imagesRef.current = images

    return () => {
      images.forEach((img) => {
        img.onload = null
      })
    }
  }, [renderFrame])

  // Smooth scroll interpolation loop
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      if (maxScroll <= 0) {
        targetProgressRef.current = 0
        return
      }
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll))
      targetProgressRef.current = progress
    }

    const handleResize = () => {
      handleScroll()
      renderFrame(lastRenderedIndexRef.current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    const animate = () => {
      const diff = targetProgressRef.current - currentProgressRef.current
      currentProgressRef.current += diff * 0.08

      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(currentProgressRef.current * (TOTAL_FRAMES - 1)))
      )

      if (frameIndex !== lastRenderedIndexRef.current) {
        renderFrame(frameIndex)
      }

      animationFrameId.current = requestAnimationFrame(animate)
    }

    animationFrameId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [renderFrame])

  return (
    <div className="animation-container">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-bar-container">
            <div
              className="loading-bar"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <span className="loading-text">{loadProgress}%</span>
        </div>
      )}
      <canvas ref={canvasRef} className="animation-canvas" />
    </div>
  )
}

export default App
