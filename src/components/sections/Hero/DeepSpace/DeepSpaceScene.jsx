import { useEffect, useRef, memo } from 'react'
import * as THREE from 'three'
import { CameraController } from './CameraController'
import { DeepSpaceParticles } from './DeepSpaceParticles'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import './deep-space.css'

/**
 * DeepSpaceScene Component
 * Encapsulates Three.js scene, camera, particle tunnel, and rendering lifecycle.
 * Driven smoothly by the GSAP ScrollTrigger progress.
 */
function DeepSpaceScene({ progress = 0 }) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const cameraControllerRef = useRef(null)
  const particlesRef = useRef(null)
  const animFrameIdRef = useRef(null)
  const clockRef = useRef(new THREE.Clock())
  const progressRef = useRef(progress)
  const reducedMotion = useReducedMotion()

  // Keep progressRef updated without re-triggering useEffect
  useEffect(() => {
    progressRef.current = progress
  }, [progress])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    let isDisposed = false

    // 1. Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // 2. Camera setup via modular CameraController
    const { clientWidth: width, clientHeight: height } = container
    const cameraController = new CameraController(48, width / height)
    cameraControllerRef.current = cameraController

    // 3. Renderer setup
    let renderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.05
      rendererRef.current = renderer
    } catch (e) {
      console.warn('WebGL rendering not supported or context lost:', e)
      return
    }

    // 4. Particles & Tunnel Environment
    const particles = new DeepSpaceParticles(scene)
    particlesRef.current = particles

    // 5. Continuous Rendering Loop
    const clock = clockRef.current
    clock.start()

    const animate = () => {
      if (isDisposed) return

      const elapsedTime = clock.getElapsedTime()
      const currentProgress = progressRef.current

      // Only perform heavy render calculations when near or inside the outro phase (progress >= 0.70)
      // or at low framerate during idle establishing phase
      cameraController.update(currentProgress, elapsedTime, reducedMotion)
      particles.update(currentProgress, elapsedTime)

      renderer.render(scene, cameraController.camera)

      animFrameIdRef.current = requestAnimationFrame(animate)
    }

    animate()

    // 6. Responsive Window Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return
      const w = container.clientWidth
      const h = container.clientHeight
      if (w === 0 || h === 0) return

      cameraController.resize(w, h)
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    // 7. Robust Component Cleanup
    return () => {
      isDisposed = true
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current)
      }

      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)

      if (particles) {
        particles.dispose()
      }

      if (renderer) {
        renderer.dispose()
      }

      sceneRef.current = null
      cameraControllerRef.current = null
      particlesRef.current = null
      rendererRef.current = null
    }
  }, [reducedMotion])

  // DeepSpaceScene should only be visible during tunnel transition (0.73 -> 0.96)
  // and MUST dissolve completely to 0 as About emerges (0.96 -> 0.99)
  let sceneOpacity = 0
  if (progress >= 0.73 && progress < 0.96) {
    sceneOpacity = Math.min(1, (progress - 0.73) / 0.05)
  } else if (progress >= 0.96 && progress < 0.99) {
    sceneOpacity = Math.max(0, 1 - (progress - 0.96) / 0.03)
  } else {
    sceneOpacity = 0
  }

  // Dynamic vignette opacity: only active during tunnel traversal, fades to 0 before About
  const isTunnelActive = progress >= 0.75 && progress < 0.96
  const vignetteOpacity = isTunnelActive
    ? Math.min(1, 0.4 + ((progress - 0.75) / 0.20) * 0.6)
    : 0

  // Anamorphic focus beam visible only during focus convergence (0.91 -> 0.96)
  const isConverging = progress >= 0.91 && progress < 0.96
  const beamOpacity = isConverging
    ? Math.sin(((progress - 0.91) / 0.05) * Math.PI) * 0.85
    : 0

  return (
    <div
      ref={containerRef}
      className="deep-space-container"
      style={{
        opacity: sceneOpacity,
        display: sceneOpacity <= 0 ? 'none' : 'block',
        visibility: sceneOpacity <= 0 ? 'hidden' : 'visible',
        transition: 'opacity 0.25s ease-out',
      }}
    >
      <canvas ref={canvasRef} className="deep-space-canvas" />

      {/* Progressive Cinematic Vignette */}
      <div
        className="deep-space-vignette"
        style={{ opacity: vignetteOpacity }}
      />

      {/* Central Anamorphic Laser Horizon during Convergence */}
      <div
        className="deep-space-anamorphic-line"
        style={{ opacity: beamOpacity }}
      />
    </div>
  )
}

export default memo(DeepSpaceScene)
