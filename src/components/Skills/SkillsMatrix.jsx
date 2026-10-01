import React, { useState, useMemo } from 'react'
import { skillsData } from '../../data/skillsData'
import './SkillsMatrix.css'

export default function SkillsMatrix() {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [selectedSkill, setSelectedSkill] = useState(skillsData[0])

  const categories = useMemo(() => {
    return ['ALL', 'DEV & SYSTEMS', 'SECURITY & NETWORK', 'DATA & SPATIAL', 'DESIGN & SUITE']
  }, [])

  const filteredSkills = useMemo(() => {
    if (activeCategory === 'ALL') return skillsData
    return skillsData.filter((s) => s.category === activeCategory)
  }, [activeCategory])

  return (
    <section id="skills" className="skills-matrix-section">
      <div className="skills-ambient-scanline" />

      <div className="skills-container">
        {/* Section Telemetry Header */}
        <div className="skills-header-bar">
          <div className="skills-header-left">
            <div className="skills-badge">
              <span className="badge-square">■</span>
              <span className="badge-text">TELEMETRY // CAPABILITY MATRIX</span>
            </div>
            <h2 className="skills-title">TECHNICAL RADAR & SKILLS</h2>
            <p className="skills-subtitle">
              VERIFIED ARCHITECTURAL COMPETENCIES // MULTI-DOMAIN DEPLOYMENT
            </p>
          </div>

          <div className="skills-header-right">
            <div className="matrix-stat-box">
              <span className="stat-label">TOTAL SIGNALS</span>
              <span className="stat-number">11 / 11</span>
            </div>
            <div className="matrix-stat-box">
              <span className="stat-label">SYSTEM INTEGRITY</span>
              <span className="stat-number green-stat">OPTIMAL</span>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="skills-filter-nav">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-tab-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              <span className="filter-prefix">{activeCategory === cat ? '►' : '::'}</span>
              <span className="filter-name">{cat}</span>
              <span className="filter-count">
                {cat === 'ALL'
                  ? skillsData.length
                  : skillsData.filter((s) => s.category === cat).length}
              </span>
            </button>
          ))}
        </div>

        {/* Main Grid of SignalIQ Skill Cards */}
        <div className="skills-grid">
          {filteredSkills.map((skill) => {
            const isSelected = selectedSkill.id === skill.id
            return (
              <div
                key={skill.id}
                className={`signaliq-skill-card theme-${skill.theme} ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedSkill(skill)}
              >
                {/* HUD Corner Accents */}
                <div className="card-hud-corner top-left" />
                <div className="card-hud-corner top-right" />

                {/* Header Row: Square Indicator + Confidence Status */}
                <div className="card-status-header">
                  <div className="status-indicator-group">
                    <span className={`status-square-icon ${skill.theme}-square`}>■</span>
                    <span className="status-label-text">{skill.status}</span>
                  </div>
                  <span className="skill-index-code">{skill.code}</span>
                </div>

                {/* Skill Name */}
                <div className="skill-name-row">
                  <h3 className="skill-main-name">{skill.name}</h3>
                  <span className="skill-badge-category">{skill.category}</span>
                </div>

                {/* SignalIQ Tabular Telemetry with Left Vertical Line */}
                <div className="card-telemetry-body">
                  <div className={`vertical-accent-line ${skill.theme}-line`} />
                  <div className="telemetry-table-rows">
                    <div className="telemetry-row">
                      <span className="t-label">CONFIDENCE</span>
                      <span className={`t-data highlight-${skill.theme}`}>{skill.confidence}</span>
                    </div>
                    <div className="telemetry-row">
                      <span className="t-label">STACK / TOOL</span>
                      <span className="t-data truncate-text">{skill.techStack}</span>
                    </div>
                    <div className="telemetry-row">
                      <span className="t-label">LATENCY</span>
                      <span className="t-data">{skill.latency}</span>
                    </div>
                  </div>
                </div>

                {/* Signal Level Waveform / Progress Gauge */}
                <div className="skill-gauge-wrapper">
                  <div className="gauge-label-row">
                    <span className="gauge-name">SIGNAL STRENGTH</span>
                    <span className="gauge-value">{skill.signalLevel}%</span>
                  </div>
                  <div className="gauge-track">
                    <div
                      className={`gauge-fill ${skill.theme}-fill`}
                      style={{ width: `${skill.signalLevel}%` }}
                    />
                  </div>
                </div>

                {/* Bottom HUD Bracket */}
                <div className={`card-bottom-bracket ${skill.theme}-bracket`} />
              </div>
            )
          })}
        </div>

        {/* Interactive Detailed Telemetry Inspection Drawer / Focus Card */}
        {selectedSkill && (
          <div className={`skill-inspection-panel theme-${selectedSkill.theme}`}>
            <div className="inspect-header">
              <div className="inspect-title-group">
                <span className="inspect-bullet">► [SIGNAL_INSPECTOR]</span>
                <h4 className="inspect-title">{selectedSkill.name}</h4>
              </div>
              <div className="inspect-meta-tags">
                <span className="inspect-tag">{selectedSkill.category}</span>
                <span className="inspect-tag status-tag">{selectedSkill.status}</span>
              </div>
            </div>

            <div className="inspect-content-grid">
              <div className="inspect-col">
                <span className="inspect-field-title">CAPABILITY & SYNOPSIS</span>
                <p className="inspect-desc">{selectedSkill.description}</p>
              </div>
              <div className="inspect-col">
                <span className="inspect-field-title">TECHNOLOGY STACK / PLATFORMS</span>
                <div className="inspect-stack-chips">
                  {selectedSkill.techStack.split(' / ').map((t, idx) => (
                    <span key={idx} className="tech-chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
