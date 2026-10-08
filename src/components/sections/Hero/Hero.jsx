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

  // GSAP ScrollTrigger SignalIQ-Inspired Progressive Outro Timeline
  useEffect(() => {
    if (loading) return

    const canvas = canvasRef.current
    const gridOverlay = gridOverlayRef.current
    const hudLayer = hudLayerRef.current

    const playhead = playheadRef.current
    playhead.frame = 0

    // Set initial canvas and overlay state
    if (canvas) {
      canvas.style.filter = `blur(${HERO_CONFIG.blurStart}px) brightness(${HERO_CONFIG.brightnessStart}) contrast(${HERO_CONFIG.contrastStart})`
      canvas.style.transform = 'scale(1)'
      canvas.style.opacity = '1'
      canvas.style.borderRadius = '0px'
      canvas.style.boxShadow = 'none'
      canvas.style.border = 'none'
    }

    if (hudLayer) {
      hudLayer.style.opacity = '1'
      hudLayer.style.transform = 'scale(1)'
    }

    if (backdropLayerRef.current) {
      backdropLayerRef.current.style.opacity = '0'
    }

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
            let cScale = 1.00
            let cRadius = 0
            let frameOpacity = 1.0

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

            const borderAlpha = Math.min(0.85, p * 1.5)
            const glowAlpha = Math.min(0.35, p * 0.8)

            canvas.style.transform = `scale(${cScale.toFixed(4)})`
            canvas.style.opacity = frameOpacity.toFixed(3)
            canvas.style.borderRadius = `${cRadius.toFixed(1)}px`
            canvas.style.boxShadow = frameOpacity > 0.02 && cScale > 0.08
              ? `0 25px 80px rgba(0, 0, 0, ${(0.95 * frameOpacity).toFixed(2)}), 0 0 45px rgba(0, 255, 170, ${(glowAlpha * frameOpacity).toFixed(2)}), inset 0 0 15px rgba(255, 255, 255, ${(0.15 * frameOpacity).toFixed(2)})`
              : 'none'
            canvas.style.border = frameOpacity > 0.02 && cScale > 0.08
              ? `1.5px solid rgba(0, 255, 170, ${(borderAlpha * frameOpacity).toFixed(2)})`
              : 'none'
          } else {
            // FASE 3C (0.95 -> 1.00): LANDING BUFFER ZONE (Frame hilang total)
            canvas.style.transform = 'scale(0)'
            canvas.style.opacity = '0'
            canvas.style.boxShadow = 'none'
            canvas.style.border = 'none'
          }
        }

        // =========================================================================
        // TAHAP 4: KEMUNCULAN SECTION ABOUT (DIAM KOKOH, TRANSISI OPACITY HALUS)
        // =========================================================================
        if (backdropLayerRef.current) {
          const ABOUT_FADE_START = SHRINK_START + 0.55 * (SHRINK_END - SHRINK_START) // ~0.887
          if (progress < ABOUT_FADE_START) {
            // Sebelum frame mencapai 50%: Backdrop belum tampil
            backdropLayerRef.current.style.opacity = '0'
          } else if (progress >= ABOUT_FADE_START && progress < SHRINK_END) {
            // Saat frame mengecil dari 50% -> 30% -> 10%: About memudar masuk 0.0 -> 1.0
            const normAbout = (progress - ABOUT_FADE_START) / (SHRINK_END - ABOUT_FADE_START)
            const aboutReveal = smoothStep(Math.min(1, Math.max(0, normAbout)))
            backdropLayerRef.current.style.opacity = aboutReveal.toFixed(3)
          } else {
            // Dari 0.95 -> 1.00 (Landing Buffer): About 100% penuh, DIAM KOKOH
            backdropLayerRef.current.style.opacity = '1'
          }
        }

        // Beritahu Navbar saat frame mulai meredup ke About (0.88+)
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

        {/* Layer 0: Seamless Backdrop Reveal (Directly behind the Canvas Floating Card) */}
        <div ref={backdropLayerRef} className="hero-backdrop-layer">
          <About isBackdrop={true} />
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

          {/* Layer 7: Large Bold Scroll-Highlighted Narrative Headline */}
          {!loading && <ScrollHeadline progress={scrollProgress} />}

          {/* Layer 8: Developer Signal HUD */}
          {!loading && <DeveloperSignal progress={scrollProgress} />}
        </div>
      </div>
    </section>
  )
}
