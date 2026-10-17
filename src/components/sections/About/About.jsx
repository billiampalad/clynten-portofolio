import { useState, useEffect } from 'react'
import { profile } from '@/content/profile'
import ProfileCard from '@/components/layout/Card/ProfileCard'
import profileAvatar from '@/assets/profile.webp'
import Antigravity from '@/components/layout/Background/Antigravity'
import './About.css'

export default function About({ style = {} }) {
  const [isLight, setIsLight] = useState(false)

  useEffect(() => {
    const checkTheme = () => {
      const isLightTheme =
        document.documentElement.getAttribute('data-theme') === 'light' ||
        document.documentElement.classList.contains('light-theme')
      setIsLight(isLightTheme)
    }

    checkTheme()

    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    })

    return () => observer.disconnect()
  }, [])

  const handleContactClick = () => {
    console.log('Contact clicked')
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div id="about" className="about-wrap" style={style}>
      {/* Antigravity Dynamic Particle Background */}
      <div className="about-antigravity-bg">
        <Antigravity
          colors={["#0065ff", "#ec3a3a", "#5adb43"]}
          count={1500}
          magnetRadius={9}
          ringRadius={7}
          particleSize={0.9}
          autoAnimate
          colorMode="conic"
          colorSpeed={0.05}
          particleShape="capsule"
          particleVariance={1}
          fieldStrength={10}
          waveAmplitude={1}
          waveCount={3}
          waveSpeed={0.4}
          rotationSpeed={0}
          pulseSpeed={3}
          depthFactor={1}
          ambient={0.25}
          lerpSpeed={0.05}
          interactive
          clickBurst
          intro
          lightMode={isLight}
        />
      </div>

      <div className="about-container">

        {/* Main Grid: Headline Info + Interactive 3D Profile Card */}
        <div className="about-grid">
          <div className="about-left-col">
            {/* Technical Identity Headline */}
            <div className="about-headline-block">
              <div className="about-tagline">Architectural Philosophy</div>
              <h2 className="about-title">
                Engineering <span className="highlight">resilient software</span> and intelligent digital infrastructure.
              </h2>
              <p className="about-description">
                Combining full-stack software development, cybersecurity, and computer vision to build
                end-to-end digital solutions that scale seamlessly from local edge hardware to cloud environments.
              </p>
            </div>

            {/* Cyber Telemetry Status Bar & Scroll Hint */}
            <div className="about-telemetry-bar">
              <div className="about-status">
                <span className="status-ping" />
                <span className="status-text">SCAN_STATUS: 100% COMPLETE // IDENTITY_SYNCHRONIZED</span>
              </div>
              <div className="about-scroll-hint">
                <span>SCROLL TO EXPLORE ARCHITECTURE</span>
                <span className="scroll-arrow">↓</span>
              </div>
            </div>
          </div>

          <div className="about-card-wrapper">
            <ProfileCard
              name={profile.name || "Clynten Palad"}
              title={profile.role || "Software Engineer"}
              handle="clyntenbilliam"
              status="Online"
              contactText="Contact"
              avatarUrl={profileAvatar}
              iconUrl="/assets/demo/code-svgrepo-com.svg"
              patternSize="100% 100%"
              holo={0.8}
              glare={0.6}
              tiltStrength={24}
              parallax={0}
              radius={16}
              enableTilt
              intro
              showUserInfo
              enableMobileTilt={false}
              theme="dark"
              onContactClick={handleContactClick}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

