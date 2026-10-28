import { memo } from 'react'

function NavItem({ item, onNavigate }) {
  const handleClick = (e) => {
    if (item.external) return
    if (item.href && item.href.startsWith('#')) {
      e.preventDefault()
      onNavigate(item.href.slice(1))
    }
  }

  return (
    <a
      href={item.href}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noopener noreferrer' : undefined}
      onClick={handleClick}
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

function NavbarLinks({ navItems = [], onNavigate }) {
  return (
    <nav className="navbar-links" aria-label="Main Navigation">
      {navItems.map((item, index) => (
        <NavItem
          key={item.label || index}
          item={item}
          onNavigate={onNavigate}
        />
      ))}
    </nav>
  )
}

export default memo(NavbarLinks)
