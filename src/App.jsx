import { useState, useCallback } from 'react'
import Navbar from '@/components/layout/Navbar/Navbar'
import Hero from '@/components/sections/Hero/Hero'
import About from '@/components/sections/About/About'
import './App.css'

function App() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false)

  const handleHeroProgress = useCallback((progress) => {
    // Show navbar as the frame begins dimming and revealing the About section
    setIsNavbarVisible(progress >= 0.88)
  }, [])

  return (
    <div className="portfolio-app">
      {/* Global Navigation Bar (Appears behind/after Hero outro) */}
      <Navbar isVisible={isNavbarVisible} />

      {/* Pure Cinematic Hero Section (Frames + Telemetry + Outro Shrink Animation) */}
      <Hero onProgressChange={handleHeroProgress} />

      {/* Next Section: About / System Profile Overview */}
      <About />
    </div>
  )
}

export default App