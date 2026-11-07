import { useState, useEffect, useCallback, memo } from 'react'
import ProfileCard from '@/components/layout/Card/ProfileCard'
import profileAvatar from '@/assets/profile.webp'
import AboutHeadline from './AboutHeadline'
import AboutNarrativeCard from './AboutNarrativeCard'
import AboutActionBar from './AboutActionBar'
import { ABOUT_SECTIONS } from './aboutData'

function About({ style = {} }) {
  const [isLight, setIsLight] = useState(false)
  const [activeTab, setActiveTab] = useState(ABOUT_SECTIONS[0].id)

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

  const handleContactClick = useCallback((e) => {
    if (e?.preventDefault) {
      e.preventDefault()
    }
    const contactSection = document.getElementById('contact')
    if (!contactSection) return

    const currentY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0
    const targetY = Math.max(0, Math.round(contactSection.getBoundingClientRect().top + currentY - 70))

    if (window.__locomotiveScroll?.scrollTo) {
      window.__locomotiveScroll.scrollTo(targetY, { duration: 0.9, immediate: false })
    } else if (window.__lenis?.scrollTo) {
      window.__lenis.scrollTo(targetY, { duration: 0.9 })
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' })
    }
  }, [])

  return (
    <div
      id="about"
      style={style}
      className={`relative w-full h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 [@media(min-width:1440px)]:px-14 [@media(min-width:1600px)]:px-20 py-16 sm:py-20 [@media(min-width:1440px)]:py-12 overflow-hidden pointer-events-auto transition-colors duration-300 ${
        isLight ? 'bg-[#f8fafc]' : 'bg-[#0A0907]'
      }`}
    >
      <div className="relative z-10 max-w-[1100px] [@media(min-width:1440px)]:max-w-[1440px] [@media(min-width:1600px)]:max-w-[1680px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[1fr_280px] [@media(min-width:1440px)]:grid-cols-[1fr_380px] [@media(min-width:1600px)]:grid-cols-[1fr_420px] gap-8 lg:gap-12 [@media(min-width:1440px)]:gap-16 [@media(min-width:1600px)]:gap-20 items-center pointer-events-auto">
        {/* Left Column: Headline + Story Card + Action Bar */}
        <div className="flex flex-col gap-4 sm:gap-5 [@media(min-width:1440px)]:gap-7">
          <AboutHeadline isLight={isLight} />
          <AboutNarrativeCard
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isLight={isLight}
          />
          <AboutActionBar
            onContactClick={handleContactClick}
            isLight={isLight}
          />
        </div>

        {/* Right Column: 3D Holographic ProfileCard */}
        <div className="flex justify-center items-center perspective-[1200px]">
          <ProfileCard
            name=""
            title=""
            handle="clyntenbilliam"
            status="ONLINE"
            contactText="Let's Connect"
            avatarUrl={profileAvatar}
            iconUrl="/assets/demo/code-svgrepo-com.svg"
            patternSize="100% 100%"
            holo={0.8}
            glare={0.6}
            tiltStrength={24}
            parallax={0}
            radius={16}
            enableTilt
            intro={false}
            showUserInfo
            enableMobileTilt={false}
            theme={isLight ? 'light' : 'dark'}
            onContactClick={handleContactClick}
          />
        </div>
      </div>
    </div>
  )
}

export default memo(About)