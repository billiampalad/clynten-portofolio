import { useState, useEffect, useCallback, useRef, memo } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun, Mail, Menu, X } from 'lucide-react'
import { ScrollTrigger } from '@/lib/animations/gsap'
import { useHoverScramble, LETTERS } from '@/hooks/useTextScramble'
import './Navbar.css'

const REFERENCE_NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

/**
 * Individual Navbar Item with Hover Red Slide Block
 */
const NavItem = memo(function NavItem({ item, onClick }) {
  return (
    <a
      href={item.href}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noopener noreferrer' : undefined}
      onClick={(e) => onClick(e, item)}
      className="navbar-link nav-item"
    >
      <span className="nav-label">{item.label}</span>
      {item.badge && (
        <span className="nav-badge" aria-label={`Status: ${item.badge}`}>
          {item.badge}
        </span>
      )}
    </a>
  )
})

/**
 * Isolated Brand Component to prevent text-scramble re-renders from cascading to the rest of Navbar
 */
const NavbarBrand = memo(function NavbarBrand({ brandText = 'A — Z', onBrandClick }) {
  const brandParts = brandText.includes('—')
    ? brandText.split('—').map((s) => s.trim())
    : [brandText, '']
  const firstTarget = brandParts[0] || 'A'
  const lastTarget = brandParts[1] || 'Z'

  // Text scramble hooks on hover (Letters only: A-Z)
  const [firstChar, triggerFirst] = useHoverScramble(firstTarget, 30, 7, LETTERS)
  const [lastChar, triggerLast] = useHoverScramble(lastTarget, 30, 9, LETTERS)

  const handleBrandHover = useCallback(() => {
    triggerFirst()
    if (lastTarget) {
      triggerLast()
    }
  }, [triggerFirst, triggerLast, lastTarget])

  return (
    <div className="navbar-left">
      <a
        href="#hero"
        onClick={onBrandClick}
        onMouseEnter={handleBrandHover}
        className="navbar-brand"
        aria-label="Home — Restart from beginning"
      >
        {brandText.includes('—') ? (
          <>
            <span className="brand-char">{firstChar}</span>
            <span className="brand-line" aria-hidden="true" />
            <span className="brand-char">{lastChar}</span>
            <span className="brand-home-badge" aria-hidden="true">
              HOME
            </span>
          </>
        ) : (
          <>
            <span className="brand-char">{firstChar}</span>
            <span className="brand-home-badge" aria-hidden="true">
              HOME
            </span>
          </>
        )}
      </a>
    </div>
  )
})

