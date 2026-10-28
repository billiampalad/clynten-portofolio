import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import NavbarBrand from './NavbarBrand'
import NavbarLinks from './NavbarLinks'
import NavbarActions from './NavbarActions'
import NavbarMobileDrawer from './NavbarMobileDrawer'
import { REFERENCE_NAV_ITEMS, DEFAULT_EMAIL } from './navConstants'
import { scrollToSection } from './navUtils'
import './Navbar.css'

export default function Navbar({
  isVisible = true,
  brandText = 'A — Z',
  navItems = REFERENCE_NAV_ITEMS,
  email = DEFAULT_EMAIL,
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

  // Lightweight passive scroll listener to toggle progressive bottom blur and border
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0
      setIsScrolled(scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigate = useCallback(
    (targetId) => {
      scrollToSection(targetId, onHomeClick)
      setIsMobileMenuOpen(false)
    },
    [onHomeClick]
  )

  if (!isVisible) return null

  return (
    <motion.header
      key="portfolio-navbar"
      className={`portfolio-navbar navbar-visible ${
        isScrolled ? 'scrolled navbar-scrolled' : ''
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

      {/* Progressive Blur Layer (Light & Dark dual-layer cross-fade matching design) */}
      <div className="navbar-bottom-blur" aria-hidden="true">
        <div className="blur-layer-light" />
        <div className="blur-layer-dark" />
      </div>

      <div className="navbar-container">
        {/* Left: Brand Identity with Text Scramble & HOME badge */}
        <NavbarBrand brandText={brandText} onHomeClick={onHomeClick} />

        {/* Center: Desktop Navigation Links with Red Slide Hover Block */}
        <NavbarLinks navItems={navItems} onNavigate={handleNavigate} />

        {/* Right: Actions (Theme Toggle, Contact Mail, Mobile Menu) */}
        <NavbarActions
          theme={theme}
          setTheme={setTheme}
          email={email}
          onNavigate={handleNavigate}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      </div>

      {/* Mobile Collapsible Drawer Menu */}
      <NavbarMobileDrawer
        isOpen={isMobileMenuOpen}
        navItems={navItems}
        onNavigate={handleNavigate}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </motion.header>
  )
}