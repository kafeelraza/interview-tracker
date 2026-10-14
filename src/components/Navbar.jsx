import { useState, useEffect } from 'react'
import './Navbar.css'

/**
 * Navbar Component
 * Responsive top navigation bar with logo, navigation links, count badge, and animated mobile menu.
 *
 * @param {Object} props
 * @param {'home' | 'tracker'} [props.activeView='home'] - Current active view identifier
 * @param {(view: string) => void} props.onNavigate - Callback invoked when a navigation link is clicked
 * @param {number} [props.questionCount=0] - Total count of tracked questions to display in badge
 */
function Navbar({ activeView = 'home', onNavigate, questionCount = 0 }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Detect window scroll position to toggle styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleNavClick = (view) => {
    if (onNavigate) {
      onNavigate(view)
    }
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev)
  }

  return (
    <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container">
        <a
          href="#home"
          className="navbar__logo"
          onClick={(e) => {
            e.preventDefault()
            handleNavClick('home')
          }}
        >
          <span className="navbar__logo-icon" role="img" aria-label="clipboard">📋</span>
          <span className="navbar__logo-text">PrepTrack</span>
        </a>

        <button
          type="button"
          className={`navbar__hamburger ${isMobileMenuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
        >
          <span className="navbar__hamburger-bar"></span>
          <span className="navbar__hamburger-bar"></span>
          <span className="navbar__hamburger-bar"></span>
        </button>

        <nav className={`navbar__nav ${isMobileMenuOpen ? 'navbar__nav--open' : ''}`}>
          <button
            type="button"
            className={`navbar__link ${activeView === 'home' ? 'navbar__link--active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            Home
          </button>
          <button
            type="button"
            className={`navbar__link ${activeView === 'tracker' ? 'navbar__link--active' : ''}`}
            onClick={() => handleNavClick('tracker')}
          >
            <span className="navbar__link-text">Tracker</span>
            {questionCount > 0 && (
              <span className="navbar__badge">{questionCount}</span>
            )}
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
