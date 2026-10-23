import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun, Mail, Menu, X } from 'lucide-react'
import { gsap, ScrollTrigger } from '@/lib/animations/gsap'
import { useHoverScramble, LETTERS } from '@/hooks/useTextScramble'
import './Navbar.css'

const REFERENCE_NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#' },
  { label: 'Contact', href: '#' },
]

/**
 * Individual Navbar Item with Hover Red Slide Block
 */
function NavItem({ item, onClick }) {
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
}

export default function Navbar({
  isVisible = true,
  brandText = 'A — Z',
  navItems = REFERENCE_NAV_ITEMS,
  email = 'billiampalad@gmail.com',
  onHomeClick,
  revealProgress = 1,
}) {
  const [theme, setTheme] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.getAttribute('data-theme') || 'dark'
    }
    return 'dark'
  })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [dismissedTooltip, setDismissedTooltip] = useState(null)

  // Track scroll position to activate bottom blur and border line (matching navbar.html)
  // Default saat di About / top: garis dan blur tidak aktif.
  // Aktif hanya ketika user melakukan scroll meninggalkan About (rect.top < -15).
  useEffect(() => {
    const handleScroll = () => {
      const aboutEl = document.getElementById('about')
      if (aboutEl) {
        const rect = aboutEl.getBoundingClientRect()
        setIsScrolled(rect.top < -15)
      } else {
        const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0
        setIsScrolled(scrollY > 15)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    if (typeof gsap !== 'undefined' && gsap.ticker) {
      gsap.ticker.add(handleScroll)
    }

    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (typeof gsap !== 'undefined' && gsap.ticker) {
        gsap.ticker.remove(handleScroll)
      }
    }
  }, [])

  // Parse brand text (e.g. 'A — Z' -> 'A' and 'Z')
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

  // Smart landing navigation that navigates accurately to Hero, About, Skills, and Projects
  const scrollToSection = useCallback((targetId) => {
    // 1. Target: HERO / HOME (Scroll 0)
    if (targetId === 'hero' || targetId === 'home') {
      if (onHomeClick) {
        onHomeClick()
      } else if (window.__locomotiveScroll && typeof window.__locomotiveScroll.scrollTo === 'function') {
        window.__locomotiveScroll.scrollTo(0, { duration: 1.2, immediate: false })
      } else if (window.__lenis && typeof window.__lenis.scrollTo === 'function') {
        window.__lenis.scrollTo(0, { duration: 1.2 })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
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

      if (window.__locomotiveScroll && typeof window.__locomotiveScroll.scrollTo === 'function') {
        window.__locomotiveScroll.scrollTo(targetY, { duration: 1.2, immediate: false })
      } else if (window.__lenis && typeof window.__lenis.scrollTo === 'function') {
        window.__lenis.scrollTo(targetY, { duration: 1.2 })
      } else {
        window.scrollTo({ top: targetY, behavior: 'smooth' })
      }
      return
    }

    // 3. Target: PROJECTS
    // Directly stops at the top of Projects (offset: 0) at the padding top and WORK badge
    if (targetId === 'projects') {
      const projectsEl = document.getElementById('projects')
      if (!projectsEl) return

      if (window.__locomotiveScroll && typeof window.__locomotiveScroll.scrollTo === 'function') {
        window.__locomotiveScroll.scrollTo(projectsEl, { offset: 0, duration: 1.2, immediate: false })
      } else if (window.__lenis && typeof window.__lenis.scrollTo === 'function') {
        window.__lenis.scrollTo(projectsEl, { offset: 0, duration: 1.2 })
      } else {
        const top = projectsEl.getBoundingClientRect().top + window.scrollY
        window.scrollTo({ top, behavior: 'smooth' })
      }
      return
    }

    // 4. Target: SKILLS
    // Skills has a fixed navbar above it, offset: -60 ensures top padding & badge are clearly visible
    if (targetId === 'skills') {
      const skillsEl = document.getElementById('skills')
      if (!skillsEl) return

      if (window.__locomotiveScroll && typeof window.__locomotiveScroll.scrollTo === 'function') {
        window.__locomotiveScroll.scrollTo(skillsEl, { offset: -60, duration: 1.2, immediate: false })
      } else if (window.__lenis && typeof window.__lenis.scrollTo === 'function') {
        window.__lenis.scrollTo(skillsEl, { offset: -60, duration: 1.2 })
      } else {
        const top = skillsEl.getBoundingClientRect().top + window.scrollY - 60
        window.scrollTo({ top, behavior: 'smooth' })
      }
      return
    }

    // 5. Fallback for other sections (Contact, Experience, etc.)
    const targetEl = document.getElementById(targetId)
    if (targetEl) {
      if (window.__locomotiveScroll && typeof window.__locomotiveScroll.scrollTo === 'function') {
        window.__locomotiveScroll.scrollTo(targetEl, { offset: -60, duration: 1.2, immediate: false })
      } else if (window.__lenis && typeof window.__lenis.scrollTo === 'function') {
        window.__lenis.scrollTo(targetEl, { offset: -60, duration: 1.2 })
      } else {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
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

  // Render stylized brand mark with animated stretch line and HOME badge on hover
  const renderBrand = () => {
    if (brandText.includes('—')) {
      return (
        <>
          <span className="brand-char">{firstChar}</span>
          <span className="brand-line" aria-hidden="true" />
          <span className="brand-char">{lastChar}</span>
          <span className="brand-home-badge" aria-hidden="true">HOME</span>
        </>
      )
    }
    return (
      <>
        <span className="brand-char">{firstChar}</span>
        <span className="brand-home-badge" aria-hidden="true">HOME</span>
      </>
    )
  }

  if (!isVisible) return null

  return (
    <motion.header
      key="portfolio-navbar"
      className={`portfolio-navbar navbar-visible ${isScrolled ? 'scrolled navbar-scrolled' : ''
        }`}
      initial={{
        y: -40,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        },
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
        {/* Left: Brand Identity */}
        <div className="navbar-left">
          <a
            href="#hero"
            onClick={handleBrandClick}
            onMouseEnter={handleBrandHover}
            className="navbar-brand"
            aria-label="Home — Restart from beginning"
          >
            {renderBrand()}
          </a>
        </div>

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