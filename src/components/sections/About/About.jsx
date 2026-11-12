import { useState, useEffect, useCallback, useRef, memo } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import ProfileCard from '@/components/layout/Card/ProfileCard'
import profileAvatar from '@/assets/profile.webp'
import AboutHeadline from './AboutHeadline'
import AboutNarrativeCard from './AboutNarrativeCard'
import AboutActionBar from './AboutActionBar'
import { ABOUT_SECTIONS } from './aboutData'

function About({ style = {} }) {
  const aboutSectionRef = useRef(null)
  const [isLight, setIsLight] = useState(false)
  const [activeTab, setActiveTab] = useState(ABOUT_SECTIONS[0].id)
  const [isAboutInView, setIsAboutInView] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // IntersectionObserver to detect when About section is in view on mobile
  useEffect(() => {
    const target = aboutSectionRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAboutInView(entry.isIntersecting)
      },
      {
        root: null,
        threshold: 0.1,
      }
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  // Lock body scroll and listen for ESC key when modal is open
  useEffect(() => {
    if (isModalOpen) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setIsModalOpen(false)
        }
      }

      window.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.style.overflow = originalOverflow
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [isModalOpen])

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
      ref={aboutSectionRef}
      style={style}
      className={`relative w-full h-full flex items-center justify-center px-4 sm:px-6 md:max-lg:px-[clamp(16px,2.5vw,28px)] md:max-lg:py-[clamp(16px,2.5vh,28px)] lg:px-8 [@media(min-width:1440px)]:px-14 [@media(min-width:1600px)]:px-20 py-16 sm:py-20 [@media(min-width:1440px)]:py-12 overflow-hidden pointer-events-auto transition-colors duration-300 ${
        isLight ? 'bg-[#f8fafc]' : 'bg-[#0A0907]'
      }`}
    >
      <div className="relative z-10 max-w-[1100px] [@media(min-width:1440px)]:max-w-[1440px] [@media(min-width:1600px)]:max-w-[1680px] [@media(min-width:1920px)]:max-w-[1840px] w-full mx-auto grid grid-cols-1 md:max-lg:flex md:max-lg:flex-col md:max-lg:items-center lg:grid-cols-[1fr_280px] [@media(min-width:1440px)]:grid-cols-[1fr_380px] [@media(min-width:1600px)]:grid-cols-[1fr_420px] [@media(min-width:1920px)]:grid-cols-[1fr_460px] gap-8 md:max-lg:gap-[clamp(14px,min(2vw,2vh),22px)] lg:gap-12 [@media(min-width:1440px)]:gap-14 [@media(min-width:1600px)]:gap-16 items-center pointer-events-auto">
        {/* Left Column: Headline + Story Card + Action Bar */}
        <div className="flex flex-col gap-4 sm:gap-5 md:max-lg:gap-[clamp(10px,1.4vh,16px)] md:max-lg:w-full md:max-lg:max-w-[clamp(520px,72vw,760px)] md:max-lg:order-2 lg:order-1 [@media(min-width:1440px)]:gap-8 [@media(min-width:1600px)]:gap-9">
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

        {/* Right Column: 3D Holographic ProfileCard (Hidden on mobile, visible on tablet & desktop) */}
        <div className="hidden md:flex justify-center items-center perspective-[1200px] md:max-lg:order-1 lg:order-2">
          <ProfileCard
            className="md:max-lg:!w-[clamp(260px,min(38vw,42vh),340px)]"
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

      {/* Mobile Floating Profile Avatar Button (Visible only on mobile when About section is in view) */}
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        aria-label="Open profile card modal"
        className={`fixed bottom-[calc(18px+env(safe-area-inset-bottom))] left-4 z-40 md:hidden w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-rose-500 via-rose-400 to-amber-400 shadow-[0_0_18px_rgba(244,63,94,0.5)] transition-all duration-300 active:scale-90 pointer-events-auto ${
          isAboutInView
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
        }`}
      >
        <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-900 border border-black/40">
          <img
            src={profileAvatar}
            alt="Clynten Palad profile avatar"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0A0907] shadow-[0_0_6px_#22c55e]" />
        <span className="sr-only">Open Profile Card</span>
      </button>

      {/* Mobile Profile Modal (Rendered via React Portal to prevent overflow clipping) */}
      {isModalOpen && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md md:hidden transition-opacity duration-300"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Profile Card Modal"
        >
          <div
            className="relative max-w-full flex flex-col items-center animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <div className="w-full flex justify-end mb-2.5">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-rose-500 text-white border border-white/20 transition-colors shadow-lg active:scale-95"
                aria-label="Close Profile Card"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* ProfileCard */}
            <div className="perspective-[1200px] flex justify-center items-center">
              <ProfileCard
                className="!w-[clamp(250px,78vw,290px)]"
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
                onContactClick={(e) => {
                  setIsModalOpen(false)
                  handleContactClick(e)
                }}
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

export default memo(About)