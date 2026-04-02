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
      email: user.email,
      firstname: user.name.split(' ')[0],
      lastname: user.name.split(' ').slice(1).join(' '),
      phone: user.phone || '',
      address: client.address || '',
      city: client.city || '',
      zip: client.postcode || '',
      country: client.country || 'AU',
      loan_fair_client_id: client.id,
      employment_status: client.employmentStatus || '',
      annual_income: client.annualIncome?.toString() || '',
      credit_score: client.creditScore?.toString() || '',
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

  const body = {
    properties: {
      dealname: `${user.name} — ${vehicleDesc || enquiry.loanType} — ${enquiry.reference}`,
      amount: enquiry.loanAmount?.toString() || '0',
      dealstage: STAGE_MAP[enquiry.status] || 'appointmentscheduled',
      pipeline: 'default',
      closedate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
      loan_fair_enquiry_id: enquiry.id,
      loan_fair_reference: enquiry.reference,
      loan_type: enquiry.loanType,
      vehicle_description: vehicleDesc,
      loan_term_months: enquiry.loanTerm?.toString() || '',
      ltv: enquiry.ltvRatio?.toString() || '',
      ai_eligibility_score: enquiry.aiScore?.toString() || '',
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
