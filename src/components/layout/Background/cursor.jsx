import { useEffect, useRef, memo } from 'react'
import { gsap } from '@/lib/animations/gsap'

/**
 * Custom Hardware-Accelerated Cyberpunk Mecha Cursor
 * - Precision Tip: Hotspot di (5px, 1px) tepat pada ujung SVG cursor-pointer.svg
 * - Trailing Aura Ring: Smooth fluid inertia follower dengan GSAP quickTo
 * - Click Shockwave: Pulse ripple yang memancar dari koordinat klik
 * - Zero React re-renders: 100% direct GPU compositing via GSAP & requestAnimationFrame
 */
function Cursor() {
  const pointerRef = useRef(null)
  const followerRef = useRef(null)
  const rippleRef = useRef(null)

  useEffect(() => {
    // Abaikan hanya jika perangkat murni sentuh (misal smartphone tanpa mouse)
    const isTouchOnly =
      window.matchMedia('(pointer: coarse)').matches &&
      !window.matchMedia('(any-pointer: fine)').matches
    if (isTouchOnly) return

    const pointer = pointerRef.current
    const follower = followerRef.current
    const ripple = rippleRef.current
    if (!pointer || !follower) return

    // Offset koordinat fisik pointer SVG (ujung tip berada di 5px, 1px dari bounding box 32x32)
    const TIP_X = 5
    const TIP_Y = 1

    // Posisi inisial di luar viewport sebelum kursor masuk
    gsap.set([pointer, follower], {
      xPercent: 0,
      yPercent: 0,
      x: -100,
      y: -100,
      opacity: 0,
      force3D: true,
    })

    if (ripple) {
      gsap.set(ripple, {
        xPercent: -50,
        yPercent: -50,
        scale: 0,
        opacity: 0,
        force3D: true,
      })
    }

    // 1. Snappy Precision Tracker untuk Pointer SVG (responsif seketika, no mouse lag)
    const pointerX = gsap.quickTo(pointer, 'x', { duration: 0.05, ease: 'power1.out' })
    const pointerY = gsap.quickTo(pointer, 'y', { duration: 0.05, ease: 'power1.out' })

    // 2. Fluid Trailing Inertia untuk Aura Follower (menghasilkan efek melayang sinematik)
    const followerX = gsap.quickTo(follower, 'x', { duration: 0.22, ease: 'power2.out' })
    const followerY = gsap.quickTo(follower, 'y', { duration: 0.22, ease: 'power2.out' })

    let isVisible = false
    let isHovering = false

    // Handler Pergerakan Kursor (Pointer / Mouse)
    const onMove = (e) => {
      // Abaikan jika event berasal dari sentuhan layar
      if (e.pointerType === 'touch') return

      const clientX = e.clientX
      const clientY = e.clientY

      if (!isVisible) {
        isVisible = true
        gsap.to([pointer, follower], {
          opacity: 1,
          duration: 0.2,
          ease: 'power2.out',
        })
      }

      // Pointer SVG tepat di ujung tip (clientX - TIP_X, clientY - TIP_Y)
      pointerX(clientX - TIP_X)
      pointerY(clientY - TIP_Y)

      // Follower ring berpusat tepat di koordinat mouse (clientX, clientY)
      followerX(clientX)
      followerY(clientY)

      // Deteksi elemen interaktif di bawah kursor
      const target = e.target
      const isInteractive = target && target.closest?.(
        'a, button, [role="button"], input, textarea, select, .cursor-pointer, [data-cursor-interactive]'
      )

      if (isInteractive && !isHovering) {
        isHovering = true
        gsap.to(follower, {
          scale: 1.6,
          borderColor: 'rgba(239, 68, 68, 0.95)',
          backgroundColor: 'rgba(239, 68, 68, 0.15)',
          boxShadow: '0 0 16px rgba(239, 68, 68, 0.5)',
          duration: 0.25,
          ease: 'power2.out',
        })
        gsap.to(pointer, {
          scale: 1.15,
          filter: 'drop-shadow(0 0 12px rgba(255, 26, 26, 0.95))',
          duration: 0.2,
          ease: 'power2.out',
        })
      } else if (!isInteractive && isHovering) {
        isHovering = false
        gsap.to(follower, {
          scale: 1.0,
          borderColor: 'rgba(239, 68, 68, 0.45)',
          backgroundColor: 'rgba(239, 68, 68, 0.05)',
          boxShadow: '0 0 8px rgba(239, 68, 68, 0.2)',
          duration: 0.25,
          ease: 'power2.out',
        })
        gsap.to(pointer, {
          scale: 1.0,
          filter: 'drop-shadow(0 0 8px rgba(239, 9, 10, 0.6))',
          duration: 0.2,
          ease: 'power2.out',
        })
      }
    }

    // Handler Klik Mouse (Down: Recoil & Ripple Shockwave)
    const onMouseDown = (e) => {
      if (e.pointerType === 'touch') return

      // Efek recoil pointer saat klik
      gsap.to(pointer, {
        scale: isHovering ? 0.98 : 0.85,
        rotate: -6,
        duration: 0.1,
        ease: 'power3.out',
      })

      // Efek kompresi follower aura
      gsap.to(follower, {
        scale: isHovering ? 1.3 : 0.75,
        duration: 0.1,
        ease: 'power3.out',
      })

      // Efek Shockwave Pulse Ring dari titik klik
      if (ripple) {
        gsap.killTweensOf(ripple)
        gsap.set(ripple, {
          x: e.clientX,
          y: e.clientY,
          scale: 0.2,
          opacity: 0.9,
        })
        gsap.to(ripple, {
          scale: 2.8,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
        })
      }
    }

    // Handler Lepas Klik Mouse (Up: Snap Back)
    const onMouseUp = (e) => {
      if (e.pointerType === 'touch') return

      gsap.to(pointer, {
        scale: isHovering ? 1.15 : 1.0,
        rotate: 0,
        duration: 0.25,
        ease: 'back.out(2.5)',
      })

      gsap.to(follower, {
        scale: isHovering ? 1.6 : 1.0,
        duration: 0.25,
        ease: 'back.out(2)',
      })
    }

    // Handler Batas Viewport
    const onMouseLeave = () => {
      isVisible = false
      gsap.to([pointer, follower], {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.out',
      })
    }

    const onMouseEnter = () => {
      isVisible = true
      gsap.to([pointer, follower], {
        opacity: 1,
        duration: 0.2,
        ease: 'power2.out',
      })
    }

    // Pasang listeners dengan kombinasi pointer & mouse agar kompatibel di semua desktop/laptop
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown, { passive: true })
    window.addEventListener('mouseup', onMouseUp, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave, { passive: true })
    document.addEventListener('mouseenter', onMouseEnter, { passive: true })

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
    }
  }, [])

  return (
    <>
      {/* 1. Ripple Shockwave Ring saat Klik */}
      <div
        ref={rippleRef}
        className="fixed top-0 left-0 pointer-events-none z-[999997] w-10 h-10 rounded-full border border-red-500 will-change-transform select-none"
        aria-hidden="true"
      />

      {/* 2. Fluid Trailing Aura Follower Ring */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 pointer-events-none z-[999998] w-8 h-8 rounded-full border border-red-500/45 bg-red-500/5 shadow-[0_0_8px_rgba(239,68,68,0.2)] -translate-x-1/2 -translate-y-1/2 will-change-transform select-none"
        aria-hidden="true"
      />

      {/* 3. Hardware Precision Pointer SVG */}
      <div
        ref={pointerRef}
        className="fixed top-0 left-0 pointer-events-none z-[999999] will-change-transform select-none"
        style={{
          width: 32,
          height: 32,
        }}
        aria-hidden="true"
      >
        <img
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
    </>
  )
}

export default memo(Cursor)
