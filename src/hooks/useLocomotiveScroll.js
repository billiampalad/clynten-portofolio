import { useEffect, useRef } from 'react'
import LocomotiveScroll from 'locomotive-scroll'
import { gsap, ScrollTrigger } from '@/lib/animations/gsap'

const DEFAULT_OPTIONS = {}

/**
 * Custom hook to initialize Locomotive Scroll v5 and seamlessly sync with GSAP ScrollTrigger.
 *
 * @param {Object} customOptions - Optional overrides for LocomotiveScroll / Lenis options.
 * @returns {React.MutableRefObject<LocomotiveScroll|null>}
 */
export function useLocomotiveScroll(customOptions = DEFAULT_OPTIONS) {
  const scrollRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // 1. Configure GSAP ticker lagSmoothing to prevent frame-drop stutter (Meer Mohsin standard)
    gsap.ticker.lagSmoothing(1000, 16)

    // 2. Initialize Locomotive Scroll v5 (Lenis powered) with synchronized GSAP ticker & ScrollTrigger
    const locomotiveScroll = new LocomotiveScroll({
      lenisOptions: {
        wrapper: window,
        content: document.documentElement,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        smoothTouch: false,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        ...(customOptions.lenisOptions || {}),
      },
      scrollCallback: () => {
        ScrollTrigger.update()
      },
      initCustomTicker: (render) => {
        gsap.ticker.add(render)
      },
      destroyCustomTicker: (render) => {
        gsap.ticker.remove(render)
      },
      ...customOptions,
    })

    scrollRef.current = locomotiveScroll
    window.__locomotiveScroll = locomotiveScroll
    window.__lenis = locomotiveScroll.lenisInstance

    return () => {
      if (scrollRef.current) {
        scrollRef.current.destroy()
        scrollRef.current = null
        delete window.__locomotiveScroll
        delete window.__lenis
      }
    }
  }, [customOptions])

  return scrollRef
}

export default useLocomotiveScroll