function Navbar({
  isVisible = true,
  brandText = 'A — Z',
  navItems = REFERENCE_NAV_ITEMS,
  email = 'billiampalad@gmail.com',
  onHomeClick,
}) {
  const [theme, setTheme] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.getAttribute('data-theme') || 'dark'
    }
    return 'dark'
  })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const isScrolledRef = useRef(false)
  const [dismissedTooltip, setDismissedTooltip] = useState(null)

  // Track scroll position to activate bottom blur and border line without layout thrashing
  // Menggunakan histeresis agar tidak terjadi flickering / re-render thrashing di garis batas
  useEffect(() => {
    if (!isVisible) return

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const heroTrigger = ScrollTrigger.getById('hero-trigger')
          const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0

          let nextScrolled = isScrolledRef.current
          if (heroTrigger) {
            // Histeresis: aktif saat melewati heroTrigger.end - 15, padam saat kembali di bawah heroTrigger.end - 75
            if (!isScrolledRef.current && scrollY > heroTrigger.end - 15) {
              nextScrolled = true
            } else if (isScrolledRef.current && scrollY < heroTrigger.end - 75) {
              nextScrolled = false
            }
          } else {
            if (!isScrolledRef.current && scrollY > 60) {
              nextScrolled = true
            } else if (isScrolledRef.current && scrollY < 30) {
              nextScrolled = false
            }
          }

          if (nextScrolled !== isScrolledRef.current) {
            isScrolledRef.current = nextScrolled
            setIsScrolled(nextScrolled)
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isVisible])

  // Toggle dark / light theme immediately without transition animations or border flash
  const handleToggleTheme = (e) => {
    e?.currentTarget?.blur?.()
    setDismissedTooltip('theme')
    const nextTheme = theme === 'dark' ? 'light' : 'dark'

    // Temporarily suppress all transitions across all elements
    const css = document.createElement('style')
    css.appendChild(
      document.createTextNode(
        `*, *::before, *::after {
          -webkit-transition: none !important;
          -moz-transition: none !important;
          -o-transition: none !important;
          -ms-transition: none !important;
          transition: none !important;
        }`
      )
    )
    document.head.appendChild(css)

    setTheme(nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light-theme')
      document.documentElement.classList.remove('dark-theme', 'dark')
    } else {
      document.documentElement.classList.add('dark-theme', 'dark')
      document.documentElement.classList.remove('light-theme')
    }
    localStorage.setItem('portfolio-theme', nextTheme)

    // Force style flush so all theme tokens apply instantly
    window.getComputedStyle(css).opacity

    // Restore transitions on the next frame so interactive hovers continue functioning
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (css.parentNode) {
          css.parentNode.removeChild(css)
        }
      })
    })
  }

  // Handle Home / Brand click to reset website from loading state
  const handleBrandClick = useCallback((e) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    if (onHomeClick) {
      onHomeClick()
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [onHomeClick])

  // Smart landing navigation that navigates accurately to Hero, About, Skills, Projects, Experience, and Contact
  const scrollToSection = useCallback((targetId) => {
    const currentY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0

    // Standardized smooth scroll executor that synchronizes with LocomotiveScroll / Lenis / native scroll
    const executeScroll = (targetY) => {
      if (window.__locomotiveScroll && typeof window.__locomotiveScroll.scrollTo === 'function') {
        window.__locomotiveScroll.scrollTo(targetY, { duration: 0.9, immediate: false })
      } else if (window.__lenis && typeof window.__lenis.scrollTo === 'function') {
        window.__lenis.scrollTo(targetY, { duration: 0.9 })
      } else {
        window.scrollTo({ top: targetY, behavior: 'smooth' })
      }
    }

    // 1. Target: HERO / HOME (Scroll 0)
    if (targetId === 'hero' || targetId === 'home') {
      if (currentY < 35) return
      if (onHomeClick) {
        onHomeClick()
      } else {
        executeScroll(0)
      }
      return
    }

    // 2. Target: ABOUT
    // About is the backdrop reveal layer at the landing end of Hero (timeline progress ~0.98)
    if (targetId === 'about') {
      const heroTrigger = ScrollTrigger.getById('hero-trigger')
      const targetY = heroTrigger
        ? Math.round(heroTrigger.start + (heroTrigger.end - heroTrigger.start) * 0.98)
        : 0

      // Abaikan jika sudah berada di section About (+/- 35px) untuk menghindari CPU/Scroll churn
      if (Math.abs(currentY - targetY) < 35) return
      executeScroll(targetY)
      return
    }

    // 3. Target: SKILLS
    if (targetId === 'skills') {
      const skillsEl = document.getElementById('skills')
      if (!skillsEl) return

      const targetY = Math.max(0, Math.round(skillsEl.getBoundingClientRect().top + currentY - 70))
      if (Math.abs(currentY - targetY) < 35) return
      executeScroll(targetY)
      return
    }

    // 4. Target: PROJECTS
    if (targetId === 'projects') {
      const projectsTrigger = ScrollTrigger.getById('projects-trigger')
      const projectsEl = document.getElementById('projects')

      // Gunakan koordinat start trigger GSAP (progress 0.0) agar langsung terkunci (pin) tepat di scroll 0 tanpa jeda
      const targetY = projectsTrigger
        ? Math.round(projectsTrigger.start)
        : projectsEl
        ? Math.round(projectsEl.getBoundingClientRect().top + currentY)
        : 0

      if (Math.abs(currentY - targetY) < 15) return
      executeScroll(targetY)
      return
    }

    // 5. Target: EXPERIENCE / EXPERIMENTS
    if (targetId === 'experience' || targetId === 'experiments') {
      const projectsTrigger = ScrollTrigger.getById('projects-trigger')
      const expSection =
        document.getElementById('experience') ||
        document.getElementById('experience-section') ||
        document.getElementById('experiments')

      // projectsTrigger.end adalah titik saat scrub selesai, di mana elemen pin (Projects) masih mengisi viewport sebesar 100vh.
      // Tambahkan tinggi pinned stage (pinHeight) agar seksi Projects ter-scroll penuh ke atas dan seksi Experience tampil tepat di viewport.
      const pinHeight = projectsTrigger?.pin?.offsetHeight || window.innerHeight || 0
      const targetY = projectsTrigger
        ? Math.round(projectsTrigger.end + pinHeight)
        : expSection
        ? Math.max(0, Math.round(expSection.getBoundingClientRect().top + currentY))
        : 0

      if (Math.abs(currentY - targetY) < 15) return
      executeScroll(targetY)
      return
    }

    // 6. Target: CONTACT
    if (targetId === 'contact') {
      const contactEl = document.getElementById('contact')
      if (!contactEl) return

      const targetY = Math.max(0, Math.round(contactEl.getBoundingClientRect().top + currentY - 70))
      if (Math.abs(currentY - targetY) < 35) return
      executeScroll(targetY)
      return
    }

    // 7. General Fallback for any other anchor IDs
    const targetEl = document.getElementById(targetId)
    if (targetEl) {
      const targetY = Math.max(0, Math.round(targetEl.getBoundingClientRect().top + currentY - 70))
      if (Math.abs(currentY - targetY) < 35) return
      executeScroll(targetY)
    }
  }, [onHomeClick])

  // Smooth scroll handler for anchor links
  const handleLinkClick = useCallback((e, item) => {
    if (item.external) return

    if (item.href && item.href.startsWith('#')) {
      e.preventDefault()
      const targetId = item.href.slice(1)

      if (item.href === '#contact' || item.label === 'WORK TOGETHER') {
        const contactSection = document.getElementById('contact')
        if (contactSection) {
          scrollToSection('contact')
        } else {
          window.location.href = `mailto:${email}?subject=Collaboration%20Inquiry`
        }
      } else {
        scrollToSection(targetId)
      }

      setIsMobileMenuOpen(false)
    }
  }, [email, scrollToSection])

  const handleContactClick = (e) => {
    e?.currentTarget?.blur?.()
    setDismissedTooltip('mail')
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      e.preventDefault()
      scrollToSection('contact')
    }
    // If no contact section in DOM, default mailto behavior runs
  }

  return (
    <motion.header
      key="portfolio-navbar"
      className={`portfolio-navbar ${isVisible ? 'navbar-visible' : 'navbar-hidden'} ${
        isScrolled ? 'scrolled navbar-scrolled' : ''
      }`}
      initial={false}
      animate={{
        y: isVisible ? 0 : -40,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        pointerEvents: isVisible ? 'auto' : 'none',
        visibility: isVisible ? 'visible' : 'hidden',
      }}
    >
      {/* Dark base underlay matching Hero backdrop (#000000) */}
      <div className="navbar-dark-base" aria-hidden="true" />
      {/* Dynamic theme background matching About */}
      <div className="navbar-theme-bg" aria-hidden="true" />

      {/* Progressive Blur Layer (Light & Dark dual-layer cross-fade matching navbar.html) */}
      <div className="navbar-bottom-blur" aria-hidden="true">
        <div className="blur-layer-light" />
        <div className="blur-layer-dark" />
      </div>

      <div className="navbar-container">
        {/* Left: Brand Identity (Isolated Memo component) */}
        <NavbarBrand brandText={brandText} onBrandClick={handleBrandClick} />

        {/* Center: Desktop Navigation Links (Original Centered Position) */}
        <nav className="navbar-links" aria-label="Main Navigation">
          {navItems.map((item, index) => (
            <NavItem
              key={item.label || index}
              item={item}
              onClick={handleLinkClick}
            />
          ))}
        </nav>

        {/* Right: Actions (Theme Toggle, Contact Mail, Mobile Menu) */}
        <div className="navbar-actions">
          <div
            className={`nav-tooltip-wrapper ${dismissedTooltip === 'theme' ? 'tooltip-dismissed' : ''}`}
            onMouseLeave={() => {
              if (dismissedTooltip === 'theme') setDismissedTooltip(null)
            }}
          >
            <button
              type="button"
              className="nav-icon-btn nav-theme-btn"
              onClick={handleToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun size={16} strokeWidth={1.8} className="theme-icon" />
              ) : (
                <Moon size={16} strokeWidth={1.8} className="theme-icon" />
              )}
            </button>
            <div className="nav-custom-tooltip" role="tooltip" aria-hidden="true">
              <span className="tooltip-text">
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </span>
            </div>
          </div>

          <div
            className={`nav-tooltip-wrapper nav-tooltip-end ${dismissedTooltip === 'mail' ? 'tooltip-dismissed' : ''}`}
            onMouseLeave={() => {
              if (dismissedTooltip === 'mail') setDismissedTooltip(null)
            }}
          >
            <a
              href={`mailto:${email}?subject=Project%20Inquiry`}
              onClick={handleContactClick}
              className="nav-icon-btn nav-mail-btn"
              aria-label="Send email"
            >
              <Mail size={16} strokeWidth={1.8} />
            </a>
            <div className="nav-custom-tooltip" role="tooltip" aria-hidden="true">
              <span className="tooltip-text">Send Email</span>
            </div>
          </div>

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            className="nav-icon-btn nav-mobile-toggle"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X size={18} strokeWidth={1.8} />
            ) : (
              <Menu size={18} strokeWidth={1.8} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Collapsible Drawer Menu */}
      <div className={`navbar-mobile-drawer ${isMobileMenuOpen ? 'drawer-open' : 'drawer-closed'}`}>
        <nav className="mobile-drawer-links" aria-label="Mobile Navigation">
          {navItems.map((item, index) => (
            <a
              key={item.label || index}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              onClick={(e) => handleLinkClick(e, item)}
              className="mobile-nav-item"
            >
              <span className="nav-label">{item.label}</span>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </a>
          ))}
        </nav>
      </div>
    </motion.header>
  )
}

export default memo(Navbar)