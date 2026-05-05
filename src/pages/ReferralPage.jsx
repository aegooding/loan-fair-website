import { useState } from 'react'
import './ReferralPage.css'

const BASE_URL = import.meta.env.VITE_API_URL

export default function ReferralPage() {
  const [form, setForm] = useState({
    referrerName: '',
    referrerEmail: '',
    referredName: '',
    referredEmail: '',
    referredPhone: '',
    note: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.referrerName.trim()) e.referrerName = 'Required'
    if (!form.referredName.trim()) e.referredName = 'Required'
    if (!form.referredEmail.trim() && !form.referredPhone.trim()) {
      e.referredEmail = 'Please provide at least an email or phone number'
    } else if (form.referredEmail.trim() && !/\S+@\S+\.\S+/.test(form.referredEmail)) {
      e.referredEmail = 'Valid email required'
    }
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('submitting')
    try {
      const res = await fetch(`${BASE_URL}/referral`, {
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
      <section className="page-hero referral-hero">
        <div className="container">
          <p className="page-hero__label">Know someone we can help?</p>
          <h1 className="page-hero__headline">Refer a friend</h1>
          <p className="page-hero__sub">Send us their details and we'll reach out to see how we can help them.</p>
        </div>
      </section>

      <section className="referral-body bg-green-dark section-padding">
        <div className="container referral-body__inner">

          {status === 'success' ? (
            <div className="referral-success">
              <h2>Referral received</h2>
              <p>Thanks for the introduction. We'll be in touch with them shortly.</p>
            </div>
          ) : (
            <form className="referral-form" onSubmit={handleSubmit} noValidate>

              <div className="referral-form__section">
                <h2 className="referral-form__section-heading">Your details</h2>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="referrer-name" className="form-label">Your name *</label>
                    <input
                      id="referrer-name"
                      type="text"
                      className={`form-input${errors.referrerName ? ' form-input--error' : ''}`}
                      value={form.referrerName}
                      onChange={set('referrerName')}
                      placeholder="Your name"
                    />
                    {errors.referrerName && <p className="field-error">{errors.referrerName}</p>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="referrer-email" className="form-label">Your email <span className="form-label--optional">(optional)</span></label>
                    <input
                      id="referrer-email"
                      type="email"
                      className="form-input"
                      value={form.referrerEmail}
                      onChange={set('referrerEmail')}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
              </div>

              <div className="referral-form__section">
                <h2 className="referral-form__section-heading">Their details</h2>

                <div className="form-group">
                  <label htmlFor="referred-name" className="form-label">Their name *</label>
                  <input
                    id="referred-name"
                    type="text"
                    className={`form-input${errors.referredName ? ' form-input--error' : ''}`}
                    value={form.referredName}
                    onChange={set('referredName')}
                    placeholder="Their full name"
                  />
                  {errors.referredName && <p className="field-error">{errors.referredName}</p>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="referred-email" className="form-label">Their email *</label>
                    <input
                      id="referred-email"
                      type="email"
                      className={`form-input${errors.referredEmail ? ' form-input--error' : ''}`}
                      value={form.referredEmail}
                      onChange={set('referredEmail')}
                      placeholder="their@email.com"
                    />
                    {errors.referredEmail && <p className="field-error">{errors.referredEmail}</p>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="referred-phone" className="form-label">Their phone <span className="form-label--optional">(optional)</span></label>
                    <input
                      id="referred-phone"
                      type="tel"
                      className="form-input"
                      value={form.referredPhone}
                      onChange={set('referredPhone')}
                      placeholder="04xx xxx xxx"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="referral-note" className="form-label">Note <span className="form-label--optional">(optional)</span></label>
                  <textarea
                    id="referral-note"
                    className="form-input form-textarea"
                    value={form.note}
                    onChange={set('note')}
                    placeholder="Any context about their situation or what they're looking for…"
                    rows={5}
                  />
                </div>
              </div>

              {status === 'error' && (
                <p className="referral-form__error">Something went wrong. Please try again or email us directly at <a href="mailto:andrew@loanfair.com.au">andrew@loanfair.com.au</a>.</p>
              )}

              <button type="submit" className="btn-primary referral-form__submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending…' : 'Submit referral'}
              </button>

            </form>
          )}
        </div>
      </section>
    </>
  )
}
