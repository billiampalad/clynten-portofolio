import { useState, useRef, useCallback, lazy, Suspense } from 'react'
import Navbar from '@/components/layout/Navbar/Navbar'
import Hero from '@/components/sections/Hero/Hero'
import useLocomotiveScroll from '@/hooks/useLocomotiveScroll'
import './App.css'

const Skills = lazy(() => import('@/components/sections/Skills/Skills'))
const Projects = lazy(() => import('@/components/sections/Projects/Projects'))

function App() {
  // Initialize Locomotive Scroll v5 (Lenis powered) with GSAP ScrollTrigger synchronization
  const scrollRef = useLocomotiveScroll()

  const [isNavbarVisible, setIsNavbarVisible] = useState(false)
  const [navbarReveal, setNavbarReveal] = useState(0)
  const [heroKey, setHeroKey] = useState(0)

  const isNavbarVisibleRef = useRef(false)
  const handleHeroProgress = useCallback((progress) => {
    // Only reveal Navbar when Hero canvas frame sequence is 100% finished (0% scale at progress >= 0.95)
    const shouldShow = progress >= 0.95
    if (shouldShow !== isNavbarVisibleRef.current) {
      isNavbarVisibleRef.current = shouldShow
      setIsNavbarVisible(shouldShow)
      setNavbarReveal(shouldShow ? 1 : 0)
    }
  }, [])

  const handleResetToHome = useCallback(() => {
    // 1. Immediately hide navbar and reset dimming
    setIsNavbarVisible(false)
    setNavbarReveal(0)
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
        onHomeClick={handleResetToHome}
      />

      {/* Pure Cinematic Hero Section (Frames + Telemetry + About Backdrop) */}
      <Hero key={heroKey} onProgressChange={handleHeroProgress} />

      {/* Next Section: Skills / Core Architecture Domains & Specs */}
      <Suspense fallback={<div className="min-h-screen bg-[#0A0907]" />}>
        <Skills />
      </Suspense>

      {/* Section: Projects (Meer Mohsin Reference: Layered Stacking & Case Studies) */}
      <Suspense fallback={<div className="min-h-screen bg-[#0A0907]" />}>
        <Projects />
      </Suspense>
    </div>
  )
}

export default App