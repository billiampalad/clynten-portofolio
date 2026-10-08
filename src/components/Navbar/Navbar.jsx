import './Navbar.css'

export default function Navbar({ isVisible }) {
  return (
    <header className={`portfolio-navbar ${isVisible ? 'navbar-visible' : 'navbar-hidden'}`}>
      <div className="navbar-container">
        <a href="#hero" className="navbar-brand">
          <span className="brand-dot" />
          <span className="brand-name">CLYNTEN</span>
          <span className="brand-tag">PORTFOLIO</span>
        </a>

        <nav className="navbar-links">
          <a href="#about" className="nav-link">About</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#experience" className="nav-link">Experience</a>
          <a href="#contact" className="nav-link nav-contact-btn">Contact</a>
        </nav>
      </div>
    </header>
  )
}
