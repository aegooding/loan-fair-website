// Footer — appears on every page.
// Dark green background, logo + tagline left, nav links right, compliance text at bottom.
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useModal } from '../context/ModalContext'
import logoMain from '../assets/logo-sand.svg'
import './Footer.css'

const BASE_URL = import.meta.env.VITE_API_URL

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
              <Link to="/referral" className="footer__link">Refer a Friend</Link>
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

        {/* Become a Referrer */}
        <BecomeReferrerForm />

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

function BecomeReferrerForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    businessName: '',
    aggregator: '',
    email: '',
    mobile: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.lastName.trim()) e.lastName = 'Required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.mobile.trim()) e.mobile = 'Required'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('submitting')
    try {
      const res = await fetch(`${BASE_URL}/become-referrer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="footer__referrer">
      <div className="footer__referrer-inner">
        <div className="footer__referrer-header">
          <p className="footer__col-heading">Become a Referrer</p>
          <p className="footer__referrer-desc">
            Partner with Loan Fair. Register your details and we'll be in touch.
          </p>
        </div>

        {status === 'success' ? (
          <p className="footer__referrer-success">
            Thanks for registering — we'll be in touch shortly.
          </p>
        ) : (
          <form className="footer__referrer-form" onSubmit={handleSubmit} noValidate>
            <div className="footer__referrer-grid">
              <div className="footer__referrer-field">
                <label htmlFor="ref-first-name" className="footer__referrer-label">First Name *</label>
                <input
                  id="ref-first-name"
                  type="text"
                  className={`footer__referrer-input${errors.firstName ? ' footer__referrer-input--error' : ''}`}
                  value={form.firstName}
                  onChange={set('firstName')}
                  placeholder="First name"
                />
                {errors.firstName && <span className="footer__referrer-error">{errors.firstName}</span>}
              </div>

              <div className="footer__referrer-field">
                <label htmlFor="ref-last-name" className="footer__referrer-label">Last Name *</label>
                <input
                  id="ref-last-name"
                  type="text"
                  className={`footer__referrer-input${errors.lastName ? ' footer__referrer-input--error' : ''}`}
                  value={form.lastName}
                  onChange={set('lastName')}
                  placeholder="Last name"
                />
                {errors.lastName && <span className="footer__referrer-error">{errors.lastName}</span>}
              </div>

              <div className="footer__referrer-field">
                <label htmlFor="ref-business" className="footer__referrer-label">Business Name</label>
                <input
                  id="ref-business"
                  type="text"
                  className="footer__referrer-input"
                  value={form.businessName}
                  onChange={set('businessName')}
                  placeholder="Business name"
                />
              </div>

              <div className="footer__referrer-field">
                <label htmlFor="ref-aggregator" className="footer__referrer-label">
                  Aggregator <span className="footer__referrer-optional">(optional)</span>
                </label>
                <input
                  id="ref-aggregator"
                  type="text"
                  className="footer__referrer-input"
                  value={form.aggregator}
                  onChange={set('aggregator')}
                  placeholder="e.g. Connective, FAST"
                />
              </div>

              <div className="footer__referrer-field">
                <label htmlFor="ref-email" className="footer__referrer-label">Email *</label>
                <input
                  id="ref-email"
                  type="email"
                  className={`footer__referrer-input${errors.email ? ' footer__referrer-input--error' : ''}`}
                  value={form.email}
                  onChange={set('email')}
                  placeholder="your@email.com"
                />
                {errors.email && <span className="footer__referrer-error">{errors.email}</span>}
              </div>

              <div className="footer__referrer-field">
                <label htmlFor="ref-mobile" className="footer__referrer-label">Mobile Phone *</label>
                <input
                  id="ref-mobile"
                  type="tel"
                  className={`footer__referrer-input${errors.mobile ? ' footer__referrer-input--error' : ''}`}
                  value={form.mobile}
                  onChange={set('mobile')}
                  placeholder="04xx xxx xxx"
                />
                {errors.mobile && <span className="footer__referrer-error">{errors.mobile}</span>}
              </div>
            </div>

            {status === 'error' && (
              <p className="footer__referrer-error-msg">
                Something went wrong. Please email <a href="mailto:andrew@loanfair.com.au">andrew@loanfair.com.au</a> directly.
              </p>
            )}

            <button
              type="submit"
              className="footer__referrer-submit"
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? 'Submitting…' : 'Register as Referrer'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
