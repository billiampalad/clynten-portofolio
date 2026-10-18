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
import './Hero.css'

const TOTAL_FRAMES = frameUrls.length

export default function Hero({ onProgressChange }) {
  const heroSectionRef = useRef(null)
  const pinWrapperRef = useRef(null)
  const backdropLayerRef = useRef(null)
  const canvasRef = useRef(null)
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
            finishTimer = setTimeout(() => {
              if (!isMounted) return
              setLoading(false)
              renderFrame(0)
            }, 650)
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
        // TAHAP 3 (0.77 -> 0.95): SMOOTH MULTI-STAGE RATIO (FULL/100% -> 80% -> 50% -> 30% -> 10%)
        // =========================================================================
        const HOLD_FULL_END = 0.81 // Fase TAHAN di 100% Fullscreen Bersih setelah HUD hilang
        const SHRINK_START = 0.81  // Titik mulai mengecil bertahap
        const SHRINK_END = 0.95    // Titik akhir mencapai 10% & meredup habis

        // Fungsi Easing Hermite Smoothstep (Transisi sangat halus tanpa patahan)
        const smoothStep = (t) => t * t * (3 - 2 * t)

        if (canvas) {
          if (progress < HOLD_FULL_END) {
            // TAHAP FULL / 100%: Tampilan Fullscreen Penuh Bersih, 100% Terang & Jernih
            canvas.style.transform = 'scale(1)'
            canvas.style.opacity = '1'
            canvas.style.borderRadius = '0px'
            canvas.style.boxShadow = 'none'
            canvas.style.border = 'none'
          } else if (progress >= SHRINK_START && progress <= SHRINK_END) {
            // Normalisasi progres outro (0.00 -> 1.00)
            const p = (progress - SHRINK_START) / (SHRINK_END - SHRINK_START)

            // Hitung Rasio Skala Sangat Halus (Smooth Interpolation)
            let cScale
            let cRadius
            let frameOpacity

            if (p <= 0.25) {
              // TAHAP 1 (100% -> 80%): Membentuk sudut lembut & cyber glow
              const t = smoothStep(p / 0.25)
              cScale = 1.00 - t * 0.20 // 1.00 -> 0.80
              cRadius = t * 20
              frameOpacity = 1.0 // 100% Jernih
            } else if (p <= 0.55) {
              // TAHAP 2 (80% -> 50%): Medium Floating Card
              const t = smoothStep((p - 0.25) / 0.30)
              cScale = 0.80 - t * 0.30 // 0.80 -> 0.50
              cRadius = 20 + t * 12
              frameOpacity = 1.0 // 100% Jernih
            } else if (p <= 0.80) {
              // TAHAP 3 (50% -> 30%): Compact Mini Card (Mulai Meredup Halus)
              const t = smoothStep((p - 0.55) / 0.25)
              cScale = 0.50 - t * 0.20 // 0.50 -> 0.30
              cRadius = 32
              frameOpacity = 1.0 - t * 0.50 // 1.0 -> 0.50
            } else {
              // TAHAP 4 (30% -> 10%): Pinpoint Dissolve (Meredup Tuntas)
              const t = smoothStep((p - 0.80) / 0.20)
              cScale = 0.30 - t * 0.20 // 0.30 -> 0.10
              cRadius = 32
              frameOpacity = Math.max(0, 0.50 * (1 - t)) // 0.50 -> 0.00
            }

            const glowAlpha = Math.min(0.85, p * 1.2)

            const isLight =
              document.documentElement.getAttribute('data-theme') === 'light' ||
              document.documentElement.classList.contains('light-theme')

            canvas.style.transform = `scale(${cScale.toFixed(4)})`
            canvas.style.opacity = frameOpacity.toFixed(3)
            canvas.style.borderRadius = `${cRadius.toFixed(1)}px`
            canvas.style.border = 'none'

            if (frameOpacity > 0.02 && cScale > 0.08) {
              canvas.style.boxShadow = isLight
                ? `0 20px 60px rgba(15, 23, 42, ${(0.18 * frameOpacity).toFixed(2)}), 0 0 35px rgba(244, 63, 94, ${(0.28 * frameOpacity).toFixed(2)}), inset 0 0 15px rgba(244, 63, 94, ${(0.12 * frameOpacity).toFixed(2)})`
                : `0 25px 90px rgba(0, 0, 0, ${(0.95 * frameOpacity).toFixed(2)}), 0 0 50px rgba(255, 0, 60, ${(glowAlpha * frameOpacity).toFixed(2)}), 0 0 100px rgba(255, 30, 70, ${(glowAlpha * 0.6 * frameOpacity).toFixed(2)}), inset 0 0 25px rgba(255, 0, 60, ${(0.25 * frameOpacity).toFixed(2)})`
            } else {
              canvas.style.boxShadow = 'none'
            }
          } else {
            // FASE 3C (0.95 -> 1.00): LANDING BUFFER ZONE (Frame hilang total)
            canvas.style.transform = 'scale(0)'
            canvas.style.opacity = '0'
            canvas.style.boxShadow = 'none'
            canvas.style.border = 'none'
          }
        }

        // =========================================================================
        // TAHAP 4: KEMUNCULAN SECTION VERIFIED PROFILE (DIAM KOKOH, TRANSISI OPACITY HALUS)
        // =========================================================================
        let currentAboutReveal = 0
        if (backdropLayerRef.current) {
          // Backdrop mulai memudar masuk seawal frame mulai mengecil (~0.83)
          const ABOUT_FADE_START = SHRINK_START + 0.15 * (SHRINK_END - SHRINK_START)
          if (progress < ABOUT_FADE_START) {
            // Sebelum frame mengecil: Backdrop belum tampil
            currentAboutReveal = 0
            backdropLayerRef.current.style.opacity = '0'
            backdropLayerRef.current.style.pointerEvents = 'none'
          } else if (progress >= ABOUT_FADE_START && progress < SHRINK_END) {
            // Saat frame mengecil: Verified Profile memudar masuk 0.0 -> 1.0
            const normAbout = (progress - ABOUT_FADE_START) / (SHRINK_END - ABOUT_FADE_START)
            currentAboutReveal = smoothStep(Math.min(1, Math.max(0, normAbout)))
            backdropLayerRef.current.style.opacity = currentAboutReveal.toFixed(3)
            backdropLayerRef.current.style.pointerEvents = currentAboutReveal > 0.5 ? 'auto' : 'none'
          } else {
            // Dari 0.95 -> 1.00 (Landing Buffer): Verified Profile 100% penuh, DIAM KOKOH
            currentAboutReveal = 1
            backdropLayerRef.current.style.opacity = '1'
            backdropLayerRef.current.style.pointerEvents = 'auto'
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
    <section id="hero" ref={heroSectionRef} className="hero-section">
      <div ref={pinWrapperRef} className="hero-pin-wrapper">
        {loading && <HeroRadarLoader progress={loadProgress} />}

        {/* Layer 0: Seamless Backdrop Reveal (Directly behind the Canvas Floating Card) */}
        <div ref={backdropLayerRef} className="hero-backdrop-layer">
          <About />
        </div>

        {/* Layer 1: Cinematic Canvas Frame Sequence (Perlahan mengecil bertahap menjadi Floating Card) */}
        <canvas ref={canvasRef} className="hero-canvas" />

        {/* Grouped HUD Telemetry Layer (Memudar halus terlebih dahulu pada 0.64 -> 0.76) */}
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

          {/* Layer 7: Large Bold Scroll-Highlighted Narrative Headline (Immediate LCP render) */}
          <ScrollHeadline progress={scrollProgress} />

          {/* Layer 8: Developer Signal HUD */}
          {!loading && <DeveloperSignal progress={scrollProgress} />}
        </div>
      </div>
    </section>
  )
}
