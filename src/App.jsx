import { useEffect, useRef, useState } from 'react'
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

  // Preload all frames
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
          // Render the first frame immediately
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
  }, [])

  // Render a specific frame onto the canvas
  const renderFrame = (index) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = imagesRef.current[index]
    if (!img || !img.complete || img.naturalWidth === 0) return

    const dpr = window.devicePixelRatio || 1
    const width = window.innerWidth
    const height = window.innerHeight

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr
      canvas.height = height * dpr
    }

    ctx.save()
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, width, height)

    // Calculate aspect ratio containment/coverage (contain to ensure full visual fidelity)
    const imgRatio = img.naturalWidth / img.naturalHeight
    const screenRatio = width / height

    let drawWidth, drawHeight, offsetX, offsetY

    if (screenRatio > imgRatio) {
      drawHeight = height
      drawWidth = height * imgRatio
      offsetX = (width - drawWidth) / 2
      offsetY = 0
    } else {
      drawWidth = width
      drawHeight = width / imgRatio
      offsetX = 0
      offsetY = (height - drawHeight) / 2
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
    ctx.restore()
  }

  // Handle scroll and lerped animation loop
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

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    let lastRenderedIndex = -1

    const animate = () => {
      // Smooth linear interpolation (lerp)
      const diff = targetProgressRef.current - currentProgressRef.current
      currentProgressRef.current += diff * 0.08

      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(currentProgressRef.current * (TOTAL_FRAMES - 1)))
      )

      if (frameIndex !== lastRenderedIndex) {
        renderFrame(frameIndex)
        lastRenderedIndex = frameIndex
      }

      animationFrameId.current = requestAnimationFrame(animate)
    }

    animationFrameId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

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
