// About / Our Story page — mission, editorial prose about the problem, principles with depth
import { useModal } from '../context/ModalContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './AboutPage.css'

const PRINCIPLES = [
  {
    heading: 'Transparency',
    body: 'You\'ll know exactly how we\'re paid before you proceed with anything. Our fee is disclosed upfront. Any commissions from lenders are disclosed in your loan documents. There\'s no version of this where something is buried.',
  },
  {
    heading: 'Honesty',
    body: 'We don\'t earn income from your interest rate. So we have no reason to hide the fact that other brokers do. We\'ll tell you plainly how the industry works and exactly where Loan Fair is different.',
  },
  {
    heading: 'Fairness',
    body: 'We access multiple lenders to find you the best deal available. We present their offers clearly so you can compare and decide. We work for you, not for the lender who pays the biggest commission.',
  },
  {
    heading: 'Simplicity',
    body: 'Finance doesn\'t have to be complicated. One application. Multiple offers. Clear comparison. We take care of the rest.',
  },
]

export default function AboutPage() {
  const { open } = useModal()

  return (
    <>
      {/* Hero */}
      <section className="page-hero about-hero">
        <div className="container">
          <p className="page-hero__label">Our story</p>
          <h1 className="page-hero__headline">We're on your side.</h1>
          <p className="page-hero__sub">
            Loan Fair exists because everyday Australians deserve to know exactly
            what they're paying for — and why.
          </p>
        </div>
      </section>

      {/* The Problem — editorial prose */}
      <TheProblem />

      {/* How we get paid — worked example */}
      <HowWeGetPaid />

      {/* Principles */}
      <PrinciplesDeep />

      {/* CTA */}
      <section className="about-cta bg-green section-padding">
        <div className="container about-cta__inner reveal" ref={useScrollReveal()}>
          <h2 className="about-cta__headline">Want to experience the difference?</h2>
          <button className="btn-primary about-cta__btn" onClick={open}>
            Enquire Now →
          </button>
        </div>
      </section>
    </>
  )
}

function TheProblem() {
  const ref = useScrollReveal()
  return (
    <section className="about-problem bg-cream section-padding">
      <div className="container about-problem__inner">
        <div className="about-problem__content reveal" ref={ref}>
          <p className="about-problem__eyebrow">The problem we're solving</p>
          <h2 className="about-problem__heading">A quiet conflict of interest</h2>
          <div className="about-problem__prose">
            <p>
              Most finance brokers are paid by lenders through origination fees. Some also earn extra
              income by adding a margin to your interest rate — meaning they earn more when you pay more.
              This margin is often buried in your rate and doesn't appear as a separate charge on your
              loan documents.
            </p>
            <p>
              Loan Fair removes that conflict entirely. We only charge a low flat fee. We don't touch your interest
              rate to earn income. That's it.
            </p>
            <p>
              We believe that when a broker's pay depends on your rate going up, the incentive to find
              you the best deal is fundamentally compromised. The solution isn't more disclaimers —
              it's a different business model.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function HowWeGetPaid() {
  const ref = useScrollReveal()
  return (
    <section className="about-fees bg-green section-padding">
      <div className="container">
        <div className="reveal" ref={ref}>
          <p className="section-eyebrow">How we get paid</p>
          <h2 className="about-fees__heading">One fee. Disclosed upfront.<br />That's all.</h2>
          <p className="about-fees__intro">
            Unlike home loans — where broker commissions are built into your interest rate and
            paid invisibly over the life of the loan — car finance works differently. Here, any broker
            fee is added directly to your loan amount, making it visible from day one.
          </p>
          <p className="about-fees__intro">
            We only charge a low flat fee when we successfully arrange your finance. We don't add margin
            to your interest rate, and we don't earn more if you borrow more. Here's exactly what our
            fee looks like in practice.
          </p>

          <div className="fee-example">
            <p className="fee-example__label-heading">Example — $45,000 car loan</p>

            <div className="fee-example__rows">
              <div className="fee-example__row">
                <span className="fee-example__desc">Funds required</span>
                <span className="fee-example__amount">$45,000</span>
              </div>
              <div className="fee-example__row">
                <span className="fee-example__desc">Lender establishment fee <span className="fee-example__desc-note">(varies by lender)</span></span>
                <span className="fee-example__amount">$500</span>
              </div>
              <div className="fee-example__row">
                <span className="fee-example__desc">Loan Fair fee</span>
                <span className="fee-example__amount fee-example__amount--highlight">$750</span>
              </div>
              <div className="fee-example__row fee-example__row--total">
                <span className="fee-example__desc">Total loan amount</span>
                <span className="fee-example__amount">$46,050</span>
              </div>
            </div>

            <p className="fee-example__note">
              Our $750 fee is fixed — it doesn't change based on your loan size or interest rate.
              Both fees are disclosed in full before you sign anything.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function PrinciplesDeep() {
  const ref = useScrollReveal()
  return (
    <section className="about-principles bg-green-dark section-padding">
      <div className="container">
        <p className="section-eyebrow reveal" ref={ref}>How we operate</p>
        <h2 className="about-principles__heading reveal">Four principles.<br />No exceptions.</h2>
        <div className="about-principles__grid">
          {PRINCIPLES.map((p, i) => (
            <PrincipleDeepCard key={p.heading} principle={p} delay={i % 2} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PrincipleDeepCard({ principle, delay }) {
  const ref = useScrollReveal()
  return (
    <div className={`about-principle-card reveal reveal-delay-${delay + 1}`} ref={ref}>
      <h3 className="about-principle-card__heading">{principle.heading}</h3>
      <p className="about-principle-card__body">{principle.body}</p>
    </div>
  )
}

