import React from 'react'
import Hero from './components/Hero/Hero'
import SkillsMatrix from './components/Skills/SkillsMatrix'
import './App.css'

function App() {
  return (
    <div className="portfolio-app">
      {/* Pure Cinematic Hero Section (Frames + Blur + Pixel Grid + Biometric/Sys-Engine HUD) */}
      <Hero />

      {/* SignalIQ Technical Capability & Skills Telemetry Section */}
      <SkillsMatrix />
    </div>
  )
}

export default App
