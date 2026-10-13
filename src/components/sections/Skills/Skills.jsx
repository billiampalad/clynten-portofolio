import { profile } from '@/content/profile'
import './Skills.css'

const STATS = [
  { num: '05+', title: 'Engineered Systems', desc: 'Web apps, AI CCTV & Spatial pipelines' },
  { num: '03+', title: 'Years Technical Focus', desc: 'Continuous architecture & codecraft' },
  { num: '12+', title: 'Core Tech Modules', desc: 'React, Next, Kotlin, Python, Linux' },
  { num: '99.8%', title: 'Target Reliability', desc: 'High concurrency & zero downtime' },
]

const DOMAINS = [
  {
    idx: 'DOMAIN // 01',
    tag: 'FULL STACK ARCH',
    title: 'Web & Distributed Systems',
    desc: 'Crafting responsive, high-performance web applications with modular frontend architectures and robust backend services.',
    techs: ['React', 'Next.js', 'Laravel', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
  },
  {
    idx: 'DOMAIN // 02',
    tag: 'MOBILE ECOSYSTEM',
    title: 'Android & Native Solutions',
    desc: 'Building scalable mobile applications utilizing native Android SDK, Kotlin Coroutines, Jetpack Compose, and cross-platform Flutter.',
    techs: ['Kotlin', 'Android SDK', 'Flutter', 'Jetpack Compose', 'REST APIs'],
  },
  {
    idx: 'DOMAIN // 03',
    tag: 'DEFENSE & INFRA',
    title: 'Network & Cyber Security',
    desc: 'Architecting secure network infrastructures, managing Mikrotik and Cisco routing, configuring VLANs/BGP, and enforcing OWASP standards.',
    techs: ['MikroTik', 'Cisco IOS', 'VLAN / BGP', 'OWASP Top 10', 'VPN / TLS 1.3'],
  },
  {
    idx: 'DOMAIN // 04',
    tag: 'INTELLIGENCE & AI',
    title: 'Spatial Data & Machine Learning',
    desc: 'Transforming complex datasets and geospatial imagery into actionable insights using Python data science stack, QGIS, and YOLO vision models.',
    techs: ['Python', 'YOLOv8 Vision', 'QGIS Spatial', 'Pandas', 'Figma UI/UX'],
  },
]

export default function Skills({ style = {} }) {
  return (
    <section id="skills" className="skills-section" style={style}>
      <div className="skills-container">
        {/* Header Metadata */}
        <div className="skills-header-meta">
          <div className="skills-badge">
            <span className="dot" />
            <span>CORE_ARCHITECTURE // DOMAINS</span>
          </div>
          <span className="skills-sys-id">SPEC_ID: {profile.systemId}</span>
        </div>

        {/* Big Headline */}
        <div className="skills-headline-block">
          <div className="skills-tagline">Technical Stack & Competencies</div>
          <h2 className="skills-title">
            Production-grade systems <span className="highlight">engineered for scale</span> and high resilience.
          </h2>
          <p className="skills-description">
            Explore the core technical pillars, verifiable engineering metrics, and specialized stack modules powering modern web architectures, mobile applications, network infrastructure, and spatial AI.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="skills-stats-grid">
          {STATS.map((stat, i) => (
            <div key={i} className="stat-card">
              <div className="stat-top-line" />
              <div className="stat-num">{stat.num}</div>
              <div className="stat-title">{stat.title}</div>
              <div className="stat-desc">{stat.desc}</div>
            </div>
          ))}
        </div>

        {/* Domain Pillars */}
        <div className="skills-pillars-grid">
          {DOMAINS.map((domain, i) => (
            <div key={i} className="pillar-card">
              <div className="pillar-header">
                <span className="pillar-idx">{domain.idx}</span>
                <span className="pillar-tag">{domain.tag}</span>
              </div>
              <h3 className="pillar-title">{domain.title}</h3>
              <p className="pillar-desc">{domain.desc}</p>
              <div className="pillar-techs">
                {domain.techs.map((tech, tIdx) => (
                  <span key={tIdx} className="tech-chip">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
