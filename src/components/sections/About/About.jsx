import { useState, useEffect } from 'react'
import { profile } from '@/content/profile'
import ProfileCard from '@/components/layout/Card/ProfileCard'
import profileAvatar from '@/assets/profile.webp'
import Antigravity from '@/components/layout/Background/Antigravity'
import './About.css'

const ABOUT_SECTIONS = [
  {
    id: 'intro',
    idx: '01',
    title: 'Introduction',
    items: [
      'Aktif dalam organisasi Pelayanan Mahasiswa Pantekosta (PELMAP) di lingkungan kampus.',
      'Memulai sebagai Koordinator Musik, bertanggung jawab mencari dan mengoordinasikan pemain musik untuk setiap kegiatan pelayanan.',
      'Selanjutnya dipercaya menjabat sebagai Wakil Sekretaris (Wasek).',
    ],
  },
  {
    id: 'technical',
    idx: '02',
    title: 'Technical Experience',
    items: [
      'Membantu mengelola kebutuhan administrasi dan alur publikasi kegiatan organisasi.',
      'Membuat tema dan konsep kreatif pamflet/flyer untuk berbagai kegiatan PELMAP.',
      'Membuat materi publikasi visual untuk memperingati hari-hari besar dan momen penting.',
      'Mengatur kebutuhan dan koordinasi tim musik agar kegiatan pelayanan berjalan dengan baik.',
    ],
  },
  {
    id: 'approach',
    idx: '03',
    title: 'Personal Approach',
    items: [
      'Mengembangkan kemampuan kepemimpinan, koordinasi, dan komunikasi efektif melalui pengalaman organisasi.',
      'Menerapkan kreativitas dan inovasi konsep dalam perancangan materi publikasi visual.',
      'Membangun manajemen waktu yang disiplin dan dedikasi tanggung jawab tinggi dalam setiap pelayanan.',
    ],
  },
]

export default function About({ style = {} }) {
  const [isLight, setIsLight] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

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
            {/* Role & Organization Headline */}
            <div className="about-headline-block">
              <div className="about-tagline">ORGANIZATIONAL EXPERIENCE</div>
              <h2 className="about-title">
                Wakil Sekretaris <span className="highlight">— PELMAP</span>
              </h2>
              <div className="about-org-meta">
                <span className="org-name">Pelayanan Mahasiswa Pantekosta</span>
                <span className="org-divider">•</span>
                <span className="org-period">Feb 2025 – Mar 2026</span>
              </div>
            </div>

            {/* Mobile Tab Switcher (Visible on mobile screens) */}
            <div className="about-tab-nav" role="tablist" aria-label="About Sections">
              {ABOUT_SECTIONS.map((sec, idx) => (
                <button
                  key={sec.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === idx}
                  className={`about-tab-btn ${activeTab === idx ? 'tab-active' : ''}`}
                  onClick={() => setActiveTab(idx)}
                >
                  <span className="tab-idx">{sec.idx}</span>
                  <span className="tab-label">{sec.title}</span>
                </button>
              ))}
            </div>

            {/* 3 Structured Sections: Introduction, Technical Experience, Personal Approach */}
            <div className="about-sections-grid">
              {ABOUT_SECTIONS.map((sec, idx) => (
                <div
                  key={sec.id}
                  className={`about-section-card ${activeTab === idx ? 'card-active' : ''}`}
                >
                  <div className="section-card-header">
                    <span className="section-card-idx">{sec.idx}</span>
                    <h3 className="section-card-title">{sec.title}</h3>
                  </div>
                  <ul className="section-card-list">
                    {sec.items.map((item, itemIdx) => (
                      <li key={itemIdx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
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
              theme="dark"
              onContactClick={handleContactClick}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

