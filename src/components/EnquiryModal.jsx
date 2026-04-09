// EnquiryModal — 5-step comprehensive enquiry form that opens as a modal overlay.
// Triggered by any "Enquire Now" button. Saves to Firebase Firestore.
// Step 1: The Basics | Step 2: About You | Step 3: Where You Live | Step 4: Your Job | Step 5: Your Expenses
import { useState, useEffect } from 'react'
import { useModal } from '../context/ModalContext'
import { submitEnquiryToBackend } from '../lib/api'
import './EnquiryModal.css'

// -------- Static data --------

const VEHICLE_YEARS = ['Not sure', ...Array.from({ length: 25 }, (_, i) => String(2025 - i))]

const MARITAL_STATUSES = ['Single', 'Married', 'De facto']

const CITIZENSHIP_STATUSES = [
  'Australian Citizen',
  'Permanent Resident',
  'Temporary Resident',
  'Student Visa',
  'Other',
]

const AU_STATES = ['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA']

const RESIDENTIAL_STATUSES = [
  'Mortgage',
  'Renting',
  'Living with friends or relatives',
  'Own outright',
  'Public housing',
  'Employer supplied',
]

const EMPLOYMENT_TYPES = [
  'Full time',
  'Part time',
  'Casual',
  'Contractor',
  'Self employed',
  'Not currently employed',
  'Other',
]

const INCOME_FREQUENCIES = ['Weekly', 'Fortnightly', 'Monthly', 'Quarterly', 'Annually']

const OTHER_INCOME_SOURCES = [
  'Rental income',
  'Centrelink',
  'Child support',
  'Investment income',
  'Family assistance',
  'Other government',
  'Other',
]

const FIXED_EXPENSE_KEYS = [
  'Council Rates / Body Corporate',
  'Home & Contents Insurance',
  'Electricity / Gas / Water',
  'Internet',
  'Mobile Phone',
  'Groceries / Household Items',
  'Fuel / Public Transport',
  'Vehicle Registration',
  'Vehicle Insurance',
]

const DISCRETIONARY_EXPENSE_KEYS = [
  'Dining Out / Takeaway',
  'Entertainment (Movies, Events etc.)',
  'Streaming / Digital Subscriptions',
  'Holidays / Travel',
  'Clothing / Personal Shopping',
  'Hair / Beauty / Grooming',
  'Gym / Fitness Memberships',
  'Other',
]

const EXPENSE_FREQUENCIES = ['Weekly', 'Monthly', 'Quarterly', 'Annually']

const TOTAL_STEPS = 6

// -------- Helpers --------

// Build initial expenses object from a list of category names
const makeExpenses = (keys) =>
  Object.fromEntries(keys.map((k) => [k, { amount: '', frequency: 'Monthly' }]))

// Convert any amount to its monthly equivalent
function toMonthly(amount, frequency) {
  const n = parseFloat(amount) || 0
  if (!n) return 0
  switch (frequency) {
    case 'Weekly':      return (n * 52) / 12
    case 'Fortnightly': return (n * 26) / 12
    case 'Monthly':     return n
    case 'Quarterly':   return n / 3
    case 'Annually':    return n / 12
    default:            return 0
  }
}

// Sum all expenses in an expense object to a monthly total
function expenseTotal(expenses) {
  return Object.values(expenses).reduce(
    (sum, { amount, frequency }) => sum + toMonthly(amount, frequency),
    0
  )
}

