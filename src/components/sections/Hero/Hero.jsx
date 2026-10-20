import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap, ScrollTrigger } from '@/lib/animations/gsap'
import PixelGrid from '@/components/effects/PixelGrid'
import CodeRain from '@/components/effects/CodeRain'
import DeveloperSignal from './DeveloperSignal'
import TargetReticle from './TargetReticle'
import ScrollHeadline from './ScrollHeadline'
import TelemetryWidgets from './TelemetryWidgets'
import BodySignals from './BodySignals'
import About from '@/components/sections/About/About'
import { HERO_CONFIG, HERO_SCROLL_TRIGGER_CONFIG } from '@/lib/constants/hero'
import { calculateCoverFit } from '@/lib/utils/canvas'
import frameUrls from '@/data/frameList.json'
import HeroRadarLoader from './HeroRadarLoader'
import DeepSpaceScene from './DeepSpace/DeepSpaceScene'

const TOTAL_FRAMES = frameUrls.length

export default function Hero({ onProgressChange }) {
  const heroSectionRef = useRef(null)
  const pinWrapperRef = useRef(null)
  const backdropLayerRef = useRef(null)
  const canvasRef = useRef(null)
  const canvasCardRef = useRef(null)
  const panelBevelRef = useRef(null)
  const gridOverlayRef = useRef(null)
  const hudLayerRef = useRef(null)

  const [loading, setLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  const imagesRef = useRef([])
  const playheadRef = useRef({ frame: 0 })
  const lastRenderedIndexRef = useRef(-1)
  const canvasDimensionsRef = useRef({ width: 0, height: 0, dpr: 1 })

  // Synchronize canvas dimensions once on mount and on resize
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const width = window.innerWidth
    const height = window.innerHeight
    const targetWidth = Math.round(width * dpr)
    const targetHeight = Math.round(height * dpr)

    canvasDimensionsRef.current = { width, height, dpr }

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth
      canvas.height = targetHeight
    }
  }, [])

  // Draw current frame to canvas using cached layout dimensions (Zero layout invalidation)
  const renderFrame = useCallback((rawIndex) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true })
    if (!ctx) return

    const index = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(rawIndex)))
    const img = imagesRef.current[index]
    if (!img || !img.complete || img.naturalWidth === 0) return

    let { width, height, dpr } = canvasDimensionsRef.current
    if (width === 0 || height === 0) {
      updateCanvasSize()
      const current = canvasDimensionsRef.current
      width = current.width
      height = current.height
      dpr = current.dpr
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
  }, [updateCanvasSize])

  // Handle window resize with debouncing to prevent layout thrashing
  useEffect(() => {
    updateCanvasSize()

    let resizeTimer = null
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        updateCanvasSize()
        if (lastRenderedIndexRef.current >= 0) {
          renderFrame(lastRenderedIndexRef.current)
        }
      }, 100)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', handleResize)
    }
  }, [updateCanvasSize, renderFrame])

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
            renderFrame(0)
            // Fallback safety timer to guarantee loading disengages even if animation is blocked
            finishTimer = setTimeout(() => {
              if (!isMounted) return
              setLoading(false)
              renderFrame(0)
            }, 3000)
          }
        }

        images.push(img)
      }
      imagesRef.current = images
    }

    let finishTimer = null
    loadImages()

    return () => {
      isMounted = false
      if (finishTimer) {
        clearTimeout(finishTimer)
      }
      images.forEach((img) => {
        img.onload = null
      })
    }
  }, [renderFrame])

  // GSAP ScrollTrigger SignalIQ-Inspired Progressive Outro Timeline
  useEffect(() => {
    if (loading) return

    const canvas = canvasRef.current
    const gridOverlay = gridOverlayRef.current
    const hudLayer = hudLayerRef.current

    const playhead = playheadRef.current
    playhead.frame = 0

    let lastProgressUpdate = 0

    const trigger = ScrollTrigger.create({
      trigger: heroSectionRef.current,
      start: HERO_SCROLL_TRIGGER_CONFIG.start,
      end: HERO_SCROLL_TRIGGER_CONFIG.end,
      pin: pinWrapperRef.current,
      scrub: HERO_SCROLL_TRIGGER_CONFIG.scrub,
      anticipatePin: HERO_SCROLL_TRIGGER_CONFIG.anticipatePin,
      onUpdate: (self) => {
        const progress = self.progress // 0 to 1

        // =========================================================================
        // TAHAP 1 (0.00 -> 0.75): Pemutaran 145 Frame & Resolusi Telemetri 100%
        // =========================================================================
        const SCAN_END = 0.75
        const scanProgress = Math.min(1, Math.max(0, progress / SCAN_END))
        const targetFrame = scanProgress * (TOTAL_FRAMES - 1)
        playhead.frame = targetFrame
        renderFrame(targetFrame)

        // Filter visual menajam sempurna dan cerah pada progress 0.65
        const filterProgress = Math.min(1, progress / 0.65)
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

        // Digital Scanlines melarut halus seiring ketajaman visual
        const gridOpacity = gsap.utils.interpolate(
          HERO_CONFIG.gridOpacityStart,
          HERO_CONFIG.gridOpacityEnd,
          filterProgress
        )
        if (gridOverlay) {
          gridOverlay.style.opacity = gridOpacity.toFixed(2)
        }

        // =========================================================================
        // TAHAP 2 (0.75 -> 0.77): TEKS & CARD HUD LANGSUNG HILANG SEKETIKA
        // =========================================================================
        const HUD_VANISH_START = 0.75
        const HUD_VANISH_END = 0.77
        const hudFade = progress <= HUD_VANISH_START
          ? 1
          : Math.max(0, 1 - (progress - HUD_VANISH_START) / (HUD_VANISH_END - HUD_VANISH_START))
        if (hudLayer) {
          hudLayer.style.opacity = hudFade.toFixed(3)
          hudLayer.style.pointerEvents = hudFade > 0.05 ? 'auto' : 'none'
        }

        // =========================================================================
        // TAHAP 3: INFINITE DEEP SPACE TUNNEL 2.0 (Fase B, C, D)
        // 0.75 -> 0.84 (Fase B: Camera Pull-Back, Floating 3D Panel with Bevel Glow)
        // 0.84 -> 0.92 (Fase C: Deep Space Tunnel Traversal)
        // 0.92 -> 0.97 (Fase D: Focus Convergence)
        // =========================================================================
        const smoothStep = (t) => t * t * (3 - 2 * t)
        const canvasCard = canvasCardRef.current
        const panelBevel = panelBevelRef.current

        if (canvasCard) {
          if (progress < 0.75) {
            // Fase A: 100% Fullscreen, no border, flat 2D
            canvasCard.style.transform = 'translate3d(0, 0, 0) scale(1) rotateX(0deg)'
            canvasCard.style.opacity = '1'
            canvasCard.style.borderRadius = '0px'
            canvasCard.style.boxShadow = 'none'
            if (panelBevel) panelBevel.style.opacity = '0'
          } else if (progress >= 0.75 && progress < 0.84) {
            // Fase B: Cinematic Camera Pull-Back (Progress 0.75 -> 0.84)
            const t = smoothStep((progress - 0.75) / 0.09)
            const cScale = 1.00 - t * 0.28 // 1.00 -> 0.72
            const cTranslateZ = -t * 160 // 0 -> -160px
            const cRotateX = t * 2.5 // 0 -> 2.5deg
            const cRadius = t * 24 // 0 -> 24px
            const bevelAlpha = Math.min(1, t * 1.5)

            canvasCard.style.transform = `translate3d(0, ${(-t * 10).toFixed(1)}px, ${cTranslateZ.toFixed(1)}px) scale(${cScale.toFixed(4)}) rotateX(${cRotateX.toFixed(2)}deg)`
            canvasCard.style.opacity = '1'
            canvasCard.style.borderRadius = `${cRadius.toFixed(1)}px`
            canvasCard.style.boxShadow = `0 25px 80px rgba(0, 0, 0, 0.85), 0 0 45px rgba(6, 182, 212, ${(0.35 * bevelAlpha).toFixed(2)})`
            if (panelBevel) panelBevel.style.opacity = bevelAlpha.toFixed(2)
          } else if (progress >= 0.84 && progress < 0.92) {
            // Fase C: Deep Space Tunnel Traversal (Progress 0.84 -> 0.92)
            const t = smoothStep((progress - 0.84) / 0.08)
            const cScale = 0.72 - t * 0.37 // 0.72 -> 0.35
            const cTranslateZ = -160 - t * 260 // -160 -> -420px
            const cRotateX = 2.5 - t * 1.5 // 2.5 -> 1.0deg
            const cRadius = 24 + t * 8 // 24 -> 32px
            const frameOpacity = 1.0 - t * 0.15 // 1.0 -> 0.85

            canvasCard.style.transform = `translate3d(0, ${(-10 + t * 10).toFixed(1)}px, ${cTranslateZ.toFixed(1)}px) scale(${cScale.toFixed(4)}) rotateX(${cRotateX.toFixed(2)}deg)`
            canvasCard.style.opacity = frameOpacity.toFixed(3)
            canvasCard.style.borderRadius = `${cRadius.toFixed(1)}px`
            canvasCard.style.boxShadow = `0 20px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(6, 182, 212, 0.3)`
            if (panelBevel) panelBevel.style.opacity = '1'
          } else if (progress >= 0.92 && progress <= 0.97) {
            // Fase D: Focus Convergence (Progress 0.92 -> 0.97)
            const t = smoothStep((progress - 0.92) / 0.05)
            const cScale = Math.max(0.01, 0.35 * (1 - t)) // 0.35 -> 0.00
            const cTranslateZ = -420 - t * 380 // -420 -> -800px
            const frameOpacity = Math.max(0, 0.85 * (1 - t * 1.2))

            canvasCard.style.transform = `translate3d(0, 0, ${cTranslateZ.toFixed(1)}px) scale(${cScale.toFixed(4)}) rotateX(0deg)`
            canvasCard.style.opacity = frameOpacity.toFixed(3)
            canvasCard.style.borderRadius = '32px'
            canvasCard.style.boxShadow = frameOpacity > 0.1 ? `0 0 25px rgba(6, 182, 212, ${(0.4 * frameOpacity).toFixed(2)})` : 'none'
            if (panelBevel) panelBevel.style.opacity = frameOpacity.toFixed(2)
          } else {
            // Fase E (0.97 -> 1.00): Canvas completely dissolved into focal stillness
            canvasCard.style.transform = 'translate3d(0, 0, -800px) scale(0)'
            canvasCard.style.opacity = '0'
            canvasCard.style.boxShadow = 'none'
            if (panelBevel) panelBevel.style.opacity = '0'
          }
        }

        // =========================================================================
        // TAHAP 4 & 5: SOFT EMERGENCE SECTION ABOUT ME (Fase E: 0.96 -> 1.00)
        // =========================================================================
        let currentAboutReveal = 0
        if (backdropLayerRef.current) {
          const EMERGE_START = 0.96
          const EMERGE_END = 1.00

          if (progress < EMERGE_START) {
            currentAboutReveal = 0
            backdropLayerRef.current.style.opacity = '0'
            backdropLayerRef.current.style.pointerEvents = 'none'
          } else {
            const tOverall = smoothStep(Math.min(1, Math.max(0, (progress - EMERGE_START) / (EMERGE_END - EMERGE_START))))
            currentAboutReveal = tOverall
            backdropLayerRef.current.style.opacity = tOverall.toFixed(3)
            backdropLayerRef.current.style.pointerEvents = tOverall > 0.8 ? 'auto' : 'none'

            // Stage 1: Headline emerges first (0.96 -> 0.98)
            const tH = smoothStep(Math.min(1, Math.max(0, (progress - 0.96) / 0.02)))
            backdropLayerRef.current.style.setProperty('--emerge-headline-opacity', tH.toFixed(3))
            backdropLayerRef.current.style.setProperty('--emerge-headline-y', `${((1 - tH) * 22).toFixed(1)}px`)

            // Stage 2: Profile Card emerges with soft scale (0.97 -> 0.99)
            const tC = smoothStep(Math.min(1, Math.max(0, (progress - 0.97) / 0.02)))
            backdropLayerRef.current.style.setProperty('--emerge-card-opacity', tC.toFixed(3))
            backdropLayerRef.current.style.setProperty('--emerge-card-scale', (0.95 + tC * 0.05).toFixed(3))

            // Stage 3: Body & Telemetry emerge (0.98 -> 1.00)
            const tB = smoothStep(Math.min(1, Math.max(0, (progress - 0.98) / 0.02)))
            backdropLayerRef.current.style.setProperty('--emerge-body-opacity', tB.toFixed(3))
            backdropLayerRef.current.style.setProperty('--emerge-body-y', `${((1 - tB) * 16).toFixed(1)}px`)
          }
        }

        // Sinkronkan CSS variable --navbar-reveal secara langsung di GSAP ticker (0 delay, 100% real-time)
        document.documentElement.style.setProperty('--navbar-reveal', currentAboutReveal.toFixed(3))

        // Beritahu Navbar & App state
        if (onProgressChange) {
          onProgressChange(progress)
        }

        // Update React state telemetri secara efisien menggunakan scanProgress (0.00 -> 1.00)
        if (
          Math.abs(scanProgress - lastProgressUpdate) > HERO_SCROLL_TRIGGER_CONFIG.progressThreshold ||
          scanProgress === 1 ||
          scanProgress === 0
        ) {
          setScrollProgress(scanProgress)
          lastProgressUpdate = scanProgress
        }
      },
    })

    let resizeTimer = null
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh()
        renderFrame(playhead.frame)
      }, 150)
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    return () => {
      clearTimeout(resizeTimer)
      trigger.kill()
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [loading, renderFrame, onProgressChange])

  return (
    <section
      id="hero"
      ref={heroSectionRef}
      className="relative w-full bg-[#0A0907]"
    >
      <div
        ref={pinWrapperRef}
        className="relative w-screen h-screen h-[100dvh] overflow-hidden flex items-center justify-center bg-black"
      >
        {loading && (
          <HeroRadarLoader
            progress={loadProgress}
            onComplete={() => {
              setLoading(false)
              renderFrame(0)
            }}
          />
        )}

        {/* Layer 0: Seamless Backdrop Reveal (Directly behind the Canvas Floating Card) */}
        <div
          ref={backdropLayerRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-0 will-change-[opacity]"
        >
          <About />
        </div>

        {/* Layer 0.5: Three.js Infinite Deep Space Tunnel 2.0 (Scene + Camera + Particles + Fog + Vignette) */}
        <DeepSpaceScene progress={scrollProgress} />

        {/* Layer 1: Cinematic Canvas Frame Sequence (3D Floating Card in Deep Space) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[2] [perspective:1200px]">
          <div
            ref={canvasCardRef}
            className="relative w-full h-full overflow-hidden will-change-[transform,opacity,border-radius,box-shadow]"
          >
            <canvas
              ref={canvasRef}
              className="w-full h-full block bg-black [filter:blur(8px)_brightness(0.65)_contrast(0.9)] will-change-[filter] transition-[filter] duration-75"
            />
            {/* Cinematic Cyan & Crimson Dual-Color Edge Bevel */}
            <div
              ref={panelBevelRef}
              className="deep-space-panel-bevel opacity-0"
            />
          </div>
        </div>

        {/* Grouped HUD Telemetry Layer (Memudar halus terlebih dahulu pada 0.64 -> 0.76) */}
        <div
          ref={hudLayerRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-[5] opacity-100 scale-100 will-change-[opacity,transform] origin-center transition-[opacity,transform] duration-100"
        >
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
