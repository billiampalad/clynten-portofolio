import { memo } from 'react'

function NavbarMobileDrawer({ isOpen, navItems = [], onNavigate, onClose }) {
  const handleItemClick = (e, item) => {
    if (item.external) return
    if (item.href && item.href.startsWith('#')) {
      e.preventDefault()
      onNavigate(item.href.slice(1))
      onClose()
    }
  }

  return (
    <div className={`navbar-mobile-drawer ${isOpen ? 'drawer-open' : 'drawer-closed'}`}>
      <nav className="mobile-drawer-links" aria-label="Mobile Navigation">
        {navItems.map((item, index) => (
          <a
            key={item.label || index}
            href={item.href}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noopener noreferrer' : undefined}
            onClick={(e) => handleItemClick(e, item)}
            className="mobile-nav-item"
          >
            <span className="nav-label">{item.label}</span>
            {item.badge && <span className="nav-badge">{item.badge}</span>}
          </a>
        ))}
      </nav>
    </div>
  )
}

export default memo(NavbarMobileDrawer)
