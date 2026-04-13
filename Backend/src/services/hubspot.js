// ============================================================
// HubSpot CRM Service
// ============================================================

const HUBSPOT_BASE = 'https://api.hubapi.com';

const headers = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
});

const hubspotFetch = async (path, options = {}) => {
  const res = await fetch(`${HUBSPOT_BASE}${path}`, {
    ...options,
    headers: headers(),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(`HubSpot API error ${res.status}: ${error.message}`);
  }

  return res.json();
};

// ── CONTACTS ─────────────────────────────────────────────────

export const createHubSpotContact = async (client, user) => {
  const body = {
    properties: {
      email:     user.email,
      firstname: user.name.split(' ')[0],
      lastname:  user.name.split(' ').slice(1).join(' '),
      phone:     user.phone || '',
      address:   client.streetAddress || client.address || '',
      city:      client.city     || '',
      state:     client.state    || '',
      zip:       client.postcode || '',
      country:   client.country  || 'AU',
      jobtitle:  client.occupation    || '',
      company:   client.employerName  || '',
    },
  };

  const data = await hubspotFetch('/crm/v3/objects/contacts', {
    method: 'POST',
    body: JSON.stringify(body),
  });

  return data.id;
};

export const updateHubSpotContact = async (crmClientId, updates) => {
  return hubspotFetch(`/crm/v3/objects/contacts/${crmClientId}`, {
    method: 'PATCH',
    body: JSON.stringify({ properties: updates }),
  });
};

export const getHubSpotContact = async (crmClientId) => {
  return hubspotFetch(
    `/crm/v3/objects/contacts/${crmClientId}?properties=email,firstname,lastname,phone,loan_fair_client_id`
  );
};

// ── DEALS ─────────────────────────────────────────────────────

const STAGE_MAP = {
  NEW:                    'appointmentscheduled',
  IN_PROGRESS:            'qualifiedtobuy',
  DOCS_REQUESTED:         'qualifiedtobuy',
  DOCS_RECEIVED:          'presentationscheduled',
  SUBMITTED:              'presentationscheduled',
  CONDITIONALLY_APPROVED: 'decisionmakerboughtin',
  APPROVED:               'contractsent',
  SETTLED:                'closedwon',
  DECLINED:               'closedlost',
  WITHDRAWN:              'closedlost',
};

export const createHubSpotDeal = async (enquiry, client, user) => {
  const vehicleDesc = [enquiry.vehicleYear, enquiry.vehicleMake, enquiry.vehicleModel]
    .filter(Boolean)
    .join(' ');

  // Derive "Is Property Owner" from residential status or other property mortgage
  const ownsProperty =
    ['Mortgage', 'Own outright'].includes(client.residencyStatus) ||
    client.otherPropertyMortgage === 'Yes';

  const body = {
    properties: {
      dealname:          `${user.name} — ${vehicleDesc || enquiry.loanType} — ${enquiry.reference}`,
      amount:            enquiry.loanAmount?.toString() || '0',
      dealstage:         STAGE_MAP[enquiry.status] || 'appointmentscheduled',
      pipeline:          'default',
      closedate:         new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      description:       `Loan Fair ref: ${enquiry.reference} | Type: ${enquiry.loanType}${vehicleDesc ? ` | Vehicle: ${vehicleDesc}` : ''}`,
      loan_type:         enquiry.loanType || '',
      loan_term_months:  enquiry.loanTerm?.toString() || '',
      employment_type:   client.employmentStatus || '',
      residency_status:  client.citizenshipStatus || '',
      is_property_owner: ownsProperty ? 'Yes' : 'No',
    },
    associations: client.crmClientId
      ? [
          {
            to: { id: client.crmClientId },
            types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 3 }],
          },
        ]
      : [],
  };

  const data = await hubspotFetch('/crm/v3/objects/deals', {
    method: 'POST',
    body: JSON.stringify(body),
  });

  return data.id;
};