// Format as AUD currency, no decimal places
function fmt(n) {
  return n.toLocaleString('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

const INITIAL_FORM = {
  // Step 1 — Loan Type
  loanType: '', // 'Car loan' | 'Personal loan'

  // Step 2 — The Basics
  loanAmount: '',
  loanPurpose: '',    // Personal loan only
  vehicleCondition: '', // Car loan only
  yearOfManufacture: '',
  vehicleMake: '',
  vehicleModel: '',
  vehicleKm: '',

  // Step 2 — About You
  firstName: '',
  lastName: '',
  mobile: '',
  email: '',
  dateOfBirth: '',
  maritalStatus: '',
  citizenshipStatus: '',
  numDependants: '0',
  dependantAges: [],
  licenceNumber: '',
  licenceExpiry: '',
  licenceCardNumber: '',
  licenceState: '',

  // Step 3 — Where You Live
  streetAddress: '',
  suburb: '',
  postcode: '',
  residentialStatus: '',
  mortgageBalance: '',
  mortgageRepayments: '',
  rentalPayments: '',
  timeAtAddressYears: '',
  timeAtAddressMonths: '0',
  prevAddress: '',
  prevResidentialStatus: '',
  prevMortgageBalance: '',
  prevMortgageRepayments: '',
  prevRentalPayments: '',
  otherPropertyMortgage: '',
  otherPropertyBalance: '',
  otherPropertyRepayments: '',

  // Step 4 — Your Job
  occupation: '',
  employerName: '',
  employmentType: '',
  afterTaxIncome: '',
  incomeFrequency: 'Monthly',
  timeInJobYears: '',
  timeInJobMonths: '0',
  prevOccupation: '',
  prevEmployerName: '',
  prevEmploymentType: '',
  otherIncome: [],
  partnerIncome: '',
  partnerIncomeFrequency: 'Monthly',

  // Step 5 — Expenses
  fixedExpenses: makeExpenses(FIXED_EXPENSE_KEYS),
  discretionaryExpenses: makeExpenses(DISCRETIONARY_EXPENSE_KEYS),

  // Step 6 — Additional info
  additionalInfo: '',

  consent: false,
}

// -------- Reusable sub-components --------

function FieldError({ msg }) {
  if (!msg) return null
  return <span className="form-error" role="alert">{msg}</span>
}

// Pill-style toggle button group
function ToggleGroup({ options, value, onChange, error }) {
  return (
    <div className={`toggle-group${error ? ' toggle-group--error' : ''}`}>
      {options.map((opt) => {
        const val = typeof opt === 'string' ? opt : opt.value
        const label = typeof opt === 'string' ? opt : opt.label
        return (
          <button
            key={val}
            type="button"
            className={`toggle-btn${value === val ? ' toggle-btn--active' : ''}`}
            onClick={() => onChange(val)}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

// A single expense row: label | $ amount | frequency dropdown
function ExpenseRow({ label, expense, onChange }) {
  return (
    <div className="expense-row">
      <span className="expense-row__label">{label}</span>
      <div className="expense-row__inputs">
        <div className="expense-row__amount-wrap">
          <span className="expense-row__dollar">$</span>
          <input
            type="number"
            min="0"
            className="form-input expense-row__amount"
            value={expense.amount}
            onChange={(e) => onChange({ ...expense, amount: e.target.value })}
            placeholder="0"
          />
        </div>
        <select
          className="form-input expense-row__freq"
          value={expense.frequency}
          onChange={(e) => onChange({ ...expense, frequency: e.target.value })}
        >
          {EXPENSE_FREQUENCIES.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

// -------- Main modal component --------
export default function EnquiryModal() {
  const { isOpen, close } = useModal()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  // Derived booleans for conditional sections
  const numDeps = parseInt(form.numDependants) || 0
  const addressMonths =
    (parseInt(form.timeAtAddressYears) || 0) * 12 +
    (parseInt(form.timeAtAddressMonths) || 0)
  const needsPrevAddress = form.timeAtAddressYears !== '' && addressMonths < 24
  const jobMonths =
    (parseInt(form.timeInJobYears) || 0) * 12 +
    (parseInt(form.timeInJobMonths) || 0)
  const needsPrevEmployer = form.timeInJobYears !== '' && jobMonths < 24
  const isPartnerIncome = ['Married', 'De facto'].includes(form.maritalStatus)

  // Expense running totals
  const fixedTotal = expenseTotal(form.fixedExpenses)
  const discTotal = expenseTotal(form.discretionaryExpenses)
  const overallTotal = fixedTotal + discTotal

  // ---- Side effects ----

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, close])

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Reset all state after modal closes (delayed so animation finishes)
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setStep(1)
        setForm(INITIAL_FORM)
        setErrors({})
        setSubmitted(false)
        setSubmitError('')
      }, 350)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  // ---- Field setters ----

  const setField = (field) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((f) => ({ ...f, [field]: val }))
    setErrors((err) => ({ ...err, [field]: '' }))
  }

  const setToggle = (field) => (val) => {
    setForm((f) => ({ ...f, [field]: val }))
    setErrors((err) => ({ ...err, [field]: '' }))
  }

  // Resize the dependantAges array when the number changes
  const setNumDependants = (val) => {
    const n = Math.max(0, Math.min(10, parseInt(val) || 0))
    setForm((f) => ({
      ...f,
      numDependants: String(n),
      dependantAges: Array(n).fill('').map((_, i) => f.dependantAges[i] || ''),
    }))
  }

  const setDependantAge = (i, val) => {
    setForm((f) => {
      const ages = [...f.dependantAges]
      ages[i] = val
      return { ...f, dependantAges: ages }
    })
  }

  const toggleOtherIncome = (source) => {
    setForm((f) => ({
      ...f,
      otherIncome: f.otherIncome.includes(source)
        ? f.otherIncome.filter((s) => s !== source)
        : [...f.otherIncome, source],
    }))
  }

  // Update a single expense entry (amount or frequency)
  const setExpense = (type, key) => (val) => {
    setForm((f) => ({ ...f, [type]: { ...f[type], [key]: val } }))
  }

  // ---- Validation ----
  const validate = (s) => {
    const e = {}
    if (s === 1) {
      if (!form.loanType) e.loanType = 'Please select a loan type'
    }
    if (s === 2) {
      if (!form.loanAmount) e.loanAmount = 'Please enter a loan amount'
      if (form.loanType === 'Car loan' && !form.vehicleCondition) e.vehicleCondition = 'Please select vehicle condition'
      if (form.loanType === 'Personal loan' && !form.loanPurpose.trim()) e.loanPurpose = 'Please describe what the loan is for'
    }
    if (s === 3) {
      if (!form.firstName.trim()) e.firstName = 'Required'
      if (!form.lastName.trim()) e.lastName = 'Required'
      if (!form.mobile.trim()) e.mobile = 'Required'
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
      if (!form.dateOfBirth) e.dateOfBirth = 'Required'
      if (!form.maritalStatus) e.maritalStatus = 'Required'
      if (!form.citizenshipStatus) e.citizenshipStatus = 'Required'
    }
    if (s === 4) {
      if (!form.streetAddress.trim()) e.streetAddress = 'Required'
      if (!form.suburb.trim()) e.suburb = 'Required'
      if (!form.postcode.trim()) e.postcode = 'Required'
      if (!form.residentialStatus) e.residentialStatus = 'Required'
      if (form.timeAtAddressYears === '') e.timeAtAddressYears = 'Required'
    }
    if (s === 5) {
      if (!form.occupation.trim()) e.occupation = 'Required'
      if (!form.employmentType) e.employmentType = 'Required'
      if (!form.afterTaxIncome) e.afterTaxIncome = 'Required'
      if (form.timeInJobYears === '') e.timeInJobYears = 'Required'
    }
    if (s === 6) {
      if (!form.consent) e.consent = 'You must consent to continue'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const scrollModalTop = () => document.querySelector('.modal')?.scrollTo(0, 0)

  const next = () => {
    if (!validate(step)) return
    setStep((s) => s + 1)
    scrollModalTop()
  }

  const back = () => {
    setStep((s) => s - 1)
    scrollModalTop()
  }

const handleSubmit = async (e) => {
  e.preventDefault()
  if (!validate(5)) return
  setLoading(true)
  setSubmitError('')
  try {
    await submitEnquiryToBackend(form)
    setSubmitted(true)
  } catch (err) {
    console.error(err)
    setSubmitError(err.message || 'Something went wrong. Please try again.')
  } finally {
    setLoading(false)
  }
}

  if (!isOpen) return null

  const progress = `${(step / TOTAL_STEPS) * 100}%`

  return (
    <div className="modal-scrim" onClick={close} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal__close" onClick={close} aria-label="Close">×</button>

        {!submitted && (
          <div className="modal__progress" aria-hidden="true">
            <div className="modal__progress-fill" style={{ width: progress }} />
          </div>
        )}

        {/* ===================== SUCCESS STATE ===================== */}
        {submitted ? (
          <div className="modal__success">
            <div className="modal__success-icon" aria-hidden="true">✓</div>
            <h2 className="modal__success-heading" id="modal-title">
              Thanks, {form.firstName}.
            </h2>
            <p className="modal__success-body">
              We've received your enquiry and will be in touch — usually within 1 business day.
            </p>
            <div className="modal__whats-next">
              <p className="modal__whats-next__heading">What Happens Next?</p>
              <p className="modal__whats-next__body">
                You will soon receive an email with a link to sign our Privacy Consent form. Signing this form gives us your permission to use the information you supplied us with to work with lenders to get the best rate for you.
              </p>
            </div>
            <button className="btn-primary modal__done-btn" onClick={close}>Done</button>
          </div>
        ) : (
          <form
            onSubmit={step === TOTAL_STEPS ? handleSubmit : (e) => e.preventDefault()}
            noValidate
          >

            {/* ===================== STEP 1 — Loan Type ===================== */}
            {step === 1 && (
              <div className="modal__step">
                <p className="modal__step-label">Step 1 of {TOTAL_STEPS}</p>
                <h2 className="modal__title" id="modal-title">What are you looking for?</h2>
                <p className="modal__intro">
                  Let's start with the type of loan you need.
                </p>

                <div className="form-group">
                  <ToggleGroup
                    options={['Car loan', 'Personal loan']}
                    value={form.loanType}
                    onChange={setToggle('loanType')}
                    error={errors.loanType}
                  />
                  <FieldError msg={errors.loanType} />
                </div>

                <button type="button" className="btn-primary modal__next" onClick={next}>
                  Next →
                </button>
              </div>
            )}

            {/* ===================== STEP 2 — The Basics ===================== */}
            {step === 2 && (
              <div className="modal__step">
                <p className="modal__step-label">Step 2 of {TOTAL_STEPS}</p>
                <h2 className="modal__title" id="modal-title">The basics</h2>
                <p className="modal__intro">
                  Completing this form won't take long, we promise. Please answer as accurately as possible to get the quickest quote.
                </p>

                <div className="form-group">
                  <label htmlFor="loanAmount" className="form-label">Loan amount *</label>
                  <div className="input-prefix-wrap">
                    <span className="input-prefix">$</span>
                    <input
                      id="loanAmount"
                      type="number"
                      min="0"
                      inputMode="numeric"
                      className={`form-input input-prefix-input${errors.loanAmount ? ' form-input--error' : ''}`}
                      value={form.loanAmount}
                      onChange={setField('loanAmount')}
                      placeholder="e.g. 25000"
                    />
                  </div>
                  <FieldError msg={errors.loanAmount} />
                </div>

                {/* Car loan — vehicle condition + optional vehicle details */}
                {form.loanType === 'Car loan' && (
                  <>
                    <div className="form-group">
                      <p className="form-label">Vehicle details *</p>
                      <ToggleGroup
                        options={['New / Demo', 'Used', 'Refinance']}
                        value={form.vehicleCondition}
                        onChange={setToggle('vehicleCondition')}
                        error={errors.vehicleCondition}
                      />
                      <FieldError msg={errors.vehicleCondition} />
                    </div>

                    {form.vehicleCondition === 'Used' && (
                      <div className="form-group">
                        <label htmlFor="yearOfManufacture" className="form-label">Year of manufacture</label>
                        <select
                          id="yearOfManufacture"
                          className="form-input"
                          value={form.yearOfManufacture}
                          onChange={setField('yearOfManufacture')}
                        >
                          <option value="">Select year</option>
                          {VEHICLE_YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                        </select>
                      </div>
                    )}

                    {form.vehicleCondition === 'Refinance' && (
                      <>
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="yearOfManufacture" className="form-label">Vehicle year</label>
                            <select
                              id="yearOfManufacture"
                              className="form-input"
                              value={form.yearOfManufacture}
                              onChange={setField('yearOfManufacture')}
                            >
                              <option value="">Select year</option>
                              {VEHICLE_YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                            </select>
                          </div>
                          <div className="form-group">
                            <label htmlFor="vehicleMake" className="form-label">Vehicle make</label>
                            <input
                              id="vehicleMake" type="text" className="form-input"
                              placeholder="e.g. Toyota"
                              value={form.vehicleMake} onChange={setField('vehicleMake')}
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="vehicleModel" className="form-label">Vehicle model</label>
                            <input
                              id="vehicleModel" type="text" className="form-input"
                              placeholder="e.g. Camry"
                              value={form.vehicleModel} onChange={setField('vehicleModel')}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="vehicleKm" className="form-label">Kilometres travelled</label>
                            <input
                              id="vehicleKm" type="number" min="0" className="form-input"
                              placeholder="e.g. 45000"
                              value={form.vehicleKm} onChange={setField('vehicleKm')}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}

                {/* Personal loan — purpose of loan */}
                {form.loanType === 'Personal loan' && (
                  <div className="form-group">
                    <label htmlFor="loanPurpose" className="form-label">Purpose of loan *</label>
                    <input
                      id="loanPurpose"
                      type="text"
                      className={`form-input${errors.loanPurpose ? ' form-input--error' : ''}`}
                      value={form.loanPurpose}
                      onChange={setField('loanPurpose')}
                      placeholder="e.g. Debt consolidation, home renovation…"
                    />
                    <FieldError msg={errors.loanPurpose} />
                  </div>
                )}

                <div className="modal__step-nav">
                  <button type="button" className="btn-secondary" onClick={back}>← Back</button>
                  <button type="button" className="btn-primary" onClick={next}>Next →</button>
                </div>
              </div>
            )}

            {/* ===================== STEP 3 — About You ===================== */}
            {step === 3 && (
              <div className="modal__step">
                <p className="modal__step-label">Step 3 of {TOTAL_STEPS}</p>
                <h2 className="modal__title" id="modal-title">About you</h2>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName" className="form-label">First name *</label>
                    <input
                      id="firstName" type="text" autoComplete="given-name" autoFocus
                      className={`form-input${errors.firstName ? ' form-input--error' : ''}`}
                      value={form.firstName} onChange={setField('firstName')}
                    />
                    <FieldError msg={errors.firstName} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName" className="form-label">Last name *</label>
                    <input
                      id="lastName" type="text" autoComplete="family-name"
                      className={`form-input${errors.lastName ? ' form-input--error' : ''}`}
                      value={form.lastName} onChange={setField('lastName')}
                    />
                    <FieldError msg={errors.lastName} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="mobile" className="form-label">Mobile *</label>
                    <input
                      id="mobile" type="tel" autoComplete="tel" inputMode="numeric"
                      className={`form-input${errors.mobile ? ' form-input--error' : ''}`}
                      value={form.mobile} onChange={setField('mobile')}
                    />
                    <FieldError msg={errors.mobile} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email *</label>
                    <input
                      id="email" type="email" autoComplete="email"
                      className={`form-input${errors.email ? ' form-input--error' : ''}`}
                      value={form.email} onChange={setField('email')}
                    />
                    <FieldError msg={errors.email} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="dateOfBirth" className="form-label">Date of birth *</label>
                    <input
                      id="dateOfBirth" type="date" autoComplete="bday"
                      className={`form-input${errors.dateOfBirth ? ' form-input--error' : ''}`}
                      value={form.dateOfBirth} onChange={setField('dateOfBirth')}
                    />
                    <FieldError msg={errors.dateOfBirth} />
                  </div>
                  <div className="form-group">
                    <p className={`form-label${errors.maritalStatus ? ' form-label--error' : ''}`}>Marital status *</p>
                    <ToggleGroup
                      options={MARITAL_STATUSES}
                      value={form.maritalStatus}
                      onChange={setToggle('maritalStatus')}
                      error={errors.maritalStatus}
                    />
                    <FieldError msg={errors.maritalStatus} />
                  </div>
                </div>

                <div className="form-group">
                  <p className={`form-label${errors.citizenshipStatus ? ' form-label--error' : ''}`}>Residency status *</p>
                  <ToggleGroup
                    options={CITIZENSHIP_STATUSES}
                    value={form.citizenshipStatus}
                    onChange={setToggle('citizenshipStatus')}
                    error={errors.citizenshipStatus}
                  />
                  <FieldError msg={errors.citizenshipStatus} />
                </div>

                <div className="form-group">
                  <label htmlFor="numDependants" className="form-label">Number of dependants</label>
                  <input
                    id="numDependants" type="number" min="0" max="10"
                    className="form-input form-input--narrow"
                    value={form.numDependants}
                    onChange={(e) => setNumDependants(e.target.value)}
                  />
                </div>

                {numDeps > 0 && (
                  <div className="form-group">
                    <p className="form-label">Age of dependants</p>
                    <div className="dependant-ages">
                      {Array(numDeps).fill(null).map((_, i) => (
                        <input
                          key={i}
                          type="number" min="0" max="25"
                          className="form-input form-input--narrow"
                          placeholder={`Child ${i + 1}`}
                          value={form.dependantAges[i] || ''}
                          onChange={(e) => setDependantAge(i, e.target.value)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <p className="form-section-heading">Driver's licence</p>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="licenceNumber" className="form-label">Licence number</label>
                    <input
                      id="licenceNumber" type="text" className="form-input"
                      value={form.licenceNumber} onChange={setField('licenceNumber')}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="licenceExpiry" className="form-label">Expiry date</label>
                    <input
                      id="licenceExpiry" type="date" className="form-input"
                      value={form.licenceExpiry} onChange={setField('licenceExpiry')}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="licenceCardNumber" className="form-label">
                      Card number <span className="form-label-optional">(usually on the back)</span>
                    </label>
                    <input
                      id="licenceCardNumber" type="text" className="form-input"
                      value={form.licenceCardNumber} onChange={setField('licenceCardNumber')}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="licenceState" className="form-label">State</label>
                    <select
                      id="licenceState" className="form-input"
                      value={form.licenceState} onChange={setField('licenceState')}
                    >
                      <option value="">Select...</option>
                      {AU_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div className="modal__step-nav">
                  <button type="button" className="btn-secondary" onClick={back}>← Back</button>
                  <button type="button" className="btn-primary" onClick={next}>Next →</button>
                </div>
              </div>
            )}

            {/* ===================== STEP 4 — Where You Live ===================== */}
            {step === 4 && (
              <div className="modal__step">
                <p className="modal__step-label">Step 4 of {TOTAL_STEPS}</p>
                <h2 className="modal__title" id="modal-title">Where you live</h2>

                <div className="form-group">
                  <label htmlFor="streetAddress" className="form-label">Street address *</label>
                  <input
                    id="streetAddress" type="text" autoComplete="street-address" autoFocus
                    className={`form-input${errors.streetAddress ? ' form-input--error' : ''}`}
                    value={form.streetAddress} onChange={setField('streetAddress')}
                  />
                  <FieldError msg={errors.streetAddress} />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="suburb" className="form-label">Suburb *</label>
                    <input
                      id="suburb" type="text" autoComplete="address-level2"
                      className={`form-input${errors.suburb ? ' form-input--error' : ''}`}
                      value={form.suburb} onChange={setField('suburb')}
                    />
                    <FieldError msg={errors.suburb} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="postcode" className="form-label">Postcode *</label>
                    <input
                      id="postcode" type="text" autoComplete="postal-code" inputMode="numeric" maxLength={4}
                      className={`form-input${errors.postcode ? ' form-input--error' : ''}`}
                      value={form.postcode} onChange={setField('postcode')}
                    />
                    <FieldError msg={errors.postcode} />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="residentialStatus" className="form-label">Residential status *</label>
                  <select
                    id="residentialStatus"
                    className={`form-input${errors.residentialStatus ? ' form-input--error' : ''}`}
                    value={form.residentialStatus} onChange={setField('residentialStatus')}
                  >
                    <option value="">Select...</option>
                    {RESIDENTIAL_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <FieldError msg={errors.residentialStatus} />
                </div>

                {form.residentialStatus === 'Mortgage' && (
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="mortgageBalance" className="form-label">Current mortgage balance</label>
                      <div className="input-prefix-wrap">
                        <span className="input-prefix">$</span>
                        <input id="mortgageBalance" type="number" min="0"
                          className="form-input input-prefix-input"
                          value={form.mortgageBalance} onChange={setField('mortgageBalance')} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="mortgageRepayments" className="form-label">Monthly repayments</label>
                      <div className="input-prefix-wrap">
                        <span className="input-prefix">$</span>
                        <input id="mortgageRepayments" type="number" min="0"
                          className="form-input input-prefix-input"
                          value={form.mortgageRepayments} onChange={setField('mortgageRepayments')} />
                      </div>
                    </div>
                  </div>
                )}

                {form.residentialStatus === 'Renting' && (
                  <div className="form-group">
                    <label htmlFor="rentalPayments" className="form-label">Monthly rental payments</label>
                    <div className="input-prefix-wrap">
                      <span className="input-prefix">$</span>
                      <input id="rentalPayments" type="number" min="0"
                        className="form-input input-prefix-input"
                        value={form.rentalPayments} onChange={setField('rentalPayments')} />
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <p className="form-label">Time at this address *</p>
                  <div className="form-row form-row--tight">
                    <div className="form-group">
                      <label htmlFor="timeAtAddressYears" className="form-label form-label--sub">Years</label>
                      <input
                        id="timeAtAddressYears" type="number" min="0" max="99"
                        className={`form-input${errors.timeAtAddressYears ? ' form-input--error' : ''}`}
                        value={form.timeAtAddressYears} onChange={setField('timeAtAddressYears')}
                      />
                      <FieldError msg={errors.timeAtAddressYears} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="timeAtAddressMonths" className="form-label form-label--sub">Months</label>
                      <select id="timeAtAddressMonths" className="form-input"
                        value={form.timeAtAddressMonths} onChange={setField('timeAtAddressMonths')}>
                        {Array(12).fill(null).map((_, i) => <option key={i} value={i}>{i}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {needsPrevAddress && (
                  <div className="form-group--indented">
                    <p className="form-hint">Less than 2 years at current address — please provide your previous address details.</p>
                    <div className="form-group">
                      <label htmlFor="prevAddress" className="form-label">Previous address</label>
                      <input id="prevAddress" type="text" className="form-input"
                        value={form.prevAddress} onChange={setField('prevAddress')} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="prevResidentialStatus" className="form-label">Residential status at previous address</label>
                      <select id="prevResidentialStatus" className="form-input"
                        value={form.prevResidentialStatus} onChange={setField('prevResidentialStatus')}>
                        <option value="">Select...</option>
                        {RESIDENTIAL_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    {form.prevResidentialStatus === 'Mortgage' && (
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="prevMortgageBalance" className="form-label">Mortgage balance</label>
                          <div className="input-prefix-wrap">
                            <span className="input-prefix">$</span>
                            <input id="prevMortgageBalance" type="number" min="0"
                              className="form-input input-prefix-input"
                              value={form.prevMortgageBalance} onChange={setField('prevMortgageBalance')} />
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="prevMortgageRepayments" className="form-label">Monthly repayments</label>
                          <div className="input-prefix-wrap">
                            <span className="input-prefix">$</span>
                            <input id="prevMortgageRepayments" type="number" min="0"
                              className="form-input input-prefix-input"
                              value={form.prevMortgageRepayments} onChange={setField('prevMortgageRepayments')} />
                          </div>
                        </div>
                      </div>
                    )}
                    {form.prevResidentialStatus === 'Renting' && (
                      <div className="form-group">
                        <label htmlFor="prevRentalPayments" className="form-label">Monthly rental payments</label>
                        <div className="input-prefix-wrap">
                          <span className="input-prefix">$</span>
                          <input id="prevRentalPayments" type="number" min="0"
                            className="form-input input-prefix-input"
                            value={form.prevRentalPayments} onChange={setField('prevRentalPayments')} />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="form-group">
                  <p className="form-label">Do you have a mortgage on any other property?</p>
                  <ToggleGroup
                    options={['Yes', 'No']}
                    value={form.otherPropertyMortgage}
                    onChange={setToggle('otherPropertyMortgage')}
                  />
                </div>

                {form.otherPropertyMortgage === 'Yes' && (
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="otherPropertyBalance" className="form-label">Mortgage balance</label>
                      <div className="input-prefix-wrap">
                        <span className="input-prefix">$</span>
                        <input id="otherPropertyBalance" type="number" min="0"
                          className="form-input input-prefix-input"
                          value={form.otherPropertyBalance} onChange={setField('otherPropertyBalance')} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="otherPropertyRepayments" className="form-label">Monthly repayments</label>
                      <div className="input-prefix-wrap">
                        <span className="input-prefix">$</span>
                        <input id="otherPropertyRepayments" type="number" min="0"
                          className="form-input input-prefix-input"
                          value={form.otherPropertyRepayments} onChange={setField('otherPropertyRepayments')} />
                      </div>
                    </div>
                  </div>
                )}

                <div className="modal__step-nav">
                  <button type="button" className="btn-secondary" onClick={back}>← Back</button>
                  <button type="button" className="btn-primary" onClick={next}>Next →</button>
                </div>
              </div>
            )}

            {/* ===================== STEP 5 — Your Job ===================== */}
            {step === 5 && (
              <div className="modal__step">
                <p className="modal__step-label">Step 5 of {TOTAL_STEPS}</p>
                <h2 className="modal__title" id="modal-title">Your job</h2>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="occupation" className="form-label">Occupation *</label>
                    <input
                      id="occupation" type="text" autoFocus
                      className={`form-input${errors.occupation ? ' form-input--error' : ''}`}
                      value={form.occupation} onChange={setField('occupation')}
                    />
                    <FieldError msg={errors.occupation} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="employerName" className="form-label">Employer name</label>
                    <input
                      id="employerName" type="text" className="form-input"
                      value={form.employerName} onChange={setField('employerName')}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="employmentType" className="form-label">Employment type *</label>
                  <select
                    id="employmentType"
                    className={`form-input${errors.employmentType ? ' form-input--error' : ''}`}
                    value={form.employmentType} onChange={setField('employmentType')}
                  >
                    <option value="">Select...</option>
                    {EMPLOYMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <FieldError msg={errors.employmentType} />
                </div>

                <div className="form-group">
                  <p className="form-label">After tax income *</p>
                  <div className="income-row">
                    <div className="input-prefix-wrap">
                      <span className="input-prefix">$</span>
                      <input
                        id="afterTaxIncome"
                        type="number" min="0"
                        className={`form-input input-prefix-input${errors.afterTaxIncome ? ' form-input--error' : ''}`}
                        value={form.afterTaxIncome} onChange={setField('afterTaxIncome')}
                      />
                    </div>
                    <select
                      className="form-input income-freq-select"
                      value={form.incomeFrequency} onChange={setField('incomeFrequency')}
                    >
                      {INCOME_FREQUENCIES.map((f) => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                  <FieldError msg={errors.afterTaxIncome} />
                </div>

                <div className="form-group">
                  <p className="form-label">Time in this job *</p>
                  <div className="form-row form-row--tight">
                    <div className="form-group">
                      <label htmlFor="timeInJobYears" className="form-label form-label--sub">Years</label>
                      <input
                        id="timeInJobYears" type="number" min="0" max="99"
                        className={`form-input${errors.timeInJobYears ? ' form-input--error' : ''}`}
                        value={form.timeInJobYears} onChange={setField('timeInJobYears')}
                      />
                      <FieldError msg={errors.timeInJobYears} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="timeInJobMonths" className="form-label form-label--sub">Months</label>
                      <select id="timeInJobMonths" className="form-input"
                        value={form.timeInJobMonths} onChange={setField('timeInJobMonths')}>
                        {Array(12).fill(null).map((_, i) => <option key={i} value={i}>{i}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {needsPrevEmployer && (
                  <div className="form-group--indented">
                    <p className="form-hint">Less than 2 years in current job — please provide your previous employment details.</p>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="prevOccupation" className="form-label">Previous occupation</label>
                        <input id="prevOccupation" type="text" className="form-input"
                          value={form.prevOccupation} onChange={setField('prevOccupation')} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="prevEmployerName" className="form-label">Previous employer</label>
                        <input id="prevEmployerName" type="text" className="form-input"
                          value={form.prevEmployerName} onChange={setField('prevEmployerName')} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="prevEmploymentType" className="form-label">Previous employment type</label>
                      <select id="prevEmploymentType" className="form-input"
                        value={form.prevEmploymentType} onChange={setField('prevEmploymentType')}>
                        <option value="">Select...</option>
                        {EMPLOYMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <p className="form-label">Other income sources <span className="form-label-optional">(select all that apply)</span></p>
                  <div className="checkbox-grid">
                    {OTHER_INCOME_SOURCES.map((source) => (
                      <label key={source} className="form-checkbox">
                        <input
                          type="checkbox"
                          checked={form.otherIncome.includes(source)}
                          onChange={() => toggleOtherIncome(source)}
                        />
                        <span>{source}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {isPartnerIncome && (
                  <div className="form-group">
                    <p className="form-label">Partner's after tax income</p>
                    <div className="income-row">
                      <div className="input-prefix-wrap">
                        <span className="input-prefix">$</span>
                        <input type="number" min="0" className="form-input input-prefix-input"
                          value={form.partnerIncome} onChange={setField('partnerIncome')} />
                      </div>
                      <select className="form-input income-freq-select"
                        value={form.partnerIncomeFrequency} onChange={setField('partnerIncomeFrequency')}>
                        {INCOME_FREQUENCIES.map((f) => <option key={f} value={f}>{f}</option>)}
                      </select>
                    </div>
                  </div>
                )}

                <div className="modal__step-nav">
                  <button type="button" className="btn-secondary" onClick={back}>← Back</button>
                  <button type="button" className="btn-primary" onClick={next}>Next →</button>
                </div>
              </div>
            )}

            {/* ===================== STEP 6 — Expenses + Submit ===================== */}
            {step === 6 && (
              <div className="modal__step">
                <p className="modal__step-label">Step 6 of {TOTAL_STEPS}</p>
                <h2 className="modal__title" id="modal-title">Your expenses</h2>
                <p className="modal__intro">As best you can, give us an understanding of your monthly spending habits.</p>

                <div className="expense-section">
                  <p className="expense-section__heading">Fixed & General Expenses</p>
                  {FIXED_EXPENSE_KEYS.map((key) => (
                    <ExpenseRow
                      key={key}
                      label={key}
                      expense={form.fixedExpenses[key]}
                      onChange={setExpense('fixedExpenses', key)}
                    />
                  ))}
                  <div className="expense-total">
                    <span>Fixed expenses total (monthly)</span>
                    <span className="expense-total__amount">{fmt(fixedTotal)}</span>
                  </div>
                </div>

                <div className="expense-section">
                  <p className="expense-section__heading">Discretionary Expenses</p>
                  {DISCRETIONARY_EXPENSE_KEYS.map((key) => (
                    <ExpenseRow
                      key={key}
                      label={key}
                      expense={form.discretionaryExpenses[key]}
                      onChange={setExpense('discretionaryExpenses', key)}
                    />
                  ))}
                  <div className="expense-total">
                    <span>Discretionary expenses total (monthly)</span>
                    <span className="expense-total__amount">{fmt(discTotal)}</span>
                  </div>
                </div>

                <div className="expense-overall-total">
                  <span>Overall monthly expenses</span>
                  <span className="expense-overall-total__amount">{fmt(overallTotal)}</span>
                </div>

                <div className="form-group" style={{ marginTop: '2rem' }}>
                  <label className="form-label">Any other relevant information</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Anything else you'd like us to know about your situation…"
                    rows={4}
                    value={form.additionalInfo}
                    onChange={setField('additionalInfo')}
                  />
                </div>

                <div className="form-group">
                  <label className={`form-checkbox${errors.consent ? ' form-checkbox--error' : ''}`}>
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={setField('consent')}
                    />
                    <span>
                      I consent to Loan Fair contacting me about my enquiry and using my information in line with the{' '}
                      <a href="/privacy" className="form-text-link" onClick={close}>Privacy Policy</a>.
                    </span>
                  </label>
                  <FieldError msg={errors.consent} />
                </div>

                {submitError && <p className="form-error form-error--global">{submitError}</p>}

                <div className="modal__step-nav">
                  <button type="button" className="btn-secondary" onClick={back}>← Back</button>
                  <button type="submit" className="btn-primary modal__submit-btn" disabled={loading}>
                    {loading ? 'Sending…' : 'Send My Enquiry →'}
                  </button>
                </div>
              </div>
            )}

          </form>
        )}
      </div>
    </div>
  )
}
