// FAQ data — grouped by category.
// Each question has: id, question, answer (string or array of strings for paragraphs).

export const faqCategories = [
  {
    id: 'about',
    heading: 'About Loan Fair',
    questions: [
      {
        id: 'what-is',
        question: 'What is Loan Fair?',
        answer:
          'Loan Fair is a digital finance platform that helps everyday Australians access competitive car and personal loans. You submit one application, multiple lenders review your scenario, and you compare their offers side by side. We arrange the finance. You choose the best deal.',
      },
      {
        id: 'different-from-broker',
        question: 'How is Loan Fair different from a traditional broker?',
        answer:
          'Most traditional brokers earn income by adding a margin to your interest rate — meaning their pay goes up when your rate goes up. Loan Fair charges only a low flat fee instead. Our income is fixed. We have no financial incentive to push you toward a higher rate.',
      },
      {
        id: 'is-lender',
        question: 'Is Loan Fair a lender?',
        answer:
          'No. Loan Fair is a credit broker. We access multiple lenders to find the best deal for your situation. We don\'t lend money ourselves — we arrange finance on your behalf.',
      },
      {
        id: 'is-it-free',
        question: 'Is it free to enquire?',
        answer:
          'Yes. Submitting an enquiry costs nothing. Our fee is only charged when finance is successfully arranged for you, and it\'s disclosed upfront before you commit to anything.',
      },
    ],
  },
  {
    id: 'fees',
    heading: 'Fees & Costs',
    questions: [
      {
        id: 'how-paid',
        question: 'How does Loan Fair make money?',
        answer:
          'We only charge a low flat brokerage fee when we successfully arrange your finance. That fee is disclosed to you clearly before you proceed. We do not earn income by adding margin to your interest rate. Any commissions received from lenders are also fully disclosed.',
      },
      {
        id: 'brokerage-fee',
        question: 'What is the brokerage fee?',
        answer:
          'Our brokerage fee is disclosed upfront when we present your options to you. It\'s a low flat amount — not a percentage of your loan or your rate. We\'ll always tell you exactly what you\'ll pay before you decide.',
      },
      {
        id: 'hidden-costs',
        question: 'Are there any hidden costs?',
        answer:
          'No. Full transparency is the whole point. Your loan documents will disclose every fee — ours and the lender\'s. No surprises at settlement.',
      },
    ],
  },
  {
    id: 'process',
    heading: 'The Process',
    questions: [
      {
        id: 'how-long',
        question: 'How long does the process take?',
        answer:
          'Our initial enquiry takes about 3–5 minutes. Once submitted, we typically come back to you with options within 1 business day. Settlement timeframes vary by lender — usually 1–3 business days once you\'ve chosen your preferred offer.',
      },
      {
        id: 'credit-check',
        question: 'Will submitting an enquiry affect my credit score?',
        answer:
          'No. Submitting an enquiry does not trigger a credit check. A formal credit check only occurs when you choose to proceed with a specific lender — and we\'ll always let you know before that happens.',
      },
      {
        id: 'how-many-lenders',
        question: 'How many lenders will see my application?',
        answer:
          'We work with a panel of Australian lenders. The number who receive your scenario depends on your loan type, amount, and circumstances. We select lenders most likely to offer you competitive terms.',
      },
      {
        id: 'after-submit',
        question: 'What happens after I submit my enquiry?',
        answer:
          'One of our team will review your scenario and be in touch — usually within 1 business day. We\'ll confirm your details, package your application, and then go out to lenders. When offers come back, we present them to you clearly so you can compare.',
      },
    ],
  },
  {
    id: 'eligibility',
    heading: 'Eligibility',
    questions: [
      {
        id: 'who-can-apply',
        question: 'Who can apply?',
        answer:
          'You need to be an Australian resident aged 18 or over with a regular income. We work with a range of credit profiles — don\'t assume you won\'t qualify. Enquire and we\'ll let you know what\'s possible.',
      },
      {
        id: 'loan-types',
        question: 'What types of loans does Loan Fair arrange?',
        answer:
          'Car loans (new and used), personal loans, lifestyle vehicles (motorbikes, caravans, boats), and work vehicles. If you\'re unsure whether your situation qualifies, just enquire — we\'ll tell you honestly.',
      },
      {
        id: 'deposit',
        question: 'Do I need a deposit?',
        answer:
          'Not necessarily. Many loans are available with no deposit, though having one can improve your rate. We\'ll present your options either way.',
      },
    ],
  },
  {
    id: 'privacy',
    heading: 'Privacy & Security',
    questions: [
      {
        id: 'data-use',
        question: 'How is my personal information used?',
        answer:
          'Your information is used to assess your loan scenario and present it to our panel of lenders. We handle your data in line with our Privacy Policy and the Australian Privacy Act. We don\'t sell your data.',
      },
      {
        id: 'data-shared',
        question: 'Is my data shared without my consent?',
        answer:
          'No. Your data is only shared with lenders as part of arranging your finance, and only with your consent. You\'ll be asked to confirm this before your application goes to any lender.',
      },
    ],
  },
]
