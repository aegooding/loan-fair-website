const BASE_URL = import.meta.env.VITE_API_URL;

const api = async (path, options = {}) => {
  const token = localStorage.getItem('lf_token');
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Something went wrong');
  return data;
};

const toAnnual = (amount, frequency) => {
  const n = parseFloat(amount) || 0;
  switch (frequency) {
    case 'Weekly':      return n * 52;
    case 'Fortnightly': return n * 26;
    case 'Monthly':     return n * 12;
    case 'Quarterly':   return n * 4;
    case 'Annually':    return n;
    default:            return n * 12;
  }
};

const toMonthly = (amount, frequency) => {
  const n = parseFloat(amount) || 0;
  switch (frequency) {
    case 'Weekly':      return (n * 52) / 12;
    case 'Fortnightly': return (n * 26) / 12;
    case 'Monthly':     return n;
    case 'Quarterly':   return n / 3;
    case 'Annually':    return n / 12;
    default:            return 0;
  }
};

const expenseTotal = (expenses) =>
  Object.values(expenses).reduce(
    (sum, { amount, frequency }) => sum + toMonthly(amount, frequency),
    0
  );

const mapEmploymentType = (type) => {
  const map = {
    'Full time':              'FULL_TIME',
    'Part time':              'PART_TIME',
    'Casual':                 'CASUAL',
    'Contractor':             'CONTRACTOR',
    'Self employed':          'SELF_EMPLOYED',
    'Not currently employed': 'UNEMPLOYED',
    'Other':                  'FULL_TIME',
  };
  return map[type] || 'FULL_TIME';
};

const mapVehicleCondition = (condition) => {
  const map = { 'New': 'NEW', 'Demo': 'DEMO', 'Used': 'USED' };
  return map[condition] || 'USED';
};

