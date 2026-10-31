import { useState, useEffect } from 'react'
import './Navbar.css'

const navLinks = [
  { id: 'home',       label: 'Home',       icon: '🏠' },
  { id: 'map',        label: 'Station Map', icon: '🗺️' },
  { id: 'facilities', label: 'Facilities',  icon: '🏪' },
  { id: 'navigate',   label: 'Navigate',    icon: '🧭' },
  { id: 'schedule',   label: 'Schedule',    icon: '🚆' },
]

export default function Navbar({ activePage, setActivePage }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (id) => {
    setActivePage(id)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        {/* Logo */}
        <div className="navbar__logo" onClick={() => handleNav('home')}>
          <div className="navbar__logo-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="8" fill="url(#logoGrad)"/>
              <path d="M7 10h14M7 14h14M10 18h8M9 10v8M19 10v8" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              <circle cx="10" cy="20" r="1.5" fill="white"/>
              <circle cx="18" cy="20" r="1.5" fill="white"/>
              <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="28" y2="28">
                  <stop stopColor="#4f8ef7"/>
                  <stop offset="1" stopColor="#7c3aed"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="navbar__logo-text">
            <span className="navbar__logo-brand">RailNav</span>
            <span className="navbar__logo-tagline">Smart Navigation</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="navbar__links">
          {navLinks.map(link => (
            <button
              key={link.id}
              className={`navbar__link ${activePage === link.id ? 'navbar__link--active' : ''}`}
              onClick={() => handleNav(link.id)}
            >
              <span className="navbar__link-icon">{link.icon}</span>
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="navbar__actions">
          <button className="navbar__emergency" title="Emergency Help">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Emergency
          </button>
          <button className="navbar__hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span className={`navbar__bar ${menuOpen ? 'open' : ''}`}/>
            <span className={`navbar__bar ${menuOpen ? 'open' : ''}`}/>
            <span className={`navbar__bar ${menuOpen ? 'open' : ''}`}/>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile-menu ${menuOpen ? 'navbar__mobile-menu--open' : ''}`}>
        {navLinks.map(link => (
          <button
            key={link.id}
            className={`navbar__mobile-link ${activePage === link.id ? 'navbar__mobile-link--active' : ''}`}
            onClick={() => handleNav(link.id)}
          >
            <span>{link.icon}</span>
            {link.label}
          </button>
        ))}
      </div>
    </header>
  )
}
