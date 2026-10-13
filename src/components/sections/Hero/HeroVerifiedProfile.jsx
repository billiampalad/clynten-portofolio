import { profile } from '@/content/profile'
import './HeroVerifiedProfile.css'

export default function HeroVerifiedProfile() {
  return (
    <div className="hero-verified-wrap">
      <div className="hero-verified-container">
        {/* Top Technical Metadata */}
        <div className="hero-verified-header-meta">
          <div className="hero-verified-badge">
            <span className="dot" />
            <span>SYSTEM_PROFILE // VERIFIED</span>
          </div>
          <span className="hero-verified-sys-id">NODE_ID: {profile.systemId}</span>
        </div>

        {/* Technical Identity Headline */}
        <div className="hero-verified-headline-block">
          <div className="hero-verified-tagline">Architectural Philosophy</div>
          <h2 className="hero-verified-title">
            Engineering <span className="highlight">resilient software</span> and intelligent digital infrastructure.
          </h2>
          <p className="hero-verified-description">
            Combining full-stack software development, cybersecurity, and computer vision to build 
            end-to-end digital solutions that scale seamlessly from local edge hardware to cloud environments.
          </p>
        </div>

        {/* Cyber Telemetry Status Bar & Scroll Hint */}
        <div className="hero-verified-telemetry-bar">
          <div className="hero-verified-status">
            <span className="status-ping" />
            <span className="status-text">SCAN_STATUS: 100% COMPLETE // IDENTITY_SYNCHRONIZED</span>
          </div>
          <div className="hero-verified-scroll-hint">
            <span>SCROLL TO EXPLORE ARCHITECTURE</span>
            <span className="scroll-arrow">↓</span>
          </div>
        </div>
      </div>
    </div>
  )
}