export const submitEnquiryToBackend = async (form) => {
  // Step 1 — Register user and get clientId back in one step
  let clientId;

  try {
    const registerRes = await api('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email: form.email,
        name: `${form.firstName} ${form.lastName}`,
        phone: form.mobile,
        password: Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2),
        role: 'CLIENT',
      }),
    });
    localStorage.setItem('lf_token', registerRes.data.token);
    clientId = registerRes.data.clientId;
  } catch (err) {
    // If email already registered, try logging in instead
    if (err.message.includes('already registered')) {
      throw new Error('This email is already registered. Please use a different email address.');
    }
    throw err;
  }

  if (!clientId) {
    throw new Error('Could not create client profile. Please try again.');
  }

  // Step 2 — Calculate financials
  const monthlyExpenses =
    expenseTotal(form.fixedExpenses) + expenseTotal(form.discretionaryExpenses);
  const annualIncome = toAnnual(form.afterTaxIncome, form.incomeFrequency);
  const partnerAnnualIncome = form.partnerIncome
    ? toAnnual(form.partnerIncome, form.partnerIncomeFrequency)
    : 0;
  const employmentYears =
    (parseInt(form.timeInJobYears) || 0) +
    (parseInt(form.timeInJobMonths) || 0) / 12;

  // Step 3 — Build enquiry payload, differentiating by loan type
  const isCarLoan = form.loanType === 'Car loan'

  const enquiryPayload = {
    clientId,
    loanType: isCarLoan
      ? (form.vehicleCondition === 'New / Demo' ? 'CAR_LOAN_NEW' : 'CAR_LOAN_USED')
      : 'PERSONAL_LOAN',
    loanAmount: parseFloat(form.loanAmount) || 0,
    // Vehicle fields — only for car loans
    ...(isCarLoan && {
      vehicleMake: form.vehicleMake || null,
      vehicleModel: form.vehicleModel || null,
      vehicleYear: form.yearOfManufacture && form.yearOfManufacture !== 'Not sure'
        ? parseInt(form.yearOfManufacture) : null,
      vehicleKms: form.vehicleKm ? parseInt(form.vehicleKm) : null,
      vehicleCondition: mapVehicleCondition(form.vehicleCondition),
    }),
    // Loan purpose — only for personal loans
    ...(!isCarLoan && {
      loanPurpose: form.loanPurpose || null,
    }),
    clientData: {
      // Identity
      dateOfBirth: form.dateOfBirth || null,
      maritalStatus: form.maritalStatus || null,
      numDependants: parseInt(form.numDependants) || 0,
      dependantAges: form.dependantAges.filter(Boolean).map(Number),
      licenceNumber: form.licenceNumber || null,
      licenceExpiry: form.licenceExpiry || null,
      licenceCardNumber: form.licenceCardNumber || null,
      licenceState: form.licenceState || null,
      // Current address
      address: `${form.streetAddress}, ${form.suburb} ${form.postcode}`,
      streetAddress: form.streetAddress || null,
      city: form.suburb || null,
      state: form.licenceState || null,
      postcode: form.postcode || null,
      residencyStatus: form.residentialStatus || null,
      mortgageBalance: form.mortgageBalance ? parseFloat(form.mortgageBalance) : null,
      mortgageRepayments: form.mortgageRepayments ? parseFloat(form.mortgageRepayments) : null,
      rentalPayments: form.rentalPayments ? parseFloat(form.rentalPayments) : null,
      timeAtAddressYears: parseInt(form.timeAtAddressYears) || 0,
      timeAtAddressMonths: parseInt(form.timeAtAddressMonths) || 0,
      // Previous address (only present if they moved within the last 2 years)
      prevAddress: form.prevAddress || null,
      prevResidentialStatus: form.prevResidentialStatus || null,
      prevMortgageBalance: form.prevMortgageBalance ? parseFloat(form.prevMortgageBalance) : null,
      prevMortgageRepayments: form.prevMortgageRepayments ? parseFloat(form.prevMortgageRepayments) : null,
      prevRentalPayments: form.prevRentalPayments ? parseFloat(form.prevRentalPayments) : null,
      // Other property
      otherPropertyMortgage: form.otherPropertyMortgage || null,
      otherPropertyBalance: form.otherPropertyBalance ? parseFloat(form.otherPropertyBalance) : null,
      otherPropertyRepayments: form.otherPropertyRepayments ? parseFloat(form.otherPropertyRepayments) : null,
      // Employment
      occupation: form.occupation || null,
      employmentStatus: mapEmploymentType(form.employmentType),
      employerName: form.employerName || null,
      employmentYears,
      timeInJobYears: parseInt(form.timeInJobYears) || 0,
      timeInJobMonths: parseInt(form.timeInJobMonths) || 0,
      prevOccupation: form.prevOccupation || null,
      prevEmployerName: form.prevEmployerName || null,
      prevEmploymentType: form.prevEmploymentType || null,
      // Income
      annualIncome,
      afterTaxIncome: parseFloat(form.afterTaxIncome) || 0,
      incomeFrequency: form.incomeFrequency || null,
      otherIncomeSources: form.otherIncome,
      partnerAnnualIncome,
      partnerIncome: parseFloat(form.partnerIncome) || 0,
      partnerIncomeFrequency: form.partnerIncomeFrequency || null,
      // Expenses — totals
      monthlyExpenses,
      monthlyFixedExpenses: expenseTotal(form.fixedExpenses),
      monthlyDiscretionaryExpenses: expenseTotal(form.discretionaryExpenses),
      // Expenses — itemised (amounts converted to monthly for consistency)
      fixedExpenses: Object.fromEntries(
        Object.entries(form.fixedExpenses).map(([k, v]) => [k, toMonthly(v.amount, v.frequency)])
      ),
      discretionaryExpenses: Object.fromEntries(
        Object.entries(form.discretionaryExpenses).map(([k, v]) => [k, toMonthly(v.amount, v.frequency)])
      ),
    },
  }

  const enquiryRes = await api('/enquiries', {
    method: 'POST',
    body: JSON.stringify(enquiryPayload),
  });

  return enquiryRes.data;
};