// Pricing page — explains Loan Fair's flat fee model and how it compares to industry averages
import { useModal } from '../context/ModalContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './PricingPage.css'

export default function PricingPage() {
  const { open } = useModal()

  return (
    <>
      {/* Hero */}
      <section className="page-hero pricing-hero">
        <div className="container">
          <p className="page-hero__label">Our fees</p>
          <h1 className="page-hero__headline">One fee. Fully disclosed.</h1>
          <p className="page-hero__sub">
            We charge a single flat brokerage fee of $450. No hidden margin,
            no percentage of your loan, no surprises.
          </p>
        </div>
      </section>

      {/* The fee — hero number display */}
      <FeeDisplay />

      {/* Industry comparison */}
      <Comparison />

      {/* What the fee covers */}
      <WhatYouGet />

      {/* CTA */}
      <section className="pricing-cta bg-green section-padding">
        <div className="container pricing-cta__inner reveal" ref={useScrollReveal()}>
          <h2 className="pricing-cta__headline">Pay less. Get more.</h2>
          <button className="btn-primary pricing-cta__btn" onClick={open}>
            Enquire Now →
          </button>
        </div>
      </section>
    </>
  )
}

// The $450 figure — displayed prominently with payment options below
function FeeDisplay() {
  const ref = useScrollReveal()
  return (
    <section className="pricing-fee bg-cream section-padding">
      <div className="container">
        <div className="pricing-fee__inner reveal" ref={ref}>
          {/* The big number */}
          <div className="pricing-fee__amount-wrap">
            <span className="pricing-fee__amount">$450</span>
            <span className="pricing-fee__label">flat brokerage fee</span>
          </div>

          {/* Two payment options side by side */}
          <div className="pricing-fee__options">
            <OptionCard
              title="Pay it upfront"
              body="You can pay the fee directly to us at settlement — it's simply a one-off payment separate from your loan."
            />
            <OptionCard
              title="Add it to your loan"
              body="Most clients choose to have the fee added to the loan amount. This is standard practice in car finance and means nothing extra out of pocket today."
              highlight
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// A single payment option card
function OptionCard({ title, body, highlight }) {
  return (
    <div className={`pricing-option-card${highlight ? ' pricing-option-card--highlight' : ''}`}>
      <h3 className="pricing-option-card__title">{title}</h3>
      <p className="pricing-option-card__body">{body}</p>
    </div>
  )
}

// Side-by-side comparison: Loan Fair $450 vs industry average $980
function Comparison() {
  const ref = useScrollReveal()
  return (
    <section className="pricing-compare bg-green-dark section-padding">
      <div className="container">
        <div className="pricing-compare__intro reveal" ref={ref}>
          <h2 className="pricing-compare__heading">How we compare</h2>
          <p className="pricing-compare__sub">
            The average disclosed brokerage fee for car finance in Australia is <strong>$980</strong>.
            Most brokers charge this or more — and that's before accounting for any undisclosed margin.
          </p>
        </div>

        <div className="pricing-compare__cards">
          {/* Loan Fair column */}
          <CompareCard
            label="Loan Fair"
            amount="$450"
            items={[
              'Flat fee — same regardless of loan size',
              'Disclosed upfront before you proceed',
              'No interest rate margin added',
              'Lower fee means lower repayments',
            ]}
            isUs
          />

          {/* Industry average column */}
          <CompareCard
            label="Typical broker"
            amount="$980"
            note="industry average*"
            items={[
              'Often scales with loan size',
              'May not be disclosed until settlement',
              'Rate margin frequently added on top',
              'Higher fee flows into your repayments',
            ]}
          />
        </div>

        <p className="pricing-compare__footnote">
          * Based on available disclosed broker fee data for Australian car finance.
        </p>
      </div>
    </section>
  )
}

// A single column in the comparison table
function CompareCard({ label, amount, note, items, isUs }) {
  const ref = useScrollReveal()
  return (
    <div className={`pricing-compare-card${isUs ? ' pricing-compare-card--us' : ''} reveal`} ref={ref}>
      <p className="pricing-compare-card__label">{label}</p>
      <p className="pricing-compare-card__amount">{amount}</p>
      {note && <p className="pricing-compare-card__note">{note}</p>}
      <ul className="pricing-compare-card__list">
        {items.map((item) => (
          <li key={item} className="pricing-compare-card__item">
            <span className="pricing-compare-card__icon" aria-hidden="true">
              {isUs ? '✓' : '×'}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

// What the fee actually gets you
function WhatYouGet() {
  const ref = useScrollReveal()
  const items = [
    'Access to our full panel of lenders — not just one.',
    'A packaged, lender-ready application with no back-and-forth.',
    'Side-by-side comparison of rates, fees, and loan terms.',
    'Full disclosure of any lender commissions in your loan documents.',
    'Settlement handled from start to finish.',
  ]

  return (
    <section className="pricing-includes bg-green section-padding">
      <div className="container">
        <div className="pricing-includes__card reveal" ref={ref}>
          <h2 className="pricing-includes__heading">What your $450 covers</h2>
          <ul className="pricing-includes__list">
            {items.map((item) => (
              <li key={item} className="pricing-includes__item">
                <span className="pricing-includes__tick" aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
