// Home page — 6 sections that scroll like editorial pages.
// Section order: Hero → Problem → How It Works → Principles → Transparency → Final CTA
import { useModal } from '../context/ModalContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './HomePage.css'

export default function HomePage() {
  const { open } = useModal()

  return (
    <>
      <HeroSection open={open} />
      <TransparencySection open={open} />
      <HowItWorksSection open={open} />
      <PrinciplesSection />
      <ProblemSection />
      <FinalCTASection open={open} />
    </>
  )
}

/* =====================================================
   HERO SECTION
   Full viewport, green bg, massive headline, entrance animation
   ===================================================== */
function HeroSection({ open }) {
  return (
    <section className="hero" aria-label="Hero">
      <div className="container hero__inner">
        <div className="hero__content">
          {/* Headline animates in on load */}
          <h1 className="hero__headline">
            Finance<br />
            that is<br />
            fair.
          </h1>
          <p className="hero__sub">
            Loan Fair is a digital finance platform that accesses multiple lenders
            to find you the best deal. We only charge a low flat fee. No hidden margin. No surprises.
          </p>
          <div className="hero__ctas">
            <button className="btn-primary hero__cta-primary" onClick={open}>
              Enquire Now →
            </button>
            <a href="#how-it-works" className="hero__cta-link">
              See how it works ↓
            </a>
          </div>
        </div>

        {/* Decorative cut-corner shape — no photography, just geometry */}
        <div className="hero__shape" aria-hidden="true" />
      </div>
    </section>
  )
}

/* =====================================================
   PROBLEM SECTION
   Cream background — the high-contrast "interruption"
   Three bold statements. No icons. The copy IS the visual.
   ===================================================== */
function ProblemSection() {
  const ref = useScrollReveal()
  return (
    <section className="problem bg-cream">
      <div className="container problem__inner reveal" ref={ref}>
        <p className="problem__statement">Most brokers add a little extra to your interest rate to line their own pockets. We don't do that. What you're quoted is what's fair — full stop.</p>
      </div>
    </section>
  )
}

/* =====================================================
   HOW IT WORKS SUMMARY
   Green bg, 3 numbered cards side by side
   ===================================================== */
function HowItWorksSection({ open }) {
  const ref = useScrollReveal()

  const steps = [
    {
      num: '01',
      heading: 'Submit once',
      body: 'Tell us about yourself in a single online application. This takes about 5 minutes.',
    },
    {
      num: '02',
      heading: 'We find the best deal',
      body: 'We access our panel of lenders, compare their offers, and present you with the most competitive options.',
    },
    {
      num: '03',
      heading: 'You choose',
      body: 'Compare side-by-side. Pick the best deal. We handle everything else.',
    },
  ]

  return (
    <section className="how-it-works bg-green" id="how-it-works">
      <div className="container">
        <p className="section-eyebrow">Simple process</p>
        <h2 className="section-heading reveal" ref={ref}>How Loan Fair Works</h2>
        <div className="steps-grid">
          {steps.map((step, i) => (
            <StepCard key={step.num} step={step} delay={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StepCard({ step, delay }) {
  const ref = useScrollReveal()
  return (
    <div className={`step-card reveal reveal-delay-${delay + 1}`} ref={ref}>
      <span className="step-card__num">{step.num}</span>
      <h3 className="step-card__heading">{step.heading}</h3>
      <p className="step-card__body">{step.body}</p>
    </div>
  )
}

/* =====================================================
   PRINCIPLES
   Dark green bg, 4-card grid
   ===================================================== */
function PrinciplesSection() {
  const ref = useScrollReveal()

  const principles = [
    { heading: 'Transparency', body: 'You know exactly how we\'re paid. Always.' },
    { heading: 'Honesty', body: 'No undisclosed incentives. Ever.' },
    { heading: 'Fairness', body: 'We don\'t charge you more than what our service is worth.' },
    { heading: 'Simplicity', body: 'Compare finance without the headache.' },
  ]

  return (
    <section className="principles bg-green-dark">
      <div className="container">
        <p className="section-eyebrow">What we stand for</p>
        <h2 className="section-heading reveal" ref={ref}>Built differently.<br />On purpose.</h2>
        <div className="principles-grid">
          {principles.map((p, i) => (
            <PrincipleCard key={p.heading} principle={p} delay={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PrincipleCard({ principle, delay }) {
  const ref = useScrollReveal()
  return (
    <div className={`principle-card reveal reveal-delay-${delay + 1}`} ref={ref}>
      <h3 className="principle-card__heading">{principle.heading}</h3>
      <p className="principle-card__body">{principle.body}</p>
    </div>
  )
}

/* =====================================================
   TRANSPARENCY CALLOUT
   Sand background — the boldest visual moment on the page.
   Billboard style. No decoration.
   ===================================================== */
function TransparencySection({ open }) {
  const ref = useScrollReveal()
  return (
    <section className="transparency bg-sand">
      <div className="container transparency__inner">
        <div className="reveal" ref={ref}>
          <p className="transparency__label">Our model</p>
          <h2 className="transparency__headline">All we charge<br />is a low flat fee.</h2>
          <p className="transparency__body">
            That's it. No margin added to your rate. No hidden costs.
            Just a clearly disclosed fee for arranging your finance.
          </p>
          <button className="transparency__cta" onClick={open}>
            Enquire Now →
          </button>
        </div>
      </div>
    </section>
  )
}

/* =====================================================
   FINAL CTA
   Green bg, large type, single button
   ===================================================== */
function FinalCTASection({ open }) {
  const ref = useScrollReveal()
  return (
    <section className="final-cta bg-green">
      <div className="container final-cta__inner reveal" ref={ref}>
        <h2 className="final-cta__headline">Ready to find<br />a fairer rate?</h2>
        <p className="final-cta__sub">Takes less than 5 minutes. No credit check required to enquire.</p>
        <button className="btn-primary final-cta__btn" onClick={open}>
          Enquire Now →
        </button>
      </div>
    </section>
  )
}
