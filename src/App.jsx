import { useState, useCallback } from 'react'
import Navbar from '@/components/layout/Navbar/Navbar'
import Hero from '@/components/sections/Hero/Hero'
import Skills from '@/components/sections/Skills/Skills'
import useLocomotiveScroll from '@/hooks/useLocomotiveScroll'
import './App.css'

function App() {
  // Initialize Locomotive Scroll v5 (Lenis powered) with GSAP ScrollTrigger synchronization
  useLocomotiveScroll()

  const [isNavbarVisible, setIsNavbarVisible] = useState(false)

  const handleHeroProgress = useCallback((progress) => {
    // Show navbar as the frame begins dimming and revealing the About section
    setIsNavbarVisible(progress >= 0.88)
  }, [])

  return (
    <div className="portfolio-app">
      {/* Global Navigation Bar (Appears behind/after Hero outro) */}
      <Navbar isVisible={isNavbarVisible} />

      {/* Pure Cinematic Hero Section (Frames + Telemetry + About Backdrop) */}
      <Hero onProgressChange={handleHeroProgress} />

      {/* Next Section: Skills / Core Architecture Domains & Specs */}
      <Skills />
    </div>
  )
}

export default App