export const updateHubSpotDeal = async (crmEnquiryId, updates) => {
  const properties = {};
  if (updates.status) properties.dealstage = STAGE_MAP[updates.status] || updates.status;
  if (updates.loanAmount) properties.amount = updates.loanAmount.toString();
  if (updates.aiScore !== undefined) properties.ai_eligibility_score = updates.aiScore.toString();
  if (updates.aiSummary) properties.ai_summary = updates.aiSummary;
  if (updates.afosNotes) properties.afos_note = updates.afosNotes;

  return hubspotFetch(`/crm/v3/objects/deals/${crmEnquiryId}`, {
    method: 'PATCH',
    body: JSON.stringify({ properties }),
  });
};

export const getHubSpotDeal = async (crmEnquiryId) => {
  return hubspotFetch(
    `/crm/v3/objects/deals/${crmEnquiryId}?properties=dealname,amount,dealstage,loan_fair_reference,loan_type,ai_eligibility_score`
  );
};

// Build and attach a comprehensive note to a deal with all form data
export const createEnquiryNote = async (crmEnquiryId, client, enquiry) => {
  const fmt = (n) => (n != null ? `$${Number(n).toLocaleString('en-AU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : '—');
  const val = (v) => v || '—';

  const lines = [
    '=== LOAN FAIR ENQUIRY DETAILS ===',
    '',
    '--- PERSONAL ---',
    `Marital Status:   ${val(client.maritalStatus)}`,
    `Residency Status: ${val(client.citizenshipStatus)}`,
    `Dependants:       ${client.numDependants ?? 0}${client.dependantAges?.length ? ` (ages: ${client.dependantAges.join(', ')})` : ''}`,
    `Licence No:       ${val(client.licenceNumber)}`,
    `Licence Expiry:   ${val(client.licenceExpiry)}`,
    `Licence Card No:  ${val(client.licenceCardNumber)}`,
    `Licence State:    ${val(client.licenceState)}`,
    '',
    '--- CURRENT ADDRESS ---',
    `Address:          ${val(client.streetAddress || client.address)}`,
    `Suburb/City:      ${val(client.city)}`,
    `State:            ${val(client.state)}`,
    `Postcode:         ${val(client.postcode)}`,
    `Residency Status: ${val(client.residencyStatus)}`,
    `Time at Address:  ${client.timeAtAddressYears ?? 0}y ${client.timeAtAddressMonths ?? 0}m`,
    ...(client.mortgageRepayments ? [`Mortgage Repayments: ${fmt(client.mortgageRepayments)}/mo`] : []),
    ...(client.rentalPayments     ? [`Rental Payments:     ${fmt(client.rentalPayments)}/mo`]     : []),
    ...(client.prevAddress ? [
      '',
      '--- PREVIOUS ADDRESS ---',
      `Address:          ${val(client.prevAddress)}`,
      `Residency Status: ${val(client.prevResidentialStatus)}`,
      ...(client.prevMortgageRepayments ? [`Mortgage Repayments: ${fmt(client.prevMortgageRepayments)}/mo`] : []),
      ...(client.prevRentalPayments     ? [`Rental Payments:     ${fmt(client.prevRentalPayments)}/mo`]     : []),
    ] : []),
    '',
    '--- EMPLOYMENT ---',
    `Occupation:       ${val(client.occupation)}`,
    `Employment Type:  ${val(client.employmentStatus)}`,
    `Employer:         ${val(client.employerName)}`,
    `Time in Job:      ${client.timeInJobYears ?? 0}y ${client.timeInJobMonths ?? 0}m`,
    ...(client.prevEmployerName ? [
      `Prev Occupation:  ${val(client.prevOccupation)}`,
      `Prev Employer:    ${val(client.prevEmployerName)}`,
      `Prev Emp. Type:   ${val(client.prevEmploymentType)}`,
    ] : []),
    '',
    '--- INCOME ---',
    `After-Tax Income: ${fmt(client.afterTaxIncome)} ${val(client.incomeFrequency)}`,
    `Annual Income:    ${fmt(client.annualIncome)}`,
    ...(client.otherIncome ? [`Partner Income:   ${fmt(client.otherIncome)} p.a.`] : []),
    ...(client.otherIncomeSources?.length ? [`Other Sources:    ${client.otherIncomeSources.join(', ')}`] : []),
    '',
    '--- EXPENSES (MONTHLY) ---',
    `Fixed Total:      ${fmt(client.monthlyFixedExpenses)}`,
    `Discretionary:    ${fmt(client.monthlyDiscretionaryExpenses)}`,
    `Overall Total:    ${fmt(client.monthlyExpenses)}`,
  ];

  // Itemised fixed expenses
  if (client.fixedExpenses && typeof client.fixedExpenses === 'object') {
    lines.push('', 'Fixed Breakdown:');
    for (const [k, v] of Object.entries(client.fixedExpenses)) {
      if (Number(v) > 0) lines.push(`  ${k}: ${fmt(v)}`);
    }
  }

  // Itemised discretionary expenses
  if (client.discretionaryExpenses && typeof client.discretionaryExpenses === 'object') {
    lines.push('', 'Discretionary Breakdown:');
    for (const [k, v] of Object.entries(client.discretionaryExpenses)) {
      if (Number(v) > 0) lines.push(`  ${k}: ${fmt(v)}`);
    }
  }

  if (client.additionalInfo) {
    lines.push('', '--- ADDITIONAL INFORMATION ---', client.additionalInfo);
  }

  lines.push('', `Reference: ${enquiry.reference}`);

  return addHubSpotNote(crmEnquiryId, lines.join('<br>'));
};

// Short note for AFOS — expenses only + additional info (keeps payload small)
export const createAfosNote = (client, enquiry) => {
  const fmt = (n) => (n != null ? `$${Number(n).toLocaleString('en-AU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` : '—');

  const lines = [
    `Ref: ${enquiry.reference}`,
    '',
    'EXPENSES (monthly)',
    `Fixed:         ${fmt(client.monthlyFixedExpenses)}`,
    `Discretionary: ${fmt(client.monthlyDiscretionaryExpenses)}`,
    `Total:         ${fmt(client.monthlyExpenses)}`,
  ];

  if (client.fixedExpenses && typeof client.fixedExpenses === 'object') {
    lines.push('', 'Fixed breakdown:');
    for (const [k, v] of Object.entries(client.fixedExpenses)) {
      if (Number(v) > 0) lines.push(`  ${k}: ${fmt(v)}`);
    }
  }

  if (client.discretionaryExpenses && typeof client.discretionaryExpenses === 'object') {
    lines.push('', 'Discretionary breakdown:');
    for (const [k, v] of Object.entries(client.discretionaryExpenses)) {
      if (Number(v) > 0) lines.push(`  ${k}: ${fmt(v)}`);
    }
  }

  if (client.additionalInfo) {
    lines.push('', 'Additional info:', client.additionalInfo);
  }

  return lines.join('\n');
};

export const addHubSpotNote = async (crmEnquiryId, content, timestamp = new Date()) => {
  return hubspotFetch('/crm/v3/objects/notes', {
    method: 'POST',
    body: JSON.stringify({
      properties: {
        hs_note_body: content,
        hs_timestamp: timestamp.toISOString(),
      },
      associations: [
        {
          to: { id: crmEnquiryId },
          types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 214 }],
        },
      ],
    }),
  });
};

// ── WEBHOOK VERIFICATION ──────────────────────────────────────

import crypto from 'crypto';

export const verifyHubSpotWebhook = (
  rawBody,
  signature,
  secret = process.env.HUBSPOT_WEBHOOK_SECRET
) => {
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
};
