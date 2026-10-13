import { profile } from '@/content/profile'
import './About.css'

export default function About({ style = {} }) {
  return (
    <div id="about" className="about-wrap" style={style}>
      <div className="about-container">
        {/* Top Technical Metadata */}
        <div className="about-header-meta">
          <div className="about-badge">
            <span className="dot" />
            <span>SYSTEM_PROFILE // VERIFIED</span>
          </div>
          <span className="about-sys-id">NODE_ID: {profile.systemId}</span>
        </div>

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
    </div>
  )
}
