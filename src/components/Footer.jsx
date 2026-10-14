import './Footer.css'

/**
 * Footer Component
 * Application footer displaying attribution and copyright information.
 */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__text">Built with ❤️ for interview prep</p>
        <p className="footer__copyright">© 2024 PrepTrack</p>
      </div>
    </footer>
  )
}

export default Footer
