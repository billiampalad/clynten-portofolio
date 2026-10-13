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
  const [heroKey, setHeroKey] = useState(0)

  const handleHeroProgress = useCallback((progress) => {
    // Show navbar as the frame begins dimming and revealing the About section
    setIsNavbarVisible(progress >= 0.88)
  }, [])

  const handleResetToHome = useCallback(() => {
    // 1. Immediately hide navbar
    setIsNavbarVisible(false)

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
      {/* Global Navigation Bar (Appears behind/after Hero outro) */}
      <Navbar isVisible={isNavbarVisible} onHomeClick={handleResetToHome} />

      {/* Pure Cinematic Hero Section (Frames + Telemetry + About Backdrop) */}
      <Hero key={heroKey} onProgressChange={handleHeroProgress} />

      {/* Next Section: Skills / Core Architecture Domains & Specs */}
      <Skills />
    </div>
  )
}

export default App