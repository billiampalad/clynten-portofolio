import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import './App.css'

function App() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false)

  return (
    <div className="portfolio-app">
      {/* Sticky / Transitioning Navbar */}
      <Navbar isVisible={isNavbarVisible} />

      {/* Cinematic Hero Section with Scroll Reveal & Pin */}
      <Hero onRevealComplete={setIsNavbarVisible} />

      {/* Subsequent Portfolio Sections */}
      <main className="portfolio-main">
        {/* About Section */}
        <section id="about" className="portfolio-section">
          <div className="section-container">
            <span className="section-tag">// 01. ABOUT</span>
            <h2 className="section-title">ENGINEERING DIGITAL REALITIES</h2>
            <p className="section-desc">
              Passionate developer specializing in building high-performance modern web applications, 
              interactive 3D graphics, and cinematic user interfaces with extreme attention to detail.
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="portfolio-section">
          <div className="section-container">
            <span className="section-tag">// 02. TECH STACK</span>
            <h2 className="section-title">CORE CAPABILITIES</h2>
            <div className="skills-grid">
              {['React.js', 'Vite', 'Three.js / WebGL', 'GSAP & Motion', 'Tailwind CSS', 'TypeScript', 'Node.js', 'Performance Optimization'].map((skill, i) => (
                <div key={i} className="skill-card">
                  <span className="skill-dot" />
                  <span className="skill-name">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="portfolio-section">
          <div className="section-container">
            <span className="section-tag">// 03. SELECTED WORK</span>
            <h2 className="section-title">FEATURED PROJECTS</h2>
            <div className="projects-grid">
              <div className="project-card">
                <div className="project-header">
                  <span className="project-category">WEB APPLICATION</span>
                  <span className="project-year">2026</span>
                </div>
                <h3 className="project-title">Cinematic Visual Portfolio</h3>
                <p className="project-desc">
                  Interactive scroll-driven hero sequence with 4K canvas rendering, GSAP ScrollTrigger, and cyber matrix overlays.
                </p>
                <div className="project-tags">
                  <span>React</span>
                  <span>GSAP</span>
                  <span>Canvas 2D</span>
                </div>
              </div>

              <div className="project-card">
                <div className="project-header">
                  <span className="project-category">FULL STACK</span>
                  <span className="project-year">2025</span>
                </div>
                <h3 className="project-title">Next-Gen Enterprise Platform</h3>
                <p className="project-desc">
                  Cloud-native management dashboard with real-time analytics and responsive design.
                </p>
                <div className="project-tags">
                  <span>TypeScript</span>
                  <span>Node.js</span>
                  <span>Tailwind</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="portfolio-section contact-section">
          <div className="section-container">
            <span className="section-tag">// 04. GET IN TOUCH</span>
            <h2 className="section-title">LET'S BUILD SOMETHING EXTRAORDINARY</h2>
            <p className="section-desc">
              Have a project in mind or interested in collaboration? Feel free to reach out.
            </p>
            <a href="mailto:contact@clynten.dev" className="btn-primary contact-cta">
              <span>Start a Conversation</span>
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="portfolio-footer">
          <p>© 2026 Clynten Palad. All rights reserved.</p>
        </footer>
      </main>
    </div>
  )
}

export default App
