import { useEffect, useRef, memo } from 'react'

/**
 * GhostCursor + Precision Cyberpunk Hardware Pointer
 * Adaptasi dari @react-bits/GhostCursor-JS-TW yang dioptimalkan untuk:
 * - 0 React state re-renders (100% Canvas 2D / GPU transform loop)
 * - Auto-sleep RAF loop saat kursor diam (hemat CPU & baterai)
 * - Presisi Hotspot (5px, 1px) untuk aset /cursor-pointer.svg
 * - Efek Ghost Trail elastis bergradasi Cyberpunk Crimson-Rose
 * - Shockwave Pulse & Particle Puff saat klik (mousedown)
 */
function Cursor({
  color = '#ef4444',
  trailColor = 'rgba(239, 68, 68, 0.45)',
  pointsCount = 35,
  springStrength = 0.32,
  friction = 0.72,
  trailWidth = 3.5,
  fadeDelayMs = 400,
  fadeDurationMs = 600,
}) {
  const canvasRef = useRef(null)
  const pointerRef = useRef(null)

  useEffect(() => {
    // Abaikan jika hanya perangkat layar sentuh murni tanpa mouse
    const isTouchOnly =
      window.matchMedia('(pointer: coarse)').matches &&
      !window.matchMedia('(any-pointer: fine)').matches
    if (isTouchOnly) return

    const canvas = canvasRef.current
    const pointer = pointerRef.current
    if (!canvas || !pointer) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let isRunning = false
    let lastMoveTime = performance.now()
    let isHoveringInteractive = false
    let isClicking = false

    // Offset koordinat fisik pointer SVG (ujung tip berada di 5px, 1px)
    const TIP_X = 5
    const TIP_Y = 1

    // Setup ukuran Canvas dengan High-DPI support (Retina / 4K)
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = (canvas.width = window.innerWidth * dpr)
    let height = (canvas.height = window.innerHeight * dpr)
    ctx.scale(dpr, dpr)

    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.width = window.innerWidth * dpr
      height = canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
    }

    // Koordinat kursor & rantai titik ghost trail
    const mouse = { x: -100, y: -100 }
    const points = Array.from({ length: pointsCount }, () => ({
      x: -100,
      y: -100,
      vx: 0,
      vy: 0,
    }))

    // Partikel percikan (puffs) saat kursor diklik
    let clickPuffs = []

    // Mulai render loop jika belum aktif
    const startLoop = () => {
      if (!isRunning) {
        isRunning = true
        render()
      }
    }

    // Update Transform Pointer SVG (Direct GPU translation)
    const updatePointerTransform = () => {
      const scale = isClicking ? 0.88 : isHoveringInteractive ? 1.15 : 1.0
      const rotate = isClicking ? -6 : 0
      pointer.style.transform = `translate3d(${mouse.x - TIP_X}px, ${mouse.y - TIP_Y}px, 0) scale(${scale}) rotate(${rotate}deg)`
    }

    // Event Handler: Mouse Movement
    const onMouseMove = (e) => {
      if (e.pointerType === 'touch') return

      mouse.x = e.clientX
      mouse.y = e.clientY
      lastMoveTime = performance.now()

      // Tampilkan kursor jika sebelumnya tersembunyi
      if (pointer.style.opacity !== '1') {
        pointer.style.opacity = '1'
        canvas.style.opacity = '1'
      }

      updatePointerTransform()

      // Deteksi elemen interaktif di bawah kursor
      const target = e.target
      const isInteractive = Boolean(
        target?.closest?.(
          'a, button, [role="button"], input, textarea, select, .cursor-pointer, [data-cursor-interactive]'
        )
      )

      if (isInteractive !== isHoveringInteractive) {
        isHoveringInteractive = isInteractive
        pointer.style.filter = isInteractive
          ? 'drop-shadow(0 0 14px rgba(255, 26, 26, 0.95))'
          : 'drop-shadow(0 0 8px rgba(239, 9, 10, 0.6))'
        updatePointerTransform()
      }

      startLoop()
    }

    // Event Handler: Mouse Down (Klik)
    const onMouseDown = (e) => {
      if (e.pointerType === 'touch') return
      isClicking = true
      updatePointerTransform()

      // Tambahkan efek shockwave & partikel ghost burst di titik klik
      const numParticles = 8
      for (let i = 0; i < numParticles; i++) {
        const angle = (Math.PI * 2 * i) / numParticles + (Math.random() - 0.5)
        const speed = Math.random() * 3 + 2
        clickPuffs.push({
          x: mouse.x,
          y: mouse.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 3 + 2,
          alpha: 0.9,
          decay: Math.random() * 0.03 + 0.02,
        })
      }

      startLoop()
    }

    // Event Handler: Mouse Up (Lepas Klik)
    const onMouseUp = (e) => {
      if (e.pointerType === 'touch') return
      isClicking = false
      updatePointerTransform()
    }

    // Event Handler: Window Boundary
    const onMouseLeave = () => {
      pointer.style.opacity = '0'
      canvas.style.opacity = '0'
    }

    const onMouseEnter = () => {
      pointer.style.opacity = '1'
      canvas.style.opacity = '1'
      lastMoveTime = performance.now()
      startLoop()
    }

    // Core Animation Render Loop (Ghost Trail Physics)
    const render = () => {
      const now = performance.now()
      const timeSinceMove = now - lastMoveTime

      // Hitung fade out jika kursor berhenti bergerak
      let globalAlpha = 1
      if (timeSinceMove > fadeDelayMs) {
        const fadeProgress = (timeSinceMove - fadeDelayMs) / fadeDurationMs
        globalAlpha = Math.max(0, 1 - fadeProgress)
      }

      // Bersihkan canvas setiap frame
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      // 1. Update & Render Titik Jejak Ghost Trail
      let leadX = mouse.x
      let leadY = mouse.y

      for (let i = 0; i < points.length; i++) {
        const pt = points[i]

        // Jika inisial di luar layar, bawa langsung mendekati kursor
        if (pt.x < 0) {
          pt.x = mouse.x
          pt.y = mouse.y
        }

        // Spring / Damping Physics
        const dx = leadX - pt.x
        const dy = leadY - pt.y
        pt.vx = (pt.vx + dx * springStrength) * friction
        pt.vy = (pt.vy + dy * springStrength) * friction
        pt.x += pt.vx
        pt.y += pt.vy

        leadX = pt.x
        leadY = pt.y
      }

      // 2. Gambar Kurva Halus Ghost Ribbon Trail
      if (globalAlpha > 0.01 && points.length > 2) {
        ctx.save()
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'

        // Gambar segmen per segmen dengan tapering width dan alpha decay
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i]
          const p2 = points[i + 1]
          const progress = i / (points.length - 1)

          // Tapering: tebal di dekat mouse, meruncing tipis di ekor
          const segWidth = Math.max(0.5, (1 - progress * 0.85) * trailWidth)
          const segAlpha = (1 - progress) * 0.75 * globalAlpha

          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)

          ctx.strokeStyle = `rgba(239, 68, 68, ${segAlpha})`
          ctx.lineWidth = segWidth
          ctx.shadowColor = '#ff2a55'
          ctx.shadowBlur = (1 - progress) * 12
          ctx.stroke()
        }

        // Ghost Aura Glow di kepala jejak
        const head = points[0]
        const auraGrad = ctx.createRadialGradient(
          head.x,
          head.y,
          0,
          head.x,
          head.y,
          isHoveringInteractive ? 28 : 16
        )
        auraGrad.addColorStop(0, `rgba(239, 68, 68, ${0.45 * globalAlpha})`)
        auraGrad.addColorStop(1, 'rgba(239, 68, 68, 0)')

        ctx.beginPath()
        ctx.arc(head.x, head.y, isHoveringInteractive ? 28 : 16, 0, Math.PI * 2)
        ctx.fillStyle = auraGrad
        ctx.fill()
        ctx.restore()
      }

      // 3. Render Click Burst Puffs (Partikel klik)
      if (clickPuffs.length > 0) {
        ctx.save()
        for (let i = clickPuffs.length - 1; i >= 0; i--) {
          const puff = clickPuffs[i]
          puff.x += puff.vx
          puff.y += puff.vy
          puff.vx *= 0.92
          puff.vy *= 0.92
          puff.alpha -= puff.decay

          if (puff.alpha <= 0) {
            clickPuffs.splice(i, 1)
            continue
          }

          ctx.beginPath()
          ctx.arc(puff.x, puff.y, puff.radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 68, 68, ${puff.alpha})`
          ctx.shadowColor = '#ef4444'
          ctx.shadowBlur = 8
          ctx.fill()
        }
        ctx.restore()
      }

      // Loop berlanjut jika trail masih terlihat atau ada partikel klik aktif
      if (globalAlpha > 0.005 || clickPuffs.length > 0) {
        animationFrameId = requestAnimationFrame(render)
      } else {
        // Sleep RAF loop untuk menghemat resource CPU saat kursor berhenti
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        isRunning = false
      }
    }

    // Registrasi Event Listener
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('pointermove', onMouseMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown, { passive: true })
    window.addEventListener('mouseup', onMouseUp, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave, { passive: true })
    document.addEventListener('mouseenter', onMouseEnter, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })

    // Cleanup Listener & RAF saat Unmount
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('pointermove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      window.removeEventListener('resize', handleResize)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [pointsCount, springStrength, friction, trailWidth, fadeDelayMs, fadeDurationMs])

  return (
    <>
      {/* Canvas Layer: Ghost Cursor Trail & Click Puffs */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[999998] transition-opacity duration-300"
        style={{
          width: '100vw',
          height: '100vh',
        }}
        aria-hidden="true"
      />

      {/* DOM Layer: Precision Cyberpunk Hardware Pointer SVG */}
      <div
        ref={pointerRef}
        className="fixed top-0 left-0 pointer-events-none z-[999999] opacity-0 will-change-transform select-none transition-[opacity,filter] duration-200"
        style={{
          width: 32,
          height: 32,
          transformOrigin: '5px 1px',
        }}
        aria-hidden="true"
      >
        <img
          src="/cursor-pointer.svg"
          alt=""
          className="w-full h-full object-contain pointer-events-none select-none"
          style={{
            filter: 'drop-shadow(0 0 8px rgba(239, 9, 10, 0.6))',
          }}
          draggable={false}
        />
      </div>
    </>
  )
}

export default memo(Cursor)
