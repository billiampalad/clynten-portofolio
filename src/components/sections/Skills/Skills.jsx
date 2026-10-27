import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { profile } from '@/content/profile'
import { SKILLS_CONFIG } from '@/content/skills'
import TechIcon from './TechIcon'
import './Skills.css'

/**
 * Animation variants for smooth bottom-to-top entrance (staggered)
 */
const headlineContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

const itemFadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 35,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const statsGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
}

const statCardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const pillarsGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
}

const pillarCardVariants = {
  hidden: {
    opacity: 0,
    y: 45,
    scale: 0.98,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const STATS = [
  { num: '04+', title: 'Engineered Systems', desc: 'Enterprise Web, AI Vision, BGP Routing & WebGIS' },
  { num: '03+', title: 'Years Technical Focus', desc: 'Continuous architecture & system deployment' },
  { num: '25+', title: 'Core Tech Modules', desc: 'Laravel, Python, YOLOv8, PyTorch, Cisco, Leaflet' },
  { num: '94.5%', title: 'Target Reliability', desc: '95% ACID integrity & sub-35ms inference' },
]

const DOMAIN_DETAILS = {
  webdev: {
    title: 'Web & Distributed Systems',
    desc: 'Crafting responsive, high-performance web applications with modular frontend architectures and robust backend services.',
    techs: ['React', 'Next.js', 'Laravel', 'Alpine.js', 'Python', 'Streamlit', 'PyTorch', 'Node.js', 'MySQL', 'Vite', 'Tailwind CSS'],
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
    <motion.div
      ref={cardRef}
      className="pillar-card"
      variants={pillarCardVariants}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
    >
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
    </motion.div>
  )
}

export default function Skills({ style = {} }) {
  return (
    <section id="skills" className="skills-section relative" style={style}>
      {/* Big Headline */}
      <motion.div
        className="skills-headline-block relative z-10"
        variants={headlineContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Header Metadata */}
        <motion.div variants={itemFadeUpVariants} className="skills-header-meta">
          <div className="skills-header-left">
            <div className="skills-badge">
              <span className="dot" />
              <span>Skills</span>
            </div>
            <span className="skills-tagline">Technical Stack & Competencies</span>
          </div>
          <span className="skills-sys-id">SPEC_ID: {profile.systemId}</span>
        </motion.div>
        <motion.h2 variants={itemFadeUpVariants} className="skills-title">
          Production-grade systems <span className="highlight">engineered for scale</span> and high resilience.
        </motion.h2>
        <motion.p variants={itemFadeUpVariants} className="skills-description">
          Explore the core technical pillars, verifiable engineering metrics, and specialized stack modules powering modern web architectures, mobile applications, network infrastructure, and cybersecurity.
        </motion.p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="skills-stats-grid relative z-10"
        variants={statsGridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {STATS.map((stat, i) => (
          <motion.div
            key={i}
            className="stat-card"
            variants={statCardVariants}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
          >
            <div className="stat-num">{stat.num}</div>
            <div className="stat-title">{stat.title}</div>
            <div className="stat-desc">{stat.desc}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Domain Pillars (Synchronized with skills.js) */}
      <motion.div
        className="skills-pillars-grid relative z-10"
        variants={pillarsGridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
      >
        {DOMAINS.map((domain, i) => (
          <SkillDomainCard key={domain.id || i} domain={domain} />
        ))}
      </motion.div>
    </section>
  )
}
