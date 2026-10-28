import { useState, useEffect } from 'react'
import { profile } from '@/content/profile'
import ProfileCard from '@/components/layout/Card/ProfileCard'
import profileAvatar from '@/assets/profile.webp'
import Antigravity from '@/components/layout/Background/Antigravity'
import TechIcon from '@/components/sections/Skills/TechIcon'
import './About.css'

const PROJECT_TECH_STACK = [
  { name: 'React', key: 'react' },
  { name: 'Vite', key: 'vite' },
  { name: 'Tailwind CSS', key: 'tailwind' },
  { name: 'Three.js', key: 'threejs' },
  { name: 'GSAP', key: 'gsap' },
  { name: 'Framer Motion', key: 'framermotion' },
]

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
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  // Typing and Deleting Effect (Typewriter)
  useEffect(() => {
    const currentWord = SKILLS_ROTATION[skillIndex]
    let timer

    if (!isDeleting) {
      if (displayedText.length < currentWord.length) {
        // Ketik karakter demi karakter
        timer = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1))
        }, 90)
      } else {
        // Teks selesai diketik, jeda sebelum mulai menghapus
        timer = setTimeout(() => {
          setIsDeleting(true)
        }, 1800)
      }
    } else {
      if (displayedText.length > 0) {
        // Hapus karakter demi karakter
        timer = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length - 1))
        }, 45)
      } else {
        // Teks selesai dihapus, jeda sejenak lalu ganti ke teks berikutnya
        timer = setTimeout(() => {
          setIsDeleting(false)
          setSkillIndex((prev) => (prev + 1) % SKILLS_ROTATION.length)
        }, 320)
      }
    }

    return () => clearTimeout(timer)
  }, [displayedText, isDeleting, skillIndex])

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
                  <span>About</span>
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
                    <span className="about-skill-text">
                      {displayedText}
                    </span>
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

            {/* Project Tech Stack & Actions Bar */}
            <div className="about-action-bar">
              {/* Left Side: Tech Stack Icons used in this project */}
              <div className="about-tech-stack">
                <span className="about-tech-label">Built with:</span>
                <div className="about-tech-icons">
                  {PROJECT_TECH_STACK.map((tech) => (
                    <div
                      key={tech.key}
                      className="about-tech-item"
                      title={tech.name}
                      aria-label={tech.name}
                    >
                      <TechIcon name={tech.key} className="about-tech-icon" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side: Action Buttons & LinkedIn */}
              <div className="about-action-group">
                <a
                  href="#contact"
                  className="about-btn about-btn-primary"
                  onClick={(e) => {
                    const el = document.getElementById('contact')
                    if (el) {
                      e.preventDefault()
                      el.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                >
                  <span>Get in touch</span>
                  <span className="btn-arrow" aria-hidden="true">→</span>
                </a>

                <a
                  href="/assets/CV%20ATS%20-%20CLYNTEN%20BILLIAM%20PALAD.pdf"
                  download="CV ATS - CLYNTEN BILLIAM PALAD.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-btn about-btn-secondary"
                  title="Download Resume (ATS Format)"
                >
                  <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
                    <polyline points="7 10 12 15 17 10" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="12" y1="15" x2="12" y2="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Download Resume</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/clynten-palad-915a41432"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-icon-btn"
                  title="Connect on LinkedIn"
                  aria-label="LinkedIn Profile"
                >
                  <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="about-card-wrapper">
            <ProfileCard
              name=""
              title=""
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