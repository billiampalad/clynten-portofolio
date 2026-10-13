import { useState, useCallback } from 'react'
import Navbar from '@/components/layout/Navbar/Navbar'
import Hero from '@/components/sections/Hero/Hero'
import Skills from '@/components/sections/Skills/Skills'
import useLocomotiveScroll from '@/hooks/useLocomotiveScroll'
import './App.css'

function App() {
  // Initialize Locomotive Scroll v5 (Lenis powered) with GSAP ScrollTrigger synchronization
  const scrollRef = useLocomotiveScroll()

  const [isNavbarVisible, setIsNavbarVisible] = useState(false)
  const [navbarReveal, setNavbarReveal] = useState(0)
  const [hasNavbarShadow, setHasNavbarShadow] = useState(false)
  const [heroKey, setHeroKey] = useState(0)

  const handleHeroProgress = useCallback((progress) => {
    // Sync Navbar dimming & reveal identically with About in Hero.jsx (0.83 -> 0.95)
    const FADE_START = 0.83
    const FADE_END = 0.95

    if (progress < FADE_START) {
      setIsNavbarVisible(false)
      setNavbarReveal(0)
      setHasNavbarShadow(false)
      document.documentElement.style.setProperty('--navbar-reveal', '0')
    } else if (progress >= FADE_START && progress < FADE_END) {
      setIsNavbarVisible(true)
      // Hermite smoothstep curve matching About reveal in Hero.jsx
      const t = (progress - FADE_START) / (FADE_END - FADE_START)
      const smoothed = t * t * (3 - 2 * t)
      setNavbarReveal(smoothed)
      setHasNavbarShadow(true)
      document.documentElement.style.setProperty('--navbar-reveal', smoothed.toFixed(3))
    } else {
      setIsNavbarVisible(true)
      setNavbarReveal(1)
      setHasNavbarShadow(true)
      document.documentElement.style.setProperty('--navbar-reveal', '1')
    }
  }, [])

  const handleResetToHome = useCallback(() => {
    // 1. Immediately hide navbar, reset dimming, and remove shadow
    setIsNavbarVisible(false)
    setNavbarReveal(0)
    setHasNavbarShadow(false)
    document.documentElement.style.setProperty('--navbar-reveal', '0')

    // 2. Instantly reset window and locomotive scroll to top (0, 0)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    if (scrollRef?.current) {
      if (typeof scrollRef.current.scrollTo === 'function') {
        scrollRef.current.scrollTo(0, { immediate: true })
      } else if (scrollRef.current.lenisInstance) {
        scrollRef.current.lenisInstance.scrollTo(0, { immediate: true })
      }
    }

    // 3. Remount Hero component to trigger clean initial loading state
    setHeroKey((prev) => prev + 1)
  }, [scrollRef])

  return (
    <div className="portfolio-app">
      {/* Global Navigation Bar (Dims and fades in identically with About section) */}
      <Navbar
        isVisible={isNavbarVisible}
        revealProgress={isNavbarVisible ? navbarReveal : 0}
        hasShadow={hasNavbarShadow}
        onHomeClick={handleResetToHome}
      />

      {/* Pure Cinematic Hero Section (Frames + Telemetry + About Backdrop) */}
      <Hero key={heroKey} onProgressChange={handleHeroProgress} />

      {/* Next Section: Skills / Core Architecture Domains & Specs */}
      <Skills />
    </div>
  )
}

export default App