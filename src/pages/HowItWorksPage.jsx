// How It Works page — detailed 6-step walkthrough + fee transparency callout
import { useModal } from '../context/ModalContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './HowItWorksPage.css'

const STEPS = [
  {
    num: '01',
    heading: 'Tell us about your loan',
    body: 'Vehicle type, amount, purpose. Our enquiry form takes about 3 minutes to complete.',
  },
  {
    num: '02',
    heading: 'We package your scenario',
    body: 'Your details are formatted into a lender-ready data set. No back-and-forth. No chasing documents.',
  },
  {
    num: '03',
      heading: 'We access multiple lenders',
    body: 'We take your scenario to our panel of lenders and identify the most competitive offers available to you.',
  },
  {
    num: '04',
    heading: 'Compare side-by-side',
    body: 'Rates, fees, and terms laid out clearly. No decoding required. No pressure.',
  },
  {
    num: '05',
    heading: 'We arrange your finance',
    body: 'Once you choose, Loan Fair handles the paperwork and settlement with the lender.',
  },
  {
    num: '06',
    heading: 'You drive away',
    body: 'Simple.',
  },
]

export default function HowItWorksPage() {
  const { open } = useModal()

  return (
    <>
      {/* Hero */}
      <section className="page-hero hiw-hero">
        <div className="container">
          <p className="page-hero__label">The process</p>
          <h1 className="page-hero__headline">How It Works</h1>
          <p className="page-hero__sub">
            One application. Multiple lenders. Zero hidden margin.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="hiw-steps bg-green-dark">
        <div className="container">
          <div className="hiw-steps__list">
            {STEPS.map((step, i) => (
              <Step key={step.num} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Fee transparency callout */}
      <HowWeMakeMoney />

      {/* CTA */}
      <section className="hiw-cta bg-green section-padding">
        <div className="container hiw-cta__inner reveal" ref={useScrollReveal()}>
          <h2 className="hiw-cta__headline">Sounds fair?<br />Let's get started.</h2>
          <button className="btn-primary hiw-cta__btn" onClick={open}>
            Enquire Now →
          </button>
        </div>
      </section>
    </>
  )
}

function Step({ step, index }) {
  const ref = useScrollReveal()
  return (
    <div className="hiw-step reveal" ref={ref}>
      {/* Large decorative step number */}
      <div className="hiw-step__num-wrap" aria-hidden="true">
        <span className="hiw-step__num">{step.num}</span>
      </div>
      <div className="hiw-step__content">
        <h2 className="hiw-step__heading">{step.heading}</h2>
        <p className="hiw-step__body">{step.body}</p>
      </div>
    </div>
  )
}

function HowWeMakeMoney() {
  const ref = useScrollReveal()
  const items = [
    'A low flat brokerage fee — disclosed to you upfront before you proceed.',
    'We do NOT add interest rate margin. Your rate is the lender\'s rate.',
    'Any lender commissions paid to us are fully disclosed in your loan documents.',
    'Our income does not increase when your interest rate increases.',
  ]

  return (
    <section className="hiw-money bg-green section-padding">
      <div className="container">
        <div className="hiw-money__card reveal" ref={ref}>
          <h2 className="hiw-money__heading">How we make money</h2>
          <ul className="hiw-money__list">
            {items.map((item) => (
              <li key={item} className="hiw-money__item">
                <span className="hiw-money__tick" aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
