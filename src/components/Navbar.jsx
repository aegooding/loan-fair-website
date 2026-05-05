// Navbar — fixed to the top of every page.
// - Transparent by default; gets a blurred green background after 80px scroll
// - Desktop: logo left, nav links + CTA right
// - Mobile: hamburger button opens a full-screen overlay menu
import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useModal } from '../context/ModalContext'
import logoMain from '../assets/logo-sand.svg'
import './Navbar.css'

const navLinks = [
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
  { to: '/learn', label: 'Learn' },
  { to: '/faq', label: 'FAQ' },
  { to: '/referral', label: 'Refer a Friend' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { open } = useModal()

  // Add blurred background after 80px of scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu with Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  // Prevent page scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const handleEnquire = () => {
    closeMenu()
    open()
  }

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        {/* Logo */}
        <Link to="/" className="navbar__logo" onClick={closeMenu} aria-label="Loan Fair — home">
          <img src={logoMain} alt="Loan Fair" height="57" />
        </Link>

        {/* Desktop navigation links */}
        <nav className="navbar__nav" aria-label="Main navigation">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA button */}
        <button className="btn-primary navbar__cta" onClick={open}>
          Enquire Now →
        </button>

        {/* Hamburger button — only visible on mobile */}
        <button
          className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile full-screen overlay */}
      <div
        id="mobile-menu"
        className={`navbar__overlay${menuOpen ? ' navbar__overlay--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        onClick={closeMenu}
      >
        <nav className="navbar__overlay-nav" aria-label="Mobile navigation">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className="navbar__overlay-link"
              onClick={closeMenu}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <button className="btn-primary navbar__overlay-cta" onClick={handleEnquire}>
          Enquire Now →
        </button>
      </div>
    </header>
  )
}
