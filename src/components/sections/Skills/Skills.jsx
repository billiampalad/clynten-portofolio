import { useEffect, useRef, memo } from 'react'
import { motion, useInView } from 'framer-motion'
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
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
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
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
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
    y: 35,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const STATS = [
  { num: '05+', title: 'Engineered Systems', desc: 'Enterprise Web, AI Vision, BGP Routing & WebGIS' },
  { num: '03+', title: 'Years Technical Focus', desc: 'Continuous architecture & system deployment' },
  { num: '25+', title: 'Core Tech Modules', desc: 'Laravel, Python, YOLOv8, PyTorch, Cisco, Leaflet' },
  { num: '95%', title: 'Target Reliability', desc: '96% ACID integrity & sub-35ms inference' },
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

const SkillDomainCard = memo(function SkillDomainCard({ domain }) {
  const cardRef = useRef(null)
  const numRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.15 })
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimatedRef.current) return
    hasAnimatedRef.current = true

    const target = domain.confidenceVal || 80

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (numRef.current) {
        numRef.current.textContent = `${target}%`
      }
      return
    }

    const duration = 1200
    const startTime = performance.now()
    let rafId = 0

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      const currentCount = Math.round(easeProgress * target)

      if (numRef.current) {
        numRef.current.textContent = `${currentCount}%`
      }

      if (progress < 1) {
        rafId = requestAnimationFrame(updateCount)
      } else if (numRef.current) {
        numRef.current.textContent = `${target}%`
      }
    }

    rafId = requestAnimationFrame(updateCount)

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
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
          <span ref={numRef} className="pillar-metric-num">
            {domain.confidence}
          </span>
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
})

function Skills({ style = {} }) {
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

export default memo(Skills)

