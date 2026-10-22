import { useState, useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/animations/gsap'
import { PROJECTS_DATA } from '@/content/projects'
import './Projects.css'

const CIRCUMFERENCE = 219.91 // 2 * PI * 35

export default function Projects() {
  const sectionRef = useRef(null)
  const circleRef = useRef(null)
  const [activeStep, setActiveStep] = useState(1)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // GSAP ScrollTrigger for Layered Card Pinning & Circular Progress Step Indicator
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // ScrollTrigger to update circular step meter based on scroll progress
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 40%',
      end: 'bottom 85%',
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = Math.max(0, Math.min(1, self.progress))

        // 1. Update SVG Circular Progress Meter (Meer Mohsin Section 3.E)
        if (circleRef.current) {
          const offset = CIRCUMFERENCE - progress * CIRCUMFERENCE
          circleRef.current.style.strokeDashoffset = offset
        }

        // 2. Update Active Step Number (01, 02, 03, 04)
        const step = Math.min(
          Math.floor(progress * PROJECTS_DATA.length) + 1,
          PROJECTS_DATA.length
        )
        setActiveStep(step)
      },
    })

    return () => {
      trigger.kill()
    }
  }, [])

  // Close drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsDrawerOpen(false)
      }
    }

    if (isDrawerOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isDrawerOpen])

  const handleOpenDrawer = (project) => {
    setSelectedProject(project)
    setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
  }

  return (
    <section id="projects" ref={sectionRef} className="projects-section">
      <div className="projects-bg-grid" aria-hidden="true" />

      <div className="projects-container">
        {/* Section Header with Meer Mohsin Circular Step Progress */}
        <div className="projects-header">
          <div className="projects-header-left">
            <div className="projects-tagline">
              <span className="projects-tag-dot" />
              <span>ENGINEERED SYSTEMS // WORKS</span>
            </div>

            <h2 className="projects-main-title">
              Featured <span className="highlight-accent">Projects</span>
            </h2>

            <p className="projects-subtitle">
              Showcase of engineered web architectures, edge AI surveillance pipelines, and enterprise network topologies.
            </p>
          </div>

          {/* Section 3.E: Meer Mohsin Circular Progress Step Tracker */}
          <div className="projects-header-right">
            <div className="circle-steps" title={`Step 0${activeStep} of 0${PROJECTS_DATA.length}`}>
              <svg className="circle-steps-svg" viewBox="0 0 86 86">
                <circle className="circle-steps-bg" cx="43" cy="43" r="35" />
                <circle
                  ref={circleRef}
                  className="circle-steps-meter"
                  cx="43"
                  cy="43"
                  r="35"
                />
              </svg>
              <div className="circle-steps-content">
                <h2>0{activeStep}</h2>
                <span>/ 0{PROJECTS_DATA.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3.E: Layered Project Cards Stack */}
        <div className="projects-stack">
          {PROJECTS_DATA.map((project, idx) => (
            <div
              key={project.id}
              className="project-card-wrapper"
              style={{
                zIndex: idx + 2,
              }}
            >
              <article
                className="project-card"
                onClick={() => handleOpenDrawer(project)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleOpenDrawer(project)
                  }
                }}
              >
                <div className="project-card-glow" />

                <div className="project-card-grid">
                  {/* Left Column: Project Metadata & Description */}
                  <div className="project-info-col">
                    <div className="project-meta-row">
                      <span className="project-code-badge">{project.code}</span>
                      <span className="project-status-badge">{project.status}</span>
                    </div>

                    <div>
                      <h3 className="project-card-title">{project.title}</h3>
                      <p className="project-card-subtitle">{project.subtitle}</p>
                    </div>

                    <p className="project-card-summary">{project.summary}</p>

                    {/* Key Metrics */}
                    <div className="project-metrics-grid">
                      {project.metrics.map((metric, mIdx) => (
                        <div key={mIdx} className="metric-item">
                          <span className="metric-val">{metric.val}</span>
                          <span className="metric-label">{metric.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="project-tech-tags">
                      {project.tech.map((t) => (
                        <span key={t} className="project-tech-pill">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Action Button */}
                    <button
                      type="button"
                      className="project-inspect-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOpenDrawer(project)
                      }}
                    >
                      <span>Inspect Case Study</span>
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>

                  {/* Right Column: Architectural Blueprint Wireframe */}
                  <div className="project-preview-col">
                    <div className="preview-blueprint-header">
                      <span className="preview-tag">{project.wireframe.tag}</span>
                      <span className="preview-badge">{project.wireframe.badge}</span>
                    </div>

                    <div className="preview-blueprint-body">
                      <div className="blueprint-circle-radar">
                        <div className="blueprint-inner-core">
                          <span className="blueprint-core-dot" />
                        </div>
                      </div>
                    </div>

                    <div className="preview-blueprint-footer">
                      <span>{project.wireframe.spec}</span>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3.F: Meer Mohsin Case Study Off-Canvas Drawer (clip-path transition) */}
      <div
        className={`case-study-drawer-overlay ${isDrawerOpen ? 'drawer-open' : ''}`}
        onClick={handleCloseDrawer}
        aria-hidden="true"
      />

      <aside
        className={`case-study-drawer ${isDrawerOpen ? 'drawer-open' : ''}`}
        aria-label="Project Case Study Details"
        aria-modal="true"
        role="dialog"
      >
        {selectedProject && (
          <div>
            <div className="drawer-header">
              <div>
                <span className="project-code-badge">{selectedProject.code}</span>
                <span style={{ marginLeft: '12px', fontSize: '11px', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                  {selectedProject.period}
                </span>
              </div>

              <button
                type="button"
                className="drawer-close-btn"
                onClick={handleCloseDrawer}
                aria-label="Close Case Study"
              >
                <span>✕</span>
                <span>CLOSE</span>
              </button>
            </div>

            <h3 className="drawer-title">{selectedProject.title}</h3>
            <p className="drawer-subtitle">{selectedProject.subtitle}</p>

            <div className="drawer-section-block">
              <span className="drawer-section-label">// PROJECT OVERVIEW</span>
              <p className="drawer-text">{selectedProject.caseStudy.overview}</p>
            </div>

            <div className="drawer-section-block">
              <span className="drawer-section-label">// ARCHITECTURAL CHALLENGES</span>
              <ul className="drawer-list">
                {selectedProject.caseStudy.challenges.map((ch, idx) => (
                  <li key={idx} className="drawer-list-item">
                    <span className="drawer-bullet">▸</span>
                    <span>{ch}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="drawer-section-block">
              <span className="drawer-section-label">// ENGINEERED SOLUTIONS</span>
              <ul className="drawer-list">
                {selectedProject.caseStudy.solutions.map((sol, idx) => (
                  <li key={idx} className="drawer-list-item">
                    <span className="drawer-bullet">✓</span>
                    <span>{sol}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="drawer-section-block">
              <span className="drawer-section-label">// SYSTEM DELIVERABLES</span>
              <ul className="drawer-list">
                {selectedProject.caseStudy.deliverables.map((del, idx) => (
                  <li key={idx} className="drawer-list-item">
                    <span className="drawer-bullet">■</span>
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="drawer-section-block">
              <span className="drawer-section-label">// CORE TECHNOLOGIES</span>
              <div className="project-tech-tags">
                {selectedProject.tech.map((t) => (
                  <span key={t} className="project-tech-pill">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </aside>
    </section>
  )
}
