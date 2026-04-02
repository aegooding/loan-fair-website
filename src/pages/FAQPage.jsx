// FAQ page — accordion grouped by category
// Each item uses aria-expanded + aria-controls for accessibility
import { useState } from 'react'
import { useModal } from '../context/ModalContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { faqCategories } from '../data/faqs'
import './FAQPage.css'

export default function FAQPage() {
  const { open } = useModal()

  return (
    <>
      {/* Hero */}
      <section className="page-hero faq-hero">
        <div className="container">
          <p className="page-hero__label">Help centre</p>
          <h1 className="page-hero__headline">Frequently Asked Questions</h1>
          <p className="page-hero__sub">No jargon. No runaround. Just answers.</p>
        </div>
      </section>

      {/* FAQ categories */}
      <section className="faq-body bg-green-dark section-padding">
        <div className="container faq-body__inner">
          {faqCategories.map((category) => (
            <CategorySection key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="faq-cta bg-green section-padding">
        <div className="container faq-cta__inner reveal" ref={useScrollReveal()}>
          <h2 className="faq-cta__headline">Didn't find your answer?</h2>
          <p className="faq-cta__sub">Our team is happy to help.</p>
          <button className="btn-primary faq-cta__btn" onClick={open}>
            Enquire Now →
          </button>
        </div>
      </section>
    </>
  )
}

function CategorySection({ category }) {
  const ref = useScrollReveal()
  return (
    <div className="faq-category reveal" ref={ref}>
      <h2 className="faq-category__heading">{category.heading}</h2>
      <div className="faq-category__list">
        {category.questions.map((q) => (
          <AccordionItem key={q.id} item={q} />
        ))}
      </div>
    </div>
  )
}

function AccordionItem({ item }) {
  const [open, setOpen] = useState(false)
  const id = `faq-answer-${item.id}`
  const btnId = `faq-btn-${item.id}`

  return (
    <div className={`faq-item${open ? ' faq-item--open' : ''}`}>
      <button
        id={btnId}
        className="faq-item__question"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
      >
        <span>{item.question}</span>
        {/* The + icon rotates to × when open */}
        <span className="faq-item__icon" aria-hidden="true">+</span>
      </button>

      <div
        id={id}
        role="region"
        aria-labelledby={btnId}
        className="faq-item__answer"
        style={{ maxHeight: open ? '500px' : '0px' }}
      >
        <p className="faq-item__answer-text">{item.answer}</p>
      </div>
    </div>
  )
}
