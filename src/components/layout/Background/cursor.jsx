import { useEffect, useRef, memo } from 'react'
import gsap from 'gsap'

/**
 * Custom Hardware-Accelerated Cyberpunk Mecha Cursor
 * Hotspot Tip: (5px, 1px) relative to 32x32 SVG bounding box
 * Uses gsap.quickTo & GPU Compositing for 0 React re-renders & 60-120fps smoothness
 */
function Cursor() {
  const containerRef = useRef(null)
  const pointerRef = useRef(null)
  const rippleRef = useRef(null)

  useEffect(() => {
    // 1. Guard clause: pastikan hanya aktif pada desktop dengan mouse/trackpad presisi
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!mediaQuery.matches) return

    const container = containerRef.current
    const pointer = pointerRef.current
    const ripple = rippleRef.current
    if (!container || !pointer) return

    // 2. Set posisi inisial di luar layar & sembunyikan sebelum mouse bergerak
    gsap.set(container, {
      xPercent: 0,
      yPercent: 0,
      x: -100,
      y: -100,
      opacity: 0,
      force3D: true,
    })

    // 3. QuickTo pipeline untuk performa GPU ultra-responsif (Sub-pixel hardware translation)
    // Offset hotspot: ujung tip pointer SVG berada tepat di koordinat (x: 5px, y: 1px)
    const HOTSPOT_X = 5
    const HOTSPOT_Y = 1

    const xTo = gsap.quickTo(container, 'x', {
      duration: 0.1,
      ease: 'power2.out',
    })
    const yTo = gsap.quickTo(container, 'y', {
      duration: 0.1,
      ease: 'power2.out',
    })

    let isVisible = false
    let isHoveringInteractive = false

    // 4. Handler Pointer Movement
    const onPointerMove = (e) => {
      const { clientX, clientY, target } = e

      if (!isVisible) {
        isVisible = true
        gsap.to(container, { opacity: 1, duration: 0.2, ease: 'power2.out' })
      }

      // Update posisi kursor dengan kompensasi hotspot tip
      xTo(clientX - HOTSPOT_X)
      yTo(clientY - HOTSPOT_Y)

      // Deteksi elemen interaktif (link, button, input, textarea, card pointer)
      const interactiveEl = target && target.closest?.(
        'a, button, [role="button"], input, textarea, select, .cursor-pointer, [data-cursor-interactive]'
      )

      if (interactiveEl && !isHoveringInteractive) {
        isHoveringInteractive = true
        gsap.to(pointer, {
          scale: 1.18,
          filter: 'drop-shadow(0 0 12px rgba(255, 26, 26, 0.95))',
          duration: 0.25,
          ease: 'power2.out',
        })
      } else if (!interactiveEl && isHoveringInteractive) {
        isHoveringInteractive = false
        gsap.to(pointer, {
          scale: 1.0,
          filter: 'drop-shadow(0 0 8px rgba(239, 9, 10, 0.6))',
          duration: 0.25,
          ease: 'power2.out',
        })
      }
    }

    // 5. Handler Mouse Down (Mikro-animasi tekan & efek pulse ripple ring)
    const onMouseDown = () => {
      gsap.to(pointer, {
        scale: isHoveringInteractive ? 0.98 : 0.88,
        rotate: -5,
        duration: 0.12,
        ease: 'power3.out',
      })

      // Efek ripple ring menyebar dari ujung tip kursor
      if (ripple) {
        gsap.killTweensOf(ripple)
        gsap.set(ripple, {
          scale: 0.25,
          opacity: 0.9,
        })
        gsap.to(ripple, {
          scale: 2.2,
          opacity: 0,
          duration: 0.45,
          ease: 'power2.out',
        })
      }
    }

    // 6. Handler Mouse Up (Kembali ke skala semula dengan bounce halus)
    const onMouseUp = () => {
      gsap.to(pointer, {
        scale: isHoveringInteractive ? 1.18 : 1.0,
        rotate: 0,
        duration: 0.25,
        ease: 'back.out(2)',
      })
    }

    // 7. Handler Window Boundary (Fade out saat kursor keluar browser)
    const onMouseLeave = () => {
      isVisible = false
      gsap.to(container, { opacity: 0, duration: 0.2, ease: 'power2.out' })
    }

    const onMouseEnter = () => {
      isVisible = true
      gsap.to(container, { opacity: 1, duration: 0.2, ease: 'power2.out' })
    }

    // 8. Register passive event listeners untuk performa scroll & render bebas hambatan
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown, { passive: true })
    window.addEventListener('mouseup', onMouseUp, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave, { passive: true })
    document.addEventListener('mouseenter', onMouseEnter, { passive: true })

    // 9. Cleanup listener saat komponen unmount
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 pointer-events-none z-[999999] will-change-transform select-none"
      style={{
        width: 32,
        height: 32,
      }}
      aria-hidden="true"
    >
      {/* Click Pulse Ripple Ring (Center di Hotspot Tip 5px, 1px) */}
      <div
        ref={rippleRef}
        className="absolute w-8 h-8 rounded-full border border-red-500/80 pointer-events-none opacity-0 -translate-x-1/2 -translate-y-1/2"
        style={{
          left: 5,
          top: 1,
        }}
      />

      {/* Cyberpunk Hardware Pointer SVG */}
      <img
        ref={pointerRef}
        src="/cursor-pointer.svg"
        alt=""
        className="w-full h-full object-contain pointer-events-none select-none"
        style={{
          filter: 'drop-shadow(0 0 8px rgba(239, 9, 10, 0.6))',
          transformOrigin: '5px 1px',
        }}
        draggable={false}
      />
    </div>
  )
}

export default memo(Cursor)

