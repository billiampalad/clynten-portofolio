import { useState, useEffect, useCallback } from 'react'
import { Moon, Sun, Mail, Menu, X } from 'lucide-react'
import { useHoverScramble, LETTERS } from '@/hooks/useTextScramble'
import './Navbar.css'

export const REFERENCE_NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#' },
  { label: 'Experience', href: '#' },
  { label: 'Contact', href: '#' },
]

export default function Navbar({
  isVisible = true,
  brandText = 'A — Z',
  navItems = REFERENCE_NAV_ITEMS,
  email = 'billiampalad@gmail.com',
  onHomeClick,
  hasShadow = false,
}) {
  const [theme, setTheme] = useState('dark')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

  // Initialize theme from document or localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme')
    const themeToApply =
      savedTheme === 'light' || savedTheme === 'dark'
        ? savedTheme
        : window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'dark'

    setTheme(themeToApply)
    document.documentElement.setAttribute('data-theme', themeToApply)
    if (themeToApply === 'light') {
      document.documentElement.classList.add('light-theme')
      document.documentElement.classList.remove('dark-theme')
    } else {
      document.documentElement.classList.add('dark-theme')
      document.documentElement.classList.remove('light-theme')
    }
  }, [])

  // Toggle dark / light theme
  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light-theme')
      document.documentElement.classList.remove('dark-theme')
    } else {
      document.documentElement.classList.add('dark-theme')
      document.documentElement.classList.remove('light-theme')
    }
    localStorage.setItem('portfolio-theme', nextTheme)
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

  // Smooth scroll handler for anchor links
  const handleLinkClick = useCallback((e, item) => {
    if (item.external) return

    if (item.href && item.href.startsWith('#')) {
      e.preventDefault()
      const targetId = item.href.slice(1)
      const targetEl = document.getElementById(targetId)

      if (item.href === '#hero' || item.label?.toLowerCase() === 'home') {
        if (onHomeClick) {
          onHomeClick()
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        }
      } else if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else if (item.href === '#contact' || item.label === 'WORK TOGETHER') {
        window.location.href = `mailto:${email}?subject=Collaboration%20Inquiry`
      }

      setIsMobileMenuOpen(false)
    }
  }, [email, onHomeClick])

  const handleContactClick = (e) => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      e.preventDefault()
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
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

  return (
    <header
      className={`portfolio-navbar ${isVisible ? 'navbar-visible' : 'navbar-hidden'} ${
        hasShadow ? 'navbar-has-shadow' : ''
      }`}
    >
      <div className="navbar-container">
        {/* Left: Brand Identity */}
        <div className="navbar-left">
          <a
            href="#hero"
            onClick={handleBrandClick}
            onMouseEnter={handleBrandHover}
            className="navbar-brand"
            aria-label="Home — Restart from beginning"
            title="Restart from beginning"
          >
            {renderBrand()}
          </a>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="navbar-links" aria-label="Main Navigation">
          {navItems.map((item, index) => (
            <a
              key={item.label || index}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              onClick={(e) => handleLinkClick(e, item)}
              className="nav-item"
            >
              <span className="nav-label">{item.label}</span>
              {item.badge && (
                <span className="nav-badge" aria-label={`Status: ${item.badge}`}>
                  {item.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Right: Actions (Theme Toggle, Contact Mail, Mobile Menu) */}
        <div className="navbar-actions">
          <button
            type="button"
            className="nav-icon-btn nav-theme-btn"
            onClick={handleToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun size={16} strokeWidth={1.8} className="theme-icon" />
            ) : (
              <Moon size={16} strokeWidth={1.8} className="theme-icon" />
            )}
          </button>

          <a
            href={`mailto:${email}?subject=Project%20Inquiry`}
            onClick={handleContactClick}
            className="nav-icon-btn nav-mail-btn"
            aria-label="Send email"
            title="Work Together / Send Email"
          >
            <Mail size={16} strokeWidth={1.8} />
          </a>

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
    </header>
  )
}