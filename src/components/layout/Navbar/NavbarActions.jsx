import { useState, memo } from 'react'
import { Moon, Sun, Mail, Menu, X } from 'lucide-react'

function NavbarActions({
  theme,
  setTheme,
  email,
  onNavigate,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) {
  const [dismissedTooltip, setDismissedTooltip] = useState(null)

  // Toggle dark / light theme immediately without transition animations or border flash
  const handleToggleTheme = (e) => {
    e?.currentTarget?.blur?.()
    setDismissedTooltip('theme')
    const nextTheme = theme === 'dark' ? 'light' : 'dark'

    // Temporarily suppress all transitions across all elements to prevent color flash
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

  const handleContactClick = (e) => {
    e?.currentTarget?.blur?.()
    setDismissedTooltip('mail')
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      e.preventDefault()
      onNavigate('contact')
    }
  }

  return (
    <div className="navbar-actions">
      {/* Theme Toggle Button */}
      <div
        className={`nav-tooltip-wrapper ${
          dismissedTooltip === 'theme' ? 'tooltip-dismissed' : ''
        }`}
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

      {/* Contact Email Button */}
      <div
        className={`nav-tooltip-wrapper nav-tooltip-end ${
          dismissedTooltip === 'mail' ? 'tooltip-dismissed' : ''
        }`}
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

      {/* Mobile Hamburger Toggle */}
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
  )
}

export default memo(NavbarActions)
