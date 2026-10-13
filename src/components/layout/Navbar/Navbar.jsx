import { useState, useEffect, useCallback } from 'react'
import { Moon, Sun, Mail, Menu, X } from 'lucide-react'
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
}) {
  const [theme, setTheme] = useState('dark')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Initialize theme from document or localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme')
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme)
      document.documentElement.setAttribute('data-theme', savedTheme)
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const initialTheme = prefersDark ? 'dark' : 'dark'
      setTheme(initialTheme)
      document.documentElement.setAttribute('data-theme', initialTheme)
    }
  }, [])

  // Toggle dark / light theme
  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
    localStorage.setItem('portfolio-theme', nextTheme)
  }

  // Smooth scroll handler for anchor links
  const handleLinkClick = useCallback((e, item) => {
    if (item.external) return

    if (item.href && item.href.startsWith('#')) {
      e.preventDefault()
      const targetId = item.href.slice(1)
      const targetEl = document.getElementById(targetId)

      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else if (item.href === '#contact' || item.label === 'WORK TOGETHER') {
        window.location.href = `mailto:${email}?subject=Collaboration%20Inquiry`
      } else if (item.href === '#hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }

      setIsMobileMenuOpen(false)
    }
  }, [email])

  const handleContactClick = (e) => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      e.preventDefault()
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    // If no contact section in DOM, default mailto behavior runs
  }

  // Render stylized brand mark with em-dash (e.g. A — Z or C — P)
  const renderBrand = () => {
    if (brandText.includes('—')) {
      const [first, ...rest] = brandText.split('—')
      return (
        <>
          <span className="brand-char">{first.trim()}</span>
          <span className="brand-dash" aria-hidden="true">—</span>
          <span className="brand-char">{rest.join('—').trim()}</span>
        </>
      )
    }
    return <span className="brand-char">{brandText}</span>
  }

  return (
    <header className={`portfolio-navbar ${isVisible ? 'navbar-visible' : 'navbar-hidden'}`}>
      <div className="navbar-container">
        {/* Left: Brand Identity */}
        <div className="navbar-left">
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, { href: '#hero' })}
            className="navbar-brand"
            aria-label="Go to top"
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