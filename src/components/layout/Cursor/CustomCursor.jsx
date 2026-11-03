import { useEffect, useRef, memo } from 'react'

function CustomCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    // Only activate on devices with mouse/touchpad (desktop/laptop)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!mediaQuery.matches) return

    const cursor = cursorRef.current
    if (!cursor) return

    let mouseX = -100
    let mouseY = -100
    let isVisible = false
    let isClicking = false

    const updateTransform = () => {
      // Hotspot offset: tip is at (5, 1) relative to 32x32 bounding box
      const scale = isClicking ? 'scale(0.92)' : 'scale(1)'
      cursor.style.transform = `translate3d(${mouseX - 5}px, ${mouseY - 1}px, 0) ${scale}`
    }

    const onPointerMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!isVisible) {
        isVisible = true
        cursor.style.opacity = '1'
      }
      updateTransform()
    }

    const onMouseDown = () => {
      isClicking = true
      updateTransform()
    }

    const onMouseUp = () => {
      isClicking = false
      updateTransform()
    }

    const onMouseLeave = () => {
      isVisible = false
      cursor.style.opacity = '0'
    }

    const onMouseEnter = () => {
      isVisible = true
      cursor.style.opacity = '1'
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown, { passive: true })
    window.addEventListener('mouseup', onMouseUp, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave, { passive: true })
    document.addEventListener('mouseenter', onMouseEnter, { passive: true })

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
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[999999] opacity-0 will-change-transform select-none transition-opacity duration-150 ease-out"
      style={{
        width: 32,
        height: 32,
      }}
      aria-hidden="true"
    >
      <img
        src="/cursor-pointer.svg"
        alt=""
        className="w-full h-full object-contain pointer-events-none drop-shadow-[0_0_8px_rgba(239,9,10,0.6)]"
        draggable={false}
      />
    </div>
  )
}

export default memo(CustomCursor)

