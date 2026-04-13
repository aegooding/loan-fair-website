// Footer — appears on every page.
// Dark green background, logo + tagline left, nav links right, compliance text at bottom.
import { Link } from 'react-router-dom'
import { useModal } from '../context/ModalContext'
import logoMain from '../assets/logo-sand.svg'
import './Footer.css'

export default function Footer() {
  const { open } = useModal()

  return (
    <footer className="footer">
      <div className="footer__inner container">
        {/* Top row: brand + nav links */}
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" aria-label="Loan Fair — home">
              <img src={logoMain} alt="Loan Fair" className="footer__logo" />
            </Link>
            <p className="footer__tagline">Finance that is fair.</p>
          </div>

          <div className="footer__links">
            <div className="footer__col">
              <p className="footer__col-heading">Navigate</p>
              <Link to="/how-it-works" className="footer__link">How It Works</Link>
              <Link to="/about" className="footer__link">About</Link>
              <Link to="/learn" className="footer__link">Learn</Link>
              <Link to="/faq" className="footer__link">FAQ</Link>
            </div>
            <div className="footer__col">
              <p className="footer__col-heading">Legal</p>
              <Link to="/contact" className="footer__link">Contact Us</Link>
              <Link to="/privacy" className="footer__link">Privacy Policy</Link>
              <Link to="/complaints" className="footer__link">Complaints Handling</Link>
              <Link to="/terms" className="footer__link">Terms of Use</Link>
              <button className="footer__link footer__link-btn" onClick={open}>
                Enquire Now
              </button>
            </div>
          </div>
        </div>

        {/* Bottom row: compliance + copyright */}
        <div className="footer__bottom">
          <p className="footer__compliance">
            Loan Fair Pty Ltd ABN 82 696 091 924, is an Authorised Credit Representative #577538 of AFAS Group PTY LTD, Australian Credit Licence #414426.
          </p>
          <p className="footer__copyright">
            © {new Date().getFullYear()} Loan Fair. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
