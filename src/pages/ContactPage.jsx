// ContactPage — simple contact form that emails andrew@loanfair.com.au
import { useState } from 'react'
import './ContactPage.css'

const BASE_URL = import.meta.env.VITE_API_URL

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.message.trim()) e.message = 'Please enter a message'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('submitting')
    try {
      const res = await fetch(`${BASE_URL}/contact`, {
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
    <>
      <section className="page-hero contact-hero">
        <div className="container">
          <p className="page-hero__label">Get in touch</p>
          <h1 className="page-hero__headline">Contact us</h1>
          <p className="page-hero__sub">We'll get back to you with a call or email, whichever you prefer.</p>
        </div>
      </section>

      <section className="contact-body bg-green-dark section-padding">
        <div className="container contact-body__inner">

          {status === 'success' ? (
            <div className="contact-success">
              <h2>Message received</h2>
              <p>Thanks for getting in touch. We'll be in contact with you shortly.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">Name *</label>
                  <input
                    id="contact-name"
                    type="text"
                    className={`form-input${errors.name ? ' form-input--error' : ''}`}
                    value={form.name}
                    onChange={set('name')}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="field-error">{errors.name}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">Email *</label>
                  <input
                    id="contact-email"
                    type="email"
                    className={`form-input${errors.email ? ' form-input--error' : ''}`}
                    value={form.email}
                    onChange={set('email')}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="field-error">{errors.email}</p>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contact-phone" className="form-label">Phone number <span className="form-label--optional">(optional)</span></label>
                <input
                  id="contact-phone"
                  type="tel"
                  className="form-input"
                  value={form.phone}
                  onChange={set('phone')}
                  placeholder="04xx xxx xxx"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">How can we help? *</label>
                <textarea
                  id="contact-message"
                  className={`form-input form-textarea${errors.message ? ' form-input--error' : ''}`}
                  value={form.message}
                  onChange={set('message')}
                  placeholder="Tell us what you'd like to talk about..."
                  rows={6}
                />
                {errors.message && <p className="field-error">{errors.message}</p>}
              </div>

              {status === 'error' && (
                <p className="contact-form__error">Something went wrong. Please try again or email us directly at <a href="mailto:andrew@loanfair.com.au">andrew@loanfair.com.au</a>.</p>
              )}

              <button type="submit" className="btn-primary contact-form__submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending…' : 'Send message'}
              </button>

            </form>
          )}
        </div>
      </section>
    </>
  )
}
