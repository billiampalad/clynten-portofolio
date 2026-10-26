import { useState, useEffect, useRef } from 'react'
import { profile } from '@/content/profile'
import { SKILLS_CONFIG } from '@/content/skills'
import TechIcon from './TechIcon'
import './Skills.css'

const STATS = [
  { num: '05+', title: 'Engineered Systems', desc: 'Web apps, AI CCTV & Spatial pipelines' },
  { num: '03+', title: 'Years Technical Focus', desc: 'Continuous architecture & codecraft' },
  { num: '12+', title: 'Core Tech Modules', desc: 'React, Next, Kotlin, Python, Linux' },
  { num: '88.8%', title: 'Target Reliability', desc: 'High concurrency & zero downtime' },
]

const DOMAIN_DETAILS = {
  webdev: {
    title: 'Web & Distributed Systems',
    desc: 'Crafting responsive, high-performance web applications with modular frontend architectures and robust backend services.',
    techs: ['React', 'Next.js', 'Laravel', 'Alpine.js', 'Streamlit', 'Node.js', 'MySQL', 'Vite', 'Tailwind CSS'],
  },
  android: {
    title: 'Android & Native Solutions',
    desc: 'Building scalable mobile applications utilizing native Android SDK, Kotlin Coroutines, Jetpack Compose, and cross-platform Flutter.',
    techs: ['Kotlin', 'Android SDK', 'Flutter', 'React Native', 'REST APIs'],
  },
  cyber: {
    title: 'Cyber Security & Hardening',
    desc: 'Conducting vulnerability assessments, penetration testing, threat modeling, network traffic analysis, and OWASP defense hardening.',
    techs: ['Kali Linux', 'Nmap', 'Wireshark', 'OpenVAS'],
  },
  net: {
    title: 'Network & IoT Engineering',
    desc: 'Designing and deploying enterprise routing topologies, managed switching, VLAN segmentation, BGP/OSPF peering, and IoT micro-controllers.',
    techs: ['Cisco', 'MikroTik', 'Routing', 'Switching', 'BGP', 'OSPF', 'VLAN', 'Subnetting'],
  },
  db: {
    title: 'Database Management Systems',
    desc: 'Architecting resilient relational schemas, indexing strategies, ACID transactional integrity, and scalable distributed storage engines.',
    techs: ['MySQL', 'SQL', 'NoSQL', 'Database'],
  },
  uiux: {
    title: 'UI/UX & Design Systems',
    desc: 'Crafting intuitive user interfaces, comprehensive Figma design systems, rapid interactive wireframes, and fluid product journeys.',
    techs: ['Figma', 'Prototype', 'UI/UX'],
  },
}

const DOMAINS = SKILLS_CONFIG.map((skill, index) => {
  const details = DOMAIN_DETAILS[skill.id] || {}
  const rawConfidence = skill.resolved?.confidence || '80%'
  const confidenceVal = parseInt(rawConfidence.replace('%', ''), 10) || 80

  return {
    id: skill.id,
    idx: `SKILLS // 0${index + 1}`,
    tag: skill.resolved?.stackId || skill.tag,
    title: details.title || skill.resolved?.header || 'Skill Domain',
    desc: details.desc || '',
    confidence: rawConfidence,
    confidenceVal,
    latency: skill.resolved?.latency || 'OPTIMIZED — 0.02ms',
    techs: details.techs || [],
  }
})

function SkillDomainCard({ domain }) {
  const [count, setCount] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !isInView) {
          setIsInView(true)

          const target = domain.confidenceVal || 80
          const duration = 1400
          const startTime = performance.now()

          const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const easeProgress = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(easeProgress * target))

            if (progress < 1) {
              requestAnimationFrame(updateCount)
            } else {
              setCount(target)
            }
          }

          requestAnimationFrame(updateCount)
        }
      },
      { threshold: 0.15 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [isInView, domain.confidenceVal])

  return (
    <div ref={cardRef} className="pillar-card">
      {/* Card Header: Index, Stack Tag, and Dynamic Metric Badge */}
      <div className="pillar-header">
        <div className="pillar-header-left">
          <span className="pillar-idx">{domain.idx}</span>
          <span className="pillar-tag">{domain.tag}</span>
        </div>
        <div className="pillar-metric-badge" title={`Confidence: ${domain.confidence}`}>
          <span className="pillar-metric-dot" />
          <span className="pillar-metric-num">{count}%</span>
        </div>
      </div>

      {/* Cyber Telemetry / Progress Gauge */}
      <div className="pillar-telemetry">
        <div className="pillar-telemetry-meta">
          <span className="pillar-telemetry-label">PROFICIENCY // CONFIDENCE</span>
          <span className="pillar-telemetry-latency">{domain.latency}</span>
        </div>
        <div className="pillar-gauge-track">
          <div
            className="pillar-gauge-fill"
            style={{
              width: isInView ? `${domain.confidenceVal}%` : '0%',
              transition: 'width 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div className="pillar-gauge-glow" />
          </div>
        </div>
      </div>

      {/* Domain Title & Description */}
      <h3 className="pillar-title">{domain.title}</h3>
      <p className="pillar-desc">{domain.desc}</p>

      {/* Tech Stack Chips with Brand Icons */}
      <div className="pillar-techs">
        {domain.techs.map((tech, tIdx) => (
          <span key={tIdx} className="tech-chip">
            <TechIcon name={tech} />
            <span>{tech}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Skills({ style = {} }) {
  return (
    <section id="skills" className="skills-section" style={style}>
      {/* Big Headline */}
      <div className="skills-headline-block">
        {/* Header Metadata */}
        <div className="skills-header-meta">
          <div className="skills-header-left">
            <div className="skills-badge">
              <span className="dot" />
              <span>Skills</span>
            </div>
            <span className="skills-tagline">Technical Stack & Competencies</span>
          </div>
          <span className="skills-sys-id">SPEC_ID: {profile.systemId}</span>
        </div>
        <h2 className="skills-title">
          Production-grade systems <span className="highlight">engineered for scale</span> and high resilience.
        </h2>
        <p className="skills-description">
          Explore the core technical pillars, verifiable engineering metrics, and specialized stack modules powering modern web architectures, mobile applications, network infrastructure, and cybersecurity.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="skills-stats-grid">
        {STATS.map((stat, i) => (
          <div key={i} className="stat-card">
            <div className="stat-num">{stat.num}</div>
            <div className="stat-title">{stat.title}</div>
            <div className="stat-desc">{stat.desc}</div>
          </div>
        ))}
      </div>

      {/* Domain Pillars (Synchronized with skills.js) */}
      <div className="skills-pillars-grid">
        {DOMAINS.map((domain, i) => (
          <SkillDomainCard key={domain.id || i} domain={domain} />
        ))}
      </div>
    </section>
  )
}
