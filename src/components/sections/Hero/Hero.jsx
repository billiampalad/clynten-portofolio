import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap, ScrollTrigger } from '@/lib/animations/gsap'
import PixelGrid from '@/components/effects/PixelGrid'
import CodeRain from '@/components/effects/CodeRain'
import DeveloperSignal from './DeveloperSignal'
import TargetReticle from './TargetReticle'
import ScrollHeadline from './ScrollHeadline'
import TelemetryWidgets from './TelemetryWidgets'
import BodySignals from './BodySignals'
import { HERO_CONFIG, HERO_SCROLL_TRIGGER_CONFIG } from '@/lib/constants/hero'
import { calculateCoverFit } from '@/lib/utils/canvas'
import frameUrls from '@/data/frameList.json'
import './Hero.css'

const TOTAL_FRAMES = frameUrls.length

export default function Hero({ onProgressChange }) {
  const heroSectionRef = useRef(null)
  const pinWrapperRef = useRef(null)
  const canvasRef = useRef(null)
  const gridOverlayRef = useRef(null)
  const hudLayerRef = useRef(null)

  const [loading, setLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  const imagesRef = useRef([])
  const playheadRef = useRef({ frame: 0 })
  const lastRenderedIndexRef = useRef(-1)

  // Draw current frame to canvas with full cover fit & retina DPI
  const renderFrame = useCallback((rawIndex) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true })
    if (!ctx) return

    const index = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(rawIndex)))
    const img = imagesRef.current[index]
    if (!img || !img.complete || img.naturalWidth === 0) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const width = window.innerWidth
    const height = window.innerHeight

    const targetWidth = Math.round(width * dpr)
    const targetHeight = Math.round(height * dpr)

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth
      canvas.height = targetHeight
    }

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    ctx.save()
    ctx.scale(dpr, dpr)

    const { drawWidth, drawHeight, offsetX, offsetY } = calculateCoverFit(
      width,
      height,
      img.naturalWidth,
      img.naturalHeight
    )

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)

    ctx.restore()
    lastRenderedIndexRef.current = index
  }, [])

  // Preload and GPU-decode all frames
  useEffect(() => {
    let loadedCount = 0
    const images = []
    let isMounted = true

    const loadImages = async () => {
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const img = new Image()
        img.src = frameUrls[i]

        img.onload = async () => {
          try {
            if (img.decode) {
              await img.decode()
            }
          } catch {
            // Fallback for browsers without image.decode
          }

          if (!isMounted) return

          loadedCount++
          setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100))

          if (loadedCount === 1) {
            renderFrame(0)
          }

          if (loadedCount === TOTAL_FRAMES) {
            setLoading(false)
            renderFrame(0)
          }
        }

        images.push(img)
      }
      imagesRef.current = images
    }

    loadImages()

    return () => {
      isMounted = false
      images.forEach((img) => {
        img.onload = null
      })
    }
  }, [renderFrame])

  // GSAP ScrollTrigger Cinematic Reveal & Outro Timeline
  useEffect(() => {
    if (loading) return

    const canvas = canvasRef.current
    const gridOverlay = gridOverlayRef.current
    const hudLayer = hudLayerRef.current

    const playhead = playheadRef.current
    playhead.frame = 0

    // Set initial filter state
    if (canvas) {
      canvas.style.filter = `blur(${HERO_CONFIG.blurStart}px) brightness(${HERO_CONFIG.brightnessStart}) contrast(${HERO_CONFIG.contrastStart})`
      canvas.style.transform = 'scale(1)'
      canvas.style.opacity = '1'
      canvas.style.borderRadius = '0px'
      canvas.style.boxShadow = 'none'
    }

    if (hudLayer) {
      hudLayer.style.opacity = '1'
      hudLayer.style.transform = 'scale(1)'
    }

    let lastProgressUpdate = 0

    const trigger = ScrollTrigger.create({
      trigger: heroSectionRef.current,
      start: HERO_SCROLL_TRIGGER_CONFIG.start,
      end: '+=400%',
      pin: pinWrapperRef.current,
      scrub: HERO_SCROLL_TRIGGER_CONFIG.scrub,
      anticipatePin: HERO_SCROLL_TRIGGER_CONFIG.anticipatePin,
      onUpdate: (self) => {
        const progress = self.progress // 0 to 1

        // 1. Frame sequence scrub: spans smoothly from 0.0 to 0.82
        const sequenceProgress = Math.min(1, Math.max(0, progress / 0.82))
        const targetFrame = sequenceProgress * (TOTAL_FRAMES - 1)
        playhead.frame = targetFrame
        renderFrame(targetFrame)

        // 2. Cinematic Filter calculations: transitions to sharp by 0.75
        const filterProgress = Math.min(1, progress / 0.75)
        const currentBlur = gsap.utils.interpolate(
          HERO_CONFIG.blurStart,
          HERO_CONFIG.blurEnd,
          filterProgress
        )
        const currentBrightness = gsap.utils.interpolate(
          HERO_CONFIG.brightnessStart,
          HERO_CONFIG.brightnessEnd,
          filterProgress
        )
        const currentContrast = gsap.utils.interpolate(
          HERO_CONFIG.contrastStart,
          HERO_CONFIG.contrastEnd,
          filterProgress
        )

        if (canvas) {
          canvas.style.filter = `blur(${currentBlur.toFixed(2)}px) brightness(${currentBrightness.toFixed(2)}) contrast(${currentContrast.toFixed(2)})`
        }

        // 3. Scanline dissolve
        const gridOpacity = gsap.utils.interpolate(
          HERO_CONFIG.gridOpacityStart,
          HERO_CONFIG.gridOpacityEnd,
          filterProgress
        )
        if (gridOverlay) {
          gridOverlay.style.opacity = gridOpacity.toFixed(2)
        }

        // 4. Outro Phase 1 (0.78 -> 0.88): All HUD components shrink & fade away, leaving ONLY the frame canvas!
        const hudFade = progress < 0.78 ? 1 : Math.max(0, 1 - (progress - 0.78) / 0.09)
        const hudScale = progress < 0.78 ? 1 : Math.max(0.85, 1 - ((progress - 0.78) / 0.09) * 0.15)
        if (hudLayer) {
          hudLayer.style.opacity = hudFade.toFixed(3)
          hudLayer.style.transform = `scale(${hudScale.toFixed(3)})`
        }

        // 5. Outro Phase 2 (0.86 -> 1.00): Frame canvas shrinks down smoothly and dissolves to reveal section & navbar behind
        if (canvas) {
          if (progress >= 0.86) {
            const outroP = Math.min(1, (progress - 0.86) / 0.14)
            const cScale = 1 - outroP * 0.65 // Scale down from 1.0 to 0.35
            const cOpacity = Math.max(0, 1 - outroP * 1.05)
            const cRadius = outroP * 32
            const cShadow = `0 20px 60px rgba(0, 0, 0, 0.9), 0 0 ${outroP * 30}px rgba(0, 255, 170, ${0.35 * (1 - outroP)})`

            canvas.style.transform = `scale(${cScale.toFixed(3)})`
            canvas.style.opacity = cOpacity.toFixed(3)
            canvas.style.borderRadius = `${cRadius.toFixed(1)}px`
            canvas.style.boxShadow = cShadow
          } else {
            canvas.style.transform = 'scale(1)'
            canvas.style.opacity = '1'
            canvas.style.borderRadius = '0px'
            canvas.style.boxShadow = 'none'
          }
        }

        // 6. Notify Parent (Navbar Visibility & Telemetry Progress)
        if (onProgressChange) {
          onProgressChange(progress)
        }

        // 7. Update React state for Developer Signal & HUD telemetry (throttled for high FPS)
        if (
          Math.abs(progress - lastProgressUpdate) > HERO_SCROLL_TRIGGER_CONFIG.progressThreshold ||
          progress === 1 ||
          progress === 0
        ) {
          setScrollProgress(progress)
          lastProgressUpdate = progress
        }
      },
    })

    const handleResize = () => {
      ScrollTrigger.refresh()
      renderFrame(playhead.frame)
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    return () => {
      trigger.kill()
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [loading, renderFrame, onProgressChange])

  return (
    <section id="hero" ref={heroSectionRef} className="hero-section">
      <div ref={pinWrapperRef} className="hero-pin-wrapper">
        {loading && (
          <div className="hero-loading-overlay">
            <div className="loading-cyber-box">
              <div className="loading-glitch-text">INITIALIZING ASSETS</div>
              <div className="loading-bar-container">
                <div
                  className="loading-bar"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
              <span className="loading-percentage">{loadProgress}%</span>
            </div>
          </div>
        )}

        {/* Layer 1: Cinematic Canvas Frame Sequence (Shrinks and closes out at scroll end) */}
        <canvas ref={canvasRef} className="hero-canvas" />

        {/* Grouped HUD Telemetry Layer (Smoothly shrinks and fades away at 0.78 -> 0.88) */}
        <div ref={hudLayerRef} className="hero-hud-layer">
          {/* Layer 2: Matrix Cyber Falling Code Streams */}
          {!loading && <CodeRain opacity={0.22} />}

          {/* Layer 3: Digital Scanline & Vignette Overlay */}
          <PixelGrid gridRef={gridOverlayRef} />

          {/* Layer 4: Interactive Body Anatomy Signal Target Nodes */}
          {!loading && <BodySignals progress={scrollProgress} />}

          {/* Layer 5: Cyber Target Reticle & Corner Brackets HUD */}
          {!loading && <TargetReticle progress={scrollProgress} />}

          {/* Layer 6: Ambient Milestone Tracker & Radar Telemetry */}
          {!loading && <TelemetryWidgets progress={scrollProgress} />}

          {/* Layer 7: Large Bold Scroll-Highlighted Narrative Headline */}
          {!loading && <ScrollHeadline progress={scrollProgress} />}

          {/* Layer 8: Developer Signal HUD */}
          {!loading && <DeveloperSignal progress={scrollProgress} />}
        </div>
      </div>
    </section>
  )
}
