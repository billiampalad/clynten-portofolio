import { profile } from '@/content/profile'
import './About.css'

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

export default function About({ isBackdrop = false, style = {} }) {
  return (
    <section
      {...(!isBackdrop ? { id: 'about' } : {})}
      className={`about-section ${isBackdrop ? 'about-backdrop-mode' : ''}`}
      style={style}
    >
      <div className="about-container">
        {/* Header Metadata */}
        <div className="about-header-meta">
          <div className="about-badge">
            <span className="dot" />
            <span>SYSTEM_PROFILE // VERIFIED</span>
          </div>
          <span className="about-sys-id">NODE_ID: {profile.systemId}</span>
        </div>

        {/* Big Headline */}
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

        {/* Stats Grid */}
        <div className="about-stats-grid">
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
        <div className="about-pillars-grid">
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
