import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '@/content/profile'
import ProfileCard from '@/components/layout/Card/ProfileCard'
import profileAvatar from '@/assets/profile.webp'
import Antigravity from '@/components/layout/Background/Antigravity'
import './About.css'

const SKILLS_ROTATION = [
  'Web Development',
  'Android Dev',
  'Cyber Security',
  'Network - IoT',
  'Database MGMT',
  'UI/UX Design',
]

const ABOUT_SECTIONS = [
  {
    id: 'intro',
    index: '01',
    tag: 'Academic Background & Passion',
    paragraphs: [
      'I am an Informatics graduate from Politeknik Negeri Manado, with a strong interest in web development, full-stack development, and emerging technologies. I enjoy learning how technology works and how software solutions can transform data into practical tools that improve business processes, operational efficiency, and information management.',
    ],
  },
  {
    id: 'experience',
    index: '02',
    tag: 'Networks, Support & Web Systems',
    paragraphs: [
      'My technical experience includes network engineering and computer technical support, where I gained practical exposure to network configuration, connectivity testing, computer assembly, operating system installation, and hardware and software troubleshooting.',
      'Currently, I am collaborating with a fellow developer to design and develop a web-based information system for managing institutional partnerships between Politeknik Negeri Manado and the business and industrial sectors. The project uses Laravel, MySQL, and Tailwind CSS, allowing me to strengthen my understanding of web application development and system design.',
    ],
  },
  {
    id: 'approach',
    index: '03',
    tag: 'Values & Work Ethic',
    paragraphs: [
      'I am a disciplined, responsible, and detail-oriented person who values teamwork, independent problem-solving, and continuous learning. I aim to contribute to an IT team, develop my technical skills, and build reliable software solutions that address real-world needs.',
    ],
  },
]

export default function About({ style = {} }) {
  const [isLight, setIsLight] = useState(false)
  const [activeTab, setActiveTab] = useState('intro')
  const [skillIndex, setSkillIndex] = useState(0)

  // Rotate through 6 core skills every 2.6s
  useEffect(() => {
    const interval = setInterval(() => {
      setSkillIndex((prev) => (prev + 1) % SKILLS_ROTATION.length)
    }, 2600)
    return () => clearInterval(interval)
  }, [])

  const currentSectionIndex = ABOUT_SECTIONS.findIndex((s) => s.id === activeTab)
  const currentSection = ABOUT_SECTIONS[currentSectionIndex] || ABOUT_SECTIONS[0]
  const nextSection = ABOUT_SECTIONS[(currentSectionIndex + 1) % ABOUT_SECTIONS.length]

  useEffect(() => {
    const checkTheme = () => {
      const isLightTheme =
        document.documentElement.getAttribute('data-theme') === 'light' ||
        document.documentElement.classList.contains('light-theme')
      setIsLight(isLightTheme)
    }

    checkTheme()

    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    })

    return () => observer.disconnect()
  }, [])

  const handleContactClick = () => {
    console.log('Contact clicked')
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div id="about" className="about-wrap" style={style}>
      {/* Antigravity Dynamic Particle Background */}
      <div className="about-antigravity-bg">
        <Antigravity
          colors={["#0065ff", "#ec3a3a", "#5adb43"]}
          count={1500}
          magnetRadius={9}
          ringRadius={7}
          particleSize={0.9}
          autoAnimate
          colorMode="conic"
          colorSpeed={0.05}
          particleShape="capsule"
          particleVariance={1}
          fieldStrength={10}
          waveAmplitude={1}
          waveCount={3}
          waveSpeed={0.4}
          rotationSpeed={0}
          pulseSpeed={3}
          depthFactor={1}
          ambient={0.25}
          lerpSpeed={0.05}
          interactive
          clickBurst
          intro
          lightMode={isLight}
        />
      </div>

      <div className="about-container">

        {/* Main Grid: Headline Info + Interactive 3D Profile Card */}
        <div className="about-grid">
          <div className="about-left-col">
            {/* Technical Identity Headline */}
            <div className="about-headline-block">
              <div className="about-tagline">
                <span className="about-tagline-badge">
                  <span className="about-tagline-dot" />
                  <span>IDENTITY // BIO</span>
                </span>
                <span className="about-greeting-text">Hallo, I'm</span>
              </div>

              <div className="about-title-row">
                <h2 className="about-title">
                  Clynten Palad
                </h2>

                <div className="about-role-subline">
                  <span className="about-role-prefix">And I'm a</span>
                  <span className="about-skill-rotator">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={SKILLS_ROTATION[skillIndex]}
                        initial={{ y: 14, opacity: 0, filter: 'blur(3px)' }}
                        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                        exit={{ y: -14, opacity: 0, filter: 'blur(3px)' }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="about-skill-text"
                      >
                        {SKILLS_ROTATION[skillIndex]}
                      </motion.span>
                    </AnimatePresence>
                    <span className="about-cursor-blink" aria-hidden="true">_</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Active Content Card */}
            <div className="about-card-content" key={currentSection.id}>
              <div className="card-content-header">
                <span className="content-badge">
                  {currentSection.index} // {currentSection.tag}
                </span>
              </div>
              <div className="card-content-body">
                {currentSection.paragraphs.map((p, idx) => (
                  <p key={idx} className="about-paragraph">
                    {p}
                  </p>
                ))}
              </div>
              <div className="card-content-footer">
                <div className="card-pagination">
                  {ABOUT_SECTIONS.map((sec) => (
                    <span
                      key={sec.id}
                      onClick={() => setActiveTab(sec.id)}
                      className={`pagination-dot ${activeTab === sec.id ? 'dot-active' : ''}`}
                      title={sec.tag}
                    />
                  ))}
                  <span className="pagination-text">
                    {currentSection.index} / 0{ABOUT_SECTIONS.length}
                  </span>
                </div>
                {nextSection && (
                  <button
                    type="button"
                    onClick={() => setActiveTab(nextSection.id)}
                    className="card-next-btn"
                  >
                    Next →
                  </button>
                )}
              </div>
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

          <div className="about-card-wrapper">
            <ProfileCard
              name={profile.name || "Clynten Palad"}
              title={profile.role || "Software Engineer"}
              handle="clyntenbilliam"
              status="Online"
              contactText="Contact"
              avatarUrl={profileAvatar}
              iconUrl="/assets/demo/code-svgrepo-com.svg"
              patternSize="100% 100%"
              holo={0.8}
              glare={0.6}
              tiltStrength={24}
              parallax={0}
              radius={16}
              enableTilt
              intro
              showUserInfo
              enableMobileTilt={false}
              theme={isLight ? 'light' : 'dark'}
              onContactClick={handleContactClick}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

